"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  animationDirection?: "normal" | "reverse"; // Renamed prop
}

function ParallaxText({ 
  children, 
  baseVelocity = 100, 
  animationDirection = "normal" 
}: ParallaxProps) {
  // ... rest of your code ...

  return (
    <div className="parallax">
      <motion.div
        className="scroller"
        animate={{
          x: animationDirection === "normal" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}