/**
 * BlogCard — Field-notes styled blog card with three visual variants.
 *
 * Props:
 *   variant   — 'image' | 'quote' | 'guide' (determines card styling)
 *   title     — Card title text
 *   image     — Image URL (used by image variant)
 *   date      — Date string (used by image variant)
 *   readTime  — Read time string (used by image variant)
 *   excerpt   — Short excerpt text (used by image variant)
 *   quote     — Quote text (used by quote variant)
 *   location  — Location label (used by quote variant)
 *   tag       — Tag label (used by guide variant)
 *   items     — Bullet list items (used by guide variant)
 *   speed     — Parallax speed value (maps to data-speed attribute)
 */

import { Quotes } from "@phosphor-icons/react";

function ImageVariant({ title, image, date, readTime, excerpt }) {
  return (
    <>
      <div
        className="tape w-32 h-8 -top-3 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      />
      <div className="bg-white p-4 pb-8 shadow-lg rotate-1 transition-transform group-hover:rotate-0">
        {image && (
          <img
            src={image}
            alt={title || ""}
            className="w-full aspect-[4/3] object-cover filter sepia-[.3] mb-4"
          />
        )}
        {title && <h3 className="font-serif text-2xl mb-2">{title}</h3>}
        {(date || readTime) && (
          <p className="font-mono text-xs text-gray-500 mb-4">
            {date}
            {date && readTime && " • "}
            {readTime && `${readTime} read`}
          </p>
        )}
        {excerpt && <p className="font-sans text-sm line-clamp-3">{excerpt}</p>}
      </div>
    </>
  );
}

function QuoteVariant({ quote, location }) {
  return (
    <div className="bg-rust text-paper p-8 shadow-lg -rotate-2 transition-transform group-hover:rotate-0">
      <Quotes size={36} className="opacity-50 mb-4" aria-hidden="true" />
      <h3 className="font-serif text-3xl leading-tight mb-4">{quote}</h3>
      {location && (
        <div className="font-mono text-xs border-t border-paper/30 pt-4 uppercase">
          Location: {location}
        </div>
      )}
    </div>
  );
}

function GuideVariant({ title, tag, items }) {
  return (
    <div className="bg-sage/20 border border-sage p-6 shadow-md rotate-[-1deg] transition-transform group-hover:rotate-0">
      {tag && (
        <span className="font-mono text-[10px] bg-sage text-white px-2 py-1 mb-2 inline-block">
          {tag}
        </span>
      )}
      {title && <h3 className="font-serif text-xl mb-2">{title}</h3>}
      {items && items.length > 0 && (
        <ul className="font-hand text-xl list-disc pl-5 mt-4 space-y-1 text-ink/80">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BlogCard({
  variant,
  title,
  image,
  date,
  readTime,
  excerpt,
  quote,
  location,
  tag,
  items,
  speed,
}) {
  const renderVariant = () => {
    switch (variant) {
      case "image":
        return (
          <ImageVariant
            title={title}
            image={image}
            date={date}
            readTime={readTime}
            excerpt={excerpt}
          />
        );
      case "quote":
        return <QuoteVariant quote={quote} location={location} />;
      case "guide":
        return <GuideVariant title={title} tag={tag} items={items} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="break-inside-avoid relative group cursor-pointer"
      data-speed={speed}
    >
      {renderVariant()}
    </div>
  );
}
