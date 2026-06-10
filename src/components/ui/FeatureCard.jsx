/**
 * FeatureCard — Feature card with animated offset shadow/border layer.
 *
 * The outer wrapper is `relative group` so the shadow layer can be absolutely
 * positioned behind the main card. On hover the shadow offset shifts from
 * 4px to 2px via a CSS transition.
 *
 * Props:
 *   icon        — Phosphor icon component (e.g. <PaintBrush />)
 *   title       — Card heading text
 *   description — Card body text
 *   tag         — Release badge label (e.g. "REL 1.0", "BETA")
 *   shadowColor — Tailwind bg class for the offset layer (e.g. "bg-ink", "bg-sage")
 *   children    — Slot for visual mock content below the description
 */

export function FeatureCard({
  icon,
  title,
  description,
  tag,
  shadowColor = "bg-ink",
  children,
}) {
  return (
    <div className="relative group">
      {/* Offset shadow / border layer */}
      <div
        className={`absolute inset-0 ${shadowColor} border-2 border-ink translate-x-[4px] translate-y-[4px] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-transform duration-300`}
        aria-hidden="true"
      />

      {/* Main card */}
      <div className="relative bg-paper border-2 border-ink p-8 h-full">
        {/* Header: icon + tag badge */}
        <div className="flex justify-between items-start mb-8">
          {icon && <span className="text-4xl text-rust">{icon}</span>}
          {tag && (
            <span className="font-mono text-xs border border-ink px-2 py-1 rounded-full">
              {tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-serif text-3xl mb-4">{title}</h4>

        {/* Description */}
        <p className="font-mono text-sm text-gray-600 mb-8 max-w-xs">
          {description}
        </p>

        {/* Children slot for visual mock content */}
        {children}
      </div>
    </div>
  );
}
