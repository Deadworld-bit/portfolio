"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Projects, Project } from "@/constants/constants";

const PROJECTS_PER_PAGE = 4;

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");

  const projectTypes = useMemo(() => {
    const types = new Set<string>();
    Projects.forEach((project) => {
      project.type.forEach((t) => types.add(t));
    });
    return ["All", ...Array.from(types)].sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedType === "All") {
      return Projects;
    }
    return Projects.filter((project) => project.type.includes(selectedType));
  }, [selectedType]);

  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    try {
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('background_06.jpg')" }}
      ></div>

      {/* Content layer with semi-transparent backdrop */}
      <div className="relative z-10 container mx-auto px-4 py-12 backdrop-brightness-100">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-white text-center mb-12 tracking-tight"
        >
          Showcase Projects
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${
                  selectedType === type
                    ? "bg-chill-teal text-night-navy shadow-lg"
                    : "bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal"
                }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {currentProjects.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lavender-mist text-lg mt-8"
          >
            No projects found for this type.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <motion.a
                key={project.title || index}
                href={project.gitLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
                className="bg-deep-slate bg-opacity-60 rounded-xl overflow-hidden shadow-xl border border-night-navy flex flex-col cursor-pointer relative"
              >
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {project.type.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-chill-teal text-night-navy text-xs font-bold px-3 py-1 rounded-full uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-soft-cyan mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white text-sm mb-4 flex-grow">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-night-navy bg-opacity-70 text-soft-cyan text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-night-navy bg-opacity-70 text-soft-cyan text-xs px-3 py-1 rounded-md flex items-center space-x-1">
                  <span className="font-medium">
                    {formatDate(project.startDate)}
                  </span>
                  <span>-</span>
                  <span className="font-medium">
                    {formatDate(project.endDate)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <motion.button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </motion.button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <motion.button
                key={number}
                onClick={() => paginate(number)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors
                  ${
                    currentPage === number
                      ? "bg-chill-teal text-night-navy shadow-md"
                      : "bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal"
                  }`}
              >
                {number}
              </motion.button>
            ))}
            <motion.button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-black bg-opacity-60 text-white hover:bg-opacity-80 hover:text-chill-teal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
