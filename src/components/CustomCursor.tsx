"use client";

import { motion, useMotionValue, useSpring, Variants } from "motion/react";
import { useEffect, useState } from "react";

import { useVariants } from "../utils/hooks";

function CustomCursor() {
  const { variant } = useVariants();
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorX.set(e.clientX - (variant === "PROJECT" ? 50 : 10));
        cursorY.set(e.clientY - (variant === "PROJECT" ? 50 : 10));
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

  const variants: Variants = {
    DEFAULT: {
      width: 20,
      height: 20,
      backgroundColor: "transparent",
      border: "2px solid #22d3ee",
      boxShadow: "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.2)",
    },
    PROJECT: {
      height: 100,
      width: 100,
      backgroundColor: "rgba(34, 211, 238, 0.1)",
      border: "2px solid #22d3ee",
      boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
    },
    BUTTON: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(34, 211, 238, 0.2)",
      border: "2px solid #22d3ee",
      boxShadow: "0 0 25px rgba(34, 211, 238, 0.7)",
    },
    TEXT: {
      height: 60,
      width: 60,
      backgroundColor: "transparent",
      border: "2px solid #22d3ee",
      boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)",
    },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none grid place-items-center max-md:hidden"
        variants={variants}
        animate={variant}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      >
        {variant === "PROJECT" && (
          <span className="text-cyan-400 text-sm font-semibold">VIEW</span>
        )}
      </motion.div>
      
      {/* Cursor dot (inner) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full z-[9999] pointer-events-none max-md:hidden"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: variant === "PROJECT" ? 46 : 6,
          y: variant === "PROJECT" ? 46 : 6,
        }}
      />
    </>
  );
}

export default CustomCursor;

