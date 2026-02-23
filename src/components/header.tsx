"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { SocialHandle } from "../utils/interface";

function ISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-muted-foreground/60 tabular-nums px-3 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      IST {time}
    </span>
  );
}

interface HeaderProps {
  social: SocialHandle[];
}

const navLinks = [
  { title: "About",      href: "#about" },
  { title: "Experience", href: "#experience" },
  { title: "Skills",     href: "#skills" },
  { title: "Projects",   href: "#projects" },
  { title: "Contact",    href: "#contact" },
];

const Header = ({ social }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top navbar */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-border bg-background/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="px-4 py-1.5 text-sm font-bold tracking-tight text-foreground hover:opacity-60 transition-opacity rounded-full"
          >
            BB<span className="text-muted-foreground font-normal">.</span>
          </Link>

          <span className="w-px h-4 bg-border mx-1 hidden sm:block" />

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-background bg-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          <span className="w-px h-4 bg-border mx-1 hidden sm:block" />

          <ISTClock />

          <span className="w-px h-4 bg-border mx-1 hidden sm:block" />

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="sm:hidden ml-1 w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-4 h-px bg-foreground" />
            <span className="block w-4 h-px bg-foreground" />
          </button>
        </motion.header>
      </div>

      {/* Mobile slide-down sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="sheet"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 inset-x-0 z-50 sm:hidden bg-background border-b border-border rounded-b-2xl pb-6 pt-4 px-4"
            >
              {/* Close row */}
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-sm font-bold text-foreground">
                  BB<span className="text-muted-foreground font-normal">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.replace("#", "");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-colors ${
                          isActive
                            ? "bg-foreground text-background font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.title}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-background" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-border px-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Socials</p>
                <div className="flex flex-wrap gap-2">
                  {social.filter((s) => s.enabled).slice(0, 5).map((handle) => (
                    <a
                      key={handle._id}
                      href={handle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                    >
                      {handle.platform}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
