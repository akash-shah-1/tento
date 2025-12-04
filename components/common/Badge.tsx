
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'blue' | 'purple' | 'green' | 'gray' }> = ({ children, variant = 'gray' }) => {
  const styles = {
    blue: 'bg-primary-50 text-primary-700',
    purple: 'bg-secondary-50 text-secondary-700',
    green: 'bg-accent-50 text-accent-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};
