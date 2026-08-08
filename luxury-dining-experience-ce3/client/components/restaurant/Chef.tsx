import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";

export default function Chef() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="chef"
      ref={ref}
      className="relative grid grid-cols-1 items-center gap-16 px-6 py-28 sm:px-14 sm:py-40 md:grid-cols-12"
    >
      <motion.div
        style={{ scale }}
        className="relative order-2 aspect-[3/4] overflow-hidden md:order-1 md:col-span-5"
      >
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80"
          alt="Head chef of Aurelian in the kitchen, portrait"
          loading="lazy"
          className="h-[120%] w-full object-cover"
        />
      </motion.div>

      <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
        <span className="mb-6 block h-px w-16 bg-gold/60" />
        <p className="mb-6 font-sans text-[11px] uppercase tracking-widest2 text-gold">
          The Chef
        </p>
        <h2 className="font-display text-display-2 leading-[1.02] text-ivory">
          <RevealText text="Étienne Marchal" />
        </h2>
        <p className="mt-8 max-w-lg font-serif text-2xl font-light italic leading-relaxed text-ivory/80">
          &ldquo;I don't cook to impress. I cook to remove everything that
          isn't the ingredient.&rdquo;
        </p>
        <p className="mt-8 max-w-lg font-sans text-sm font-light leading-relaxed text-ivory/50">
          Formerly of Lasserre and Le Meurice, Chef Marchal has spent two
          decades refining a single idea &mdash; that technique should be
          invisible, and flavor should feel inevitable. Aurelian is the fullest
          expression of that pursuit.
        </p>
        <div className="mt-10 flex gap-10 border-t border-white/10 pt-8">
          <div>
            <span className="font-display text-3xl text-gold">2</span>
            <p className="font-sans text-xs uppercase tracking-widest2 text-ivory/50">
              Michelin Stars
            </p>
          </div>
          <div>
            <span className="font-display text-3xl text-gold">20</span>
            <p className="font-sans text-xs uppercase tracking-widest2 text-ivory/50">
              Years of Craft
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
