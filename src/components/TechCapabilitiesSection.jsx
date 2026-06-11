import { GasPump, CloudWarning, Satellite } from "@phosphor-icons/react";
import { techFeatures } from "../data/landingContent";
import { TechFeature } from "./ui/TechFeature";

const iconMap = {
  GasPump: <GasPump size={32} />,
  CloudWarning: <CloudWarning size={32} />,
  Satellite: <Satellite size={32} />,
};

export function TechCapabilitiesSection() {
  return (
    <section className="py-24 bg-ink text-paper relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-paper/20 pb-8">
          <div>
            <p className="font-mono text-rust text-xs uppercase mb-2">
              System_Check_Complete
            </p>
            <h2 className="font-serif text-5xl">
              Under the <span className="italic font-light">Hood</span>
            </h2>
          </div>
          {/* Hand-drawn arrow annotation */}
          <div className="hidden md:block transform rotate-6">
            <p className="font-hand text-2xl text-paper/70">
              &ldquo;Tech that works offline&rdquo;
            </p>
            <svg
              width="100"
              height="40"
              className="text-paper/70 transform rotate-180"
            >
              <path
                d="M10,20 Q50,5 90,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M15,15 L10,20 L18,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* 3-column grid of TechFeature components */}
        <div className="grid md:grid-cols-3 gap-12">
          {techFeatures.map((feature) => (
            <TechFeature
              key={feature.title}
              icon={iconMap[feature.icon]}
              title={feature.title}
              description={feature.description}
              iconColor={`text-${feature.color}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
