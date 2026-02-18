"use client";

export const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle orange/yellow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/12 rounded-full blur-2xl" />
      <div 
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-yellow-400/12 rounded-full blur-2xl" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl" 
        style={{ animationDelay: '4s' }}
      />
      <div 
        className="absolute top-1/3 right-1/3 w-40 h-40 bg-orange-400/8 rounded-full blur-xl" 
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-yellow-400/10 rounded-full blur-xl" 
        style={{ animationDelay: '3s' }}
      />
    </div>
  );
};

