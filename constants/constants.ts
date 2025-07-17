import { IconType } from "react-icons";
import { FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";

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
    title: "Glyph",
    type: ["Game", "Unity"],
    shortDescription: "Glyph is a 2D platformer game where players control a character that can you letters to interact with the environment, solve puzzles, and defeat enemies.",
    skills: ["Unity", "C#", "Game Development", "Moble"],
    image: "/projects/TrinetraSudio_pic_01.png",
    gitLink: "https://github.com/san0502-jay/Glyph-Trinetra-Games.git",
    startDate: "2025-06",
    endDate: ""
  },
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
    image: "/projects/ChildGrowthTrackingSystem_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/childgrowthtrackingsystem_fe.git",
    startDate: "2025-02",
    endDate: "2025-3"
  },
  {
    title: "TurnBasedStrategy_Testing",
    type: ["Game", "Unity"],
    shortDescription: "A Unity turn-based strategy prototype featuring a grid-based action point system, pathfinding, and AI-driven enemy behavior.",
    skills: ["Unity", "C#", "Game Development", "Game Mechanics", "Prototyping"],
    image: "/projects/TurnBase_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/TurnBasedStrategy_Testing.git",
    startDate: "2024-02",
    endDate: "2024-12"
  },
  {
    title: "IdleArcade_Testing",
    type: ["Game", "Unity"], 
    shortDescription: "IdleArcade_Testing is an idle town management arcade game prototype where you gather resources, upgrade and expand your settlement, boost production, and fortify defenses against enemy attacks.",
    skills: ["Unity", "C#", "Game Mechanics", "Prototyping"],
    image: "/projects/IdleArcade_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/IdleArcade_Testing.git",
    startDate: "2024-08",
    endDate: "2024-09"
  },
  {
    title: "Workshop management system for Jama Decor furniture company",
    type: ["Backend", "Database"],
    shortDescription: "BWM, is a purpose-built application tailored to efficiently manage the intricacies of Jama decor factory. This versatile tool oversees customer orders, tracks items and materials, assigns and monitors worker tasks, and generates insightful reports. ​",
    skills: ["C#", "Entity Framework", "ASP.NET Core", "SQL Server", "Web API", "SignalR"],
    image: "/projects/JamaManagementSystem_pic_01.png",
    gitLink: "https://github.com/QuanggDat/BWM_BuildWorkshopManagement_Backend.git",
    startDate: "2023-07",
    endDate: "2023-12"
  },
  {
    title: "Parkour_Testing",
    type: ["Game", "Unity"], 
    shortDescription: "Parkour_Testing is a dynamic parkour game prototype with an advanced obstacle-detection system that automatically rotates your character and adapts actions—jumps, vaults, climbs, and ledge maneuvers—based on obstacle height.",
    skills: ["Unity", "C#", "Game Mechanics", "Prototyping"],
    image: "/projects/Parkour_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/Parkour_Testing.git",
    startDate: "2024-05",
    endDate: "2024-08"
  },
  {
    title: "EndlessRunner_Testing",
    type: ["Game", "Unity"], 
    shortDescription: "EndlessRunner_Testing is an endless runner game prototype where players overcome obstacles and collect coins.",
    skills: ["Unity", "C#", "Game Mechanics", "Prototyping"],
    image: "/projects/EndlessRunner_pic_01.png",
    gitLink: "https://github.com/Deadworld-bit/EndlessRunner_Testing.git",
    startDate: "2023-06",
    endDate: "2023-07"
  }
];

export interface Contact {
  Icon : IconType;
  title: string;
  lines: string[];
}

export const Contacts : Contact[] = [
  {
      Icon: FaPhoneAlt,
      title: "Call Me", 
      lines: ["0977346713"],
    },
    {
      Icon: FaPaperPlane,
      title: "E-mail",
      lines: ["phanthanhduc2709@gmail.com", "deadworld128@gmail.com"],
    },
    {
      Icon: FaMapMarkerAlt,
      title: "Location",
      lines: ["Vinhome GrandPark", "Ho Chi Minh City, Vietnam"], 
    },
];