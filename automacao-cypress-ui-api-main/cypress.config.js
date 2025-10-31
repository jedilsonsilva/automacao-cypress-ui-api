const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const path = require('path');

const webpackOptions = {
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'cypress'),
          path.resolve(__dirname, 'node_modules/@shelex/cypress-allure-plugin')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev/login",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    setupNodeEvents(on, config) {
      // Use webpack preprocessor to transpile tests and the Allure plugin code
      on('file:preprocessor', webpackPreprocessor({ webpackOptions }));
      allureWriter(on, config);
      return config;
    },
  },
  env: {
    allure: true,
  },
});