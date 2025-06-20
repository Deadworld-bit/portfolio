"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaTools,
  FaBriefcase,
  FaQuoteRight,
  FaBlog,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "About Me", href: "/about-me", icon: <FaUser /> },
  { label: "Resume", href: "/resume", icon: <FaFileAlt /> },
  { label: "Services", href: "/services", icon: <FaTools /> },
  { label: "Portfolio", href: "/portfolio", icon: <FaBriefcase /> },
  { label: "Testimonials", href: "/testimonials", icon: <FaQuoteRight /> },
  { label: "Blog", href: "/blog", icon: <FaBlog /> },
  { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
];

const SOCIALS = [
  { href: "https://linkedin.com", icon: <FaLinkedin /> },
  { href: "https://github.com", icon: <FaGithub /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://facebook.com", icon: <FaFacebook /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-charcoal flex flex-col justify-between py-8 px-6 z-50 shadow-lg">
      {/* Logo */}
      <div>
        <div className="flex items-center mb-12">
          <span className="text-3xl font-extrabold text-white tracking-wider">
            <span className="text-electric-blue">D</span>
            <span className="text-neon-green">ead</span>
            <span className="text-white">World</span>
          </span>
        </div>
        {/* Nav Links */}
        <nav>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                      isActive
                        ? "bg-electric-blue/10 text-electric-blue"
                        : "text-white hover:bg-electric-blue/10 hover:text-electric-blue"
                    }`}
                  >
                    <span
                      className={`text-xl ${
                        isActive ? "text-electric-blue" : "text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`${
                        isActive ? "text-electric-blue font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Social Icons */}
      <div className="flex items-center gap-5 mt-10">
        {SOCIALS.map((soc, i) => (
          <a
            key={i}
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-electric-blue text-xl transition-colors"
          >
            {soc.icon}
          </a>
        ))}
      </div>
    </aside>
  );
}