/// <reference types="Cypress" />

describe('Useful commands from lambdatest course', function() {

    it('List of commands',function() {
        // 1. search any elemen withing .container class
        cy.get('container').within(() => {
            cy.get('h4').should('exist')
        })

        // 2. instal cypress testing library for easy command

        // 3. set baseUrl lon cypress.json

        // 4. access part of request
        cy.request('google.com').its('body').should('have.length', 10)
    })
})