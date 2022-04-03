/// <reference types="Cypress" />

describe('My First Test Suite', function() {

   it('My FirstTest case',function() {
      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

      cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',(req)=> {
         // changing the request url
         req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

         // resume the request validate status code
         req.continue((res)=>{
            expect(res.statusCode).to.equal(200)
         })
      }).as("dummyUrl")

      cy.get("button[class='btn btn-primary']").click()
      cy.wait('@dummyUrl')
   })

})





