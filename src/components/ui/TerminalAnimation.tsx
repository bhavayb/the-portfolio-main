"use client";

import { useState, useEffect } from "react";

const codeLines = [
  "const developer = {",
  "  name: 'Full Stack Developer',",
  "  skills: ['React', 'Next.js', 'Node.js'],",
  "  passion: 'Building amazing products',",
  "  status: 'Available for hire'",
  "};",
  "",
  "console.log(developer.passion);",
];

export const TerminalAnimation = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      // Reset animation after a pause
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = codeLines[currentLineIndex];
    
    if (currentChar <= currentLine.length) {
      const charTimer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentChar);
          return newLines;
        });
        setCurrentChar(currentChar + 1);
      }, 50);
      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(lineTimer);
    }
  }, [currentLineIndex, currentChar]);

  return (
    <div className="absolute top-24 left-6 md:top-24 md:left-12 bg-black/40 backdrop-blur-xl border border-orange-400/30 rounded-lg p-4 font-mono text-xs md:text-sm max-w-md shadow-2xl shadow-amber-400/16 hidden lg:block">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-orange-400/12">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-orange-400/80 text-xs ml-2">terminal.js</span>
      </div>
      <div className="space-y-1">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-amber-400/60 mr-3 select-none">{index + 1}</span>
            <span className="text-violet-300/90">
              {line}
              {index === currentLineIndex && currentChar <= codeLines[currentLineIndex].length && (
                <span className="animate-pulse text-orange-400">▋</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

