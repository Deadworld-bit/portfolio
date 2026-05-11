"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowRight,
  FiMail,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
import backgroundImage from "@/public/background_11.png";

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 600], [0, 200]),
    headingY: useTransform(scrollY, [0, 400], [0, -60]),
    headingOpacity: useTransform(scrollY, [0, 350], [1, 0]),
    subOpacity: useTransform(scrollY, [100, 500], [1, 0]),
  };
}

const HERO_NAME = "Phan Thanh Duc";
const HERO_WORDS = HERO_NAME.split(" ");
const HERO_ROLE = "Game & Web Developer";
const HERO_TAGLINE =
  "I craft immersive Unity games and polished modern web experiences from Ho Chi Minh City, Vietnam.";

export default function Hero() {
  const { bgY, headingY, headingOpacity, subOpacity } =
    useHeroScrollTransforms();
  const prefersReducedMotion = useReducedMotion();

  // Cursor-follow spotlight values
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}% ${mouseY}%, rgba(63,189,176,0.18), transparent 60%)`;

  const sectionRef = useRef<HTMLElement>(null);
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    if (!Number.isFinite(e.clientX) || !Number.isFinite(e.clientY)) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-night-navy"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: bgY,
      }}
    >
      {/* Photo background readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-navy/80 via-night-navy/40 to-night-navy pointer-events-none" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlight }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 lg:px-16 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{ opacity: headingOpacity }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-chill-teal/40 bg-night-navy/60 backdrop-blur-md text-chill-teal text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-chill-teal opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-chill-teal" />
          </span>
          Available for new projects
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{ y: headingY, opacity: headingOpacity }}
          className="flex items-center justify-center gap-3 mb-5 text-lavender-mist/70"
        >
          <span className="h-px w-10 bg-lavender-mist/30" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
            Hello, I&apos;m
          </span>
          <span className="h-px w-10 bg-lavender-mist/30" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{ y: headingY, opacity: headingOpacity }}
          className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold mb-6 leading-[1.02] tracking-tight flex flex-wrap justify-center gap-x-[0.25em]"
        >
          {HERO_WORDS.map((word, i) =>
            i === HERO_WORDS.length - 1 ? (
              <span key={i} className="text-gradient-cool">
                {word}
              </span>
            ) : (
              <span key={i}>{word}</span>
            )
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ opacity: subOpacity }}
          className="text-soft-cyan text-lg sm:text-xl md:text-2xl font-medium mb-5"
        >
          {HERO_ROLE}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          style={{ opacity: subOpacity }}
          className="text-lavender-mist/85 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
        >
          {HERO_TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ opacity: subOpacity }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <Link
            href="/project"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-night-navy font-bold shadow-lg shadow-accent/25 hover:bg-accent-soft transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night-navy"
          >
            View Projects
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-chill-teal/60 text-chill-teal font-bold bg-night-navy/30 backdrop-blur-sm hover:bg-chill-teal hover:text-night-navy transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chill-teal focus-visible:ring-offset-2 focus-visible:ring-offset-night-navy"
          >
            <FiMail />
            Get In Touch
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ opacity: subOpacity }}
          className="mt-12 flex items-center gap-2 text-lavender-mist/55 text-xs sm:text-sm"
        >
          <FiMapPin size={14} />
          Ho Chi Minh City, Vietnam
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-lavender-mist/70"
        style={{ opacity: subOpacity }}
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
          Scroll
        </span>
        <FiChevronDown size={20} />
      </motion.div>
    </motion.section>
  );
}
