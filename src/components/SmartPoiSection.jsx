export function SmartPoiSection() {
  return (
    <section className="py-24 bg-ink text-paper relative overflow-hidden border-t-8 border-sage">
      {/* Sage grid overlay at 10% opacity */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#8E9C6D 1px, transparent 1px), linear-gradient(90deg, #8E9C6D 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text Content */}
        <div>
          {/* Algorithm status indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 bg-rust rounded-full animate-pulse" />
            <p className="font-mono text-xs text-sage uppercase tracking-widest">
              Algorithm v2.4 Active
            </p>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-none">
            We find the places <br />
            <span className="text-rust italic">Google misses.</span>
          </h2>

          <div className="space-y-8 font-mono text-sm border-l border-white/10 pl-8">
            <div className="relative group">
              <h3 className="text-xl font-bold mb-2 text-paper group-hover:text-rust transition-colors">
                Smart POI Discovery
              </h3>
              <p className="text-white/60 leading-relaxed">
                Our engine scans for &ldquo;high-vibe&rdquo; keywords in user
                reviews&mdash;diner pie, haunted motels, scenic
                overlooks&mdash;not just star ratings.
              </p>
            </div>
            <div className="relative group">
              <h3 className="text-xl font-bold mb-2 text-paper group-hover:text-rust transition-colors">
                Vibe-Based Routing
              </h3>
              <p className="text-white/60 leading-relaxed">
                Select &ldquo;Scenic&rdquo; to prioritize curves and views, or
                &ldquo;Direct&rdquo; to just get there. We adjust the ETA based
                on your curiosity level.
              </p>
            </div>
          </div>
        </div>

        {/* Radar Visual */}
        <div className="relative h-[400px] border-2 border-white/10 rounded-sm bg-white/5 backdrop-blur-sm p-4 flex items-center justify-center overflow-hidden mx-4 md:mx-0">
          <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40">
            SCANNING SECTOR 7G
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/40">
            39.7392° N, 104.9903° W
          </div>

          {/* Concentric circles */}
          <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full" />
          <div
            className="absolute w-[200px] h-[200px] border border-rust/50 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />

          {/* "Found" card with connector */}
          <div className="relative z-10 text-center transform rotate-2 group cursor-pointer">
            <div className="bg-paper text-ink p-4 shadow-2xl max-w-xs relative transition-transform group-hover:scale-105">
              <div className="tape w-16 h-6 -top-3 left-1/2 -translate-x-1/2 bg-white/80 absolute rotate-2" />
              <p className="font-serif text-xl border-b-2 border-rust pb-2 mb-2">
                Giant Artichoke
              </p>
              <div className="flex justify-between font-mono text-[10px] uppercase text-gray-500">
                <span>Castroville, CA</span>
                <span className="text-rust font-bold">MATCH: 98%</span>
              </div>
            </div>
            {/* Vertical rust line connector */}
            <div className="w-0.5 h-16 bg-rust mx-auto mt-2" />
            {/* Rust dot at bottom */}
            <div className="w-3 h-3 bg-rust rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
