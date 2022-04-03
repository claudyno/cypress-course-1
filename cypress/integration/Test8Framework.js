/// <reference types="Cypress" />
import HomePage from '../support/pageObjects/HomePage'
import ProductPage from '../support/pageObjects/ProductPage'
describe('My Second Test Suite', function() {

    before(function() {
        // runs once before all tests in the block

        // get data from fixture/example.json
        cy.fixture('example').then(function(data){
            this.data=data
        })
    })



  it('My FirstTest case', function() {
  
    const homePage=new HomePage()
    const productPage=new ProductPage()
    cy.visit("/angularpractice/")

    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value',this.data.name)
    homePage.getEditBox().should('have.attr','minlength','2')
    homePage.getEntrepreneaur().should('be.disabled')
    // overriding default settings
    Cypress.config('defaultCommandTimeout', 8000)
    homePage.getShopTab().click()


    // looping to add an array of items to the cart
    this.data.productName.forEach(function(element) {
        cy.selectProduct(element) //cy.selectProduct is a custom command from support/commands.js
    });
    
    productPage.checkOutButton().click()
    var sum=0

    // calculate sum
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
      const amount=$el.text()
      var res= amount.split(" ")
      res= res[1].trim()
      sum= Number(sum)+Number(res)
    }).then(function(){
        cy.log(sum)
    })

    // validate sum
    cy.get('h3 strong').then(function(element){
        const amount=element.text()
        var res= amount.split(" ")
      var total= res[1].trim()
      expect(Number(total)).to.equal(sum)
    })

    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.wait(2000) // wait for the suggestion box to appear
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force: true})
    cy.get('input[type="submit"]').click()

    cy.get('.alert').then(function(element){
      const actualText=element.text()
      expect(actualText.includes("Success")).to.be.true
    })
  })
})































