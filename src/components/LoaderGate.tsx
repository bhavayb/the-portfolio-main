"use client";

import { useEffect, useState } from "react";

interface LoaderGateProps {
  children: React.ReactNode;
}

const LoaderGate = ({ children }: LoaderGateProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  const bootLogs = [
    "[OK] Power rails stable",
    "[OK] CPU microcode loaded",
    "[OK] Memory check complete",
    "[OK] GPU pipeline online",
    "[OK] Network interface ready",
    "[OK] UI modules initialized",
    "[OK] Launch sequence complete",
  ];

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setBootStep((prev) => {
        if (prev >= bootLogs.length - 1) return prev;
        return prev + 1;
      });
    }, 220);

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2100);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(stepTimer);
    };
  }, [bootLogs.length]);

  const progress = Math.min(((bootStep + 1) / bootLogs.length) * 100, 100);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background">
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative w-[92%] max-w-xl rounded-sm border border-border bg-background">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">System Boot</p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/40" />
              <span className="h-2 w-2 rounded-full bg-foreground/70" />
            </div>
          </div>

          <div className="px-4 sm:px-6 py-5 font-mono">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              INITIALIZING<span className="animate-pulse">_</span>
            </p>

            <div className="mt-4 space-y-1.5 min-h-[150px] sm:min-h-[165px]">
              {bootLogs.slice(0, bootStep + 1).map((log, index) => (
                <p
                  key={`${log}-${index}`}
                  className="text-[11px] sm:text-xs text-muted-foreground"
                >
                  {log}
                </p>
              ))}
              <p className="text-[11px] sm:text-xs text-foreground/70">
                &gt; Launching portfolio.exe
                <span className="ml-1 inline-block h-3 w-0.5 bg-foreground animate-pulse align-middle" />
              </p>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span className="uppercase tracking-widest">Boot Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden bg-muted border border-border">
                <div
                  className="h-full bg-foreground transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground/60">
              Preparing interface
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderGate;
