"use client";

import { motion } from "motion/react";
import { About as IAbout } from "../utils/interface";

interface AboutProps {
  about: IAbout;
}

const About = ({ about }: AboutProps) => {
  const stats = [
    { label: "Years Experience", value: `${about.exp_year}+` },
    { label: "Projects Shipped", value: `${about.some_total}+` },
    { label: "Based in",         value: about.address ?? "India" },
  ];

  const info: [string, string][] = [
    ["name",   about.name],
    ["role",   about.title],
    ["status", "Available for work"],
    ["loc",    about.address ?? "India"],
    ["email",  about.contactEmail ?? "—"],
    ["degree", "BTech (pre-final)"],
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-8 bg-foreground" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">About me</span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── Left: bio ── lg:col-span-3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3 space-y-8"
          >
            <p className="text-muted-foreground leading-[1.85] text-base sm:text-lg max-w-2xl">
              {about.description}
            </p>

            {about.quote && (
              <blockquote className="relative pl-5 border-l-2 border-foreground">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  &ldquo;{about.quote}&rdquo;
                </p>
              </blockquote>
            )}

            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/40 pb-0.5 hover:border-foreground transition-colors"
            >
              Start a conversation
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right: terminal info card ── lg:col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-sm border border-border overflow-hidden">
              {/* Terminal titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  profile.json
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-foreground/15" />
                  <span className="w-2 h-2 rounded-full bg-foreground/30" />
                  <span className="w-2 h-2 rounded-full bg-foreground/60" />
                </div>
              </div>

              {/* Key-value rows */}
              <div className="divide-y divide-border font-mono text-sm">
                {info.map(([key, val], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
                    className="flex items-baseline px-4 py-3 gap-4 hover:bg-muted/40 transition-colors"
                  >
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground w-14 shrink-0">
                      {key}
                    </span>
                    <span className="text-foreground/90 text-xs leading-snug break-all">
                      {val}
                      {key === "status" && (
                        <span className="ml-1 inline-block w-1 h-3 bg-foreground animate-pulse align-middle" />
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 border border-border rounded-sm divide-y sm:divide-y-0 sm:divide-x divide-border"
        >
          {stats.map((s, i) => (
            <div key={i} className="px-6 py-5 group hover:bg-muted/40 transition-colors">
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {s.value}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;