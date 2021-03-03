/// <reference types="cypress" />

describe("E2E Test with XML", () => {
  it('Can navigate to "/xml" page', () => {
    cy.visit("/");
    cy.get('[href="/xml"]').click();
  });

  it("Can compose and draw properly", () => {
    cy.viewport(1280, 720);
    cy.compareSnapshot("result");
  });
});
