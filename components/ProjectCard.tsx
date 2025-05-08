import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface Props {
  image: string;
  title: string;
  text: string;
  link: string;
}

const ProjectCard = ({ image, title, text, link }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.2}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      className="w-full h-full"
    >
      <div
        onClick={handleFlip}
        className="relative w-[600px] h-[400px] rounded-2xl cursor-pointer m-5 p-5 bg-black/50 shadow-2xl 
                   transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      >
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {/* Front Face */}
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full relative flip-card-front bg-cover bg-center rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center text-white text-xl z-10">
              Learn more &gt;
            </div>
          </div>

          {/* Back Face */}
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full relative flip-card-back bg-cover bg-center rounded-2xl overflow-hidden"
          >
            {/* gradient + blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-sm rounded-2xl z-0" />
            <div className="relative flex flex-col gap-4 p-6 text-white z-10">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-base">{text}</p>
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block px-6 py-2 rounded-full bg-blue-600 shadow-md hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
              >
                View Details
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;