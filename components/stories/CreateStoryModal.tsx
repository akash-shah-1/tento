
import React, { useState, useRef, useEffect } from 'react';
import { X, Type, Image as ImageIcon, Camera, ChevronDown, Globe, RefreshCcw, Circle } from 'lucide-react';
import { Button } from '../common/Button';

const BACKGROUNDS = [
  'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
  '#000000'
];

const FONTS = ['Inter', 'serif', 'monospace', 'cursive', 'fantasy'];

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [mode, setMode] = useState<'text' | 'image' | 'video' | 'camera'>('image');
  const [text, setText] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  
  // Camera Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    } else if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, mode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setMode('image'); // Fallback
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setMediaUrl(dataUrl);
        setMode('image'); // Switch to preview mode
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      if (file.type.startsWith('video/')) {
        setMode('video');
      } else {
        setMode('image');
      }
    }
  };

  const handlePost = () => {
    if (mode === 'text' && !text.trim()) return;
    if ((mode === 'image' || mode === 'video') && !mediaUrl) return;

    onSubmit({
      type: mode === 'camera' ? 'image' : mode,
      text: mode === 'text' ? text : undefined,
      background: mode === 'text' ? BACKGROUNDS[bgIndex] : undefined,
      url: mode !== 'text' ? mediaUrl : undefined,
      duration: mode === 'video' ? 15 : 5, // Default video duration if metadata fails, viewer handles actual length
      font: mode === 'text' ? FONTS[fontIndex] : undefined
    });
    
    stopCamera();
    onClose();
    setText('');
    setMediaUrl(null);
    setMode('image');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black md:bg-black/90 flex flex-col md:flex-row animate-in fade-in duration-200">
      
      {/* Mobile Close Button */}
      <button onClick={onClose} className="md:hidden absolute top-4 left-4 z-50 p-2 bg-black/20 rounded-full text-white backdrop-blur-md">
        <X />
      </button>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center relative overflow-hidden h-[60vh] md:h-auto">
        <div 
           className="w-full h-full md:w-[360px] md:h-[640px] md:rounded-xl overflow-hidden relative shadow-2xl bg-black flex items-center justify-center"
           style={{ background: mode === 'text' ? BACKGROUNDS[bgIndex] : '#000' }}
        >
           {mode === 'text' && (
             <textarea 
               value={text}
               onChange={e => setText(e.target.value)}
               placeholder="Start typing..."
               className="w-full h-full bg-transparent border-none text-white text-3xl font-bold text-center p-8 focus:ring-0 resize-none flex items-center justify-center placeholder-white/50"
               style={{ fontFamily: FONTS[fontIndex] }}
             />
           )}

           {mode === 'image' && (
             mediaUrl ? <img src={mediaUrl} className="w-full h-full object-cover" alt="Preview" /> : <div className="text-gray-500">No Image Selected</div>
           )}
           
           {mode === 'video' && (
             mediaUrl ? <video src={mediaUrl} className="w-full h-full object-cover" controls autoPlay loop /> : <div className="text-gray-500">No Video Selected</div>
           )}

           {mode === 'camera' && (
             <>
               <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
               <canvas ref={canvasRef} className="hidden" />
               <button 
                 onClick={capturePhoto}
                 className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:bg-white transition-colors"
               >
                 <div className="w-12 h-12 bg-white rounded-full"></div>
               </button>
             </>
           )}
        </div>
      </div>

      {/* Controls Area - Bottom Sheet on Mobile, Sidebar on Desktop */}
      <div className="w-full md:w-96 bg-gray-900 p-6 flex flex-col z-20 rounded-t-3xl md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none h-[40vh] md:h-auto border-t border-gray-800 md:border-none">
        <div className="hidden md:flex justify-between items-center mb-8">
           <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-white"><X /></button>
           <h2 className="text-white font-bold text-lg">Create Story</h2>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
           {/* Mode Selection */}
           <div className="grid grid-cols-3 gap-3">
             <button 
               onClick={() => setMode('text')}
               className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${mode === 'text' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'}`}
             >
               <Type className="w-5 h-5" />
               <span className="font-semibold text-xs">Text</span>
             </button>
             <button 
               onClick={() => setMode('camera')}
               className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${mode === 'camera' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'}`}
             >
               <Camera className="w-5 h-5" />
               <span className="font-semibold text-xs">Camera</span>
             </button>
             <button 
               onClick={() => fileInputRef.current?.click()}
               className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${mode === 'image' || mode === 'video' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'}`}
             >
               <ImageIcon className="w-5 h-5" />
               <span className="font-semibold text-xs">Gallery</span>
             </button>
             <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
           </div>

           {/* Text Controls */}
           {mode === 'text' && (
             <div className="space-y-4">
               <div>
                 <label className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2 block">Background</label>
                 <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                   {BACKGROUNDS.map((bg, i) => (
                     <button 
                       key={i} 
                       onClick={() => setBgIndex(i)} 
                       className={`w-8 h-8 rounded-full border-2 flex-shrink-0 ${bgIndex === i ? 'border-white' : 'border-transparent'}`}
                       style={{ background: bg }}
                     />
                   ))}
                 </div>
               </div>
               <div>
                 <label className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2 block">Font Style</label>
                 <div className="flex gap-2">
                   <button onClick={() => setFontIndex((fontIndex + 1) % FONTS.length)} className="px-3 py-1 bg-gray-800 text-white rounded text-xs border border-gray-700">
                     Change Font ({FONTS[fontIndex]})
                   </button>
                 </div>
               </div>
             </div>
           )}

           <div className="mt-auto pt-4 md:pt-6">
              <div className="flex items-center justify-between text-gray-300 text-sm mb-4 px-2 py-2 bg-gray-800 rounded-lg cursor-pointer">
                 <div className="flex items-center"><Globe className="w-4 h-4 mr-2" /> Public</div>
                 <ChevronDown className="w-4 h-4" />
              </div>
              <Button fullWidth onClick={handlePost} size="lg" disabled={mode === 'camera'}>
                Share to Story
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};
