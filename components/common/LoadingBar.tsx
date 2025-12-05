
import React, { useEffect, useState } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          // Fast at first, then slows down, never hits 100 until finished
          if (prev >= 90) return prev;
          const increment = Math.max(1, (90 - prev) / 10);
          return prev + increment;
        });
      }, 200);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Hide after animation
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (progress === 0 && !isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-red-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      ></div>
    </div>
  );
};
