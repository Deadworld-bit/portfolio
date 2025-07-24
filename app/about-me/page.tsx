"use client";

import Image from "next/image";
import {
  FaBriefcase,
  FaUserTie,
  FaTools,
  FaHeadphones,
  FaUtensils,
  FaFilm,
  FaGamepad,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { easeOut } from "framer-motion";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

type InterestCardProps = {
  icon: ReactNode;
  label: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <motion.div
    className="flex items-center gap-4 bg-black/70 backdrop-blur-sm p-4 rounded-lg border border-soft-cyan hover:border-chill-teal transition-colors duration-300 transform hover:scale-105 shadow-lg"
    variants={cardVariants}
    whileHover={{ y: -5 }}
  >
    <div className="text-chill-teal text-3xl">{icon}</div>
    <div>
      <div className="font-bold text-lg text-soft-cyan">{value}</div>
      <div className="text-lavender-mist text-sm">{label}</div>
    </div>
  </motion.div>
);

const InterestCard = ({ icon, label }: InterestCardProps) => (
  <motion.div
    className="flex flex-col items-center justify-center gap-2 bg-black/70 backdrop-blur-sm p-5 rounded-lg border border-soft-cyan hover:border-chill-teal transition-colors duration-300 aspect-square transform hover:scale-105 shadow-lg"
    variants={cardVariants}
    whileHover={{ y: -5 }}
  >
    <div className="text-chill-teal text-4xl mb-2">{icon}</div>
    <span className="font-semibold text-soft-cyan">{label}</span>
  </motion.div>
);

export default function AboutMe() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-lavender-mist px-4 py-20 overflow-hidden bg-night-navy">
      <Image
        src="/background_08.png"
        alt="Cyberpunk City Background"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="absolute inset-0 z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 flex flex-col items-center max-w-7xl w-full">
        <motion.div
          className="max-w-3xl w-full text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            About Me
          </h1>
          <p className="text-lg md:text-xl font-light text-white drop-shadow-md">
            A passionate Game & Web Developer creating modern and impressive
            digital experiences.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full max-w-5xl mb-20 bg-black/70 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-soft-cyan/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="relative w-full md:w-1/3 max-w-sm shrink-0">
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-soft-cyan/60 to-chill-teal/60 blur-lg z-0 opacity-75 animate-pulse-light" />
            <Image
              src="/Profile.jpg"
              alt="Phan Thanh Duc"
              width={300}
              height={360}
              className="relative rounded-xl w-full h-auto shadow-2xl border border-soft-cyan/50"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-soft-cyan mb-2 drop-shadow-lg">
              Phan Thanh Duc
            </h2>
            <div className="text-chill-teal text-xl font-medium mb-6">
              Game & Web Developer
            </div>
            <p className="mb-4 text-lavender-mist leading-relaxed">
              Hello! I&apos;m a Web Developer who began my career crafting dynamic, user-focused websites and over the past year I&apos;ve transitioned into Game Development. My journey started with a passion for building engaging web experiences, which naturally led me to explore the exciting world of games. Since then, I&apos;ve partnered with clients to bring their visions to life transforming ideas into both immersive web applications and captivating games.
            </p>
            <p className="mb-8 text-lavender-mist leading-relaxed">
              Currently based in Vietnam, I thrive on bringing ideas to life,
              from initial concept to final deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                href="/PhanThanhDuc_CV.pdf" 
                download="PhanThanhDuc_CV.pdf"
                className="px-8 py-3 rounded-lg bg-chill-teal text-night-navy font-bold shadow-lg hover:bg-soft-cyan transition-all duration-300 transform hover:scale-105"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0, 200, 200, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
              <motion.a
                href="/contact"
                className="px-8 py-3 rounded-lg border-2 border-chill-teal text-chill-teal font-bold hover:bg-chill-teal hover:text-night-navy transition-all duration-300 transform hover:scale-105"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0, 200, 200, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Stats & Interests Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* My Journey Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
              My Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <StatCard
                icon={<FaBriefcase />}
                value="1+ Years"
                label="Experience"
              />
              <StatCard
                icon={<FaUserTie />}
                value="Freelance"
                label="Available"
              />
              <StatCard icon={<FaTools />} value="24/7" label="Support" />
            </div>
          </motion.div>
          {/* My Interests */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-md">
              My Interests
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <InterestCard icon={<FaHeadphones />} label="Music" />
              <InterestCard icon={<FaFilm />} label="Movies" />
              <InterestCard icon={<FaGamepad />} label="Games" />
              <InterestCard icon={<FaUtensils />} label="Cooking" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
