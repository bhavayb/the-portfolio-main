"use client";

import Link from "next/link";

import { Service } from "../utils/interface";
import { Transition } from "./ui/Transitions";

interface ServiceProps {
  services: Service[];
}

function Services({ services }: ServiceProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <Transition>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
              How I Can <span className="text-orange-400">Help You</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Expert services tailored to bring your vision to life
            </p>
          </Transition>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Transition 
              key={service._id}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group relative bg-card/70 backdrop-blur-xl border border-border hover:border-amber-400/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/16 hover:-translate-y-1 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-700 to-yellow-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
                
                {/* Icon/Image */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-400/14 to-yellow-400/12 border border-orange-400/30 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {getServiceIcon(service.name)}
                  </div>
                  {/* Accent dot */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-foreground/75 leading-relaxed text-sm sm:text-base">
                    {service.desc}
                  </p>

                  {/* Price */}
                  <div className="pt-3 sm:pt-4 border-t border-cyan-600/18">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs sm:text-sm font-medium">Starting at</span>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                        {service.charge}
                      </span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-b-2xl" />
              </div>
            </Transition>
          ))}
        </div>

        {/* CTA Button */}
        <Transition className="flex justify-center mt-10 sm:mt-12 md:mt-16">
          <Link
            href={"#contact"}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-secondary border border-cyan-600/24 rounded-full text-foreground font-semibold overflow-hidden transition-all duration-200 hover:scale-103 text-sm sm:text-base touch-manipulation active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Let's Discuss Your Project
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </Transition>
      </div>
    </section>
  );
}

export default Services;

const getServiceIcon = (name: string) => {
  const key = name.toLowerCase();

  if (key.includes("design")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h7l9 9-7 7-9-9V4z" />
        <path d="M14 4l6 6" />
        <circle cx="9" cy="9" r="2" />
      </svg>
    );
  }

  if (key.includes("development") || key.includes("app")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M8 10l-2 2 2 2" />
        <path d="M16 14l2-2-2-2" />
      </svg>
    );
  }

  if (key.includes("brand") || key.includes("strategy")) {
    return (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M7.5 12h9" />
        <path d="M12 7.5v9" />
        <path d="M5 5l4 4" />
        <path d="M15 15l4 4" />
      </svg>
    );
  }

  return (
    <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
      <path d="M9 17h3" />
    </svg>
  );
};

