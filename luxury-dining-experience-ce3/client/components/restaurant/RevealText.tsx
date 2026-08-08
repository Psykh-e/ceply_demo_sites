import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RevealText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-block overflow-hidden", className)}>
      <span ref={ref} className="inline-block">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.15em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
