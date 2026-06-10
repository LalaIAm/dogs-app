import { useEffect, useRef } from "react";

/**
 * Custom hook that manages scroll-driven parallax transforms
 * via requestAnimationFrame for GPU-accelerated performance.
 *
 * Elements opt-in by adding a `data-speed` attribute.
 * Transforms include translateY and subtle rotation based on scroll position.
 */
export function useParallax() {
  const rafId = useRef(null);

  useEffect(() => {
    function updatePositions() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const elements = document.querySelectorAll("[data-speed]");

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        // Only update elements within viewport (with 100px buffer)
        if (top < windowHeight + 100 && bottom > -100) {
          const speed = parseFloat(el.dataset.speed) || 0;
          const translateY = scrollY * speed;
          const rotation = scrollY * 0.01 * speed * 10;

          el.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)`;
        }
      });

      rafId.current = null;
    }

    function onScroll() {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updatePositions);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);
}
