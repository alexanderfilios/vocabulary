const argv = require('yargs').argv;

module.exports = config => {
  const options = {
    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    reporters: ['dots'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    browsers: ['Chrome']
  };

  if (argv.coverage) {
    options.reporters = [
      'mocha',
      'coverage',
      'karma-remap-istanbul'
    ];

    options.coverageReporter = {
      dir: 'coverage',
      file: 'coverage.json',
      subdir: 'json',
      type: 'json'
    };

    options.remapIstanbulReporter = {
      src: 'coverage/json/coverage.json',
      reports: {
        html: 'coverage/html',
        lcovonly: 'coverage/lcov/coverage.lcov',
        text: null
      },
      timeoutNotCreated: 5000, // default value
      timeoutNoMoreFiles: 5000 // default value
    };
  }

  config.set(options);
};
