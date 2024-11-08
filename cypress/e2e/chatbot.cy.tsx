/// <reference types="cypress" />

describe('Chatbot', () => {
  it('Type a prompt and receive a message', () => {
    // Arrange
    cy.visit('/');

    // Asseert welcome message
    cy.get('[data-testid="new-welcome-message"]').should(
      'contain.text',
      "Hi 👋! I'm Geppetto",
    );

    // Check if submit button is disabled
    cy.get('[data-testid="submit-button"]').should('be.disabled');

    // Type and submit
    cy.get('[id="chat_input"]').type('Hello guys');
    cy.get('[data-testid="submit-button"]').click();

    // Reset chat
    cy.get('[data-testid="reset-chat"]').click();

    // Assert chat is wiped
    cy.get('[data-testid="new-welcome-message"]').should(
      'contain.text',
      "Hi 👋! I'm Geppetto",
    );
  });
});
