/// <reference types = "cypress"/>

describe('Menu button functionality test', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('http://localhost:8080/');
  });

  it('Clicking a menu button should call selectSubject method', () => {
    // Fetch subjects to display in menu
    cy.get('#fetch-subjects').click();

    // Interact with the dropdown to make it visible
    cy.get('#dropbtn').click();

    // Get the first visible menu button and click it
    cy.get('.menubtn:visible').first().click();

    // Wait for the chart to be created or updated
    cy.get('canvas').should('exist');

  });
});