import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";
import { scrollToSection } from "./Nav";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.85]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-obsidian"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2400&q=80"
          alt="Signature plated dish at Aurelian, lit dramatically against a dark table"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/70"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative z-10 flex w-full flex-col gap-10 px-6 pb-16 sm:px-14 sm:pb-20">
        <motion.p
          style={{ opacity: textOpacity }}
          className="font-sans text-[11px] uppercase tracking-widest2 text-gold"
        >
          Est. Paris &mdash; A Tasting Journey
        </motion.p>

        <motion.h1
          style={{ y: textY, opacity: textOpacity }}
          className="font-display text-display-1 leading-[0.95] text-ivory"
        >
          <RevealText text="Dining as a" delay={0.2} />
          <br />
          <RevealText
            text="Living Artform."
            delay={0.5}
            className="italic text-gold"
          />
        </motion.h1>

        <motion.div
          style={{ opacity: textOpacity }}
          className="flex flex-col justify-between gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-end"
        >
          <p className="max-w-md font-serif text-lg font-light italic text-ivory/70">
            Seasonal ingredients, precision technique, and quiet drama &mdash;
            served across nine courses.
          </p>
          <Magnetic>
            <button
              onClick={() => scrollToSection("reserve")}
              className="group flex items-center gap-4 border border-gold/50 px-8 py-4 font-sans text-[11px] uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-obsidian"
            >
              Reserve a Table
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-sans text-[10px] uppercase tracking-widest2 text-ivory/50 sm:block"
      >
        Scroll
      </motion.div>
    </section>
  );
}
