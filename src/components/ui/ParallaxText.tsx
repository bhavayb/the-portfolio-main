"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: "left" | "right";
  gap?: number;
  copies?: number; // Number of copies to render
}

export function ParallaxText({
  children,
  baseVelocity = 40,
  direction = "left",
  gap = 48,
  copies = 3,
}: ParallaxProps) {
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure the width of a single copy (including gap) and set initial centered offset
  useLayoutEffect(() => {
    if (contentRef.current) {
      const singleWidth = contentRef.current.offsetWidth + gap;
      setContentWidth(singleWidth);

      // Start from the middle of a copy so marquee appears "from between"
      const initial = direction === "left" ? -singleWidth / 2 : singleWidth / 2;
      x.set(initial);
    }
    // depend on children/gap/direction
  }, [children, gap, direction, x]);

  // Animate the scrolling with seamless wrap
  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;

    const dir = direction === "left" ? -1 : 1;
    const moveBy = (baseVelocity * delta) / 1000;
    let newX = x.get() + dir * moveBy;

    // Wrap seamlessly (keeps visual continuity)
    if (direction === "left") {
      if (newX <= -contentWidth) newX += contentWidth;
    } else {
      if (newX >= contentWidth) newX -= contentWidth;
    }

    x.set(newX);
  });

  return (
    <div className="overflow-hidden w-full">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {Array.from({ length: copies }).map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? contentRef : null}
            className="flex flex-nowrap flex-shrink-0"
            style={{ gap: `${gap}px`, marginRight: `${gap}px` }}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}