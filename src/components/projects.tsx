"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Transition } from "./ui/Transitions";

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
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative" id="projects">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Transition>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
              My <span className="text-orange-400">Projects</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              Here are some of my recent works
            </p>
          </Transition>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {projectsData.map((project, index) => {
            // Check if this is the last item and if total count is odd (single item in last row)
            const isLastSingleItem = index === projectsData.length - 1 && projectsData.length % 2 === 1;
            
            return (
              <Transition
                key={project._id}
                transition={{ delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                className={isLastSingleItem ? "md:col-span-2 md:max-w-[calc(50%-1.25rem)] md:mx-auto" : ""}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </Transition>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-background/70 hover:bg-background rounded-full text-foreground transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        <div className="relative aspect-video w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{project.title}</h2>
          
          {/* Description */}
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-orange-400/10 text-orange-400 rounded-full text-sm border border-orange-400/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.githuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground py-3 px-6 rounded-xl transition-colors duration-300 font-medium"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <a
              href={project.liveurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-orange-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-xl transition-colors duration-300 font-medium"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="bg-card/70 border border-border rounded-xl overflow-hidden hover:border-orange-400/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-video overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay with Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/90 flex flex-col justify-center p-5 sm:p-6"
        >
          {/* Project Label */}
          <span className="text-orange-400 text-xs font-medium uppercase tracking-wider mb-2">
            Click to view details
          </span>
          
          {/* Title */}
          <h4 className="text-foreground font-bold text-xl sm:text-2xl mb-3">{project.title}</h4>
          
          {/* Divider */}
          <div className="w-12 h-0.5 bg-orange-400 mb-4"></div>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-white/10 text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-400/30"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-1.5">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card Footer */}
      <div className="p-4 sm:p-5">
        <h3 className="text-foreground font-semibold text-lg mb-4">{project.title}</h3>
        
        {/* Buttons */}
        <div className="flex gap-3">
          {/* GitHub Button */}
          <a
            href={project.githuburl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground py-2.5 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          
          {/* Live Project Button */}
          <a
            href={project.liveurl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-yellow-400 text-black py-2.5 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

