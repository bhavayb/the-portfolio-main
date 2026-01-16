"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useMediaQuery } from "../utils/useMediaQuery";

interface LoaderWrapperProps {
  children: React.ReactNode;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    // Skip loader completely on mobile - show home page directly
    if (isMobile) {
      setIsLoading(false);
    }
  }, [isMobile]);

  // On mobile, render children directly without loader
  if (isMobile) {
    return <>{children}</>;
  }

  return <>{isLoading ? <Loader setHideLoader={setIsLoading} /> : children}</>;
};

export default LoaderWrapper;

