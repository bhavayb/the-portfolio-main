"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GITHUB_USER = "bhavayb";
const LEETCODE_USER = "bhavay_b";

export default function CodingStats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  /* ── GitHub activity graph ── */
  const ghBg    = isDark ? "0a0a0a"  : "fafafa";
  const ghColor = isDark ? "666666"  : "999999";
  const ghLine  = isDark ? "cccccc"  : "111111";
  const githubGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&bg_color=${ghBg}&color=${ghColor}&line=${ghLine}&point=${ghLine}&area=true&hide_border=true&radius=0`;

  /* ── LeetCode card ── */
  const leetTheme = isDark ? "dark" : "light";
  const leetcodeUrl = `https://leetcard.jacoblin.cool/${LEETCODE_USER}?theme=${leetTheme}&font=monospace&hide_border=true&ext=heatmap`;

  return (
    <section className="py-24 sm:py-32 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-foreground" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Coding Activity
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/40 hidden sm:block">
            GitHub · LeetCode
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* ── GitHub Activity Graph (wider) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 border border-border rounded-sm overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                — GitHub Contributions
              </span>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                @{GITHUB_USER} ↗
              </a>
            </div>

            <div className="p-4 bg-background flex items-center justify-center min-h-[180px]">
              {mounted ? (
                <img
                  src={githubGraphUrl}
                  alt="GitHub Activity Graph"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="w-full h-36 animate-pulse bg-muted/30 rounded-sm" />
              )}
            </div>
          </motion.div>

          {/* ── LeetCode Stats Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 border border-border rounded-sm overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                — LeetCode Stats
              </span>
              <a
                href={`https://leetcode.com/u/${LEETCODE_USER}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                @{LEETCODE_USER} ↗
              </a>
            </div>

            <div className="p-4 bg-background flex items-center justify-center min-h-[180px]">
              {mounted ? (
                <img
                  src={leetcodeUrl}
                  alt="LeetCode Stats"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="w-full h-36 animate-pulse bg-muted/30 rounded-sm" />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
