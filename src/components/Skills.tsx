"use client";

import Image from "next/image";
import { Skill } from "../utils/interface";
import { motion } from "framer-motion";

interface SkillsProps {
  skills: Skill[];
}

// Priority skills to show first
const prioritySkills = [
  "Next.js", "Nextjs", "Next js",
  "React", "React.js", "Reactjs",
  "TypeScript", "Typescript",
  "JavaScript", "Javascript",
  "Node.js", "Nodejs", "Node",
  "Express", "Express.js",
  "MongoDB", "Mongo",
  "PostgreSQL", "Postgres",
  "Tailwind", "Tailwind CSS",
  "Prisma",
  "Docker",
  "Git", "GitHub"
];


function Skills({ skills }: SkillsProps) {
  // Sort skills: priority skills first, then the rest
  const sortedSkills = [...skills].sort((a, b) => {
    const aIndex = prioritySkills.findIndex(p =>
      a.name.toLowerCase().includes(p.toLowerCase())
    );
    const bIndex = prioritySkills.findIndex(p =>
      b.name.toLowerCase().includes(p.toLowerCase())
    );
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  // Deduplicate by name and filter enabled
  const uniqueMap = new Map<string, Skill>();
  for (const s of sortedSkills) {
    const key = s.name.trim().toLowerCase();
    if (!uniqueMap.has(key) && s.enabled) uniqueMap.set(key, s);
  }
  const enabledSkills = Array.from(uniqueMap.values());

  // Split skills into two rails
  const mid = Math.ceil(enabledSkills.length / 2);
  const rail1 = enabledSkills.slice(0, mid);
  const rail2 = enabledSkills.slice(mid);

  // Helper to render a skill card
  const SkillCard = (skill: Skill) => (
    <div
      key={skill._id}
      className="flex flex-col items-center justify-start flex-shrink-0 group w-[120px] sm:w-[140px] md:w-[160px]"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-cyan-500/10 border border-cyan-600/30 backdrop-blur-sm group-hover:bg-transparent group-hover:border-cyan-500/60 group-hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center p-3">
        <div className="relative w-full h-full">
          <Image
            src={skill.image.url}
            alt={skill.name}
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      </div>
      <span className="mt-3 text-sm font-semibold text-white/80 group-hover:text-white transition-colors text-center w-full px-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );

  // Animation durations scale with count for smoothness, but are faster (smaller multiplier)
  const duration1 = Math.max(12, rail1.length * 1.1);
  const duration2 = Math.max(12, rail2.length * 1.1);

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-transparent via-purple-950/10 to-transparent relative">
      <span className="blob absolute top-[30%] right-0 w-1/4 h-2/3 blur-[80px] rotate-180 -z-20 opacity-12" />
      <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(6,182,212,0.2)]">
          Skills & <span className="text-cyan-400">Technologies</span>
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4" />
        <p className="text-gray-400 text-base sm:text-lg">Technologies I work with</p>
      </div>

      {/* Two animated rails: one left-to-right, one right-to-left */}
      <div className="space-y-8 md:space-y-12">
        {/* Top rail: left to right */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-nowrap gap-8 md:gap-12 items-start"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: duration1,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {rail1.map(SkillCard)}
          </motion.div>
        </div>
        {/* Bottom rail: right to left */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-nowrap gap-8 md:gap-12 items-start"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: duration2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {rail2.map(SkillCard)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;