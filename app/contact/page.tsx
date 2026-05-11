"use client";

import React, { useState, useEffect, useCallback, FC } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

// Type Definitions
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

const COOLDOWN_SECONDS: number = 30;
const EMAIL_REGEX: RegExp = /^\S+@\S+\.\S+$/;

const styles = {
  input: `w-full bg-night-navy/60 border border-chill-teal/15 rounded-xl px-4 py-3 text-soft-cyan placeholder-lavender-mist/50
          focus:outline-none focus:border-chill-teal focus:ring-1 focus:ring-chill-teal/40
          transition duration-300 ease-in-out text-base`,
  textarea: `w-full bg-night-navy/60 border border-chill-teal/15 rounded-xl px-4 py-3 text-soft-cyan placeholder-lavender-mist/50
            focus:outline-none focus:border-chill-teal focus:ring-1 focus:ring-chill-teal/40
            transition duration-300 ease-in-out resize-none text-base`,
  button: `w-full mt-2 px-8 py-3.5 bg-accent hover:bg-accent-soft text-night-navy
           font-bold text-base rounded-full shadow-lg shadow-accent/25 transition-all duration-300 ease-in-out
           disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate`,
  hiddenField: "hidden",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

const ContactInfoPanel: FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 w-full">
    {CONTACT_INFO.map(({ Icon, title, lines }) => (
      <motion.div
        key={title}
        variants={fadeSlideUp}
        whileHover={{ y: -4 }}
        className="bg-deep-slate/60 backdrop-blur-md p-6 rounded-2xl border border-chill-teal/15 hover:border-chill-teal/50 transition-colors flex items-start gap-4 shadow-lg shadow-night-navy/40"
      >
        <div className="w-12 h-12 rounded-xl bg-chill-teal/15 text-chill-teal flex items-center justify-center flex-shrink-0">
          <Icon className="text-xl" />
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-bold text-white text-base mb-1">
            {title}
          </h4>
          <div className="text-lavender-mist/85 text-sm space-y-0.5">
            {lines.map((line, i) => (
              <div key={i} className="break-words">
                {line}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

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
  const isFormValid =
    form.fullName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.subject.trim() !== "" &&
    form.content.trim() !== "" &&
    isEmailValid;

  return (
    <motion.div
      variants={fadeSlideUp}
      className="bg-deep-slate/60 backdrop-blur-md p-6 md:p-10 rounded-3xl w-full max-w-3xl mx-auto border border-chill-teal/15 shadow-2xl shadow-night-navy/60"
    >
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-white text-center">
        Send a Message
      </h3>
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="fullName"
            placeholder="Name"
            value={form.fullName}
            onChange={onChange}
            className={styles.input}
            required
            aria-label="Full Name"
          />
          <div className="flex flex-col">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className={`${styles.input} ${
                form.email && !isEmailValid ? "border-accent" : ""
              }`}
              required
              aria-label="Email"
            />
            {form.email && !isEmailValid && (
              <span className="mt-2 text-xs text-accent pl-2">
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
          aria-label="Subject"
        />
        <textarea
          name="content"
          placeholder="Tell me about your project..."
          rows={6}
          value={form.content}
          onChange={onChange}
          className={styles.textarea}
          required
          aria-label="Message"
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
          disabled={isSubmitting || cooldown > 0 || !isFormValid}
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
            className={`mt-4 flex items-center gap-3 rounded-xl px-5 py-4 border ${
              isSuccess
                ? "bg-chill-teal/15 border-chill-teal/40 text-chill-teal"
                : "bg-accent/15 border-accent/40 text-accent"
            }`}
          >
            {isSuccess ? (
              <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircleIcon className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
};

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
      setMsg("Spam detected. Submission blocked.");
      setSuccess(false);
      return;
    }
    if (cooldown > 0) {
      setMsg(`Please wait ${cooldown}s before sending another message.`);
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
      setMsg("Message sent successfully — I'll get back to you soon!");
      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        subject: "",
        content: "",
        honeypot: "",
      });
      setCooldown(COOLDOWN_SECONDS);
    } catch (err: unknown) {
      setSuccess(false);
      let errorMsg = "An unknown error occurred.";
      if (err && typeof err === "object" && "text" in err) {
        errorMsg = (err as { text: string }).text;
      }
      setMsg(`Failed to send message. ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative flex flex-col items-center justify-center min-h-screen py-24 lg:py-32 px-4 sm:px-6 lg:px-12 text-soft-cyan overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_07.png')" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-night-navy/85 via-night-navy/70 to-night-navy"
      />

      <motion.div
        variants={containerVariants}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div
          variants={fadeSlideUp}
          className="text-center mb-14 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-5 text-chill-teal/80">
            <span className="h-px w-10 bg-chill-teal/40" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Get in touch
            </span>
            <span className="h-px w-10 bg-chill-teal/40" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-4">
            Let&apos;s work{" "}
            <span className="text-gradient-warm">together</span>
          </h1>
          <p className="text-lavender-mist/85 text-base md:text-lg">
            Have a project in mind, or just want to say hi? Drop me a line — I
            usually reply within a day.
          </p>
        </motion.div>

        <ContactInfoPanel />
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
