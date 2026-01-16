"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
  wrapperClassName?: string;
}

export function ParallaxText({
  children,
  baseVelocity,
  className,
  wrapperClassName,
}: ParallaxProps) {
  // Calculate duration based on velocity (lower velocity = longer duration = slower)
  const duration = Math.abs(40 / baseVelocity);
  const direction = baseVelocity < 0 ? "normal" : "reverse";

  return (
    <div className={cn("w-full overflow-hidden", wrapperClassName)}>
      <motion.div
        className={cn(
          "flex items-center gap-4 md:py-3 py-1",
          className
        )}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
        style={{ direction }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

