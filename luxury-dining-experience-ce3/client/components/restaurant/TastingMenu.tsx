import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealText from "./RevealText";

const COURSES = [
  ["I", "Amuse-Bouche", "Oyster, granny smith, dill oil"],
  ["II", "Langoustine", "Citrus ash, sea buckthorn"],
  ["III", "Foie Gras", "Quince, toasted brioche, sauternes"],
  ["IV", "Turbot", "Beurre blanc, sea herbs, caviar"],
  ["V", "Aged Duck", "Smoked plum, juniper jus"],
  ["VI", "Black Truffle Risotto", "Carnaroli, aged parmesan"],
  ["VII", "Cheese Course", "Selection from our affineur"],
  ["VIII", "Pre-Dessert", "Yuzu, meringue, green tea"],
  ["IX", "Valrhona", "Olive oil, Maldon salt"],
];

export default function TastingMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section id="tasting" className="relative px-6 py-28 sm:px-14 sm:py-40">
      <div className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-sans text-[11px] uppercase tracking-widest2 text-gold">
            The Tasting Menu
          </p>
          <h2 className="font-display text-display-2 text-ivory">
            <RevealText text="Nine Courses," />
            <br />
            <RevealText text="One Story." delay={0.1} className="italic text-gold" />
          </h2>
        </div>
        <p className="max-w-xs font-sans text-sm font-light text-ivory/50">
          &euro;285 per guest &mdash; wine pairing available for an additional
          &euro;145. Vegetarian counterpart offered on request.
        </p>
      </div>

      <div ref={ref} className="flex flex-col">
        {COURSES.map(([n, name, desc], i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-white/10 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-8"
          >
            <span className="font-serif text-lg italic text-gold/70">{n}</span>
            <div>
              <h3 className="font-display text-2xl text-ivory transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                {name}
              </h3>
              <p className="mt-1 font-sans text-xs font-light text-ivory/40 sm:text-sm">
                {desc}
              </p>
            </div>
            <span className="col-span-2 mt-2 font-sans text-xs uppercase tracking-widest2 text-ivory/30 sm:col-span-1 sm:mt-0">
              Course
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
