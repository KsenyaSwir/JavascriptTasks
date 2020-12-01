import Chance from 'chance'
import  SearchResultsPage from "../../page-objects/searchResultsPage";
import MainPage from "../../page-objects/mainPage";
import clickOnProduct from "../../page-objects/mainPage";
/*
describe('Searcher', () => {
      it('Positive: Searcher', () => {
            cy.visit('https://store.google.com/us/collection/accessories?hl=en-US')
            cy.get('.header-search-icon').click()
            cy.get('input[aria-label = "Search Google Store"]').type(`Google Pixel Buds{enter}`)
            cy.get('a[href = "/product/google_pixel_buds"]').should('exist')
    })
})*/

Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
})

Cypress.on('fail', (error, runnable) => {
      debugger

      // we now have access to the err instance
      // and the mocha runnable this failed on

      throw error // throw error to have test still fail
})


describe('Searcher', () => {

      it('Positive: Searcher', () => {
            MainPage.open();
            MainPage.performSearch('Google Pixel Buds');

            SearchResultsPage.getProductByDocId("pixel_buds").should('exist')

      })
})