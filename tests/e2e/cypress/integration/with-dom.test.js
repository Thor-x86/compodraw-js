/// <reference types="cypress" />

describe("E2E Test with DOM Element", () => {
  it('Can navigate to "/dom" page', () => {
    cy.visit("/");
    cy.get('[href="/dom"]').click();
  });

  it("Can compose and draw properly", () => {
    cy.viewport(1280, 720);
    cy.compareSnapshot("result");
  });
});
