import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    baseUrl: 'http://localhost:3222'
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
