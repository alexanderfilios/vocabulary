const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const config = webpackBase.config;
const loaders = webpackBase.loaders;

// plugins
const DedupePlugin = webpack.optimize.DedupePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


module.exports = config;

config.module.loaders.push(
  loaders.scss.extract
);

config.plugins.push(
  new ExtractTextPlugin('styles.css'),
  new DedupePlugin(),
  new OccurenceOrderPlugin(),
  new UglifyJsPlugin({
    compress: {
      dead_code: true, // eslint-disable-line camelcase
      screw_ie8: true, // eslint-disable-line camelcase
      unused: true,
      warnings: false
    },
    mangle: false
  })
);
