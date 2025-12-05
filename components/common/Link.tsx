
import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'neutral';
}

export const Link: React.FC<LinkProps> = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const colors = {
    primary: 'text-primary-600 bg-primary-600',
    secondary: 'text-secondary-600 bg-secondary-600',
    neutral: 'text-gray-800 bg-gray-800',
  };

  const [textColor, bgColor] = colors[variant].split(' ');

  return (
    <a 
      onClick={onClick}
      className={`group relative inline-block font-semibold cursor-pointer ${textColor} ${className}`}
      {...props}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${bgColor}`}></span>
    </a>
  );
};
