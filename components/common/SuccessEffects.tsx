
import React from 'react';

export const AnimatedCheckmark: React.FC<{ size?: number }> = ({ size = 64 }) => {
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 52 52" className="animate-scale-check">
        <circle cx="26" cy="26" r="25" fill="#27AE60" className="opacity-20" />
        <circle cx="26" cy="26" r="25" fill="none" stroke="#27AE60" strokeWidth="2" />
        <path 
          fill="none" 
          stroke="#27AE60" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          className="animate-draw-check"
          strokeDasharray="48"
          strokeDashoffset="48"
        />
      </svg>
    </div>
  );
};

export const ConfettiBurst: React.FC = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    color: ['#4A90E2', '#9B59B6', '#27AE60', '#F1C40F', '#E74C3C'][Math.floor(Math.random() * 5)],
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 0.5 + 's',
    animationDuration: Math.random() * 2 + 2 + 's',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 w-2 h-2 rounded-sm animate-confetti-fall"
          style={{
            backgroundColor: p.color,
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
};
