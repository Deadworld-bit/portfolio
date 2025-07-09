// constants/constants.ts

export interface Project {
  title: string;
  type: string[]; 
  shortDescription: string;
  skills: string[];
  image: string;
  gitLink: string;
  startDate: string;
  endDate: string;
}

export const Projects: Project[] = [
  {
    title: "TRINETRA Studio Website",
    type: ["Web Design", "Frontend"],
    shortDescription: "The Trinetra Studio landing page is built with Next.js and styled using Tailwind CSS to deliver a fast, responsive, and modern user experience.",
    skills: ["Next.js", "Tailwind.css", "Framer Motion", "TypeScript"],
    image: "/projects/TrinetraSudio_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/TRINETRA_StudioPage.git",
    startDate: "2025-05",
    endDate: "2025-06"
  },
  {
    title: "CasualPuzzle_Testing",
    type: ["Game", "Unity"], 
    shortDescription: "A Unity isometric puzzle prototype where you drag a red dot to guide the character along winding paths, avoiding enemies and obstacles under a time and health limit.",
    skills: ["Unity", "C#", "Game Development", "Prototyping"],
    image: "/projects/CasualPuzzle_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/CasualPuzzle_Testing.git",
    startDate: "2025-4",
    endDate: "2025-4"
  },
  {
    title: "Child Growth Tracking System_FE",
    type: ["Web Design", "Frontend"], 
    shortDescription: "A web-based application offering easy onboarding, member growth analytics, doctor evaluation tools, and an admin dashboard for full system management.",
    skills: ["Next.js", "Tailwind.css", "Framer Motion", "JavaScript"],
    image: "/project-smarthome.jpg",
    gitLink: "https://github.com/Deadworld-bit/childgrowthtrackingsystem_fe.git",
    startDate: "2025-02",
    endDate: "2025-3"
  },
  {
    title: "TurnBasedStrategy_Testing",
    type: ["Game", "Unity"],
    shortDescription: "A Unity turn-based strategy prototype featuring a grid-based action point system, pathfinding, and AI-driven enemy behavior.",
    skills: ["Unity", "C#", "Game Development", "Game Mechanics", "Prototyping"],
    image: "/project-portfolio.jpg",
    gitLink: "https://github.com/Deadworld-bit/TurnBasedStrategy_Testing.git",
    startDate: "2023-05",
    endDate: "2023-06"
  },
  {
    title: "E-commerce Backend API",
    type: ["Backend Development", "API", "Database"], // <--- EXAMPLE CHANGE
    shortDescription: "Robust backend API for an e-commerce platform with authentication and product management.",
    skills: ["Node.js", "Express", "MongoDB", "JWT"],
    image: "/project-ecommerce-api.jpg",
    gitLink: "https://github.com/yourusername/ecommerce-api",
    startDate: "2023-01",
    endDate: "2023-04"
  },
  {
    title: "Procedural Terrain Generator",
    type: ["Game Development", "Graphics", "Simulation"], // <--- EXAMPLE CHANGE
    shortDescription: "A Unity project demonstrating procedural terrain generation algorithms.",
    skills: ["Unity", "C#", "Shader Graph"],
    image: "/project-terrain.jpg",
    gitLink: "https://github.com/yourusername/procedural-terrain-generator",
    startDate: "2022-09",
    endDate: "2022-12"
  },
  {
    title: "TaskFlow Mobile App",
    type: ["Mobile Application", "Productivity", "Frontend"], // <--- EXAMPLE CHANGE
    shortDescription: "A productivity mobile app to manage tasks and set reminders.",
    skills: ["React Native", "Firebase", "Redux"],
    image: "/project-taskflow.jpg",
    gitLink: "https://github.com/yourusername/taskflow-mobile-app",
    startDate: "2022-04",
    endDate: "2022-08"
  },
  {
    title: "Celestial Navigator",
    type: ["Web Application", "Data Visualization", "Astronomy"], // <--- EXAMPLE CHANGE
    shortDescription: "An interactive web app for exploring constellations and celestial objects.",
    skills: ["React", "TypeScript", "D3.js", "Node.js"],
    image: "/project-celestial.jpg",
    gitLink: "https://github.com/yourusername/celestial-navigator",
    startDate: "2022-01",
    endDate: "2022-03"
  }
];