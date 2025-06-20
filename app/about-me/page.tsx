"use client";

import Image from "next/image";
import { FaBriefcase, FaProjectDiagram, FaUserTie, FaHeadphones, FaSuitcase, FaFilm, FaCamera, FaTools } from "react-icons/fa";

export default function AboutMe() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-charcoal text-white px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Me</h1>
        <p className="text-slate text-base md:text-lg font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
        </p>
      </div>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-transparent w-full max-w-4xl mb-12">
        {/* Image with border accent */}
        <div className="relative w-full md:w-[260px] aspect-[260/300]">
          <div className="absolute -left-4 -top-4 w-full h-full border-4 border-electric-blue rounded-lg z-0" />
          <Image
            src="/profile.jpg"
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>
        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-electric-blue mb-2">Randy G. Smith</h2>
          <div className="text-neon-green text-lg font-semibold mb-6">UI/UX Designer</div>
          <p className="text-slate mb-6">
            Hello! I'm Alex Smith a self-taught & award winning Digital Designer & Developer with over five years work experience. I started in my children's room, got pro at renowned digital agencies akij co and nork blue label. Now I'm based in USA, America, working for Apple fredmansky and enjoying the life in the countryside. I like to travel. I have already travelled.
          </p>
          <p className="text-slate mb-6">
            I have couple of hobbies but I like to travel. I have already travelled almost all the districts of our country with my father. I am fond of fruit.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded bg-electric-blue text-black font-bold shadow hover:bg-electric-blue/80 transition"
            >
              Download CV
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded border-2 border-electric-blue text-electric-blue font-bold hover:bg-electric-blue hover:text-black transition"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Journey & Interests */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* My Journey */}
        <div>
          <h3 className="text-xl font-bold mb-6">My Journey</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaBriefcase className="text-electric-blue text-2xl" />
              <div>
                <div className="font-bold text-lg">5 Years Job</div>
                <div className="text-slate text-sm">Experience</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaProjectDiagram className="text-electric-blue text-2xl" />
              <div>
                <div className="font-bold text-lg">500+ Projects</div>
                <div className="text-slate text-sm">Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaUserTie className="text-electric-blue text-2xl" />
              <div>
                <div className="font-bold text-lg">Freelance</div>
                <div className="text-slate text-sm">Available</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaTools className="text-electric-blue text-2xl" />
              <div>
                <div className="font-bold text-lg">Support</div>
                <div className="text-slate text-sm">24/7</div>
              </div>
            </div>
          </div>
        </div>
        {/* My Interests */}
        <div>
          <h3 className="text-xl font-bold mb-6">My Interests</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaHeadphones className="text-electric-blue text-3xl mb-2" />
              <span className="font-semibold text-base">Music</span>
            </div>
            <div className="flex flex-col items-center bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaSuitcase className="text-electric-blue text-3xl mb-2" />
              <span className="font-semibold text-base">Travel</span>
            </div>
            <div className="flex flex-col items-center bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaFilm className="text-electric-blue text-3xl mb-2" />
              <span className="font-semibold text-base">Movie</span>
            </div>
            <div className="flex flex-col items-center bg-white/5 rounded-lg p-4 border border-electric-blue/30">
              <FaCamera className="text-electric-blue text-3xl mb-2" />
              <span className="font-semibold text-base">Photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}