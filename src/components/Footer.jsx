import { InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper py-20 border-t-8 border-rust relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        {/* Left column */}
        <div>
          <h2 className="font-serif text-[15vw] md:text-[8rem] leading-[0.8]">
            GO.
          </h2>
          <p className="font-mono text-sm max-w-sm mt-8 opacity-60">
            The couch will be there when you get back. <br />
            (Probably covered in dog hair anyway).
          </p>
          <div className="mt-12 flex flex-col items-start gap-4">
            <button className="bg-paper text-ink px-8 py-4 font-mono font-bold uppercase hover:bg-rust hover:text-white transition-colors border-2 border-paper">
              Download Beta App
            </button>
            <span className="font-hand text-xl text-rust rotate-[-2deg]">
              Free for early adopters
            </span>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-end items-start md:items-end">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-sm uppercase mb-12">
            <a href="#" className="hover:text-rust hover:underline">
              Journal
            </a>
            <a href="#" className="hover:text-rust hover:underline">
              Mission
            </a>
            <a href="#" className="hover:text-rust hover:underline">
              Merch
            </a>
            <a href="#" className="hover:text-rust hover:underline">
              Support
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-paper/20 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              aria-label="Instagram"
            >
              <InstagramLogo size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-paper/20 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              aria-label="Twitter"
            >
              <TwitterLogo size={20} />
            </a>
          </div>
          <p className="font-mono text-[10px] opacity-30 mt-8">
            © {currentYear} ROADDOGGS INC. / BOULDER, CO / EST 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
