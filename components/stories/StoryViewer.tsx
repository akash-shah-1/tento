
import React, { useEffect, useState, useRef } from 'react';
import { X, MoreHorizontal, ChevronLeft, ChevronRight, Heart, Send, Eye } from 'lucide-react';
import { Story, StoryItem } from '../../types';
import { Avatar } from '../common/Avatar';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  initialItemIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReact: (emoji: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  initialStoryIndex, 
  initialItemIndex, 
  onClose, 
  onNext, 
  onPrev,
  onReact
}) => {
  const story = stories[initialStoryIndex];
  const item = story.items[initialItemIndex];
  
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flyingEmojis, setFlyingEmojis] = useState<{id: number, char: string}[]>([]);
  
  // Reset progress when item changes
  useEffect(() => {
    setProgress(0);
  }, [item.id]);

  // Progress Timer
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          onNext();
          return 0;
        }
        return p + (100 / (item.duration * 10)); // ~100ms updates
      });
    }, 100);

    return () => clearInterval(interval);
  }, [item, isPaused, onNext]);

  const handleReact = (emoji: string) => {
    const id = Date.now();
    setFlyingEmojis(prev => [...prev, { id, char: emoji }]);
    onReact(emoji);
    setTimeout(() => {
      setFlyingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
      
      {/* Navigation Areas */}
      <div className="absolute inset-y-0 left-0 w-1/3 z-20" onClick={onPrev} onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}></div>
      <div className="absolute inset-y-0 right-0 w-1/3 z-20" onClick={onNext} onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}></div>

      {/* Main Container */}
      <div className="relative w-full md:max-w-[400px] h-full md:h-[90vh] md:rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
        
        {/* Content */}
        {item.type === 'image' && <img src={item.url} className="w-full h-full object-cover" alt="Story" />}
        {item.type === 'text' && (
          <div className="w-full h-full flex items-center justify-center p-8 text-center" style={{ background: item.background }}>
             <p className="text-white font-bold text-2xl md:text-3xl drop-shadow-md">{item.text}</p>
          </div>
        )}

        {/* Overlay UI */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
          
          {/* Top Bar */}
          <div className="p-4 pt-12 md:pt-4 bg-gradient-to-b from-black/50 to-transparent">
             {/* Progress Bars */}
             <div className="flex space-x-1 mb-3">
               {story.items.map((sItem, idx) => (
                 <div key={sItem.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-white transition-all duration-100 linear"
                     style={{ 
                       width: idx < initialItemIndex ? '100%' : idx === initialItemIndex ? `${progress}%` : '0%' 
                     }}
                   />
                 </div>
               ))}
             </div>
             
             {/* Header */}
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <Avatar src={story.user.avatar} alt={story.user.name} size="sm" className="border-2 border-transparent" />
                 <div>
                   <p className="text-white font-semibold text-sm">{story.user.name}</p>
                   <p className="text-white/70 text-xs">2h ago</p>
                 </div>
               </div>
               <div className="flex items-center space-x-4 pointer-events-auto">
                 <button className="text-white"><MoreHorizontal /></button>
                 <button onClick={onClose} className="text-white"><X /></button>
               </div>
             </div>
          </div>

          <div className="flex-1"></div>

          {/* Bottom Bar */}
          <div className="p-4 pb-8 md:pb-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
             {story.userId === 'me' ? (
               <div className="flex items-center justify-between text-white mb-2">
                 <div className="flex items-center space-x-2">
                   <Eye className="w-5 h-5" />
                   <span className="font-semibold">{item.viewers?.length || 0} views</span>
                 </div>
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                   <input 
                     type="text" 
                     placeholder="Send message..." 
                     className="flex-1 bg-transparent border border-white/40 rounded-full py-2.5 px-4 text-white placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white"
                   />
                   <button onClick={() => handleReact('❤️')} className="text-white p-2 hover:scale-110 transition-transform"><Heart className="w-7 h-7" /></button>
                   <button className="text-white p-2"><Send className="w-6 h-6" /></button>
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Flying Emojis */}
        {flyingEmojis.map(e => (
          <div key={e.id} className="absolute bottom-20 right-8 text-4xl animate-float-up z-40 pointer-events-none">
            {e.char}
          </div>
        ))}
      </div>

      {/* Desktop Close Button */}
      <button onClick={onClose} className="hidden md:block absolute top-4 right-4 text-white/50 hover:text-white p-2">
        <X className="w-8 h-8" />
      </button>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-300px) scale(1.5); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
