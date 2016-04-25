const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const assets = [
  {from: 'src/assets/vendor.css'},
  {from: 'src/assets/images', to: 'images'}
];


exports.loaders = {
  html: {test: /\.html$/, loader: 'raw'},
  scss: {
    common: {test: /\.scss$/, loader: 'style!css!postcss-loader!sass', include: path.resolve('src/views/common/styles')},
    components: {test: /\.scss$/, loader: 'raw!postcss-loader!sass', exclude: path.resolve('src/views/common/styles'), include: path.resolve('src/views')},
    extract: {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!postcss-loader!sass'), include: path.resolve('src/views/common/styles')}
  },
  ts: {test: /\.ts$/, loader: 'ts', exclude: /node_modules/}
};


exports.config = {
  cache: true,
  debug: false,
  devtool: 'source-map',

  entry: {
    main: ['./src/main'],
    vendor: [
      'core-js/es6/array',
      'core-js/es6/map',
      'core-js/es6/set',
      'core-js/es6/string',
      'core-js/es6/symbol',
      'core-js/es7/reflect',
      'zone.js',
      'angular2/common',
      'angular2/core',
      'angular2/http',
      'angular2/platform/browser',
      'angular2/router',
      'rxjs'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('.')
  },

  module: {
    loaders: [
      exports.loaders.ts,
      exports.loaders.html,
      exports.loaders.scss.components
    ],

    noParse: [
      /angular2\/bundles\/.+/
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
    new CopyWebpackPlugin(assets),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      inject: 'body',
      template: './src/index.html'
    })
  ]
};
