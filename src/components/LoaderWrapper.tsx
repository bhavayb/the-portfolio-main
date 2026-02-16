"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useMediaQuery } from "../utils/useMediaQuery";

interface LoaderWrapperProps {
  children: React.ReactNode;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  if (isMobile) {
    return <>{children}</>;
  }
  return <>{isLoading ? <Loader setHideLoader={setIsLoading} /> : children}</>;
};

export default LoaderWrapper;

