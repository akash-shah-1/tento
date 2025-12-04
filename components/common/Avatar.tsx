
import React from 'react';

export const Avatar: React.FC<{ src: string; alt: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string; status?: boolean }> = ({ src, alt, size = 'md', className = '', status }) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-24 h-24",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img src={src} alt={alt} className={`${sizeClasses[size]} rounded-full object-cover border border-gray-100 bg-gray-100`} />
      {status && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent-500 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
};
