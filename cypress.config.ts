import { defineConfig } from "cypress";
import webpackPreprocessor from '@cypress/webpack-preprocessor'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', webpackPreprocessor({
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [{
              test: /\.ts$/,
              exclude: /node_modules/,
              loader: 'ts-loader'
            }]
          }
        }
      }))
    },
    baseUrl: 'http://localhost:3000',
    fixturesFolder: 'src/main/tests/cypress/fixtures',
    downloadsFolder: undefined,
    supportFile: 'src/main/tests/cypress/support/index.js',
    specPattern: 'src/main/tests/cypress/e2e/**/*.spec.ts',
    experimentalRunAllSpecs: true,
    video: false
  },
});
