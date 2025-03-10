"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  image: string;
  title: string;
  text: string;
  link: string;
}

const ProjectCard = ({ image, title, text, link }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <section>
      <div
        onClick={handleFlip}
        className="w-[600px] h-[400px] rounded-md cursor-pointer m-5 p-5 bg-black/65 bg-opacity-80 shadow-lg"
      >
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full group relative flip-card-front bg-cover bg-center text-white rounded-lg p-4"
          >
            <div className="absolute inset-0 w-full h-full rounded-md bg-black opacity-0 group-hover:opacity-40" />
            <div className="absolute inset-0 w-full h-full text-[20px] pb-10 hidden group-hover:flex items-center z-[20] justify-center">
              Learn more &gt;
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full group relative flip-card-back bg-cover bg-center text-white rounded-lg p-4"
          >
            <div className="absolute inset-0 w-full h-full rounded-md bg-black opacity-50 z-[-1]" />
            <div className="flex flex-col gap-20 py-3 z-[30]">
              <h1 className="text-white text-2xl font-semibold">{title}</h1>
              <p className="text-gray-200 text-[20px]">{text}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
        >
          View Details
        </a>
      </div>
    </section>
  );
};

export default ProjectCard;
