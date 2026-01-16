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
const Contact = ({ email, social_handle, about }: ContactProps) => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");

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
    <motion.section className="relative" id="contact">
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[300px] z-50 h-16 rounded-xl bg-white flex items-center",
              status === "ERROR"
                ? "bg-red-500"
                : status === "DONE"
                ? "bg-green-400"
                : ""
            )}
          >
            <p className="text-black font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <div className="p-4 sm:p-6 md:p-8 lg:px-16">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(6,182,212,0.25)]">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-gray-400 text-base sm:text-lg">Let&apos;s work together</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:pt-16 max-w-6xl mx-auto">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Transition className="w-full">
                <Input
                  id="name"
                  name="name"
                  placeholder="Full name"
                  className="border-0 border-b rounded-none text-base"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="border-0 border-b rounded-none text-base"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter the subject"
                  className="border-0 border-b rounded-none"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] sm:min-h-[120px] rounded-none border-0 border-b resize-none text-base"
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-6 sm:px-8 py-2.5 sm:py-2 rounded-3xl relative overflow-hidden touch-manipulation active:scale-95 text-sm sm:text-base text-white hover:bg-white/10 transition-colors"
                  type="submit"
                >
                  <TextReveal className="uppercase">
                    {status === "SENDING" ? "Sending..." : "discuss project"}
                  </TextReveal>
                </motion.button>
              </Transition>
            </div>
          </form>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90 text-sm sm:text-base">Get in touch</span>
              </Transition>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-2 break-all sm:break-normal text-white">
                <Transition>
                  <TextReveal>{email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80 text-sm sm:text-base">{about.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80 text-sm sm:text-base">{about.address}</div>
              </Transition>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-8 mt-auto md:pb-16">
              {social_handle.map((social, index) =>
                social.enabled ? (
                  <Transition
                    key={social._id}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={social.url} target="_blank" className="text-white hover:text-cyan-400 transition-colors">
                      <TextReveal>{social.platform}</TextReveal>
                    </Link>
                  </Transition>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-xs sm:text-sm border-t border-white/5">
        <Transition>
          <div className="text-white/70">&copy; {new Date().getFullYear()} ThePortfolio</div>
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

