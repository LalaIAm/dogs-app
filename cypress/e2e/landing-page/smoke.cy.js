describe("Landing Page - Smoke Tests", () => {
  it("loads without uncaught exceptions", () => {
    // Cypress automatically fails on uncaught exceptions by default.
    // Visiting without error confirms no uncaught exceptions.
    cy.visit("/");
    cy.get("body").should("be.visible");
  });

  it("has no console errors", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.spy(win.console, "error").as("consoleError");
      },
    });

    cy.get("body").should("be.visible");
    cy.get("@consoleError").should("not.have.been.called");
  });

  it("all images have valid src attributes", () => {
    cy.visit("/");
    cy.get("img").each(($img) => {
      cy.wrap($img).should("have.attr", "src").and("not.be.empty");
    });
  });

  it("noise overlay is present with correct z-index", () => {
    cy.visit("/");
    cy.get('div[aria-hidden="true"].fixed')
      .should("exist")
      .and("have.css", "z-index", "9999")
      .and("have.css", "pointer-events", "none");
  });
});
