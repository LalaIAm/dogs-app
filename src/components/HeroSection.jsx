import { Polaroid } from "./ui/Polaroid";
import { PostItNote } from "./ui/PostItNote";
import { NoteCard } from "./ui/NoteCard";

export function HeroSection() {
  return (
    <header className="relative min-h-[110vh] pt-32 px-6 overflow-hidden flex flex-col items-center">
      {/* Floating background text */}
      <div className="absolute top-1/4 left-10 font-hand text-6xl text-ink/10 -rotate-12 pointer-events-none select-none">
        Are we there yet?
      </div>
      <div className="absolute bottom-1/4 right-10 font-hand text-6xl text-ink/10 rotate-12 pointer-events-none select-none">
        No Signal. Good.
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center mt-12 md:mt-24">
        {/* Coordinates label */}
        <p className="font-mono text-xs md:text-sm text-rust uppercase tracking-[0.3em] mb-6">
          /// coordinates_unknown
        </p>

        {/* GET LOST headline */}
        <h1 className="font-serif font-black text-[15vw] md:text-[8rem] leading-[0.85] text-ink mix-blend-multiply relative inline-block">
          GET{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #232323" }}
          >
            LOST
          </span>
          {/* SVG scribble arrow + annotation */}
          <div className="absolute -right-8 md:-right-32 top-1/2 w-24 md:w-48 -translate-y-1/2">
            <svg
              viewBox="0 0 100 50"
              className="w-full text-rust rotate-12"
              aria-hidden="true"
            >
              <path
                d="M10,25 Q30,5 50,25 T90,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M85,20 L95,25 L88,33"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span className="font-hand text-xl md:text-3xl text-ink absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              (but like, on purpose)
            </span>
          </div>
        </h1>
      </div>

      {/* Parallax collage */}
      <div className="relative w-full max-w-7xl mx-auto h-[700px] mt-12 md:mt-0 perspective-1000">
        {/* Center polaroid (speed 0.02) */}
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-64 md:w-96 z-20">
          <Polaroid
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            caption="Highway One, 2023"
            rotation="rotate-2"
            tapePosition="center"
            className="aspect-[3/4]"
            speed={0.02}
          />
        </div>

        {/* Left polaroid (speed 0.06) */}
        <div className="absolute left-5 md:left-20 top-32 md:top-40 w-48 md:w-64 z-10">
          <Polaroid
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            caption=""
            rotation="-rotate-6"
            tapePosition="left"
            className="aspect-square"
            speed={0.06}
          />
          <div className="absolute -bottom-10 -left-10 bg-rust text-paper font-mono text-xs px-3 py-1 rotate-12">
            CO-PILOT APPROVED
          </div>
        </div>

        {/* Dog polaroid (speed 0.09) */}
        <div className="absolute right-10 md:right-1/3 bottom-0 w-40 z-30">
          <Polaroid
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            caption="Buster likes it."
            rotation="rotate-12"
            tapePosition="right"
            speed={0.09}
          />
        </div>

        {/* Post-it note (speed 0.04) */}
        <div className="absolute right-5 md:right-40 top-20 w-48 z-0">
          <PostItNote rotation="-rotate-3" speed={0.04}>
            <p className="text-blue-900 text-2xl leading-tight">
              "Don't forget to pack the extra kibble and map."
            </p>
          </PostItNote>
        </div>

        {/* Note card (speed 0.08) */}
        <div className="absolute right-0 md:right-20 top-80 md:top-60 w-56 z-20">
          <NoteCard
            rotation="rotate-3"
            speed={0.08}
            cta={{ label: "PLAN TRIP", href: "/page-2" }}
          >
            "Stop looking at the ETA and start looking out the window."
          </NoteCard>
        </div>
      </div>
    </header>
  );
}
