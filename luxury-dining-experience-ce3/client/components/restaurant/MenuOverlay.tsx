import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS, scrollToSection } from "./Nav";

export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-obsidian px-6 py-8 sm:px-14 sm:py-12"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl tracking-[0.15em] text-ivory">
              AURELIAN
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <span className="absolute h-px w-5 rotate-45 bg-gold" />
              <span className="absolute h-px w-5 -rotate-45 bg-gold" />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Sections">
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => {
                  onClose();
                  setTimeout(() => scrollToSection(s.id), 350);
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-baseline gap-6 border-b border-white/10 py-4 text-left"
              >
                <span className="font-sans text-xs text-gold/70">0{i + 1}</span>
                <span className="font-display text-4xl text-ivory transition-colors duration-300 group-hover:text-gold sm:text-6xl">
                  {s.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-widest2 text-ivory/50 sm:flex-row sm:justify-between">
            <span>18 Rue des Étoiles, Paris</span>
            <span>+33 1 42 00 00 00</span>
            <span>reservations@aurelian.restaurant</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
