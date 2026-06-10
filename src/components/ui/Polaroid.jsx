/**
 * Polaroid — Reusable polaroid-style image frame with tape decoration,
 * film-look filter, and parallax support.
 *
 * Props:
 *   src           — image URL
 *   caption       — handwritten caption text (optional)
 *   rotation      — Tailwind rotation class, e.g. 'rotate-2', '-rotate-6'
 *   tapePosition  — 'center' | 'left' | 'right' (where the tape strip sits)
 *   className     — additional classes for the outer wrapper (sizing, positioning, etc.)
 *   speed         — parallax speed value (maps to data-speed attribute)
 */

const tapePositionStyles = {
  center: "-top-3 left-1/2 -translate-x-1/2",
  left: "-top-2 left-4 -rotate-12",
  right: "-top-2 right-4 rotate-12",
};

export function Polaroid({
  src,
  caption,
  rotation = "",
  tapePosition = "center",
  className = "",
  speed,
}) {
  const tapeClasses =
    tapePositionStyles[tapePosition] || tapePositionStyles.center;

  return (
    <div
      className={`relative bg-white p-2 pb-8 shadow-lg parallax-wrap group ${rotation} ${className}`}
      data-speed={speed}
    >
      {/* Tape decoration */}
      <div
        className={`tape w-16 h-6 ${tapeClasses} opacity-80`}
        aria-hidden="true"
      />

      {/* Image with film-look filter — transitions to full color on hover */}
      <img
        src={src}
        alt={caption || ""}
        className="w-full h-full object-cover film-look grayscale group-hover:grayscale-0 transition-all duration-500"
      />

      {/* Handwritten caption */}
      {caption && (
        <p className="font-hand text-lg text-center mt-1">{caption}</p>
      )}
    </div>
  );
}
