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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.14),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,146,60,0.05),transparent_18%,transparent_82%,rgba(251,191,36,0.05))]" />
        </div>

        <div className="relative w-[92%] max-w-2xl rounded-2xl border border-amber-400/20 bg-black/80 shadow-[0_0_40px_rgba(251,146,60,0.15)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-amber-400/15 px-4 py-2">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-300/90">SYSTEM BOOT</p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
            </div>
          </div>

          <div className="px-4 sm:px-6 py-5 font-mono">
            <p className="text-sm sm:text-base font-semibold text-orange-300">
              COMPUTER INITIALIZING<span className="animate-pulse">...</span>
            </p>

            <div className="mt-4 space-y-1.5 min-h-[150px] sm:min-h-[165px]">
              {bootLogs.slice(0, bootStep + 1).map((log, index) => (
                <p
                  key={`${log}-${index}`}
                  className="text-[11px] sm:text-xs text-amber-200/90 animate-[pulse_600ms_ease-in-out]"
                >
                  {log}
                </p>
              ))}
              <p className="text-[11px] sm:text-xs text-orange-300/90">
                &gt; Launching portfolio.exe
                <span className="ml-1 inline-block h-3 w-1 bg-amber-300 animate-pulse align-middle" />
              </p>
            </div>

            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between text-[10px] sm:text-xs text-amber-200/80">
                <span>Boot Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-orange-950/70 border border-amber-500/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-400 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-orange-300/70">
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
