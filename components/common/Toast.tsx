
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center p-4 rounded-lg shadow-lg border animate-slide-up ${
      type === 'success' ? 'bg-white border-green-500' : 'bg-white border-red-500'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
      )}
      <p className="text-sm font-medium text-gray-800 mr-4">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
