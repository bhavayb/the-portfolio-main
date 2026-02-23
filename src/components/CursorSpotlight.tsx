"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      if (spotRef.current) {
        spotRef.current.style.background =
          resolvedTheme === "dark"
            ? `radial-gradient(600px circle at ${pos.current.x}px ${pos.current.y}px, rgba(255,255,255,0.055) 0%, transparent 70%)`
            : `radial-gradient(600px circle at ${pos.current.x}px ${pos.current.y}px, rgba(0,0,0,0.04) 0%, transparent 70%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-30 transition-none"
      aria-hidden
    />
  );
}
