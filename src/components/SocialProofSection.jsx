import { Star, StarHalf } from "@phosphor-icons/react";
import { reviews, brands } from "../data/landingContent";
import { ReviewCard } from "./ui/ReviewCard";

export function SocialProofSection() {
  const reviewSpeeds = [0.03, -0.04, 0.06];

  return (
    <section className="py-20 border-b border-ink/10 overflow-hidden relative">
      {/* Background Scribble — hidden on mobile */}
      <div
        className="hidden md:block absolute -right-20 top-10 opacity-10 pointer-events-none rotate-12 parallax-scroll"
        data-speed="0.05"
        aria-hidden="true"
      >
        <svg width="400" height="400" viewBox="0 0 200 200">
          <path
            d="M10,10 Q50,100 10,190 M30,10 Q90,100 30,190"
            fill="none"
            stroke="#232323"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header + Star Rating */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-hand text-3xl text-rust -rotate-2 block mb-2">
              Word on the street
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              The Co-Pilot Reports.
            </h2>
          </div>

          {/* Star Rating Stamp */}
          <div
            className="border-2 border-rust p-2 px-4 rounded-sm rotate-2 opacity-90 hover:rotate-0 transition-transform cursor-help parallax-scroll"
            data-speed="-0.02"
          >
            <div className="flex text-rust gap-1 text-xl">
              <Star weight="fill" />
              <Star weight="fill" />
              <Star weight="fill" />
              <Star weight="fill" />
              <StarHalf weight="fill" />
            </div>
            <p className="font-mono text-[10px] text-center mt-1 uppercase tracking-widest text-rust font-bold">
              4.9/5 Avg. Rating
            </p>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-20">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.variant}
              variant={review.variant}
              quote={review.quote || review.caption}
              author={review.author}
              meta={
                review.variant === "receipt"
                  ? { id: review.id, user: review.user, route: review.route }
                  : undefined
              }
              image={review.image}
              speed={reviewSpeeds[index]}
            />
          ))}
        </div>

        {/* Brand Bar */}
        <div className="border-t border-dashed border-ink/30 pt-10">
          <p className="font-mono text-xs text-center mb-6 uppercase tracking-widest opacity-50">
            seen in the wild
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 grayscale mix-blend-multiply hover:opacity-80 transition-opacity duration-500">
            <span className="font-serif font-black text-3xl tracking-tight">
              {brands[0]}
            </span>
            <span className="font-mono font-bold text-2xl tracking-tighter border-2 border-ink p-1 rotate-2">
              {brands[1]}
            </span>
            <span className="font-serif font-bold text-2xl italic">
              {brands[2]}
            </span>
            <span className="font-sans font-black text-2xl rotate-[-2deg]">
              {brands[3]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
