import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4300",
    retries: {
      runMode: 3,
      openMode: 0,
    },
    pageLoadTimeout: 120000,
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
    viewportWidth: 800,
  },
});
