"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "About", href: "/about-me", icon: <FaUser /> },
  { label: "Projects", href: "/project", icon: <RiCodeSSlashFill /> },
  { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
];

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

const DESKTOP_QUERY = "(min-width: 768px)";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Track viewport so `inert` is only applied on mobile-when-closed.
  // Without this, `inert` would disable the sidebar entirely on desktop.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-close mobile drawer on route change.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock page scroll while drawer is open. Empty string restores the
  // stylesheet default rather than forcing "auto".
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Escape is the ARIA-standard key for dismissing an overlay/dialog.
  useEffect(() => {
    if (!isMobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isMobileOpen]);

  // Move focus into the drawer on open so keyboard users land inside it.
  useEffect(() => {
    if (!isMobileOpen) return;
    const t = setTimeout(() => firstLinkRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [isMobileOpen]);

  const isInert = !isDesktop && !isMobileOpen;

  return (
    <>
      <button
        type="button"
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen((v) => !v)}
        className="md:hidden fixed top-4 left-4 z-[60] p-3 rounded-xl bg-deep-slate/90 backdrop-blur-md border border-chill-teal/30 text-chill-teal shadow-lg shadow-night-navy/40 transition-colors hover:border-chill-teal/60"
      >
        {isMobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-night-navy/70 backdrop-blur-sm z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        // `max-md:-translate-x-full` keeps the sidebar always visible on
        // desktop while hiding it off-canvas on mobile when closed.
        className={`
          fixed left-0 top-0 h-screen w-72 z-50 flex flex-col justify-between p-8
          bg-deep-slate/95 backdrop-blur-md border-r border-chill-teal/15 shadow-2xl shadow-night-navy/60
          transition-transform duration-300 ease-out
          ${isMobileOpen ? "translate-x-0" : "max-md:-translate-x-full"}
        `}
        // React 19 supports `inert` as a boolean prop. Setting it to
        // `undefined` (not `false`) so the attribute is omitted entirely.
        inert={isInert || undefined}
      >
        <div>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col items-start mb-12 mt-10 md:mt-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chill-teal to-soft-cyan flex items-center justify-center text-night-navy font-extrabold text-lg shadow-lg shadow-chill-teal/30">
                PD
              </div>
              <span className="text-soft-cyan text-xl font-bold tracking-wide">
                Phan Thanh Duc
              </span>
            </div>
            <span className="text-lavender-mist/60 text-sm">
              Game &amp; Web Developer
            </span>
          </motion.div>

          <nav aria-label="Main navigation">
            <ul className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      className={`
                        group relative flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium
                        transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chill-teal focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate
                        ${
                          isActive
                            ? "bg-chill-teal text-night-navy shadow-lg shadow-chill-teal/20"
                            : "text-lavender-mist hover:text-chill-teal hover:bg-night-navy/50"
                        }
                      `}
                    >
                      <motion.span
                        className="text-xl"
                        initial={false}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="leading-tight">{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active-indicator"
                          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-night-navy"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="border-t border-chill-teal/15 pt-6">
          <p className="text-lavender-mist/50 text-xs uppercase tracking-widest mb-4">
            Find me on
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 rounded-full bg-night-navy/70 text-lavender-mist transition-colors hover:text-chill-teal hover:bg-night-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chill-teal"
              >
                <span className="text-lg">{s.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
