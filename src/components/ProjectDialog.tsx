"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
    >
      <div className="bg-black w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
        <div className="relative">
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/80 backdrop-blur-sm size-8 sm:size-10 rounded-full border border-white/40 grid place-items-center text-white z-10 hover:bg-white/10 transition-colors touch-manipulation active:scale-95"
            onClick={() => setSelectedProject(null)}
          >
            <XMark />
          </button>
          <img
            src={selectedProject.image.url}
            width={300}
            height={300}
            alt={selectedProject.title}
            className="w-full aspect-video sm:aspect-[16/9] md:aspect-[12/6] object-cover object-center"
          />
          <div className="p-4 sm:p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold">{selectedProject.title}</h5>
              <div className="flex items-center gap-3 sm:gap-4">
                <Link 
                  href={selectedProject.githuburl}
                  className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors touch-manipulation"
                >
                  <Github />
                </Link>
                <Link 
                  href={selectedProject.liveurl}
                  className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors touch-manipulation"
                >
                  <ExternalLink />
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {selectedProject.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-white/40 rounded-full text-xs sm:text-sm bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, tempora. Officiis eveniet harum nemo sed sint
              distinctio fugiat earum cumque aliquid in magnam nam odio
              molestias architecto veniam, asperiores voluptates?
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDialog;

