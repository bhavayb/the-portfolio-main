"use client";

import { motion } from "motion/react";
import { Timeline as ITimeline } from "../utils/interface";
import { Transition } from "./ui/Transitions";
import { formatDate } from "../utils";

interface WorkExperienceProps {
  timeline: ITimeline[];
}

const WorkExperience = ({ timeline }: WorkExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8" id="experience">
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16">
          <Transition>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
              Work <span className="text-orange-400">Experience</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg">Professional journey and contributions</p>
          </Transition>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 via-yellow-400/50 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((exp, index) => (
              <Transition key={exp._id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative pl-12 md:pl-0 md:flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                >
                  <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 ring-4 ring-[#2d1600] shadow-lg shadow-amber-400/30" />
                  </div>

                  <div
                    className={`group p-5 sm:p-6 rounded-2xl bg-card/70 border border-border hover:border-amber-400/40 transition-all duration-300 hover:bg-card/90 hover:-translate-y-1 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-400/10 border border-amber-400/30 text-orange-300 text-xs sm:text-sm mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(exp.startDate).month} {formatDate(exp.startDate).year} - {formatDate(exp.endDate).month} {formatDate(exp.endDate).year}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-amber-300 transition-colors">
                      {exp.jobTitle}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-foreground/80">{exp.company_name}</span>
                      </div>
                      {exp.jobLocation && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{exp.jobLocation}</span>
                        </div>
                      )}
                    </div>

                    {exp.summary && (
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {exp.summary}
                      </p>
                    )}

                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {exp.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </Transition>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;