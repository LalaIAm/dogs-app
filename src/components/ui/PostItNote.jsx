/**
 * PostItNote — Reusable post-it note with pin decoration,
 * handwritten content, and parallax support.
 *
 * Props:
 *   children   — content rendered inside the note
 *   rotation   — Tailwind rotation class, e.g. 'rotate-2', '-rotate-3'
 *   speed      — parallax speed value (maps to data-speed attribute)
 */

export function PostItNote({ children, rotation = "", speed }) {
  return (
    <div
      className={`relative bg-[#fff9c4] p-4 pt-6 shadow-md parallax-wrap ${rotation}`}
      data-speed={speed}
    >
      {/* Pin decoration */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-red-500"
        aria-hidden="true"
      />

      {/* Handwritten content */}
      <div className="font-hand text-lg leading-snug">{children}</div>
    </div>
  );
}
