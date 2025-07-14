"use client";

import React from "react";
import { Manrope } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/background_05.png";

const manrope = Manrope({ subsets: ["latin"], weight: ["800", "600"] });

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 600], [0, 300]),
    headingY: useTransform(scrollY, [0, 400], [0, -100]),
    headingOpacity: useTransform(scrollY, [0, 300], [1, 0]),
    subOpacity: useTransform(scrollY, [100, 500], [1, 0]),
  };
}

function HeroOverlays() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-night-navy/80 via-transparent to-night-navy/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-deep-slate/60 to-transparent z-0 pointer-events-none" />
    </>
  );
}

const HERO_TITLE = "Phan Thanh Duc";
const HERO_SUBTITLE = "I'm a Developer";

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

      <div className="relative z-10 flex flex-col items-center text-center px-8 lg:px-20">
        <motion.h2
          className={`${manrope.className} text-soft-cyan text-2xl md:text-3xl font-semibold mb-4 tracking-widest drop-shadow-md`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.2em",
          }}
        >
          Hello, I'm
        </motion.h2>

        <motion.h1
          className={`${manrope.className} text-night-navy text-7xl md:text-8xl font-extrabold mb-8 leading-tight drop-shadow-[0_0_15px_rgba(63,189,176,0.5)]`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.05em",
          }}
        >
          {HERO_TITLE}
        </motion.h1>

        <motion.p
          className={`${manrope.className} text-night-navy text-xl md:text-2xl font-medium inline-block bg-night-navy/70 border-l-4 border-chill-teal px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md`}
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