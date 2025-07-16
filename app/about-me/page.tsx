"use client";

import Image from "next/image";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaUserTie,
  FaTools,
  FaHeadphones,
  FaSuitcase,
  FaFilm,
  FaGamepad,
} from "react-icons/fa";

export default function AboutMe() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-night-navy text-lavender-mist px-4 py-20">
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          About Me
        </h1>
        <p className="text-lg md:text-xl font-light">
          A passionate Digital Designer & Developer creating modern and
          responsive web experiences.
        </p>
      </div>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full max-w-5xl mb-20">
        {/* Image with subtle accent */}
        <div className="relative w-full md:w-1/3 max-w-sm shrink-0">
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-soft-cyan/50 to-chill-teal/50 blur-lg z-0" />
          <Image
            src="/profile.jpg"
            alt="Phan Thanh Duc"
            width={300}
            height={360}
            className="relative rounded-xl w-full h-auto shadow-2xl"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-soft-cyan mb-2">
            Phan Thanh Duc
          </h2>
          <div className="text-chill-teal text-xl font-medium mb-6">
            UI/UX Designer & Web Developer
          </div>
          <p className="mb-4">
            Hello! I'm a self-taught Digital Designer and Developer with over
            five years of professional experience. My journey began with a
            passion for clean design and has led me to work with renowned
            digital agencies, delivering high-quality projects for a diverse
            range of clients.
          </p>
          <p className="mb-8">
            Currently based in the Vietnam, I specialize in crafting intuitive user
            interfaces and seamless user experiences. I thrive on bringing ideas
            to life, from initial concept to final deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#"
              className="px-8 py-3 rounded-lg bg-chill-teal text-night-navy font-bold shadow-lg hover:bg-soft-cyan transition-all duration-300"
            >
              Download CV
            </a>
            <a
              href="/contact"
              className="px-8 py-3 rounded-lg border-2 border-chill-teal text-chill-teal font-bold hover:bg-chill-teal hover:text-night-navy transition-all duration-300"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Stats & Interests Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* My Journey Stats */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-soft-cyan">My Journey</h3>
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
        </div>
        {/* My Interests */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-soft-cyan">
            My Interests
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <InterestCard icon={<FaHeadphones />} label="Music" />
            <InterestCard icon={<FaSuitcase />} label="Travel" />
            <InterestCard icon={<FaFilm />} label="Movies" />
            <InterestCard icon={<FaGamepad />} label="Games" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper components for cleaner code
import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="flex items-center gap-4 bg-deep-slate p-4 rounded-lg border border-lavender-mist/10 hover:border-chill-teal/50 transition-colors duration-300">
    <div className="text-chill-teal text-3xl">{icon}</div>
    <div>
      <div className="font-bold text-lg text-white">{value}</div>
      <div className="text-lavender-mist text-sm">{label}</div>
    </div>
  </div>
);

type InterestCardProps = {
  icon: ReactNode;
  label: string;
};

const InterestCard = ({ icon, label }: InterestCardProps) => (
  <div className="flex flex-col items-center justify-center gap-2 bg-deep-slate p-5 rounded-lg border border-lavender-mist/10 hover:border-chill-teal/50 transition-colors duration-300 aspect-square">
    <div className="text-chill-teal text-4xl mb-2">{icon}</div>
    <span className="font-semibold text-white">{label}</span>
  </div>
);
