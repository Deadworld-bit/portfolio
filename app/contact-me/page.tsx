"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { Raleway } from 'next/font/google';

// Load Raleway font
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-raleway',
});

const contacts = [
  { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+84 977346713", href: "tel:+84977346713" },
  { icon: <Mail className="w-6 h-6" />, label: "Email", value: "phanthanhduc2709@gmail.com", href: "mailto:phanthanhduc2709@gmail.com" },
  { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "www.linkedin.com/in/thanhducdev", href: "www.linkedin.com/in/thanhducdev" },
  { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "https://github.com/Deadworld-bit", href: "https://github.com/Deadworld-bit" },
  { icon: <MessageCircle className="w-6 h-6" />, label: "Discord", value: "Deadworld#8732", href: "https://discordapp.com/users/Deadworld#8732" },
];

const ContactPage = () => (
  <main className={`${raleway.variable} font-sans w-screen h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex items-center justify-center p-6`}>    
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-lg w-full"
    >
      <h2 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">Get in Touch</h2>
      <div className="space-y-4">
        {contacts.map((c, idx) => (
          <motion.a
            key={idx}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-purple-300 mr-4">{c.icon}</div>
            <div>
              <div className="text-white font-semibold">{c.label}</div>
              <div className="text-gray-300 text-sm truncate">{c.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  </main>
);

export default ContactPage;