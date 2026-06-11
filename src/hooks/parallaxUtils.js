/**
 * Pure calculation functions extracted from the useParallax hook.
 * These enable property-based testing of the parallax math without DOM dependencies.
 */

/**
 * Calculates the translateY value for a parallax element.
 * @param {number} scrollY - Current scroll position
 * @param {number} speed - Element's parallax speed factor (from data-speed)
 * @returns {number} The translateY value in pixels
 */
export function calculateTranslateY(scrollY, speed) {
  return scrollY * speed;
}

/**
 * Calculates the rotation value for a parallax element.
 * @param {number} scrollY - Current scroll position
 * @param {number} speed - Element's parallax speed factor (from data-speed)
 * @returns {number} The rotation value in degrees
 */
export function calculateRotation(scrollY, speed) {
  return scrollY * 0.01 * speed * 10;
}

/**
 * Determines whether an element should be updated based on viewport culling.
 * Elements are only updated when within the viewport plus a 100px buffer.
 * @param {number} top - Element's bounding rect top
 * @param {number} bottom - Element's bounding rect bottom
 * @param {number} windowHeight - Current window inner height
 * @returns {boolean} Whether the element should receive transform updates
 */
export function isInViewport(top, bottom, windowHeight) {
  return top < windowHeight + 100 && bottom > -100;
}
