"use client";

import { motion } from "motion/react";
import { Timeline as ITimeline } from "../utils/interface";
import { formatDate } from "../utils";

interface WorkExperienceProps {
  timeline: ITimeline[];
}

const EntryCard = ({ item, index }: { item: ITimeline; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.45 }}
    className="relative pl-6"
  >
    {/* dot */}
    <div className="absolute left-0 top-5 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground ring-4 ring-background" />

    <div className="group p-5 rounded-sm bg-card border border-border hover:border-foreground/30 transition-all duration-300">
      {/* Date badge */}
      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-muted border border-border text-[10px] text-muted-foreground mb-3 uppercase tracking-widest font-mono">
        {formatDate(item.startDate).month} {formatDate(item.startDate).year}
        {" - "}
        {formatDate(item.endDate).month} {formatDate(item.endDate).year}
      </div>

      <h3 className="text-base font-bold text-foreground mb-1">{item.jobTitle}</h3>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
        {item.company_name && (
          <span className="font-medium text-foreground/80">{item.company_name}</span>
        )}
        {item.jobLocation && (
          <>
            {item.company_name && <span className="text-border">·</span>}
            <span>{item.jobLocation.trim()}</span>
          </>
        )}
      </div>

      {item.summary && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.summary}</p>
      )}

      {item.bulletPoints && item.bulletPoints.length > 0 && (
        <ul className="space-y-1.5">
          {item.bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-muted-foreground text-sm">
              <span className="mt-2 w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" />
              <span>{point.trim()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

const WorkExperience = ({ timeline }: WorkExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled)
    .sort((a, b) => a.sequence - b.sequence);

  const education = timeline
    .filter((line) => line.forEducation && line.enabled)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="py-24 sm:py-32 border-t border-border bg-background" id="experience">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Work Experience ── */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-foreground" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Work Experience</span>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <EntryCard key={exp._id} item={exp} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Education ── */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-foreground" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Education</span>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <EntryCard key={edu._id} item={edu} index={i} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkExperience;




