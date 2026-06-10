import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  calculateTranslateY,
  calculateRotation,
  isInViewport,
} from "../parallaxUtils.js";

/**
 * Property-based tests for useParallax calculation logic.
 *
 * **Validates: Requirements 5.2, 5.3, 5.5**
 */
describe("useParallax calculations", () => {
  describe("Property 1: Parallax Transform Calculation Consistency", () => {
    /**
     * **Validates: Requirements 5.2**
     *
     * For any (scrollY, speed) pair, translateY must equal scrollY * speed.
     */
    it("translateY equals scrollY * speed for all inputs", () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          fc.float({ min: -2, max: 2, noNaN: true }),
          (scrollY, speed) => {
            const result = calculateTranslateY(scrollY, speed);
            const expected = scrollY * speed;
            expect(result).toBeCloseTo(expected, 5);
          },
        ),
        { numRuns: 1000 },
      );
    });

    /**
     * **Validates: Requirements 5.3**
     *
     * For any (scrollY, speed) pair, rotation must equal scrollY * 0.01 * speed * 10.
     */
    it("rotation equals scrollY * 0.01 * speed * 10 for all inputs", () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          fc.float({ min: -2, max: 2, noNaN: true }),
          (scrollY, speed) => {
            const result = calculateRotation(scrollY, speed);
            const expected = scrollY * 0.01 * speed * 10;
            expect(result).toBeCloseTo(expected, 5);
          },
        ),
        { numRuns: 1000 },
      );
    });
  });

  describe("Property 2: Viewport Culling Correctness", () => {
    /**
     * **Validates: Requirements 5.5**
     *
     * For any (elementTop, elementBottom, windowHeight), the element is updated
     * if and only if top < windowHeight + 100 AND bottom > -100.
     */
    it("update condition matches top < windowHeight + 100 AND bottom > -100", () => {
      fc.assert(
        fc.property(
          fc.float({ min: -5000, max: 10000, noNaN: true }),
          fc.float({ min: -5000, max: 10000, noNaN: true }),
          fc.float({ min: 100, max: 5000, noNaN: true }),
          (elementTop, elementBottom, windowHeight) => {
            const result = isInViewport(
              elementTop,
              elementBottom,
              windowHeight,
            );
            const expected =
              elementTop < windowHeight + 100 && elementBottom > -100;
            expect(result).toBe(expected);
          },
        ),
        { numRuns: 1000 },
      );
    });

    /**
     * **Validates: Requirements 5.5**
     *
     * Elements far above viewport (bottom <= -100) should not be updated.
     */
    it("elements far above viewport are culled", () => {
      fc.assert(
        fc.property(
          fc.float({ min: -10000, max: -101, noNaN: true }),
          fc.float({ min: 100, max: 5000, noNaN: true }),
          (bottom, windowHeight) => {
            // top is always <= bottom, so pick top below bottom
            const top =
              bottom - Math.abs(fc.float({ min: 0, max: 1000, noNaN: true }));
            const result = isInViewport(top, bottom, windowHeight);
            expect(result).toBe(false);
          },
        ),
        { numRuns: 500 },
      );
    });

    /**
     * **Validates: Requirements 5.5**
     *
     * Elements far below viewport (top >= windowHeight + 100) should not be updated.
     */
    it("elements far below viewport are culled", () => {
      fc.assert(
        fc.property(
          fc.float({ min: 100, max: 5000, noNaN: true }),
          (windowHeight) => {
            const top = windowHeight + 100; // exactly at the boundary (not less than)
            const bottom = top + 500;
            const result = isInViewport(top, bottom, windowHeight);
            expect(result).toBe(false);
          },
        ),
        { numRuns: 500 },
      );
    });
  });
});
