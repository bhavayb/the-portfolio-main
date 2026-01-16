"use client";

import Image from "next/image";
import { Skill } from "../utils/interface";
import { ParallaxText } from "./ui/ParallaxText";

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
    
    // If both are priority skills, sort by priority order
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // If only a is priority, it comes first
    if (aIndex !== -1) return -1;
    // If only b is priority, it comes first
    if (bIndex !== -1) return 1;
    // Otherwise keep original order
    return 0;
  });

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
      <span className="blob absolute top-[30%] right-0 w-1/4 h-2/3 blur-[80px] rotate-180 -z-20 opacity-12" />
      <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(6,182,212,0.2)]">
          Skills & <span className="text-cyan-400">Technologies</span>
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4" />
        <p className="text-gray-400 text-base sm:text-lg">Technologies I work with</p>
      </div>
      <ParallaxText baseVelocity={-3}>
        {sortedSkills.map((skill) =>
          skill.enabled ? (
            <div
              key={skill._id}
              className="inline-flex flex-col items-center mx-4 sm:mx-6 md:mx-8 lg:mx-12 group"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-600/10 to-cyan-500/10 border border-cyan-600/30 backdrop-blur-sm group-hover:bg-transparent group-hover:from-cyan-600/12 group-hover:to-cyan-500/12 group-hover:border-cyan-500/60 group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-cyan-600/20">
                <Image
                  src={skill.image.url}
                  alt={skill.name}
                  fill
                  className="object-contain p-1.5 sm:p-2"
                />
              </div>
              <span className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-semibold text-white/75 group-hover:text-white transition-colors text-center max-w-[80px] sm:max-w-none truncate">
                {skill.name}
              </span>
            </div>
          ) : null
        )}
      </ParallaxText>
    </section>
  );
}

export default Skills;

