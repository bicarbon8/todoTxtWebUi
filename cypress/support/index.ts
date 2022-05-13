// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
import './commands';

// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js
Cypress.on('uncaught:exception', (err, runnable) => {
    // angular module federation erroneous error ingnore
    if (err.message.includes("Cannot use 'import.meta' outside a module")) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})