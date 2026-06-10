/**
 * TechFeature — Tech capability item with icon scale animation on hover.
 *
 * Renders a left-border-separated item containing a Phosphor icon,
 * mono-styled title, and muted description. The icon scales to 110%
 * on hover via a group-hover CSS transition.
 *
 * Props:
 *   icon        — Phosphor icon element (e.g. <GasPump />)
 *   title       — Mono-styled heading (e.g. "FUEL_LOGIC")
 *   description — Feature description text
 *   iconColor   — Tailwind text color class (e.g. "text-rust", "text-sage")
 */

export function TechFeature({
  icon,
  title,
  description,
  iconColor = "text-rust",
}) {
  return (
    <div className="group border-l border-paper/20 pl-6">
      {/* Icon with scale animation */}
      <span
        className={`inline-block text-3xl ${iconColor} transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </span>

      {/* Mono title */}
      <h4 className="font-mono text-sm text-paper mt-4 tracking-wide">
        {title}
      </h4>

      {/* Description */}
      <p className="text-paper/60 text-sm mt-2 max-w-xs">{description}</p>
    </div>
  );
}
