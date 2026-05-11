"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Projects, Project } from "@/constants/constants";
import { parseYearMonth, formatYear } from "@/lib/dates";

const featured: Project[] = [...Projects]
  .sort(
    (a, b) =>
      parseYearMonth(b.startDate).getTime() -
      parseYearMonth(a.startDate).getTime()
  )
  .slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 text-chill-teal/80 mb-4">
              <span className="h-px w-10 bg-chill-teal/40" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Featured{" "}
              <span className="text-gradient-cool">Projects</span>
            </h2>
          </div>
          <Link
            href="/project"
            className="group inline-flex items-center gap-2 text-lavender-mist hover:text-accent font-semibold transition-colors"
          >
            View all projects
            <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-10">
          {featured.map((project, idx) => {
            const hasLink = Boolean(project.gitLink);
            const reversed = idx % 2 === 1;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`group relative flex flex-col ${
                  reversed ? "md:flex-row-reverse" : "md:flex-row"
                } gap-6 md:gap-10 items-stretch bg-deep-slate/40 backdrop-blur-sm border border-chill-teal/10 hover:border-chill-teal/40 rounded-3xl p-5 md:p-6 transition-colors`}
              >
                <div className="relative w-full md:w-3/5 aspect-[16/10] overflow-hidden rounded-2xl bg-night-navy">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-navy/70 via-transparent to-transparent" />
                </div>

                <div className="flex-1 flex flex-col justify-between py-2 md:py-4">
                  <div>
                    <div className="flex items-center gap-4 mb-5 text-accent">
                      <span className="font-display text-3xl md:text-4xl font-bold leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-accent/30" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-lavender-mist/60">
                        {formatYear(project.startDate)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.type.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-chill-teal/10 text-chill-teal border border-chill-teal/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight group-hover:text-chill-teal transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lavender-mist/75 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-night-navy/60 text-lavender-mist/80 border border-lavender-mist/10"
                        >
                          {s}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="text-xs px-2.5 py-1 rounded-md text-lavender-mist/50">
                          +{project.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {hasLink && (
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                      className="inline-flex w-fit items-center gap-2 text-sm font-bold text-accent hover:text-accent-soft transition-colors group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-md"
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
          })}
        </div>
      </div>
    </section>
  );
}
