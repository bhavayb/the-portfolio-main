"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { SocialHandle } from "../utils/interface";
import { TextReveal } from "./ui/Typography";
import { useMediaQuery } from "../utils/useMediaQuery";
import Link from "next/link";
import { ArrowUpRight } from "./ui/Icons";
import { Transition } from "./ui/Transitions";

interface HeaderProps {
  social: SocialHandle[];
}
const Header = ({ social }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MotionLink = motion.create(Link);

  const variants = {
    open: {
      clipPath: `inset(0% 0% 0% 0% round ${isMobile ? 0 : "24px"})`,
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      clipPath: `inset(5% 12% 93% 85% round ${isMobile ? 0 : "24px"})`,
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <>
      {/* Scrolled Navbar - Always visible on mobile, scroll-triggered on desktop */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isMobile ? 0 : (isScrolled ? 0 : -100) }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-cyan-600/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={"/"} className="text-sm sm:text-base font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.25)]">
              ThePortfolio
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-semibold"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Mobile Navigation + Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Nav Links */}
              <div className="flex md:hidden items-center gap-1 xs:gap-2 overflow-x-auto scrollbar-hide">
                {navLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-xs font-medium px-2 py-1 rounded-full hover:bg-white/10 whitespace-nowrap"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              
              {/* Social Icons - Hidden on very small screens */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 border-l border-white/10 pl-2 sm:pl-3 ml-1">
              {social.filter(s => s.enabled).slice(0, 4).map((handle) => {
                const iconMap: Record<string, string> = {
                  Github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  "X (Twitter)": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  Twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  Leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
                  Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                };
                const icon = iconMap[handle.platform] || iconMap.Github;
                
                return (
                  <a
                    key={handle._id}
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 border border-cyan-600/20 hover:bg-cyan-600/10 hover:border-cyan-500/50 text-white/80 hover:text-white transition-all hover:scale-110 duration-300"
                    aria-label={handle.platform}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={icon}/>
                    </svg>
                  </a>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Original Header - Hidden on mobile since navbar is always visible */}
      <motion.header className="hidden md:block fixed top-0 md:mt-12 md:mr-12 right-0 z-20">
        <Transition className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-30">
          <Link href={"/"}>
            <TextReveal className="font-semibold text-sm sm:text-base">ThePortfolio</TextReveal>
          </Link>
        </Transition>
        <motion.div
          initial={false}
          animate={isActive ? "open" : "closed"}
          variants={variants}
          className="absolute top-0 right-0 md:-top-6 md:-right-6 w-dvw md:w-[480px] h-dvh md:h-[calc(100dvh_-_2.5rem)] bg-primary overflow-y-auto"
        >
          {isActive && (
            <nav className="flex justify-between flex-col w-full h-full px-6 sm:px-10 pt-20 sm:pt-[100px] pb-8 sm:pb-[50px]">
              <div className="flex gap-2 flex-col">
                {navLinks.map((link, i) => {
                  const { title, href } = link;
                  return (
                    <div
                      key={`b_${i}`}
                      className=""
                      onClick={() => setIsActive(false)}
                    >
                      <Link
                        href={href}
                        className="flex flex-wrap overflow-hidden"
                      >
                        <motion.div
                          variants={perspective}
                          custom={i}
                          initial="initial"
                          animate="enter"
                          whileHover="whileHover"
                          whileTap="whileHover"
                          exit="exit"
                          className="text-3xl sm:text-4xl md:text-5xl text-background flex items-center justify-between"
                        >
                          <motion.span
                            variants={{
                              initial: { x: -20 },
                              whileHover: { x: 0 },
                            }}
                          >
                            <ArrowUpRight />
                          </motion.span>
                          <motion.span
                            variants={{
                              initial: { x: 0 },
                              whileHover: { x: 20 },
                            }}
                          >
                            {title}
                          </motion.span>
                        </motion.div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <motion.div className="flex flex-wrap">
                {social.map((link, i) => {
                const { platform, _id, url } = link;
                return (
                  <MotionLink
                    href={url}
                    target="_blank"
                    className=" w-1/2 mt-1 text-background"
                    variants={slideIn}
                    custom={i}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key={_id}
                  >
                    <TextReveal>{platform}</TextReveal>
                  </MotionLink>
                );
              })}
            </motion.div>
          </nav>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: isScrolled ? 0 : 1,
          scale: isScrolled ? 0.8 : 1,
          pointerEvents: isScrolled ? "none" : "auto"
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
          isScrolled={isScrolled}
        />
      </motion.div>
    </motion.header>
    </>
  );
};

export default Header;

function Button({
  isActive,
  toggleMenu,
  isScrolled,
}: {
  isActive: boolean;
  toggleMenu: () => void;
  isScrolled: boolean;
}) {
  return (
    <div className="absolute top-3 sm:top-4 md:top-0 right-3 sm:right-4 md:right-0 w-20 sm:w-[100px] h-9 sm:h-10 rounded-full overflow-hidden cursor-pointer touch-manipulation">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="bg-primary h-full w-full grid place-items-center text-black text-sm sm:text-base"
          onClick={() => {
            toggleMenu();
          }}
        >
          <TextReveal>{isScrolled ? "Navbar" : "Menu"}</TextReveal>
        </motion.div>
        <motion.div
          className="bg-black h-full w-full grid place-items-center text-sm sm:text-base text-white"
          onClick={() => {
            toggleMenu();
          }}
        >
          <TextReveal>Close</TextReveal>
        </motion.div>
      </motion.div>
    </div>
  );
}

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const perspective = {
  initial: {
    y: 50,
  },
  enter: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

