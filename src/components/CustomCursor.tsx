"use client";

import { motion, useMotionValue, useSpring, Variants } from "motion/react";
import { useEffect, useState } from "react";

import { useVariants } from "../utils/hooks";

function CustomCursor() {
  const { variant } = useVariants();
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 36, stiffness: 110, mass: 1.15 };
  const auraSpringConfig = { damping: 34, stiffness: 70, mass: 1.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const auraXSpring = useSpring(cursorX, auraSpringConfig);
  const auraYSpring = useSpring(cursorY, auraSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorX.set(e.clientX - 14);
        cursorY.set(e.clientY - 14);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [variant]);

  // No variants needed for dog cursor, but keep for compatibility
  const variants: Variants = {
    DEFAULT: {},
    PROJECT: {},
    BUTTON: {},
    TEXT: {},
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none max-md:hidden"
        style={{
          translateX: auraXSpring,
          translateY: auraYSpring,
          width: 28,
          height: 28,
          opacity: isClicking ? 0.45 : 0.75,
        }}
      >
        <div className="h-full w-full rounded-full bg-amber-400/25 blur-sm" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none max-md:hidden"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          scale: isClicking ? 0.85 : 1,
          width: 28,
          height: 28,
        }}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full border border-orange-300/70 bg-gradient-to-br from-orange-300/30 via-yellow-300/15 to-amber-300/30 shadow-[0_0_18px_rgba(251,191,36,0.4)]" />
          <div className="absolute inset-[9px] rounded-full bg-gradient-to-r from-orange-400 via-yellow-300 to-amber-400" />
        </div>
      </motion.div>
    </>
  );
}

export default CustomCursor;

