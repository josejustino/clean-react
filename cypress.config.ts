import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const options = {
        resolve: {
          extensions: ['.ts', '.js',],
        },
        webpackOptions: {
          module: {
            rules: [
              {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
              },
            ],
          },
        }
      };
      on("file:preprocessor", webpackPreprocessor(options));
    },
    baseUrl: "http://localhost:3000",
    fixturesFolder: false,
    supportFile: false,
    fileServerFolder: "src/main/test/cypress",
    downloadsFolder: "src/main/test/cypress/downloads",
    specPattern: 'src/main/test/cypress/e2e/**/*.spec.ts'
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
