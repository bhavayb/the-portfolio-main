"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { About, SocialHandle } from "../utils/interface";

interface HeroProps {
  about: About;
  social: SocialHandle[];
}

const Hero = ({ about, social }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">

          {/* ── Avatar column — shown first on mobile, right on desktop ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="shrink-0 relative flex justify-center order-first lg:order-last"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full border border-border/40 scale-110 pointer-events-none" />
            {/* Inner border ring */}
            <div className="absolute inset-0 rounded-full border border-border pointer-events-none" />

            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden ring-2 ring-border">
              <Image
                src="/bbavatar.png"
                alt={about.name}
                fill
                sizes="(max-width: 480px) 160px, (max-width: 640px) 192px, (max-width: 768px) 240px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                style={{ objectPosition: '50% 15%' }}
                priority
              />
            </div>

            {/* Floating location tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1.5 shadow-sm whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground">{about.address}</span>
            </motion.div>
          </motion.div>

          {/* ── Text column ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left order-last lg:order-first">
            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                Available for work
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            >
              {about.name}
            </motion.h1>

            {/* Title bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-start items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-foreground/40" />
              <span className="text-sm sm:text-base font-medium text-muted-foreground tracking-wide">
                {about.title}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-muted-foreground leading-relaxed mb-10"
            >
              {about.subTitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-md hover:opacity-80 transition-opacity"
              >
                Let&apos;s talk
              </button>
              <button
                onClick={() => window.open("/batra-bhavay.pdf", "_blank")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border text-foreground rounded-md hover:bg-muted transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="12" x2="12" y2="18" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                View Resume
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex justify-center lg:justify-start items-center gap-4"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Find me</span>
              <div className="h-px w-6 bg-border" />
              <div className="flex flex-wrap gap-3">
                {social.filter(s => s.enabled).slice(0, 5).map(s => (
                  <a
                    key={s._id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground rotate-90 origin-center mb-4">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
