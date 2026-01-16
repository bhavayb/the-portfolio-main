"use client";

import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "../utils/cn";
import { Project } from "../utils/interface";
import { Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";

interface FilterProps {
  projects: Project[];
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

const Filters = ({ projects, filterValue, setFilterValue }: FilterProps) => {
  const techStack = projects.flatMap((filter) =>
    filter.techStack.map((val) => val.trim())
  );
  const filters = Array.from(new Set(techStack));

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 py-4 sm:py-6 md:py-8 justify-center flex-wrap px-2">
      <Transition viewport={{ once: true }}>
        <button
          className={cn(
            "border border-white/30 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full relative text-sm sm:text-base touch-manipulation active:scale-95 transition-transform",
            filterValue === "all" && "text-black border-transparent"
          )}
          onClick={() => setFilterValue("all")}
        >
          {filterValue === "all" && (
            <motion.span
              transition={{ type: "spring", bounce: 0.3 }}
              exit={{ type: "spring" }}
              layoutId="active-filter"
              className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
            />
          )}
          <TextReveal>All</TextReveal>
        </button>
      </Transition>
      {filters.map((filter, index) => (
        <Transition
          key={index}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setFilterValue(filter)}
            animate={{ color: filterValue === filter ? "black" : "" }}
            transition={{ delay: 0.4 }}
            className="relative border border-white/20 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-sm sm:text-base touch-manipulation active:scale-95 transition-transform"
          >
            {filterValue === filter && (
              <motion.span
                transition={{ type: "spring", bounce: 0.3 }}
                exit={{ type: "spring" }}
                layoutId="active-filter"
                className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
              />
            )}
            <TextReveal>{filter}</TextReveal>
          </motion.button>
        </Transition>
      ))}
    </div>
  );
};

export default Filters;

