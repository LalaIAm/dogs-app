/**
 * NoteCard — Sand-colored card with thumbtack decoration,
 * quote text, optional CTA button, and parallax support.
 *
 * Props:
 *   children   — quote or content rendered inside the card
 *   rotation   — Tailwind rotation class, e.g. 'rotate-3', '-rotate-2'
 *   speed      — parallax speed value (maps to data-speed attribute)
 *   cta        — optional { label, href } object to render a CTA button
 */

export function NoteCard({ children, rotation = "", speed, cta }) {
  return (
    <div
      className={`relative bg-sand p-6 shadow-lg text-ink parallax-wrap ${rotation}`}
      data-speed={speed}
    >
      {/* Thumbtack circle */}
      <div
        className="w-4 h-4 rounded-full bg-red-800/80 mx-auto mb-4 border border-ink/20 shadow-inner"
        aria-hidden="true"
      />

      {/* Quote / content */}
      <div className="font-hand text-3xl leading-tight">{children}</div>

      {/* Optional CTA button */}
      {cta && (
        <a
          href={cta.href || "#"}
          className="mt-6 block w-full border border-ink py-2 uppercase font-mono text-xs text-center hover:bg-ink hover:text-paper transition-colors"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
