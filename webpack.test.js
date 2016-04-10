const webpackBase = require('./webpack.base');
const config = webpackBase.config;
const loaders = webpackBase.loaders;


module.exports = {
  devtool: 'inline-source-map',
  resolve: config.resolve,

  module: {
    loaders: [
      loaders.ts,
      loaders.html,
      loaders.scss.common,
      loaders.scss.components
    ],

    noParse: config.module.noParse
  }
};
