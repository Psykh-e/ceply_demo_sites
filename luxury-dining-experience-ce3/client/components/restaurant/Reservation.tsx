import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.2, 0.55, 0.55, 0.2]);

  return (
    <section
      id="reserve"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-obsidian px-6 py-32 text-center sm:px-14"
    >
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=80"
          alt="Dimly lit Aurelian dining room set for service"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </motion.div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <p className="mb-8 font-sans text-[11px] uppercase tracking-widest2 text-gold">
          The Reservation
        </p>
        <h2 className="font-display text-display-1 leading-[0.95] text-ivory">
          <RevealText text="Your table" />
          <br />
          <RevealText text="awaits." delay={0.15} className="italic text-gold" />
        </h2>
        <p className="mt-8 max-w-md font-serif text-xl font-light italic text-ivory/60">
          Seatings begin at 7:00pm, Tuesday through Saturday. We recommend
          reserving four weeks in advance.
        </p>

        <Magnetic className="mt-14" strength={0.4}>
          <a
            href="tel:+33142000000"
            className="group relative flex items-center gap-4 overflow-hidden border border-gold px-12 py-6 font-sans text-xs uppercase tracking-widest2 text-ivory transition-colors duration-500 hover:text-obsidian"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-cinematic group-hover:translate-x-0" />
            <span className="relative">Request a Reservation</span>
            <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </Magnetic>

        <p className="mt-10 font-sans text-xs uppercase tracking-widest2 text-ivory/40">
          +33 1 42 00 00 00 &nbsp;&middot;&nbsp; reservations@aurelian.restaurant
        </p>
      </div>
    </section>
  );
}
