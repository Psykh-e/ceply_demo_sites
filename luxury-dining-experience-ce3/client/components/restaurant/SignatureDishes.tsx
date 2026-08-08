import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";

const DISHES = [
  {
    name: "Langoustine, Citrus Ash",
    note: "Brittany langoustine, burnt yuzu, sea buckthorn, fennel oil",
    price: "48",
    img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Aged Duck, Smoked Plum",
    note: "28-day dry-aged duck breast, charred plum, juniper jus",
    price: "62",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Black Truffle Risotto",
    note: "Carnaroli, aged parmesan, fresh shaved Périgord truffle",
    price: "56",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Valrhona, Olive Oil",
    note: "70% dark chocolate, extra virgin olive oil, Maldon salt",
    price: "24",
    img: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function SignatureDishes() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="menu" ref={ref} className="relative h-[320vh] bg-obsidian-light">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mb-10 px-6 sm:px-14">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-widest2 text-gold">
            Signature Dishes
          </p>
          <h2 className="font-display text-display-2 text-ivory">
            <RevealText text="A composed" />{" "}
            <RevealText text="repertoire." delay={0.1} className="italic text-gold" />
          </h2>
        </div>

        <motion.div style={{ x }} className="flex items-stretch gap-8 px-6 sm:gap-14 sm:px-14">
          {DISHES.map((d, i) => (
            <div
              key={d.name}
              data-cursor="image"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className="group relative w-[78vw] shrink-0 sm:w-[38vw] lg:w-[26vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-obsidian">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full scale-105 object-cover grayscale-[0.15] transition-all duration-700 ease-cinematic group-hover:scale-110 group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ opacity: active === i ? 1 : undefined }}
                >
                  <p className="font-sans text-xs font-light leading-relaxed text-ivory/90">
                    {d.note}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
                <h3 className="font-display text-2xl text-ivory sm:text-3xl">
                  {d.name}
                </h3>
                <span className="shrink-0 font-sans text-sm text-gold">
                  &euro;{d.price}
                </span>
              </div>
            </div>
          ))}

          <div className="flex w-[60vw] shrink-0 items-center sm:w-[26vw]">
            <p className="font-serif text-2xl font-light italic leading-snug text-ivory/50">
              &mdash; four courses among nine, each a study in restraint.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
