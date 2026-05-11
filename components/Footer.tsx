"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
  FaArrowUp,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/thanhducdev/",
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/Deadworld-bit",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://discord.com/users/Deadworld#8732",
    icon: <FaDiscord />,
    label: "Discord",
  },
];

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-me" },
  { label: "Projects", href: "/project" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-chill-teal/15 bg-night-navy/60 backdrop-blur-md mt-20">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-chill-teal/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 mb-12 border-b border-chill-teal/15"
        >
          <div className="max-w-xl">
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Let&apos;s build something
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              Got a project in mind?{" "}
              <span className="text-gradient-warm">Let&apos;s talk.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-night-navy font-bold shadow-lg shadow-accent/25 hover:bg-accent-soft transition-all duration-300 hover:scale-105 shrink-0"
          >
            Start a conversation
            <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </motion.div>

        {/* Main footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chill-teal to-soft-cyan flex items-center justify-center text-night-navy font-extrabold text-base shadow-lg shadow-chill-teal/30">
                PD
              </div>
              <span className="font-display text-xl font-bold text-white">
                Phan Thanh Duc
              </span>
            </div>
            <p className="text-lavender-mist/70 text-sm leading-relaxed max-w-md">
              Game &amp; Web Developer based in Ho Chi Minh City, Vietnam.
              Crafting immersive Unity games and polished modern web
              experiences.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-lavender-mist/70 text-sm hover:text-chill-teal transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="p-2.5 rounded-full bg-deep-slate/60 text-lavender-mist border border-chill-teal/15 hover:text-chill-teal hover:border-chill-teal/50 transition-colors"
                >
                  <span className="text-base">{s.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-chill-teal/10">
          <p className="text-lavender-mist/50 text-xs">
            © {year} Phan Thanh Duc. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 text-lavender-mist/60 hover:text-chill-teal transition-colors text-xs uppercase tracking-widest"
            aria-label="Scroll to top"
          >
            Back to top
            <span className="p-1.5 rounded-full border border-chill-teal/20 group-hover:border-chill-teal/60 transition-colors">
              <FaArrowUp size={10} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
