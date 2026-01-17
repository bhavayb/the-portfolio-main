"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { About, SocialHandle } from "../utils/interface";
import { cn } from "../utils/cn";
import Link from "next/link";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";

interface ContactProps {
  email: string;
  social_handle: SocialHandle[];
  about: About;
}

const socialIcons: Record<string, string> = {
  Github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  "X (Twitter)": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  Twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  Leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
};

const Contact = ({ email, social_handle, about }: ContactProps) => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      console.log("Form data:", formData);
      setTimeout(() => {
        setStatus("DONE");
        setFormData({
          email: "",
          message: "",
          name: "",
          subject: "",
        });
        setStatusText("Message sent successfully!");
      }, 3000);
    } catch (error: any) {
      setStatus("ERROR");
      setStatusText("Error in sending message: " + error.message);
      console.error("Error sending message:", error.message);
    }
  };

  useEffect(() => {
    if (status === "DONE" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <motion.section className="relative min-h-screen" id="contact">
      {/* Toast Notification */}
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-6 left-1/2 -translate-x-1/2 px-6 py-4 z-50 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3",
              status === "ERROR"
                ? "bg-red-500/20 border-red-500/50 text-red-200"
                : status === "DONE"
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                : "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
            )}
          >
            {status === "SENDING" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full"
              />
            )}
            {status === "DONE" && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {status === "ERROR" && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className="font-medium">{statusText || "Sending your message..."}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:px-16 py-16 sm:py-20">
        {/* Header Section */}
        <Transition>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Available for work</span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Let&apos;s Create</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
            </p>
          </div>
        </Transition>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email Card */}
              <Transition>
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group block p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-sm mb-1">Email me at</p>
                      <p className="text-white font-semibold text-lg truncate group-hover:text-cyan-400 transition-colors">{email}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.a>
              </Transition>

              {/* Phone Card */}
              <Transition>
                <motion.a
                  href={`tel:${about.phoneNumber}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group block p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-sm mb-1">Call me at</p>
                      <p className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">{about.phoneNumber}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.a>
              </Transition>

              {/* Location Card */}
              <Transition>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">Based in</p>
                      <p className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors">{about.address}</p>
                    </div>
                  </div>
                </motion.div>
              </Transition>

              {/* Social Links */}
              <Transition>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                  <p className="text-gray-400 text-sm mb-4">Connect with me</p>
                  <div className="flex flex-wrap gap-3">
                    {social_handle.map((social, index) =>
                      social.enabled ? (
                        <motion.a
                          key={social._id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                          title={social.platform}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d={socialIcons[social.platform] || socialIcons.Github} />
                          </svg>
                        </motion.a>
                      ) : null
                    )}
                  </div>
                </div>
              </Transition>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Transition>
                <motion.form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                  <p className="text-gray-400 mb-8">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>

                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            borderColor: activeField === "name" ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.1)"
                          }}
                          className="relative rounded-xl border bg-white/5 overflow-hidden"
                        >
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField("name")}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-4 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                          />
                          {activeField === "name" && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                            />
                          )}
                        </motion.div>
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            borderColor: activeField === "email" ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.1)"
                          }}
                          className="relative rounded-xl border bg-white/5 overflow-hidden"
                        >
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField("email")}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-4 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                          />
                          {activeField === "email" && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Subject Input */}
                    <motion.div
                      animate={{ 
                        borderColor: activeField === "subject" ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.1)"
                      }}
                      className="relative rounded-xl border bg-white/5 overflow-hidden"
                    >
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("subject")}
                        onBlur={() => setActiveField(null)}
                        className="w-full px-4 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                      />
                      {activeField === "subject" && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                        />
                      )}
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      animate={{ 
                        borderColor: activeField === "message" ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.1)"
                      }}
                      className="relative rounded-xl border bg-white/5 overflow-hidden"
                    >
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        className="w-full px-4 py-4 bg-transparent text-white placeholder:text-gray-500 focus:outline-none resize-none"
                      />
                      {activeField === "message" && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                        />
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "SENDING"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative group py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === "SENDING" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>
                </motion.form>
              </Transition>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-xs sm:text-sm border-t border-white/5">
        <Transition>
          <div className="text-white/70">&copy; {new Date().getFullYear()} <span className="font-[family-name:var(--font-stylish)] text-sm sm:text-base">Bhavay Batra</span></div>
        </Transition>
        <Transition>
          <p className="text-white/70">
            developed by{" "}
            <Link
              href={"https://github.com/bhavayb"}
              className="hover:underline hover:text-white transition-colors"
            >
              Bhavay Batra
            </Link>
          </p>
        </Transition>
      </footer>
    </motion.section>
  );
};

export default Contact;

