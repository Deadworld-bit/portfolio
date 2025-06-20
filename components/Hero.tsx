"use client";

import React from "react";
import { Manrope } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/background_02.jpg";

// Use Manrope for a clean, modern, minimalist look
const manrope = Manrope({ subsets: ["latin"], weight: ["800", "600"] });

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 600], [0, 300]),
    headingY: useTransform(scrollY, [0, 400], [0, -150]),
    headingOpacity: useTransform(scrollY, [0, 300], [1, 0]),
    subOpacity: useTransform(scrollY, [100, 500], [1, 0]),
  };
}

function HeroOverlays() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-charcoal) 0%, transparent 60%, var(--color-charcoal) 100%)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-white) 0%, transparent 80%)",
          opacity: 0.06,
        }}
      />
    </>
  );
}

const HERO_TITLE = "Phan Thanh Duc";
const HERO_SUBTITLE = "I'm a Game Developer";

const Hero: React.FC = () => {
  const { bgY, headingY, headingOpacity, subOpacity } =
    useHeroScrollTransforms();

  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: bgY,
      }}
    >
      <HeroOverlays />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h2
          className={`${manrope.className} text-white text-xl md:text-3xl font-semibold mb-2 tracking-widest`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.18em",
          }}
        >
          Hello, I'm
        </motion.h2>
        <motion.h1
          className={`${manrope.className} text-electric-blue text-5xl md:text-7xl font-extrabold mb-6 leading-tight`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.04em",
          }}
        >
          {HERO_TITLE}
        </motion.h1>
        <motion.p
          className={`${manrope.className} text-white text-lg md:text-2xl font-medium max-w-2xl border-l-4 border-neon-green pl-6 py-4 bg-charcoal/60 rounded-xl shadow-lg`}
          style={{
            opacity: subOpacity,
          }}
        >
          {HERO_SUBTITLE}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Hero;