import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const clip = useTransform(
    scrollYProgress,
    [0.05, 0.4],
    ["inset(15% 15% 15% 15%)", "inset(0% 0% 0% 0%)"],
  );

  return (
    <section
      id="story"
      ref={ref}
      className="relative grid grid-cols-1 gap-16 overflow-hidden px-6 py-28 sm:px-14 sm:py-40 md:grid-cols-12 md:gap-6"
    >
      <div className="md:col-span-5 md:col-start-1 md:row-start-1 md:self-center">
        <span className="mb-6 block h-px w-16 bg-gold/60" />
        <p className="mb-6 font-sans text-[11px] uppercase tracking-widest2 text-gold">
          The Story
        </p>
        <h2 className="font-display text-display-2 leading-[1.02] text-ivory">
          <RevealText text="Twenty years of" />
          <br />
          <RevealText text="obsession, refined" delay={0.1} />
          <br />
          <RevealText text="to its essence." delay={0.2} className="italic text-gold" />
        </h2>
        <p className="mt-8 max-w-md font-serif text-xl font-light leading-relaxed text-ivory/70">
          Aurelian began as a single wood-fired stove and a conviction: that
          restraint is the highest form of luxury. Today, our kitchen still
          answers to the same principle &mdash; every element earns its place
          on the plate, or it is removed.
        </p>
      </div>

      <motion.div
        style={{ clipPath: clip }}
        className="relative aspect-[4/5] overflow-hidden md:col-span-6 md:col-start-7 md:row-start-1"
      >
        <motion.img
          style={{ y: imageY }}
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
          alt="Chef plating a delicate composed dish in the Aurelian kitchen"
          loading="lazy"
          className="h-[120%] w-full object-cover"
        />
      </motion.div>

      <div className="flex flex-wrap gap-x-16 gap-y-8 border-t border-white/10 pt-10 md:col-span-10 md:col-start-1 md:row-start-2">
        {[
          ["01", "Provenance", "Ingredients sourced within 90 days of harvest."],
          ["02", "Precision", "Every course composed within a 90 second window."],
          ["03", "Silence", "A dining room engineered for unhurried presence."],
        ].map(([n, t, d]) => (
          <div key={n} className="max-w-[16rem]">
            <span className="font-sans text-xs text-gold/70">{n}</span>
            <h3 className="mt-2 font-display text-2xl text-ivory">{t}</h3>
            <p className="mt-2 font-sans text-sm font-light text-ivory/50">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
