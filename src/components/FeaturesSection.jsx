import { PaintBrush, UsersThree } from "@phosphor-icons/react";
import { features } from "../data/landingContent.js";
import { FeatureCard } from "./ui/FeatureCard.jsx";

const iconMap = {
  PaintBrush: <PaintBrush size={36} />,
  UsersThree: <UsersThree size={36} />,
};

export function FeaturesSection() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-20">
          <span className="font-hand text-4xl text-rust rotate-[-2deg] inline-block">
            Curated Vibes
          </span>
          <h3 className="font-serif text-6xl mt-2">Tools for Drift.</h3>
        </div>

        {/* 2-column feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={iconMap[feature.icon]}
              title={feature.title}
              description={feature.description}
              tag={feature.tag}
              shadowColor={`bg-${feature.shadowColor}`}
            >
              {index === 0 && <RoutePainterMock />}
              {index === 1 && <PackPlanningMock />}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Route Painter visual mock — dark bar with start/end labels */
function RoutePainterMock() {
  return (
    <div
      className="bg-ink p-4 -mx-4 -mb-4 rotate-1 group-hover:rotate-0 transition-transform parallax-scroll"
      data-speed="0.04"
    >
      <div className="h-2 w-full bg-rust mb-2" />
      <div className="flex justify-between font-mono text-[10px] text-paper/60 uppercase">
        <span>Start: Boring</span>
        <span>End: Epic</span>
      </div>
    </div>
  );
}

/** Pack Planning visual mock — handwritten scribble annotation */
function PackPlanningMock() {
  return (
    <div
      className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 parallax-scroll"
      data-speed="-0.03"
    >
      <span className="font-hand text-2xl text-ink bg-sand px-2">
        &ldquo;No more group texts&rdquo;
      </span>
    </div>
  );
}
