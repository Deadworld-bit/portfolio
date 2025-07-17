"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaLinkedinIn,
  FaFacebook,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "About", href: "/about-me", icon: <FaUser /> },
  { label: "Projects", href: "/project", icon: <RiCodeSSlashFill /> },
  { label: "Contact", href: "/contact", icon: <FaEnvelope /> },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/thanhducdev/", icon: <FaLinkedinIn /> },
  { href: "https://facebook.com", icon: <FaFacebook /> }, 
  { href: "https://github.com/Deadworld-bit", icon: <FaGithub /> },
  { href: "https://discord.com/users/Deadworld#8732", icon: <FaDiscord /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed left-0 top-0 h-screen w-72 bg-gray-950 flex flex-col justify-between p-8 xl:p-10 z-50 shadow-xl border-r border-gray-800"
    >
      <div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-start mb-16"
        >
          <span className="text-gray-200 text-2xl font-semibold tracking-wide">
            Phan Thanh Duc
          </span>
          <span className="text-gray-500 text-base mt-1">Developer</span>
        </motion.div>

        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      relative flex items-center gap-4 px-4 py-2.5 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out
                      ${
                        isActive
                          ? "bg-yellow-500 text-gray-900 shadow-md transform translate-x-1"
                          : "text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
                      }
                    `}
                  >
                    <motion.span
                      className="text-2xl"
                      initial={false}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="leading-tight">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-indicator"
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

      <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
        {SOCIALS.map((s, idx) => (
          <motion.a
            key={idx}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-gray-800 text-gray-400 transition-all duration-200 ease-in-out hover:text-yellow-400 hover:bg-gray-700"
          >
            <span className="text-2xl">{s.icon}</span>
          </motion.a>
        ))}
      </div>
    </motion.aside>
  );
}
