/// <reference types="cypress" />

describe("E2E Test with Non Class Based JSX", () => {
  it('Can navigate to "/plain_jsx" page', () => {
    cy.visit("/");
    cy.get('[href="/plain_jsx"]').click();
  });

  it("Can compose and draw properly", () => {
    cy.viewport(1280, 720);
    cy.compareSnapshot("result");
  });
});
