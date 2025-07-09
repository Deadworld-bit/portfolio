"use client";

import React from "react";
import { Manrope } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/background_04.jpg";

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-transparent z-0 pointer-events-none" />
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

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h2
          className={`${manrope.className} text-white text-xl md:text-2xl font-semibold mb-3 tracking-widest drop-shadow-md`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.18em",
          }}
        >
          Hello, I'm
        </motion.h2>
        <motion.h1
          className={`${manrope.className} text-white text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]`}
          style={{
            y: headingY,
            opacity: headingOpacity,
            letterSpacing: "0.04em",
          }}
        >
          {HERO_TITLE}
        </motion.h1>
        <motion.p
          className={`${manrope.className} text-white text-lg md:text-xl font-medium max-w-2xl border-l-4 border-neon-green pl-6 py-4 bg-black/50 rounded-xl shadow-xl backdrop-blur-sm`}
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
