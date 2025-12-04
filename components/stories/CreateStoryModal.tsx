
import React, { useState, useRef } from 'react';
import { X, Type, Image as ImageIcon, Send, ChevronDown, Lock, Globe, Users } from 'lucide-react';
import { Button } from '../common/Button';

const BACKGROUNDS = [
  'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'
];

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [mode, setMode] = useState<'text' | 'image'>('image');
  const [text, setText] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setMode('image');
    }
  };

  const handlePost = () => {
    if (mode === 'text' && !text.trim()) return;
    if (mode === 'image' && !image) return;

    onSubmit({
      type: mode,
      text: mode === 'text' ? text : undefined,
      background: mode === 'text' ? BACKGROUNDS[bgIndex] : undefined,
      url: mode === 'image' ? image : undefined,
      duration: 5
    });
    onClose();
    setText('');
    setImage(null);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col md:flex-row animate-in fade-in duration-200">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-gray-900 p-6 flex flex-col z-20">
        <div className="flex justify-between items-center mb-8">
           <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-white"><X /></button>
           <h2 className="text-white font-bold text-lg">Create Story</h2>
        </div>

        <div className="flex-1 space-y-6">
           <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => setMode('text')}
               className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${mode === 'text' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'}`}
             >
               <Type className="w-6 h-6" />
               <span className="font-semibold text-sm">Text</span>
             </button>
             <button 
               onClick={() => fileInputRef.current?.click()}
               className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${mode === 'image' ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400'}`}
             >
               <ImageIcon className="w-6 h-6" />
               <span className="font-semibold text-sm">Photo</span>
             </button>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
           </div>

           {mode === 'text' && (
             <div className="space-y-3">
               <label className="text-gray-400 text-xs uppercase font-bold tracking-wider">Background</label>
               <div className="flex gap-2 flex-wrap">
                 {BACKGROUNDS.map((bg, i) => (
                   <button 
                     key={i} 
                     onClick={() => setBgIndex(i)} 
                     className={`w-8 h-8 rounded-full border-2 ${bgIndex === i ? 'border-white' : 'border-transparent'}`}
                     style={{ background: bg }}
                   />
                 ))}
               </div>
             </div>
           )}

           <div className="mt-auto pt-6">
              <div className="flex items-center justify-between text-gray-300 text-sm mb-4 px-2 py-2 bg-gray-800 rounded-lg cursor-pointer">
                 <div className="flex items-center"><Globe className="w-4 h-4 mr-2" /> Public</div>
                 <ChevronDown className="w-4 h-4" />
              </div>
              <Button fullWidth onClick={handlePost} size="lg">Share to Story</Button>
           </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
        <div 
           className="w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden relative shadow-2xl"
           style={{ background: mode === 'text' ? BACKGROUNDS[bgIndex] : '#000' }}
        >
           {mode === 'text' ? (
             <textarea 
               value={text}
               onChange={e => setText(e.target.value)}
               placeholder="Start typing..."
               className="w-full h-full bg-transparent border-none text-white text-3xl font-bold text-center p-8 focus:ring-0 resize-none flex items-center justify-center placeholder-white/50"
             />
           ) : (
             image && <img src={image} className="w-full h-full object-cover" alt="Preview" />
           )}
        </div>
      </div>
    </div>
  );
};
