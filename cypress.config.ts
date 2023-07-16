import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    supportFile: 'src/main/test/cypress/support/index.js',
    specPattern: 'src/main/test/cypress/e2e/**/*.spec.ts',
  },
});
