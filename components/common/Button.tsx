import React, { useState, MouseEvent } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  fullWidth = false,
  onClick,
  disabled,
  ...props 
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleCreateRipple = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(event);
    }
  };

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform active:scale-[0.98] hover:scale-[1.02] hover:brightness-105";
  
  const variants = {
    primary: "bg-primary-500 text-white shadow-sm focus:ring-primary-400 border border-transparent",
    secondary: "bg-secondary-500 text-white shadow-sm focus:ring-secondary-400 border border-transparent",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleCreateRipple}
      disabled={disabled}
      {...props}
    >
      {/* Content Layer (z-10 to stay above ripple) */}
      <span className="relative z-10 flex items-center justify-center pointer-events-none">
        {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
        {children}
      </span>

      {/* Ripple Layer */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id))}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: '100%',
            height: '100%',
            position: 'absolute',
            transform: 'scale(0)',
            paddingBottom: '100%', // Makes it a square based on width
          }}
        />
      ))}
    </button>
  );
};