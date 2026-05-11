"use client";

import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Tuned to feel snappy without overshooting: higher stiffness tracks fast
  // scrolls; damping 24 kills the bounce that lower values introduce.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Reduced-motion users get the raw progress value (no spring oscillation).
  const scaleX = prefersReducedMotion ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-gradient-to-r from-chill-teal via-soft-cyan to-accent"
      style={{ scaleX }}
    />
  );
}
