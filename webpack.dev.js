const webpackBase = require('./webpack.base');
const config = webpackBase.config;
const loaders = webpackBase.loaders;


module.exports = config;

config.entry.main.unshift('webpack-dev-server/client?http://localhost:3000');

config.module.loaders.push(
  loaders.scss.common
);

config.devServer = {
  contentBase: './src',
  historyApiFallback: true,
  port: 3000,
  publicPath: config.output.publicPath,
  stats: {
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: true,
    timings: true,
    version: false
  }
};
