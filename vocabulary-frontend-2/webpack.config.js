// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Env
// Get npm lifecycle event to identify the environment
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

// server address
var SERVER_HOST = 'localhost';
var SERVER_PORT = '5000';

module.exports = function makeWebpackConfig() {
  // Config
  // Reference: http://webpack.github.io/docs/configuration.html
  // This is the object where all configuration gets set
  var config = {};

  // Devtool
  // Reference: http://webpack.github.io/docs/configuration.html#devtool
  // Type of sourcemap to use per build type
  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  // add debug messages
  config.debug = !isProd || !isTest;

  // Entry
  // Reference: http://webpack.github.io/docs/configuration.html#entry
  config.entry = isTest ? {} : {
    'polyfills': './src/polyfills.ts',
    'vendor': [
      './src/vendor.ts',
      './src/styles.ts'
    ],
    'app': './src/main.ts' // our angular app
  };

  // Output
  // Reference: http://webpack.github.io/docs/configuration.html#output
  config.output = isTest ? {} : {
    path: root('dist'),
    publicPath: '/',
    filename: isProd ? 'static/js/[name].js?[hash]' : 'static/js/[name].js',
    chunkFilename: isProd ? 'static/js/[id].chunk.js?[hash]' : 'static/js/[id].chunk.js'
  };

  // Resolve
  // Reference: http://webpack.github.io/docs/configuration.html#resolve
  config.resolve = {
    cache: !isTest,
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'src/app',
      'common': 'src/common'
    }
  };

  // Loaders
  // Reference: http://webpack.github.io/docs/configuration.html#module-loaders
  // List: http://webpack.github.io/docs/list-of-loaders.html
  // This handles most of the magic responsible for converting modules
  config.module = {
    // preLoaders: isTest ? [] : [{test: /\.ts$/, loader: 'tslint'}],
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader', 'angular2-router-loader'],
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // Font and images
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        loader: 'url?name=static/fonts/[name].[ext]?[hash]limit=10000'
      },

      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        loader: 'file?name=static/fonts/[name].[ext]?[hash]'
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null' : ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css?sourceMap!postcss' })
      },



      // all css required in src/app files will be merged in js files
      {
        test: /\.css$/,
        include: root('src', 'app'),
        loader: 'raw!postcss'
      },

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.scss$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null' : ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css?sourceMap!postcss!sass' })
      },

      // all css required in src/app files will be merged in js files
      {
        test: /\.scss$/,
        include: root('src', 'app'),
        loader: 'raw!postcss!sass'
      },

      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ],
    postLoaders: [],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  };

  if (isTest) {
    // instrument only testing sources with Istanbul, covers ts files
    config.module.postLoaders.push({
      test: /\.ts$/,
      include: path.resolve('src'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
    });

    // needed for remap-instanbul
    config.ts = {
      compilerOptions: {
        sourceMap: false,
        sourceRoot: root('src'),
        inlineSourceMap: true
      }
    };
  }

  // Plugins
  // Reference: http://webpack.github.io/docs/configuration.html#plugins
  // List: http://webpack.github.io/docs/list-of-plugins.html
  config.plugins = [
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('src') // location of your src
    )
  ];

  if (!isTest) {
    config.plugins.push(
      // Generate common chunks if necessary
      // Reference: https://webpack.github.io/docs/code-splitting.html
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      new CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
        minChunks: Infinity
      }),

      // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        inject: 'body',
        template: 'index.html'
      }),

      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Disabled when in test mode
      new ExtractTextPlugin({ filename: 'static/css/[name].css?[hash]', allChunks: true, disable: isTest }),

      // Add the possibility to use 3rd party libraries in Angular code
      new webpack.ProvidePlugin(
        {
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery'
        }
      )
    );
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      // new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([
        { from: root('src', 'static', 'images'), to: 'static/images' }
      ])
    );
  }

  // PostCSS
  // Reference: https://github.com/postcss/autoprefixer-core
  // Add vendor prefixes to your css
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  // Apply the TSLint loader as pre/postLoader
  //Reference: https://github.com/wbuchwalter/tslint-loader
  config.tslint = {
    emitErrors: false,
    failOnHint: false
  };

  // Dev server configuration
  // Reference: http://webpack.github.io/docs/configuration.html#devserver
  // Reference: http://webpack.github.io/docs/webpack-dev-server.html
  config.devServer = {
    contentBase: root('src'),
    outputPath: root('dist'),
    historyApiFallback: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    host: SERVER_HOST,
    port: SERVER_PORT
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}