import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "image">(
    "default",
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 });
  const raf = useRef<number>();

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("no-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='image']")) setVariant("image");
      else if (target.closest("a, button, [data-cursor='link']"))
        setVariant("link");
      else setVariant("default");
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("no-cursor");
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex h-8 w-8 items-center justify-center rounded-full border border-gold/70 mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{
        scale: variant === "image" ? 2.4 : variant === "link" ? 1.6 : 1,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="h-1 w-1 rounded-full bg-gold" />
      {variant === "image" && (
        <span className="absolute font-sans text-[9px] uppercase tracking-widest2 text-ivory">
          View
        </span>
      )}
    </motion.div>
  );
}
