"use client";

import { useState, useMemo, FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Projects, Project } from "@/constants/constants";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const PROJECTS_PER_PAGE = 4;

// Date Format
const parseYearMonth = (ym: string) => {
  const [year, month] = ym.split("-");
  return new Date(parseInt(year), parseInt(month) - 1);
};

const formatDate = (dateString: string) =>
  dateString
    ? parseYearMonth(dateString).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "In-Progress";

// Custom hook
const useProjectList = (filterType: string) =>
  useMemo(() => {
    const list =
      filterType === "All"
        ? [...Projects]
        : Projects.filter((p) => p.type.includes(filterType));

    return list.sort(
      (a: Project, b: Project) =>
        parseYearMonth(b.startDate).getTime() -
        parseYearMonth(a.startDate).getTime()
    );
  }, [filterType]);

// Filter buttons
const FilterBar: FC<{
  types: string[];
  selected: string;
  onSelect: (t: string) => void;
}> = ({ types, selected, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
  >
    {types.map((type) => (
      <button
        key={type}
        onClick={() => onSelect(type)}
        className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300
          ${
            selected === type
              ? "bg-chill-teal text-night-navy shadow-lg"
              : "bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal"
          }`}
      >
        {type}
      </button>
    ))}
  </motion.div>
);

// Project card
const ProjectCard: FC<{ project: Project }> = ({ project }) => (
  <motion.a
    href={project.gitLink}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }}
    className="bg-deep-slate bg-opacity-60 rounded-2xl overflow-hidden shadow-2xl border-2 border-night-navy flex flex-col cursor-pointer relative"
  >
    <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {project.type.map((t, idx) => (
          <span
            key={idx}
            className="bg-chill-teal text-night-navy text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-2 rounded-full uppercase"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="absolute top-3 right-3 bg-night-navy bg-opacity-70 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center space-x-1.5">
        <span className="font-medium">{formatDate(project.startDate)}</span>
        <span>-</span>
        <span className="font-medium">{formatDate(project.endDate)}</span>
      </div>
    </div>
    <div className="p-5 md:p-8 flex flex-col flex-grow">
      <h3 className="text-2xl md:text-3xl font-bold text-soft-cyan mb-3 md:mb-4 leading-tight">
        {project.title}
      </h3>
      <p className="text-white text-sm md:text-base mb-6 flex-grow">
        {project.shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="bg-night-navy bg-opacity-70 text-soft-cyan text-xs md:text-sm px-3 py-1.5 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.a>
);

// Pagination controls
const Pagination: FC<{
  total: number;
  current: number;
  onPage: (num: number) => void;
}> = ({ total, current, onPage }) => (
  <div className="flex justify-center items-center gap-2 md:gap-4 mt-12 md:mt-16">
    <motion.button
      onClick={() => onPage(current - 1)}
      disabled={current === 1}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Prev
    </motion.button>

    {/* Page numbers: hidden on mobile, visible on medium screens and up */}
    <div className="hidden md:flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <motion.button
          key={n}
          onClick={() => onPage(n)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg font-semibold text-base md:text-lg transition-colors
            ${
              current === n
                ? "bg-chill-teal text-night-navy shadow-md"
                : "bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal"
            }`}
        >
          {n}
        </motion.button>
      ))}
    </div>

    {/* Page indicator: visible only on mobile */}
    <div className="md:hidden px-4 py-2 rounded-lg bg-black bg-opacity-60 text-white text-sm font-semibold">
      Page {current} of {total}
    </div>

    <motion.button
      onClick={() => onPage(current + 1)}
      disabled={current === total}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </motion.button>
  </div>
);

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");

  const types = useMemo(
    () => ["All", ...new Set(Projects.flatMap((p) => p.type))].sort(),
    []
  );
  const sorted = useProjectList(selectedType);
  const totalPages = Math.ceil(sorted.length / PROJECTS_PER_PAGE);
  const current = sorted.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  return (
    <div
      className={`${manrope.className} relative min-h-screen overflow-x-hidden bg-black/20`}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('background_08.png')" }}
      />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-16 backdrop-brightness-100">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-['Press_Start_2P',_monospace] text-3xl md:text-4xl lg:text-6xl text-white text-center mb-8 md:mb-16 tracking-tighter"
        >
          Showcase Projects
        </motion.h1>

        <FilterBar
          types={types}
          selected={selectedType}
          onSelect={(t) => {
            setSelectedType(t);
            setCurrentPage(1);
          }}
        />

        {current.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lavender-mist text-lg md:text-xl mt-8"
          >
            No projects found
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {current.map((pr) => (
              <ProjectCard key={pr.title} project={pr} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            current={currentPage}
            onPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
