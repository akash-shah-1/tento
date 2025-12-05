
import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (url: string) => void;
  accept?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, accept = "image/*", label = "Upload Image" }) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview immediately with blur
      const url = URL.createObjectURL(file);
      setPreview(url);
      setStatus('uploading');
      setProgress(0);

      // Simulate Upload Progress
      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          setStatus('success');
          onFileSelect(url);
        }
      }, 150); // 1.5s total upload time
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setStatus('idle');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept={accept} 
      />
      
      {status === 'idle' ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary-500" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">{label}</span>
        </div>
      ) : (
        <div className={`relative rounded-xl overflow-hidden border border-gray-200 h-48 bg-gray-50 ${status === 'error' ? 'animate-shake border-red-500' : ''}`}>
          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              className={`w-full h-full object-cover transition-all duration-500 ${status === 'uploading' ? 'blur-sm scale-105' : 'blur-0 scale-100'}`} 
            />
          )}
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {status === 'uploading' && (
              <div className="w-2/3 bg-white/90 backdrop-blur rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            
            {status === 'success' && (
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-scale-check shadow-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
            )}

            {status === 'error' && (
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-in zoom-in shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Remove Button */}
          <button 
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm text-gray-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
