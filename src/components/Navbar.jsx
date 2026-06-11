export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-paper pointer-events-none">
      <a href="#" className="pointer-events-auto group" rel="nofollow">
        <span className="font-serif font-black text-3xl tracking-tighter">
          RoadDoggs
        </span>
        <span className="font-hand text-rust text-xl block -mt-3 ml-12 rotate-[-5deg] group-hover:rotate-0 transition-transform">
          beta vol.3
        </span>
      </a>
      <a
        className="pointer-events-auto bg-paper text-ink rounded-sm px-4 py-2 font-mono text-xs uppercase hover:bg-rust hover:text-white transition-colors border border-ink"
        href="/log-in"
      >
        [ LOG IN ]
      </a>
    </nav>
  );
}
