
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validationRule?: RegExp;
  errorMessage?: string;
  onValidChange?: (isValid: boolean) => void;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChange, 
  validationRule, 
  errorMessage, 
  onValidChange,
  className = '',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!isTouched || !validationRule) return;

    const val = String(value || '');
    const isValid = validationRule.test(val);

    if (val.length > 0) {
      setError(!isValid);
      setSuccess(isValid);
      if (!isValid) {
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }
    } else {
      setError(false);
      setSuccess(false);
    }
    
    if (onValidChange) onValidChange(isValid);

  }, [value, isTouched, validationRule]);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className={`relative transition-transform ${shake ? 'animate-shake' : ''}`}>
        <input
          {...props}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`w-full border rounded-lg p-2.5 outline-none transition-all duration-200 ${
            error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50' 
              : success 
                ? 'border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50'
                : 'border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
          }`}
        />
        {success && (
          <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500 animate-scale-check" />
        )}
        {error && (
          <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500 animate-in zoom-in" />
        )}
      </div>
      {error && errorMessage && (
        <p className="text-xs text-red-500 mt-1 animate-slide-in-from-top-1 ml-1">{errorMessage}</p>
      )}
    </div>
  );
};
