"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Project {
  liveurl: string;
  githuburl: string;
  title: string;
  sequence: number;
  image: string;
  description: string;
  techStack: string[];
  _id: string;
  enabled: boolean;
}

// Hardcoded projects data
const projectsData: Project[] = [
  {
    liveurl: "https://playmuzi.vercel.app/",
    githuburl: "https://github.com/bhavayb/muzi",
    title: "Muzi - Interactive Music Collaboration Platform",
    sequence: 14,
    image: "/muzi.png",
    description: "Built a music streaming SaaS platform that enables democratic, real-time song selection for groups and live audiences. Users can add YouTube tracks to a shared queue, upvote songs to influence playback order, and view the currently playing track with automatic de-duplication to prevent repeats. Implemented secure Google authentication, REST APIs for stream and vote management, and a relational database schema to track users, queues, and upvotes. Integrated YouTube APIs for metadata retrieval and used long polling to keep the queue and playback state in sync across users. Deployed the application on Vercel with a managed PostgreSQL database.",
    techStack: ["TypeScript", "Next.js", "NextAuth", "PostgreSQL", "Docker", "Prisma"],
    _id: "project-1",
    enabled: true
  },
  {
    liveurl: "https://getsnapprice.vercel.app/",
    githuburl: "https://github.com/bhavayb/snapprice",
    title: "Deal Drop - Price Tracker & Notification System",
    sequence: 13,
    image: "/dealdrop.png",
    description: "Built a full-stack Next.js app with server-side rendering, web scraping, and interactive graphs. Implemented REST APIs for CRUD operations, designed a PostgreSQL database for products and historical price tracking with user-level access control, and added background jobs to monitor price changes and trigger automated notifications.",
    techStack: ["JavaScript", "Next.js", "PostgreSQL", "Web Scraping", "REST APIs", "Resend", "Tailwind CSS"],
    _id: "project-2",
    enabled: true
  },
  {
    liveurl: "https://dotruefeedback.vercel.app/",
    githuburl: "https://github.com/bhavayb/true-feedback",
    title: "true-feedback - Anonymous Feedback Platform",
    sequence: 13,
    image: "/truefeedback.png",
    description: "Built TrueFeedback, a full-stack anonymous messaging platform using Next.js with server-side rendering, Node.js, and MongoDB. Implemented credential-based authentication with OTP verification, secure session management, and REST APIs for user and message workflows. Designed a scalable messaging system using MongoDB aggregation pipelines for efficient querying and cleanup. Integrated AI-powered message suggestions with streaming responses and developed reusable, validated UI components with debounced inputs.",
    techStack: ["TypeScript", "Next.js", "MongoDB", "REST APIs", "Gemini AI", "Tailwind CSS"],
    _id: "project-3",
    enabled: true
  },
  {
    liveurl: "https://180dcbitmesra.in/",
    githuburl: "https://github.com/bhavayb/180DC-Web",
    title: "180DC - BIT Mesra",
    sequence: 13,
    image: "/image.png",
    description: "Designed and developed a college project for 180 Degrees Consulting BIT Mesra, building the organization's official website from scratch. Created a responsive React-based frontend with a clean layout and smooth navigation. Translated team requirements into a functional, production-ready site suitable for public use. Focused on performance, accessibility, and overall user experience throughout development.",
    techStack: ["JavaScript", "React.js", "MongoDB", "Cloudinary", "REST APIs", "Vercel", "Tailwind CSS"],
    _id: "project-4",
    enabled: true
  },
  {
    liveurl: "https://rnyclothing.in/",
    githuburl: "https://github.com/bhavayb/clothing-website",
    title: "RNY Clothing E-commerce Platform",
    sequence: 13,
    image: "/rny.png",
    description: "Built RNY Clothing during my internship, a full-stack e-commerce web application using Next.js, React, Node.js, and MongoDB. Implemented responsive product listings, user authentication, and cart and order management with RESTful APIs. Designed and managed scalable database schemas for products, users, and orders. Developed separate user and admin dashboards to handle product management, orders, and users, with secure backend logic and state-driven frontend updates.",
    techStack: ["JavaScript", "React.js", "MongoDB", "Cloudinary", "REST APIs", "Vercel", "Tailwind CSS"],
    _id: "project-5",
    enabled: true
  }
];
function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 sm:py-32 border-t border-border bg-background" id="projects">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-foreground" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Selected Projects</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => {
            const isLastSingle = index === projectsData.length - 1 && projectsData.length % 2 === 1;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={isLastSingle ? "md:col-span-2 md:max-w-[calc(50%-0.75rem)]" : ""}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;

// Modal Component
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-sm shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors bg-background"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{project.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-xs border border-border rounded-sm text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <a
              href={project.githuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-border rounded-sm py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href={project.liveurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background rounded-sm py-2.5 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer border border-border rounded-sm overflow-hidden hover:border-foreground/30 transition-all duration-300 bg-card"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-background/92 flex flex-col justify-end p-5"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Click to view details</p>
          <h4 className="text-base font-bold text-foreground mb-2">{project.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{project.title}</h3>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {project.techStack.slice(0, 3).map((t, i) => (
              <span key={i} className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
                {t}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{project.techStack.length - 3}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4 shrink-0">
          <a
            href={project.githuburl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={project.liveurl} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
