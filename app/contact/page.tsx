"use client";

import React, { useState, useEffect, useCallback, FC } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";
import backgroundImage from "@/public/background_07.png";

// --- Type Definitions ---
interface FormState {
  fullName: string;
  email: string;
  subject: string;
  content: string;
  honeypot: string;
}

interface ContactFormProps {
  form: FormState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  cooldown: number;
  message: string;
  isSuccess: boolean;
}

// --- Font ---
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// --- Styles ---
const styles = {
  input: `w-full bg-night-navy border border-deep-slate rounded-md px-4 py-3 text-soft-cyan placeholder-lavender-mist
          focus:outline-none focus:border-chill-teal transition duration-300 ease-in-out text-base`,
  textarea: `w-full bg-night-navy border border-deep-slate rounded-md px-4 py-3 text-soft-cyan placeholder-lavender-mist
            focus:outline-none focus:border-chill-teal transition duration-300 ease-in-out resize-none text-base`,
  button: `w-full mt-8 px-8 py-3 bg-chill-teal hover:bg-soft-cyan text-night-navy
           font-bold text-lg rounded-md shadow-md transition-all duration-300 ease-in-out
           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-chill-teal disabled:hover:text-night-navy`,
  hiddenField: "hidden",
};

// --- Constants ---
const COOLDOWN_SECONDS: number = 30;
const EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Custom Hooks ---
function useCooldownTimer(
  initial: number = 0
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    if (count <= 0) return;
    const id = setInterval(() => setCount((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(id);
  }, [count]);
  return [count, setCount];
}

function useAutoClear(
  delay: number = 5000
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(""), delay);
    return () => clearTimeout(id);
  }, [msg, delay]);
  return [msg, setMsg];
}

// --- REDESIGNED: Contact Info Panel ---
const CONTACT_INFO = [
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

const ContactInfoPanel: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
      {CONTACT_INFO.map(({ Icon, title, lines }) => (
        <motion.div
          key={title}
          variants={fadeSlideUp}
          className="bg-deep-slate p-6 rounded-md flex items-center space-x-4 md:space-x-6 text-left"
        >
          <div className="bg-chill-teal rounded-full p-4 flex-shrink-0">
            <Icon className="text-night-navy text-2xl" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
            <div className="font-sans text-white text-sm space-y-1">
              {lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- Contact Form ---
const ContactForm: FC<ContactFormProps> = ({
  form,
  onChange,
  onSubmit,
  isSubmitting,
  cooldown,
  message,
  isSuccess,
}) => {
  const isEmailValid = EMAIL_REGEX.test(form.email);

  return (
    <motion.div
      variants={fadeSlideUp}
      className="bg-deep-slate p-8 rounded-md w-full max-w-3xl mx-auto"
    >
      <h3
        className={`${orbitron.className} text-3xl md:text-4xl font-extrabold mb-8 text-white text-center`}
      >
        Get In Touch
      </h3>
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="fullName"
            placeholder="Name"
            value={form.fullName}
            onChange={onChange}
            className={styles.input}
            required
          />
          <div className="flex flex-col">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className={`${styles.input} ${
                form.email && !isEmailValid ? "border-chill-teal" : ""
              }`}
              required
            />
            {form.email && !isEmailValid && (
              <span className="mt-2 text-sm text-chill-teal pl-2">
                Please enter a valid email.
              </span>
            )}
          </div>
        </div>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={onChange}
          className={styles.input}
          required
        />
        <textarea
          name="content"
          placeholder="Message"
          rows={6}
          value={form.content}
          onChange={onChange}
          className={styles.textarea}
          required
        />

        <input
          type="text"
          name="honeypot"
          value={form.honeypot}
          onChange={onChange}
          className={styles.hiddenField}
          autoComplete="off"
          tabIndex={-1}
          aria-label="Do not fill this out if you are human"
        />

        <button
          type="submit"
          disabled={isSubmitting || cooldown > 0 || !isEmailValid}
          className={styles.button}
        >
          {isSubmitting
            ? "Sending..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Send Message"}
        </button>

        {message && (
          <div
            role="alert"
            className={`mt-4 flex items-center space-x-3 rounded-lg px-5 py-4 ${
              isSuccess
                ? "bg-chill-teal text-night-navy"
                : "bg-soft-cyan text-night-navy"
            }`}
          >
            {isSuccess ? (
              <CheckCircleIcon className="w-6 h-6 text-night-navy" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-night-navy" />
            )}
            <span className="text-base">{message}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
};

// --- Main Exported Component ---
const Contact: FC = () => {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    content: "",
    honeypot: "",
  });
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [cooldown, setCooldown] = useCooldownTimer(0);
  const [message, setMsg] = useAutoClear(6000);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.honeypot) {
      setMsg("🚫 Spam detected. Submission blocked.");
      setSuccess(false);
      return;
    }
    if (cooldown > 0) {
      setMsg(`⏳ Please wait ${cooldown}s before sending another message.`);
      setSuccess(false);
      return;
    }

    setSubmitting(true);
    setMsg("");

    try {
      const templateParams = {
        fullName: form.fullName,
        email: form.email,
        subject: form.subject,
        content: form.content,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setMsg("✅ Message sent successfully!");
      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        subject: "",
        content: "",
        honeypot: "",
      });
      setCooldown(COOLDOWN_SECONDS);
    } catch (err: any) {
      setSuccess(false);
      const errorMsg = err.text || "An unknown error occurred.";
      setMsg(`❌ Failed to send message. ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-night-navy text-soft-cyan"
    >
      {/* Background Image Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        variants={containerVariants}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2
          className={`${orbitron.className} text-4xl md:text-5xl font-extrabold mb-4 text-white text-center`}
        >
          Contact Me
        </h2>

        {/* Contact Info Panel (now above the form) */}
        <ContactInfoPanel />

        {/* Contact Form */}
        <ContactForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          cooldown={cooldown}
          message={message}
          isSuccess={isSuccess}
        />
      </motion.div>
    </motion.section>
  );
};

export default Contact;
