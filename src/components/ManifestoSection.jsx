import { manifestoItems } from "../data/landingContent";

export function ManifestoSection() {
  return (
    <section className="py-32 px-6 border-t border-ink/10 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl mb-12 relative inline-block font-bold">
          The Anti-Grid <br />{" "}
          <span className="italic text-rust">Manifesto.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 font-mono text-sm leading-loose">
          {manifestoItems.map((item) => (
            <div key={item.number}>
              <p className="mb-6">
                {item.number}. {item.title}
              </p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
