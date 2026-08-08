import { SECTIONS, scrollToSection } from "./Nav";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14 sm:px-14">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="font-display text-2xl tracking-[0.15em] text-ivory">
            AURELIAN
          </span>
          <p className="mt-3 max-w-xs font-sans text-xs font-light text-ivory/40">
            An independent fine dining house in Saint-Germain, Paris.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="font-sans text-xs uppercase tracking-widest2 text-ivory/50 transition-colors hover:text-gold"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex gap-6 font-sans text-xs uppercase tracking-widest2 text-ivory/50">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            Instagram
          </a>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            Maps
          </a>
        </div>
      </div>

      <p className="mt-14 font-sans text-[11px] text-ivory/30">
        &copy; {new Date().getFullYear()} Aurelian Restaurant. All rights reserved.
      </p>
    </footer>
  );
}
