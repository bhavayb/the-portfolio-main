"use client";

import { useRef, MouseEvent } from "react";

const THROTTLE_MS = 380;

/**
 * Spawns an expanding wave ripple from the cursor position on mouse move.
 * Apply `ref` to the card element (needs `spotlight-card` class for overflow:hidden).
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const lastFire = useRef<number>(0);

  const spawnWave = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const ripple = document.createElement("span");
    ripple.className = "wave-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  };

  const onMouseEnter = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    spawnWave(e.clientX - rect.left, e.clientY - rect.top);
    lastFire.current = Date.now();
  };

  const onMouseMove = (e: MouseEvent<T>) => {
    const now = Date.now();
    if (now - lastFire.current < THROTTLE_MS) return;
    lastFire.current = now;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    spawnWave(e.clientX - rect.left, e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    lastFire.current = 0;
  };

  return { ref, onMouseEnter, onMouseMove, onMouseLeave };
}
