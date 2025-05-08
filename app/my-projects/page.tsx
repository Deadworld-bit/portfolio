"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Projects } from '@/constants';
import { Raleway } from 'next/font/google';

// Import Raleway font from Google Fonts
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-raleway',
});

const Page = () => {
  return (
    <main className={`${raleway.variable} font-sans relative w-screen h-screen overflow-hidden`}>  {/* Apply font */}
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-[url('/bg-3.jpg')] bg-center bg-cover" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-black/60 animate-pulse-slow pointer-events-none" />

      {/* Hero Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-wide uppercase">
            My Work
          </h1>
          <p className="mt-2 text-gray-200 text-lg italic">
            A selection of side-projects and prototypes
          </p>
        </motion.div>
      </div>

      {/* Projects Grid (pushed below header) */}
      <div className="relative z-10 mt-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-[95%] mx-auto max-h-[85%] overflow-y-auto custom-scrollbar">
        {Projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            text={project.text}
            image={project.src}
            link={project.link}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;