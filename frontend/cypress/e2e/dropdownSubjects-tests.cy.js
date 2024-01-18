/// <reference types = "cypress"/>

// Test 1
it('Dropdown menu opens on click', () => {
  cy.visit('http://localhost:8080/')

  // Click the button
  cy.get('#dropbtn').click().then(() => {
    // Verify that the dropdown is visible
    cy.get('.dropdown-content').should('exist').should('be.visible')

    // Click the button again
    cy.get('#dropbtn').click().then(() => {
      // Verify that the dropdown is not visible
      cy.get('.dropdown-content').should('not.exist')
    })
  })
})