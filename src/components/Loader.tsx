"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../utils/useMediaQuery";

interface PageLoadProps {
  setHideLoader: (value: boolean) => void;
}

const Loader = ({ setHideLoader }: PageLoadProps) => {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const codeLines = [
    "Initializing system...",
    "Loading components...",
    "Fetching projects...",
    "Compiling assets...",
    "Almost ready..."
  ];

  useEffect(() => {
    const count = setInterval(() => {
      if (counter < 100) {
        setCounter(prev => Math.min(prev + 2, 100));
      } else {
        clearInterval(count);
      }
    }, 25);

    return () => clearInterval(count);
  }, [counter, setHideLoader]);

  useEffect(() => {
    const lineIndex = Math.min(Math.floor(counter / 20), codeLines.length - 1);
    setText(codeLines[lineIndex]);
  }, [counter]);



  useEffect(() => {
    if (counter >= 100) {
      const timeout = setTimeout(() => setHideLoader(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [counter, setHideLoader]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center px-2 py-8 sm:px-4">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center px-2 w-full max-w-xs sm:max-w-md md:max-w-lg">
        {/* Computer/Laptop SVG */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Monitor */}
          <div className="relative">
            {/* Screen glow */}
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-3xl" />
            
            {/* Monitor frame */}
            <div className="relative w-[220px] xs:w-[260px] sm:w-[360px] md:w-[420px] h-[120px] xs:h-[150px] sm:h-[220px] md:h-[260px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-gray-700 shadow-2xl">
              
              {/* Screen */}
              <div className="w-full h-full bg-[#0a0a0a] rounded-lg overflow-hidden relative">
                {/* Scan line effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Terminal content */}
                <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-xs md:text-sm h-full flex flex-col">
                  {/* Terminal header */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-gray-500 text-[8px] sm:text-[10px]">portfolio@terminal</span>
                  </div>
                  
                  {/* Terminal lines */}
                  <div className="flex-1 space-y-1 sm:space-y-2 text-green-400">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-cyan-400">$</span> npm run portfolio
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-400"
                    >
                      <span className="text-yellow-400">→</span> {text}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-white"
                    >
                      █
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Monitor stand */}
            <div className="flex flex-col items-center">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-b from-gray-700 to-gray-800 border-x border-gray-600" />
              <div className="w-20 sm:w-28 h-2 sm:h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg border-x border-b border-gray-600" />
            </div>
          </div>
        </motion.div>

        {/* Loading bar */}
        <div className="mt-6 sm:mt-10 w-[220px] xs:w-[260px] sm:w-[360px] md:w-[420px]">
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mb-2">
            <span>Loading portfolio</span>
            <span className="text-cyan-400 font-mono">{counter}%</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-stylish)] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
            Bhavay Batra
          </h1>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Crafting digital experiences</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;

