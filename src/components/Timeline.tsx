"use client";

import { motion } from "motion/react";
import { Timeline as ITimeline } from "../utils/interface";
import { formatDate } from "../utils";

interface ExperienceProps {
  timeline: ITimeline[];
}

const Timeline = ({ timeline }: ExperienceProps) => {
  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="py-24 sm:py-32 border-t border-border bg-background" id="education">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-foreground" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Education</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10 sm:space-y-14">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-0 top-5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground ring-4 ring-background" />

                {/* Card */}
                <div className="group p-5 sm:p-6 rounded-sm bg-card border border-border hover:border-foreground/30 transition-all duration-300">
                  {/* Date badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-muted border border-border text-xs text-muted-foreground mb-4 uppercase tracking-widest">
                    {formatDate(edu.startDate).month} {formatDate(edu.startDate).year}
                    {" — "}
                    {formatDate(edu.endDate).month} {formatDate(edu.endDate).year}
                  </div>

                  {/* Degree / Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {edu.jobTitle}
                  </h3>

                  {/* Institution + Location */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground/80">{edu.company_name}</span>
                    {edu.jobLocation && (
                      <>
                        <span className="text-border">·</span>
                        <span>{edu.jobLocation}</span>
                      </>
                    )}
                  </div>

                  {/* Summary */}
                  {edu.summary && (
                    <p className="text-muted-foreground text-sm leading-relaxed">{edu.summary}</p>
                  )}

                  {/* Bullet Points */}
                  {edu.bulletPoints && edu.bulletPoints.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <span className="mt-2 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

