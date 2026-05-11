"use client";

import {
  FaUnity,
  FaReact,
  FaGitAlt,
  FaFigma,
  FaCss3Alt,
  FaHtml5,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiDotnet,
  SiSharp,
  SiPostgresql,
} from "react-icons/si";
import { ReactNode } from "react";

type Skill = { name: string; icon: ReactNode };

const SKILLS: Skill[] = [
  { name: "Unity", icon: <FaUnity /> },
  { name: "C#", icon: <SiSharp /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <FaReact /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: ".NET", icon: <SiDotnet /> },
  { name: "SQL Server", icon: <FaDatabase /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "Figma", icon: <FaFigma /> },
];

// Duplicate the list so the keyframe can translate by -50% for a seamless loop.
const LOOP = [...SKILLS, ...SKILLS];

export default function SkillsMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="relative py-16 border-y border-chill-teal/10 bg-deep-slate/30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <div className="flex items-center gap-3 text-chill-teal/80">
          <span className="h-px w-10 bg-chill-teal/40" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase">
            Tech I work with
          </span>
        </div>
      </div>

      <div className="marquee-mask">
        <ul
          className="flex items-center gap-4 w-max animate-marquee"
          aria-hidden="true"
        >
          {LOOP.map((s, idx) => (
            <li
              key={`${s.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-chill-teal/15 bg-night-navy/60 backdrop-blur-sm whitespace-nowrap"
            >
              <span className="text-chill-teal text-lg">{s.icon}</span>
              <span className="text-lavender-mist font-medium text-sm">
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visually hidden but accessible list for screen readers */}
      <ul className="sr-only">
        {SKILLS.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </section>
  );
}
