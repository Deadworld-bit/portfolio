"use client";

import { useState, useMemo, FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Projects, Project } from "@/constants/constants";
import { parseYearMonth, formatYearMonth as formatDate } from "@/lib/dates";

const PROJECTS_PER_PAGE = 6;

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

const FilterBar: FC<{
  types: string[];
  selected: string;
  onSelect: (t: string) => void;
}> = ({ types, selected, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15, duration: 0.5 }}
    className="flex flex-wrap justify-center gap-2 mb-14"
  >
    {types.map((type) => {
      const active = selected === type;
      return (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night-navy
            ${
              active
                ? "bg-accent text-night-navy border-accent shadow-lg shadow-accent/25"
                : "bg-deep-slate/40 text-lavender-mist border-chill-teal/15 hover:border-chill-teal/50 hover:text-chill-teal"
            }`}
        >
          {type}
        </button>
      );
    })}
  </motion.div>
);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ProjectCard: FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const hasLink = Boolean(project.gitLink);
  const titleId = `project-title-${slugify(project.title)}-${index}`;
  return (
    <motion.article
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={hasLink ? { y: -6 } : undefined}
      className={`group relative bg-deep-slate/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-chill-teal/10 transition-colors flex flex-col shadow-xl shadow-night-navy/40 ${
        hasLink ? "hover:border-chill-teal/40" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night-navy">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ${
            hasLink ? "group-hover:scale-110" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-slate via-deep-slate/30 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.type.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-night-navy/80 backdrop-blur-sm text-chill-teal border border-chill-teal/30"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-night-navy/80 backdrop-blur-sm text-lavender-mist/80 border border-lavender-mist/10 whitespace-nowrap">
            {formatDate(project.startDate)} → {formatDate(project.endDate)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3
          id={titleId}
          className={`font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight transition-colors ${
            hasLink ? "group-hover:text-chill-teal" : ""
          }`}
        >
          {project.title}
        </h3>
        <p className="text-lavender-mist/75 text-sm leading-relaxed mb-4 flex-grow">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-1 rounded-md bg-night-navy/60 text-lavender-mist/80 border border-lavender-mist/10"
            >
              {s}
            </span>
          ))}
        </div>
        {hasLink && (
          <a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft transition-colors group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-md mt-auto"
          >
            <span className="border-b border-accent/40 group-hover/cta:border-accent-soft pb-0.5">
              View on GitHub
            </span>
            <FiArrowUpRight className="transition-transform duration-300 group-hover/cta:rotate-45" />
          </a>
        )}
      </div>
    </motion.article>
  );
};

const Pagination: FC<{
  total: number;
  current: number;
  onPage: (num: number) => void;
}> = ({ total, current, onPage }) => (
  <div className="flex justify-center items-center gap-2 md:gap-3 mt-16">
    <motion.button
      onClick={() => onPage(current - 1)}
      disabled={current === 1}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="px-5 py-2.5 rounded-full bg-deep-slate/60 text-lavender-mist border border-chill-teal/15 hover:border-chill-teal/50 hover:text-chill-teal disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
    >
      Prev
    </motion.button>

    <div className="hidden sm:flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <motion.button
          key={n}
          onClick={() => onPage(n)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors border ${
            current === n
              ? "bg-accent text-night-navy border-accent shadow-lg shadow-accent/25"
              : "bg-deep-slate/60 text-lavender-mist border-chill-teal/15 hover:border-chill-teal/50 hover:text-chill-teal"
          }`}
        >
          {n}
        </motion.button>
      ))}
    </div>

    <div className="sm:hidden px-4 py-2 rounded-full bg-deep-slate/60 text-lavender-mist text-sm font-semibold border border-chill-teal/15">
      {current} / {total}
    </div>

    <motion.button
      onClick={() => onPage(current + 1)}
      disabled={current === total}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="px-5 py-2.5 rounded-full bg-deep-slate/60 text-lavender-mist border border-chill-teal/15 hover:border-chill-teal/50 hover:text-chill-teal disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
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
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-12 py-24 lg:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_08.png')" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-night-navy/85 via-night-navy/75 to-night-navy"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5 text-chill-teal/80">
            <span className="h-px w-10 bg-chill-teal/40" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Portfolio
            </span>
            <span className="h-px w-10 bg-chill-teal/40" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
            Showcase{" "}
            <span className="text-gradient-cool">Projects</span>
          </h1>
          <p className="text-lavender-mist/80 text-base md:text-lg max-w-2xl mx-auto mt-5">
            A collection of game prototypes, web applications, and full-stack
            systems I&apos;ve built.
          </p>
        </motion.div>

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
            className="text-center text-lavender-mist/70 text-base md:text-lg mt-8"
          >
            No projects found.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {current.map((pr, i) => (
              <ProjectCard key={pr.title} project={pr} index={i} />
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
