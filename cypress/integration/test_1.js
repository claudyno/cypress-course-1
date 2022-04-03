/// <reference types="Cypress" />

describe('My First Test Suite', () => {
    

    it('My FirstTest case', () => {
       
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product').should('have.length',5)
        cy.get('.product:visible').should('have.length',4)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length',4)
        // cy.get(':nth-child(3) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then((element) => {
            cy.log(element)
        })
    })
    
    it('Second test case', () => {
        cy.get('.products').as('productLocator')
        let count = 0; 
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const productName = $el.find('h4.product-name').text()
            const arrLength = $list.length  -1
            if(productName.includes('Cashews')){
                cy.wrap($el).find('button').click()
                count++
            }
            if(index == arrLength && count === 0){
                throw new Error("Failed to find product 'Cashews'")
            }
        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')

        //this is to print in logs
        cy.get('.brand').then((logoelement) => {
                cy.log(logoelement.text())

        })
        //const logo=cy.get('.brand')
        //cy.log(cy.get('.brand').text())
        // cy.log(logo.text())

        //fixture
    })
})