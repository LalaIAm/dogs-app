import { blogPosts } from "../data/landingContent";
import { BlogCard } from "./ui/BlogCard";

export function FieldNotesSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <h2 className="font-serif text-6xl">Field Notes</h2>
          <span className="absolute top-0 right-1/4 font-hand text-3xl text-rust -rotate-6 hidden md:block">
            Stories from the road
          </span>
        </div>
        {/* Masonry Layout */}
        <div className="columns-1 md:columns-3 gap-8 space-y-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
