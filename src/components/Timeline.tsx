"use client";

import { motion } from "motion/react";
import { Timeline as ITimeline } from "../utils/interface";
import { Transition } from "./ui/Transitions";
import { formatDate } from "../utils";

interface ExperienceProps {
  timeline: ITimeline[];
}

const Timeline = ({ timeline }: ExperienceProps) => {
  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8" id="education">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Transition>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(6,182,212,0.22)]">
              Education <span className="text-cyan-400">Journey</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4" />
            <p className="text-gray-400 text-base sm:text-lg">My academic background</p>
          </Transition>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />

          {/* Education Items */}
          <div className="space-y-8 sm:space-y-12">
            {education.map((edu, index) => (
              <Transition key={edu._id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 sm:pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-8 top-2 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-black shadow-lg shadow-cyan-500/30" />
                  </div>

                  {/* Card */}
                  <div className="group p-5 sm:p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 hover:bg-gray-900/70">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(edu.startDate).month} {formatDate(edu.startDate).year} - {formatDate(edu.endDate).month} {formatDate(edu.endDate).year}
                    </div>

                    {/* Degree/Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {edu.jobTitle}
                    </h3>

                    {/* Institution */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        <span className="font-medium text-white/80">{edu.company_name}</span>
                      </div>
                      {edu.jobLocation && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{edu.jobLocation}</span>
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    {edu.summary && (
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                        {edu.summary}
                      </p>
                    )}

                    {/* Bullet Points */}
                    {edu.bulletPoints && edu.bulletPoints.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {edu.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
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

export default Timeline;

