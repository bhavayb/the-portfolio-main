"use client";

import Link from "next/link";
import { StarField } from "./ui/StarField";
import { TerminalAnimation } from "./ui/TerminalAnimation";
import { TechGrid } from "./ui/TechGrid";
import { ScrollIndicator } from "./ui/ScrollIndicator";

import { About, SocialHandle } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";
import { ArrowUpRight } from "./ui/Icons";
import LoaderWrapper from "./LoaderWrapper";

interface HeroProps {
  about: About;
  social: SocialHandle[];
}

// Platform-specific icon components
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconClass = "w-5 h-5 sm:w-6 sm:h-6 relative z-10";
  
  switch (platform.toLowerCase()) {
    case 'github':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'x (twitter)':
    case 'twitter':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'leetcode':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15v6l5 3 .75-1.23-4.25-2.52V7h-1.5z"/>
        </svg>
      );
  }
};

// Platform-specific styling
const getPlatformStyle = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return "bg-slate-900/6 border-cyan-600/20 hover:border-cyan-500/40 text-white/80 hover:text-white";
    case 'github':
      return "bg-slate-900/6 border-cyan-600/20 hover:border-cyan-500/40 text-white/80 hover:text-white";
    case 'x (twitter)':
    case 'twitter':
      return "bg-slate-900/6 border-cyan-500/18 hover:border-cyan-400/40 text-white/75 hover:text-white";
    case 'leetcode':
      return "bg-slate-900/6 border-cyan-600/20 hover:border-cyan-500/40 text-white/80 hover:text-white";
    default:
      return "bg-slate-900/6 border-cyan-600/20 hover:border-cyan-500/40 text-white/80 hover:text-white";
  }
};

const Hero = ({ about, social }: HeroProps) => {
  return (
    <section className="min-h-dvh w-full overflow-hidden relative bg-black px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <StarField />
      <TechGrid />
      
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[120px] opacity-40" />
      </Transition>
      
      {/* Terminal Animation */}
      <TerminalAnimation />
      
      <LoaderWrapper>
        <div className="relative h-full w-full z-10">
          <div className="flex items-center justify-center flex-col min-h-dvh py-20 sm:py-16 md:py-10">
            <Transition>
              <div className="relative group">
                {/* Rotating tech rings */}
                <div className="absolute inset-0 -m-4 sm:-m-6 md:-m-8">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-700/15" />
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-600/12" />
                </div>
                
                {/* Glowing pulse effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 rounded-full blur-lg opacity-15" />
                
                {/* Profile image container with hexagon clip */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                  <img
                    src={"profile.png"}
                    alt={about.name}
                    className="rounded-full size-24 xs:size-28 sm:size-32 md:size-40 object-cover border-4 border-cyan-500/20 shadow-2xl shadow-cyan-600/20 relative z-10 group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Tech corner accents */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-cyan-500 rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg" />
                </div>
              </div>
            </Transition>
            
            <div className="py-4 sm:py-6 md:py-8 flex items-center flex-col px-2">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold overflow-hidden bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(6,182,212,0.22)] text-center">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
              </h2>
              <h1 className="text-base xs:text-lg sm:text-xl md:text-3xl overflow-hidden mt-2 sm:mt-3 font-medium text-white flex items-center gap-2 text-center">
                <SlideIn>
                  <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                  {about.title}
                </SlideIn>
              </h1>
            </div>
            <Transition viewport={{ once: true }} className="w-full">
              <p className="text-white/80 text-sm sm:text-base md:text-lg py-2 sm:py-4 w-11/12 sm:w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-1.5 sm:gap-2 leading-relaxed text-center">
                {about.subTitle.split(" ").map((word, index) => (
                  <span 
                    key={index} 
                    className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] transition-all duration-200 cursor-default"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </Transition>
            
            <Transition viewport={{ once: true }}>
              <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full px-4 xs:px-0 xs:w-auto">
                <Link
                  href={"#contact"}
                  className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg overflow-hidden group bg-slate-800 border border-cyan-600/20 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-102 hover:border-cyan-500/40 w-full xs:w-auto min-w-[140px] text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-500 opacity-0 group-hover:opacity-12 transition-opacity" />
                  <TextReveal>Let&apos;s talk</TextReveal>
                  <ArrowUpRight />
                  <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/30 rounded-lg transition-all duration-300" />
                </Link>
                <a
                  href="/batra-bhavay.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-cyan-600/30 hover:border-cyan-500 flex items-center justify-center gap-2 group backdrop-blur-sm bg-transparent transition-all duration-200 hover:scale-103 overflow-hidden w-full xs:w-auto min-w-[140px] text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/6 to-cyan-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <TextReveal>View Resume</TextReveal>
                  <ArrowUpRight />
                </a>
              </div>
            </Transition>
            <Transition viewport={{ once: true }} className="mt-8 sm:mt-10 md:mt-12">
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
                {social.filter(s => s.enabled).map((s) => (
                  <a
                    key={s._id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-3 sm:p-4 rounded-lg transition-all hover:scale-105 active:scale-95 transform duration-200 backdrop-blur-sm group overflow-hidden touch-manipulation ${getPlatformStyle(s.platform)}`}
                    aria-label={s.platform}
                  >
                    <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            </Transition>
          </div>
        </div>
      </LoaderWrapper>
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;

