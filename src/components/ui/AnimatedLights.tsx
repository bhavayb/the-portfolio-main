"use client";

import { useEffect, useRef } from "react";

export const AnimatedLights = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Light orbs configuration
    const lights: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;
    }> = [];

    const lightCount = 8;
    const colors = [
      "147, 51, 234", // purple
      "168, 85, 247", // violet
      "192, 132, 252", // light purple
      "216, 180, 254", // very light purple
    ];

    // Create lights
    for (let i = 0; i < lightCount; i++) {
      lights.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 150 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationFrame = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lights.forEach((light) => {
        // Move lights
        light.x += light.vx;
        light.y += light.vy;

        // Bounce off edges
        if (light.x < 0 || light.x > canvas.width) light.vx *= -1;
        if (light.y < 0 || light.y > canvas.height) light.vy *= -1;

        // Draw light with gradient
        const gradient = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          light.radius
        );

        gradient.addColorStop(0, `rgba(${light.color}, ${light.opacity})`);
        gradient.addColorStop(0.5, `rgba(${light.color}, ${light.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${light.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

