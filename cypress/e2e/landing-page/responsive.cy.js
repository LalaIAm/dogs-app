describe("Responsive Layout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Mobile viewport (375px)", () => {
    beforeEach(() => {
      cy.viewport(375, 812);
    });

    it("ManifestoSection grid is single column", () => {
      cy.get(".grid.md\\:grid-cols-2")
        .first()
        .should("have.css", "grid-template-columns")
        .and("not.contain", " ");
    });

    it("SocialProofSection review cards grid is single column", () => {
      cy.get(".grid.md\\:grid-cols-3")
        .first()
        .should("have.css", "grid-template-columns")
        .and("not.contain", " ");
    });

    it("FeaturesSection grid is single column", () => {
      cy.get(".grid.grid-cols-1.md\\:grid-cols-2")
        .should("have.css", "grid-template-columns")
        .and("not.contain", " ");
    });

    it("TechCapabilitiesSection grid is single column", () => {
      cy.get(".grid.md\\:grid-cols-3")
        .last()
        .should("have.css", "grid-template-columns")
        .and("not.contain", " ");
    });

    it("page has no horizontal overflow", () => {
      cy.document().then((doc) => {
        const body = doc.body;
        const html = doc.documentElement;
        expect(body.scrollWidth).to.be.at.most(html.clientWidth);
      });
    });
  });

  context("Desktop viewport (1280px)", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("ManifestoSection grid has multiple columns", () => {
      cy.get(".grid.md\\:grid-cols-2")
        .first()
        .should("have.css", "grid-template-columns")
        .and("contain", " ");
    });

    it("SocialProofSection review cards grid has 3 columns", () => {
      cy.get(".grid.md\\:grid-cols-3")
        .first()
        .should("have.css", "grid-template-columns")
        .and("contain", " ");
    });

    it("FeaturesSection grid has 2 columns", () => {
      cy.get(".grid.grid-cols-1.md\\:grid-cols-2")
        .should("have.css", "grid-template-columns")
        .and("contain", " ");
    });

    it("TechCapabilitiesSection grid has 3 columns", () => {
      cy.get(".grid.md\\:grid-cols-3")
        .last()
        .should("have.css", "grid-template-columns")
        .and("contain", " ");
    });
  });

  context("Hero headline responsive sizing", () => {
    it("headline is smaller on mobile than on desktop", () => {
      let mobileFontSize;

      cy.viewport(375, 812);
      cy.get("h1")
        .first()
        .invoke("css", "font-size")
        .then((size) => {
          mobileFontSize = parseFloat(size);
        });

      cy.viewport(1280, 720);
      cy.get("h1")
        .first()
        .invoke("css", "font-size")
        .then((desktopSize) => {
          const desktop = parseFloat(desktopSize);
          expect(desktop).to.be.greaterThan(mobileFontSize);
        });
    });

    it("headline uses 8rem (128px) on desktop", () => {
      cy.viewport(1280, 720);
      cy.get("h1")
        .first()
        .invoke("css", "font-size")
        .then((size) => {
          const px = parseFloat(size);
          expect(px).to.equal(128);
        });
    });
  });
});
