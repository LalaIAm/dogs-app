/**
 * ReviewCard — Scrapbook-styled review card with three visual variants.
 *
 * Props:
 *   variant  — 'receipt' | 'napkin' | 'polaroid' (determines card styling)
 *   quote    — Review quote text
 *   author   — Author name/handle (used by napkin variant)
 *   meta     — Object with variant-specific data (e.g. { id, user, route } for receipt)
 *   image    — Image URL (used by polaroid variant)
 *   speed    — Parallax speed value (maps to data-speed attribute)
 */

function ReceiptVariant({ quote, meta }) {
  return (
    <div className="bg-white p-6 shadow-sm border-t-8 border-dotted border-gray-300 relative rotate-1 transition-transform group-hover:rotate-0 h-full">
      {/* Thumbtack hole */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-paper rounded-full border border-gray-300 shadow-inner"
        aria-hidden="true"
      />
      <p className="font-mono text-xs mb-4 text-gray-400">
        RECEIPT {meta?.id || "#0000"} // USER: {meta?.user || "UNKNOWN"}
      </p>
      <p className="font-serif text-xl leading-snug mb-6">"{quote}"</p>
      <div className="font-mono text-[10px] uppercase border-t border-ink/10 pt-4 flex justify-between mt-auto">
        <span>Route: {meta?.route || "Unknown"}</span>
        <span className="text-rust">VERIFIED</span>
      </div>
    </div>
  );
}

function NapkinVariant({ quote, author }) {
  return (
    <div className="bg-[#fcfcf0] p-6 shadow-lg -rotate-2 transition-transform group-hover:rotate-0 h-full relative">
      {/* Tape decoration */}
      <div
        className="tape w-24 h-8 -top-3 right-10 rotate-3 opacity-80"
        aria-hidden="true"
      />
      <p className="font-hand text-3xl leading-snug text-ink/90 mb-4 pt-4">
        "{quote}"
      </p>
      {author && (
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <div className="font-hand text-xl text-gray-500 transform -rotate-6">
            {author}
          </div>
        </div>
      )}
    </div>
  );
}

function PolaroidVariant({ quote, image }) {
  return (
    <>
      {/* Tape decoration */}
      <div
        className="tape w-20 h-6 -top-2 left-10 -rotate-12 z-20"
        aria-hidden="true"
      />
      <div className="bg-white p-3 pb-12 shadow-xl rotate-3 transition-transform group-hover:rotate-0 h-full">
        <div className="w-full aspect-[4/3] bg-gray-200 mb-4 overflow-hidden filter sepia-[.3]">
          {image && (
            <img
              src={image}
              alt={quote || ""}
              className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          )}
        </div>
        <p className="font-hand text-2xl text-center text-ink/80 transform -rotate-1">
          "{quote}"
        </p>
      </div>
    </>
  );
}

export function ReviewCard({ variant, quote, author, meta, image, speed }) {
  const renderVariant = () => {
    switch (variant) {
      case "receipt":
        return <ReceiptVariant quote={quote} meta={meta} />;
      case "napkin":
        return <NapkinVariant quote={quote} author={author} />;
      case "polaroid":
        return <PolaroidVariant quote={quote} image={image} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative group parallax-scroll" data-speed={speed}>
      {renderVariant()}
    </div>
  );
}
