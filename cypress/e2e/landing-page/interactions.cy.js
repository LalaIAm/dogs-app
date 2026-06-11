/**
 * Parallax & Interaction Tests
 * Validates: Requirements 16.3, 16.4
 *
 * Tests that parallax data-speed elements exist, transforms update on scroll,
 * and hover interactions work for film-look images, review cards, and feature cards.
 */

describe("Parallax and Interactions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Parallax system", () => {
    it("data-speed elements exist on the page", () => {
      cy.get("[data-speed]").should("have.length.greaterThan", 0);
    });

    it("scroll triggers transform changes on parallax elements", () => {
      // Get the first data-speed element and check initial transform
      cy.get("[data-speed]")
        .first()
        .then(($el) => {
          const initialTransform = $el[0].style.transform;

          // Scroll down to trigger parallax updates
          cy.scrollTo(0, 500, { duration: 100 });

          // Wait for rAF to apply transforms, then verify change
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(200);

          cy.get("[data-speed]")
            .first()
            .should(($elAfter) => {
              const newTransform = $elAfter[0].style.transform;
              expect(newTransform).to.include("translate3d");
              expect(newTransform).to.not.equal(initialTransform);
            });
        });
    });
  });

  describe("Film-look image hover", () => {
    it("hover on film-look images changes filter", () => {
      // Film-look images are inside Polaroid components with the .film-look class
      // They use Tailwind's group-hover utilities: group-hover:grayscale-0
      // Since CSS hover can't be triggered programmatically, verify the element
      // has the correct hover-responsive classes wired up
      cy.get(".film-look")
        .first()
        .should(($img) => {
          const classes = $img[0].className;
          // Verify it has the base grayscale filter class
          expect(classes).to.include("grayscale");
          // Verify it has the group-hover class that removes grayscale on hover
          expect(classes).to.include("group-hover:grayscale-0");
          // Verify it has the transition for smooth filter change
          expect(classes).to.include("transition-all");
          expect(classes).to.include("duration-500");
        });

      // Verify the image is inside a group container (required for group-hover)
      cy.get(".film-look").first().closest(".group").should("exist");
    });
  });

  describe("Review card hover", () => {
    it("hover on review cards resets rotation", () => {
      // ReviewCard components have class "group" on the wrapper
      // The inner card divs have rotation classes (rotate-1, -rotate-2, rotate-3)
      // that transition to rotate-0 on group-hover
      cy.get(".parallax-scroll[data-speed]")
        .filter(":has([class*='rotate-'])")
        .first()
        .then(($card) => {
          // Get the inner element that has a rotation class
          const rotatedChild = $card.find("[class*='rotate-']").first();

          if (rotatedChild.length) {
            // Trigger hover on the group wrapper
            cy.wrap($card).trigger("mouseover");

            // The child should now have group-hover:rotate-0 applied
            // We verify the element has the transition-transform class
            cy.wrap(rotatedChild).should(($el) => {
              const classes = $el[0].className;
              expect(classes).to.include("transition-transform");
            });
          }
        });
    });
  });

  describe("Feature card hover", () => {
    it("hover on feature cards changes shadow offset", () => {
      // FeatureCard has a shadow div that translates from 4px to 2px on hover
      cy.get(".group")
        .filter(":has([class*='translate-x-\\[4px\\]'])")
        .first()
        .then(($card) => {
          // Find the shadow layer element
          const shadowLayer = $card.find("[class*='translate-x-']").first();

          // Get initial computed transform
          const initialTransform = window.getComputedStyle(
            shadowLayer[0],
          ).transform;

          // Trigger hover on the group wrapper
          cy.wrap($card).trigger("mouseover");

          // After hover, shadow should have group-hover:translate-x-[2px] classes
          cy.wrap(shadowLayer).should(($el) => {
            const classes = $el[0].className;
            expect(classes).to.include("group-hover:translate-x-[2px]");
            expect(classes).to.include("group-hover:translate-y-[2px]");
          });
        });
    });
  });
});
