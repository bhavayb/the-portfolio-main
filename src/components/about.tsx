"use client";

import { About as IAbout } from "../utils/interface";
import { Transition } from "./ui/Transitions";

interface AboutProps {
  about: IAbout;
}

const About = ({ about }: AboutProps) => {
  return (
    <section
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <Transition>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
              About <span className="text-orange-400">Me</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg">Get to know me better</p>
          </Transition>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Image Section */}
          <Transition className="order-2 md:order-1">
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto transition-transform duration-300 hover:-translate-y-1">
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-700 via-yellow-600 to-amber-700 rounded-2xl blur-lg opacity-18 group-hover:opacity-35 transition-opacity duration-300" />
              
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-l-2 sm:border-l-3 md:border-l-4 border-t-2 sm:border-t-3 md:border-t-4 border-orange-400/30 rounded-tl-xl sm:rounded-tl-2xl" />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-r-2 sm:border-r-3 md:border-r-4 border-b-2 sm:border-b-3 md:border-b-4 border-yellow-400/30 rounded-br-xl sm:rounded-br-2xl" />
              
              <div className="relative bg-card/65 backdrop-blur-xl border border-border rounded-xl sm:rounded-2xl overflow-hidden p-1.5 sm:p-2 transition-colors duration-300">
                <img
                  src={"2.jpeg"}
                  width={600}
                  height={600}
                  alt={about.name}
                  className="rounded-lg sm:rounded-xl w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-gradient-to-r from-orange-700 to-yellow-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-xl shadow-amber-400/20 border border-white/20">
                <span className="font-bold text-xs sm:text-sm md:text-base">Available for Work</span>
              </div>
            </div>
          </Transition>

          {/* Content Section */}
          <div className="order-1 md:order-2 space-y-6 sm:space-y-8">
            <Transition>
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <span className="text-orange-400 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-orange-400/8 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-orange-400/20">
                    Who I Am
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {about.name}
                </h3>
                
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  {about.description}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

