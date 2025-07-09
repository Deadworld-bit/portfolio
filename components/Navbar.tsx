"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaTools,
  FaEnvelope,
  FaFacebookF, // Using FaFacebookF for a cleaner look
  FaTwitter,
  FaInstagram,
  FaPinterestP, // Using FaPinterestP for a cleaner look
} from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri"; // A fresh icon for Projects/Services

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "About", href: "/about-me", icon: <FaUser /> },
  { label: "Skills", href: "/resume", icon: <FaFileAlt /> },
  { label: "Projects", href: "/project", icon: <RiCodeSSlashFill /> }, // New icon
  { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
];

const SOCIALS = [
  { href: "https://facebook.com", icon: <FaFacebookF /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
  { href: "https://pinterest.com", icon: <FaPinterestP /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }} // Slightly more initial offset
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }} // Slightly snappier
      className="fixed left-0 top-0 h-screen w-72 bg-gray-950 flex flex-col justify-between p-8 xl:p-10 z-50 shadow-xl border-r border-gray-800" // Darker background, border, adjusted padding
    >
      {/* Logo and Name */}
      <div>
        <motion.div
          initial={{ y: -20, opacity: 0 }} // Subtle vertical slide in
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-start mb-16" // Increased margin-bottom
        >
          {/* Consider a cleaner SVG logo for scalability and crispness */}
          <img src="/logo.png" alt="Bauen" className="h-10 w-auto mb-2 opacity-90" /> {/* Slightly smaller, more subtle */}
          <span className="text-gray-200 text-lg font-semibold tracking-wide"> {/* Lighter text, increased font size */}
            Phan Thanh Duc
          </span>
          <span className="text-gray-500 text-sm mt-1">Web Developer</span> {/* Added a subtle role/tagline */}
        </motion.div>

        {/* Nav Links */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-3"> {/* Tighter gap */}
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      relative flex items-center gap-4 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300 ease-in-out
                      ${
                        isActive
                          ? "bg-yellow-500 text-gray-900 shadow-md transform translate-x-1" // Brighter yellow, slight transform
                          : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800" // Subtle hover background
                      }
                    `}
                  >
                    <motion.span
                      className="text-xl" // Slightly smaller icon size for balance
                      initial={false}
                      animate={{ scale: isActive ? 1.1 : 1 }} // Icon subtle pop on active
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="leading-tight">{item.label}</span>
                    {/* Active indicator line */}
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-indicator" // For smooth animation between active items
                        className="absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-l-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 border-t border-gray-800 pt-6"> {/* Top border for separation */}
        {SOCIALS.map((s, idx) => (
          <motion.a
            key={idx}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }} // Added slight vertical lift on hover
            whileTap={{ scale: 0.9 }} // Click feedback
            className="p-2.5 rounded-full bg-gray-800 text-gray-400 transition-all duration-200 ease-in-out hover:text-yellow-400 hover:bg-gray-700" // Softer background, color change
          >
            <span className="text-xl">{s.icon}</span> {/* Slightly smaller icon */}
          </motion.a>
        ))}
      </div>
    </motion.aside>
  );
}