"use client";

export const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 right-6 sm:right-8 md:right-10 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-cyan-400/70 text-sm font-light">Scroll</span>
      <div className="w-6 h-10 border-2 border-cyan-500/40 rounded-full p-1 flex justify-center">
        <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-scroll-down" />
      </div>
    </div>
  );
};

