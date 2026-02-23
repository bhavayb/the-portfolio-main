"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Skill } from "../utils/interface";

interface SkillsProps {
  skills: Skill[];
}

function Skills({ skills }: SkillsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sort by percentage desc, then sequence
  const sorted = [...skills]
    .filter((s) => s.enabled)
    .sort((a, b) => b.percentage - a.percentage || a.sequence - b.sequence);

  // Deduplicate by lowercase name
  const seen = new Set<string>();
  const unique: Skill[] = [];
  for (const s of sorted) {
    const key = s.name.trim().toLowerCase();
    if (!seen.has(key)) { seen.add(key); unique.push(s); }
  }

  if (unique.length === 0) return null;

  // Priority order for Core Stack — important skills first
  const priority = [
    "next.js", "react", "react native", "typescript", "javascript",
    "node.js", "express", "postgresql", "mongodb",
  ];

  const coreRaw = [...unique].sort((a, b) => {
    const ai = priority.indexOf(a.name.trim().toLowerCase());
    const bi = priority.indexOf(b.name.trim().toLowerCase());
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  const core = coreRaw.slice(0, 8);

  // Opacity tier based on proficiency
  const chipOpacity = (pct: number) => {
    if (pct >= 90) return 1;
    if (pct >= 75) return 0.65;
    if (pct >= 60) return 0.45;
    return 0.3;
  };

  const tiers = [
    { label: "Expert",     count: unique.filter((s) => s.percentage >= 90).length },
    { label: "Proficient", count: unique.filter((s) => s.percentage >= 70 && s.percentage < 90).length },
    { label: "Familiar",   count: unique.filter((s) => s.percentage < 70).length },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header row */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-foreground" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Skills &amp; Technologies
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/40 hidden sm:block tabular-nums">
            {unique.length.toString().padStart(2, "0")} tools
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* ── Left: Core stack with progress bars ── */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
              — Core Stack
            </p>

            <div className="space-y-7">
              {core.map((skill, i) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                  onMouseEnter={() => setHoveredId(skill._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-sm font-semibold text-foreground tracking-wide">
                      {skill.name}
                    </span>
                    <span
                      className="font-mono text-xs tabular-nums transition-opacity duration-200"
                      style={{
                        opacity: hoveredId === skill._id ? 1 : 0.4,
                      }}
                    >
                      {skill.percentage}
                      <span className="text-[10px]">%</span>
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="relative h-px w-full bg-border">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-foreground"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.06 + 0.2,
                        duration: 0.9,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: All tools chip grid + tier summary ── */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
                — All Tools
              </p>

              <div className="flex flex-wrap gap-2">
                {unique.map((skill, i) => (
                  <motion.span
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: chipOpacity(skill.percentage), scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.25 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-sm font-mono text-xs uppercase tracking-wide text-foreground cursor-default select-none"
                  >
                    {/* Filled dot = expert tier */}
                    {skill.percentage >= 90 && (
                      <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
                    )}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tier summary strip */}
            <div className="mt-10 pt-6 border-t border-border grid grid-cols-3 gap-6">
              {tiers.map(({ label, count }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                >
                  <p className="font-mono text-3xl font-bold text-foreground tabular-nums leading-none">
                    {count.toString().padStart(2, "0")}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Skills;