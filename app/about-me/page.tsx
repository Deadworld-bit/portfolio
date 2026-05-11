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
  FaCode,
  FaServer,
  FaPalette,
} from "react-icons/fa";
import { motion, easeOut, type Variants } from "framer-motion";
import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

type InterestCardProps = {
  icon: ReactNode;
  label: string;
};

type SkillGroup = {
  title: string;
  icon: ReactNode;
  items: string[];
};

// Shared entrance animation: sections slide up from 32px below on first viewport entry.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Game Development",
    icon: <FaGamepad />,
    items: ["Unity", "C#", "Game Mechanics", "Prototyping"],
  },
  {
    title: "Web Frontend",
    icon: <FaCode />,
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
    ],
  },
  {
    title: "Web Backend",
    icon: <FaServer />,
    items: [
      "ASP.NET Core",
      "Entity Framework",
      "SQL Server",
      "Web API",
      "SignalR",
    ],
  },
  {
    title: "Tooling & Design",
    icon: <FaPalette />,
    items: ["Git", "Figma", "Photoshop", "Visual Studio", "VS Code"],
  },
];

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <motion.div
    className="flex items-center gap-4 bg-deep-slate/60 backdrop-blur-md p-5 rounded-2xl border border-chill-teal/15 hover:border-chill-teal/50 transition-colors shadow-lg shadow-night-navy/40"
    variants={cardVariants}
    whileHover={{ y: -4 }}
  >
    <div className="text-accent text-3xl flex-shrink-0">{icon}</div>
    <div>
      <div className="font-display font-bold text-lg text-soft-cyan leading-tight">
        {value}
      </div>
      <div className="text-lavender-mist/80 text-sm">{label}</div>
    </div>
  </motion.div>
);

const InterestCard = ({ icon, label }: InterestCardProps) => (
  <motion.div
    className="flex flex-col items-center justify-center gap-2 bg-deep-slate/60 backdrop-blur-md p-5 rounded-2xl border border-chill-teal/15 hover:border-chill-teal/50 transition-colors aspect-square shadow-lg shadow-night-navy/40"
    variants={cardVariants}
    whileHover={{ y: -4 }}
  >
    <div className="text-chill-teal text-3xl md:text-4xl mb-1">{icon}</div>
    <span className="font-semibold text-soft-cyan text-sm md:text-base">
      {label}
    </span>
  </motion.div>
);

const SkillGroupCard = ({ title, icon, items }: SkillGroup) => (
  <motion.div
    className="bg-deep-slate/60 backdrop-blur-md rounded-2xl border border-chill-teal/15 p-6 shadow-lg shadow-night-navy/40 hover:border-chill-teal/50 transition-colors"
    variants={cardVariants}
    whileHover={{ y: -4 }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-chill-teal/15 text-chill-teal flex items-center justify-center text-lg">
        {icon}
      </div>
      <h4 className="font-display text-soft-cyan font-bold text-lg">{title}</h4>
    </div>
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="px-3 py-1.5 rounded-full bg-night-navy/60 text-lavender-mist text-xs font-medium border border-chill-teal/10"
        >
          {s}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function AboutMe() {
  return (
    <section className="relative flex flex-col items-center text-lavender-mist px-4 sm:px-6 py-24 lg:py-32 overflow-hidden">
      <Image
        src="/background_08.png"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="absolute inset-0 z-0 object-cover"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-night-navy/85 via-night-navy/70 to-night-navy"
      />

      <div className="relative z-10 flex flex-col items-center max-w-7xl w-full">
        {/* Section header */}
        <motion.div
          className="max-w-3xl w-full text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-5 text-chill-teal/80">
            <span className="h-px w-10 bg-chill-teal/40" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Get to know me
            </span>
            <span className="h-px w-10 bg-chill-teal/40" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white leading-[1.05]">
            About <span className="text-gradient-cool">Me</span>
          </h1>
          <p className="text-base md:text-lg text-lavender-mist/85 leading-relaxed">
            A passionate Game &amp; Web Developer crafting modern, immersive
            digital experiences.
          </p>
        </motion.div>

        {/* Main bio card */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-10 lg:gap-12 w-full max-w-5xl mb-24 bg-deep-slate/60 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl shadow-night-navy/60 border border-chill-teal/15"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="relative w-full md:w-1/3 max-w-sm shrink-0 self-center md:self-start">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-chill-teal/40 to-accent/30 blur-xl z-0 opacity-70" />
            <Image
              src="/Profile.jpg"
              alt="Phan Thanh Duc"
              width={320}
              height={400}
              className="relative rounded-2xl w-full h-auto shadow-2xl border border-chill-teal/30"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-soft-cyan mb-1">
              Phan Thanh Duc
            </h2>
            <div className="text-chill-teal text-base md:text-lg font-medium mb-6 tracking-wide">
              Game &amp; Web Developer
            </div>
            <p className="mb-4 text-lavender-mist leading-relaxed">
              Hello! I&apos;m a Web Developer who began my career crafting
              dynamic, user-focused websites and over the past year I&apos;ve
              transitioned into Game Development. My journey started with a
              passion for building engaging web experiences, which naturally led
              me to explore the exciting world of games. Since then, I&apos;ve
              partnered with clients to bring their visions to life —
              transforming ideas into both immersive web applications and
              captivating games.
            </p>
            <p className="mb-8 text-lavender-mist/85 leading-relaxed">
              Currently based in Vietnam, I thrive on bringing ideas to life,
              from initial concept to final deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a
                href="/PhanThanhDuc_CV.pdf"
                download="PhanThanhDuc_CV.pdf"
                aria-label="Download CV as PDF"
                className="px-7 py-3 rounded-full bg-accent text-night-navy font-bold shadow-lg shadow-accent/30 hover:bg-accent-soft transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Download CV
              </motion.a>
              <motion.a
                href="/contact"
                className="px-7 py-3 rounded-full border-2 border-chill-teal/60 text-chill-teal font-bold hover:bg-chill-teal hover:text-night-navy transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Skills / Tech Stack */}
        <motion.div
          className="w-full max-w-5xl mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4 text-chill-teal/80">
              <span className="h-px w-10 bg-chill-teal/40" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                What I work with
              </span>
              <span className="h-px w-10 bg-chill-teal/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Skills &amp; Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILL_GROUPS.map((group) => (
              <SkillGroupCard key={group.title} {...group} />
            ))}
          </div>
        </motion.div>

        {/* Stats & Interests */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-white">
              My Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-white">
              My Interests
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
