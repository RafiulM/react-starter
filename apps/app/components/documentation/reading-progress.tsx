/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className = "" }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalHeight;
      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    const throttledUpdate = throttle(updateProgress, 16); // ~60fps

    window.addEventListener('scroll', throttledUpdate);
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 h-1 bg-muted/30 z-50 ${className}`}>
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
}