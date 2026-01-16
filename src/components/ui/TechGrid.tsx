"use client";

export const TechGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }}
      />
      
      {/* Scanning line effect */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      {/* Corner brackets */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-600/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-cyan-500/30" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-cyan-500/30" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-cyan-600/30" style={{ animationDelay: '1.5s' }} />
      
      {/* Floating tech elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-600/30 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-500/30 rounded-full" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-600/30 rounded-full" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-500/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

