"use client";

import { useEffect, useRef } from "react";

export const SolarSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Solar system configuration
    const sun = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 30,
      color: "#FFD700",
      glow: 40,
    };

    const planets = [
      {
        distance: 100,
        radius: 8,
        color: "#FF6B6B",
        speed: 0.02,
        angle: 0,
        name: "Mercury",
      },
      {
        distance: 150,
        radius: 12,
        color: "#4ECDC4",
        speed: 0.015,
        angle: Math.PI / 4,
        name: "Venus",
      },
      {
        distance: 210,
        radius: 14,
        color: "#45B7D1",
        speed: 0.01,
        angle: Math.PI / 2,
        name: "Earth",
        hasMoon: true,
        moon: {
          distance: 25,
          radius: 4,
          color: "#CCCCCC",
          speed: 0.05,
          angle: 0,
        },
      },
      {
        distance: 270,
        radius: 10,
        color: "#FF8B94",
        speed: 0.008,
        angle: Math.PI,
        name: "Mars",
      },
      {
        distance: 350,
        radius: 20,
        color: "#F4A261",
        speed: 0.005,
        angle: Math.PI * 1.5,
        name: "Jupiter",
      },
      {
        distance: 420,
        radius: 18,
        color: "#E9C46A",
        speed: 0.004,
        angle: Math.PI / 6,
        name: "Saturn",
        hasRing: true,
      },
    ];

    // Stars background
    const stars: Array<{ x: number; y: number; radius: number; opacity: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
      });
    }

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(10, 1, 24, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      });

      // Draw sun glow
      const gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.glow);
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 165, 0, 0.3)");
      gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.glow, 0, Math.PI * 2);
      ctx.fill();

      // Draw sun
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fillStyle = sun.color;
      ctx.fill();

      // Draw orbit paths and planets
      planets.forEach((planet) => {
        // Draw orbit path
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Calculate planet position
        planet.angle += planet.speed;
        const x = sun.x + Math.cos(planet.angle) * planet.distance;
        const y = sun.y + Math.sin(planet.angle) * planet.distance;

        // Draw planet glow
        const planetGlow = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 2);
        planetGlow.addColorStop(0, planet.color);
        planetGlow.addColorStop(1, "transparent");
        ctx.fillStyle = planetGlow;
        ctx.beginPath();
        ctx.arc(x, y, planet.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Saturn's ring
        if (planet.hasRing) {
          ctx.beginPath();
          ctx.ellipse(x, y, planet.radius * 1.8, planet.radius * 0.5, planet.angle * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(233, 196, 106, 0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw planet
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Draw moon for Earth
        if (planet.hasMoon && planet.moon) {
          planet.moon.angle += planet.moon.speed;
          const moonX = x + Math.cos(planet.moon.angle) * planet.moon.distance;
          const moonY = y + Math.sin(planet.moon.angle) * planet.moon.distance;

          ctx.beginPath();
          ctx.arc(moonX, moonY, planet.moon.radius, 0, Math.PI * 2);
          ctx.fillStyle = planet.moon.color;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

