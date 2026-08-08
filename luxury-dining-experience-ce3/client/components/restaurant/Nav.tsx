import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export const SECTIONS = [
  { id: "story", label: "Story" },
  { id: "menu", label: "Menu" },
  { id: "chef", label: "Chef" },
  { id: "tasting", label: "Tasting" },
  { id: "reserve", label: "Reserve" },
  { id: "location", label: "Location" },
];

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-[padding,background-color,backdrop-filter] duration-500 ease-cinematic"
      style={{
        paddingInline: scrolled ? "1.5rem" : "clamp(1.5rem, 5vw, 3.5rem)",
        paddingBlock: scrolled ? "0.85rem" : "1.75rem",
        backgroundColor: scrolled ? "hsl(0 0% 5% / 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid hsl(38 15% 22% / 0.6)"
          : "1px solid transparent",
      }}
    >
      <button
        onClick={() => scrollToSection("hero")}
        className="font-display text-xl tracking-[0.15em] text-ivory transition-all duration-500"
        style={{ fontSize: scrolled ? "1.15rem" : "1.4rem" }}
        aria-label="Aurelian — back to top"
      >
        AURELIAN
      </button>

      <nav className="hidden items-center gap-9 md:flex" aria-label="Section navigation">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="font-sans text-[11px] uppercase tracking-widest2 text-ivory/70 transition-colors duration-300 hover:text-gold"
          >
            {s.label}
          </button>
        ))}
      </nav>

      <Magnetic>
        <button
          onClick={onMenuOpen}
          className="group flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest2 text-ivory"
          aria-haspopup="dialog"
          aria-label="Open menu"
        >
          <span className="hidden sm:inline">Menu</span>
          <span className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-gold/40 transition-colors group-hover:border-gold">
            <span className="h-px w-4 bg-gold transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="h-px w-4 bg-gold" />
          </span>
        </button>
      </Magnetic>
    </motion.header>
  );
}
