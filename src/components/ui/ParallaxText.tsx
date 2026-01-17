"use client"; // Add this if using Next.js App Router

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  animationDirection?: "normal" | "reverse";
}

// Add 'export' here
export function ParallaxText({ 
  children, 
  baseVelocity = 100, 
  animationDirection = "normal" 
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="scroller flex whitespace-nowrap flex-nowrap gap-4"
        style={{ x }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// Or use default export
// export default ParallaxText;