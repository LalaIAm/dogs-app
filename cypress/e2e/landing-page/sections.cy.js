describe("Landing Page - Section Rendering", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("All 10 sections are present in correct order", () => {
    it("renders all sections in the correct DOM order", () => {
      // Get all top-level children of the page container
      cy.get("nav").should("exist");
      cy.get("header").should("exist");
      cy.get("section").should("have.length.at.least", 7);
      cy.get("footer").should("exist");

      // Verify order by checking sibling sequence within the page container
      cy.get("div.text-ink")
        .children()
        .then(($children) => {
          const tagNames = [...$children].map((el) => el.tagName.toLowerCase());
          expect(tagNames[0]).to.equal("nav"); // Navbar
          expect(tagNames[1]).to.equal("header"); // HeroSection
          expect(tagNames[2]).to.equal("section"); // ManifestoSection
          expect(tagNames[3]).to.equal("section"); // SmartPoiSection
          expect(tagNames[4]).to.equal("section"); // SocialProofSection
          expect(tagNames[5]).to.equal("section"); // FeaturesSection
          expect(tagNames[6]).to.equal("section"); // TechCapabilitiesSection
          expect(tagNames[7]).to.equal("section"); // CtaSection
          expect(tagNames[8]).to.equal("section"); // FieldNotesSection
          expect(tagNames[9]).to.equal("footer"); // Footer
          expect(tagNames[10]).to.equal("div"); // NoiseOverlay
        });
    });
  });

  describe("Navbar", () => {
    it("is fixed and visible", () => {
      cy.get("nav")
        .should("exist")
        .and("have.css", "position", "fixed")
        .and("have.css", "top", "0px");
    });

    it("contains RoadDoggs logo text", () => {
      cy.get("nav").contains("RoadDoggs");
    });

    it("contains LOG IN button", () => {
      cy.get("nav").contains("[ LOG IN ]");
    });
  });

  describe("Hero Section", () => {
    it("displays the headline with GET and LOST text", () => {
      cy.get("header h1").contains("GET");
      cy.get("header h1").contains("LOST");
    });

    it("displays the coordinates_unknown label", () => {
      cy.get("header").contains("coordinates_unknown");
    });
  });

  describe("Manifesto Section", () => {
    it("contains Anti-Grid heading text", () => {
      cy.get("section").contains("The Anti-Grid");
    });

    it("contains Manifesto in italic rust", () => {
      cy.get("section").contains("Manifesto.");
    });
  });

  describe("Smart POI Section", () => {
    it("displays Algorithm v2.4 Active status", () => {
      cy.get("section.bg-ink").first().contains("Algorithm v2.4 Active");
    });

    it("displays Giant Artichoke found card", () => {
      cy.get("section.bg-ink").first().contains("Giant Artichoke");
    });
  });

  describe("Social Proof Section", () => {
    it("displays The Co-Pilot Reports heading", () => {
      cy.contains("The Co-Pilot Reports.");
    });

    it("displays the 4.9/5 rating", () => {
      cy.contains("4.9/5 Avg. Rating");
    });
  });

  describe("Features Section", () => {
    it("displays Tools for Drift heading", () => {
      cy.contains("Tools for Drift.");
    });

    it("displays Curated Vibes accent text", () => {
      cy.contains("Curated Vibes");
    });
  });

  describe("Tech Capabilities Section", () => {
    it("displays Under the Hood heading", () => {
      cy.contains("Under the Hood");
    });

    it("displays System_Check_Complete label", () => {
      cy.contains("System_Check_Complete");
    });
  });

  describe("CTA Section", () => {
    it("displays the headline", () => {
      cy.get("section.bg-rust").contains("Don't just drive.");
      cy.get("section.bg-rust").contains("Roam.");
    });

    it("displays Limited Beta Access badge", () => {
      cy.get("section.bg-rust").contains("Limited Beta Access");
    });
  });

  describe("Field Notes Section", () => {
    it("displays the Field Notes heading", () => {
      cy.contains("h2", "Field Notes");
    });
  });

  describe("Footer", () => {
    it("displays the GO. heading", () => {
      cy.get("footer").contains("GO.");
    });

    it("displays copyright with current year", () => {
      const currentYear = new Date().getFullYear();
      cy.get("footer").contains(currentYear.toString());
    });
  });
});
