
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, MoreHorizontal, Heart, Send, Eye, Volume2, VolumeX } from 'lucide-react';
import { Story, StoryItem } from '../../types';
import { Avatar } from '../common/Avatar';
import { Modal } from '../common/Modal';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  initialItemIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReact: (emoji: string) => void;
}

const QUICK_REACTIONS = ['❤️', '😂', '😮', '😢', '👏', '🔥'];

export const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  initialStoryIndex, 
  initialItemIndex, 
  onClose, 
  onNext, 
  onPrev,
  onReact
}) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  
  useEffect(() => {
    if (initialStoryIndex > currentStoryIndex) setDirection('right');
    if (initialStoryIndex < currentStoryIndex) setDirection('left');
    setCurrentStoryIndex(initialStoryIndex);
  }, [initialStoryIndex]);

  const story = stories[initialStoryIndex];
  const item = story.items[initialItemIndex];
  
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showViewers, setShowViewers] = useState(false);
  const [flyingEmojis, setFlyingEmojis] = useState<{id: number, char: string}[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Reset state on item change
  useEffect(() => {
    setProgress(0);
    setIsPaused(false);
  }, [item.id]);

  // Timer Logic
  useEffect(() => {
    if (isPaused) return;

    // If video, progress is handled by onTimeUpdate
    if (item.type === 'video') return;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          onNext();
          return 100;
        }
        return p + (100 / (item.duration * 10)); 
      });
    }, 100);

    return () => clearInterval(interval);
  }, [item, isPaused, onNext]);

  // Video specific logic
  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      }
    }
  }, [isPaused, item]);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration || 1;
      const current = videoRef.current.currentTime;
      setProgress((current / duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    onNext();
  };

  const handleReact = (emoji: string) => {
    const id = Date.now();
    setFlyingEmojis(prev => [...prev, { id, char: emoji }]);
    onReact(emoji);
    setTimeout(() => {
      setFlyingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) { 
      if (diff > 0) onNext(); 
      else onPrev(); 
    }
    touchStartX.current = null;
  };

  const isOwner = story.userId === 'me';

  return createPortal(
    <>
      <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
        
        {/* Click Navigation Zones */}
        <div 
          className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-pointer" 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          onMouseDown={() => setIsPaused(true)} 
          onMouseUp={() => setIsPaused(false)}
        ></div>
        <div 
          className="absolute inset-y-0 right-0 w-1/4 z-20 cursor-pointer" 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          onMouseDown={() => setIsPaused(true)} 
          onMouseUp={() => setIsPaused(false)}
        ></div>

        {/* Story Container */}
        <div 
           key={story.userId} 
           className={`relative w-full md:max-w-[400px] h-full md:h-[90vh] md:rounded-xl overflow-hidden bg-gray-900 shadow-2xl ${direction === 'right' ? 'story-slide-enter-right' : 'story-slide-enter-left'}`}
           onTouchStart={handleTouchStart}
           onTouchEnd={handleTouchEnd}
        >
          {/* Media Content */}
          {item.type === 'image' && <img src={item.url} className="w-full h-full object-cover animate-in fade-in duration-300" alt="Story" />}
          
          {item.type === 'video' && (
             <div className="w-full h-full bg-black flex items-center justify-center">
               <video 
                 ref={videoRef}
                 src={item.url} 
                 className="w-full h-full object-contain" 
                 playsInline 
                 muted={isMuted}
                 onTimeUpdate={handleVideoTimeUpdate}
                 onEnded={handleVideoEnded}
               />
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                 className="absolute top-20 right-4 z-40 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm"
               >
                 {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
               </button>
             </div>
          )}

          {item.type === 'text' && (
            <div className="w-full h-full flex items-center justify-center p-8 text-center animate-in fade-in duration-300" style={{ background: item.background || '#000' }}>
               <p className="text-white font-bold text-2xl md:text-3xl drop-shadow-md">{item.text}</p>
            </div>
          )}

          {/* Overlay Interface */}
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
            
            {/* Top Bar */}
            <div className="p-4 pt-12 md:pt-4 bg-gradient-to-b from-black/50 to-transparent">
               <div className="flex space-x-1 mb-3">
                 {story.items.map((sItem, idx) => (
                   <div key={sItem.id} className="h-0.5 md:h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-white transition-all duration-100 linear"
                       style={{ width: idx < initialItemIndex ? '100%' : idx === initialItemIndex ? `${progress}%` : '0%' }}
                     />
                   </div>
                 ))}
               </div>
               
               <div className="flex items-center justify-between pointer-events-auto">
                 <div className="flex items-center space-x-3">
                   <Avatar src={story.user.avatar} alt={story.user.name} size="sm" className="border-2 border-transparent" />
                   <div>
                     <p className="text-white font-semibold text-sm drop-shadow-sm">{story.user.name}</p>
                     <p className="text-white/70 text-xs drop-shadow-sm">2h ago</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-4">
                   <button className="text-white"><MoreHorizontal /></button>
                   <button onClick={onClose} className="text-white"><X /></button>
                 </div>
               </div>
            </div>

            <div className="flex-1"></div>

            {/* Bottom Bar */}
            <div className="p-4 pb-8 md:pb-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
               {isOwner ? (
                 <button 
                   onClick={() => { setIsPaused(true); setShowViewers(true); }}
                   className="flex items-center space-x-2 text-white mb-2 hover:bg-white/10 p-2 rounded-lg transition-colors w-full"
                 >
                   <Eye className="w-5 h-5" />
                   <span className="font-semibold">{item.viewers?.length || 0} views</span>
                 </button>
               ) : (
                 <div className="space-y-4">
                   {/* Quick Reactions */}
                   <div className="flex justify-between px-2">
                     {QUICK_REACTIONS.map(emoji => (
                       <button 
                         key={emoji}
                         onClick={(e) => { e.stopPropagation(); handleReact(emoji); }}
                         className="text-3xl hover:scale-125 transition-transform active:scale-95"
                       >
                         {emoji}
                       </button>
                     ))}
                   </div>
                   
                   {/* Input */}
                   <div className="flex items-center space-x-3">
                     <input 
                       type="text" 
                       placeholder="Send message..." 
                       className="flex-1 bg-transparent border border-white/40 rounded-full py-2.5 px-4 text-white placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white transition-all"
                       onFocus={() => setIsPaused(true)}
                       onBlur={() => setIsPaused(false)}
                     />
                     <button className="text-white p-2 bg-white/10 rounded-full"><Send className="w-5 h-5" /></button>
                   </div>
                 </div>
               )}
            </div>
          </div>

          {/* Flying Emojis Layer */}
          {flyingEmojis.map(e => (
            <div key={e.id} className="absolute bottom-20 right-1/2 translate-x-1/2 text-5xl animate-float-up z-40 pointer-events-none">
              {e.char}
            </div>
          ))}
        </div>

        {/* Desktop Close Button */}
        <button onClick={onClose} className="hidden md:block absolute top-4 right-4 text-white/50 hover:text-white p-2 transition-colors">
          <X className="w-8 h-8" />
        </button>

        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
          }
          .animate-float-up {
            animation: float-up 1.5s ease-out forwards;
          }
        `}</style>
      </div>

      {/* Viewer List Modal with Higher Z-Index */}
      {showViewers && (
        <Modal 
          isOpen={showViewers} 
          onClose={() => { setShowViewers(false); setIsPaused(false); }} 
          title="Story Views"
          zIndex={70} 
        >
          <div className="space-y-4">
             {item.viewers && item.viewers.length > 0 ? (
               item.viewers.map(v => (
                 <div key={v.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar src={v.avatar} alt={v.name} size="sm" />
                      <span className="font-semibold text-gray-900">{v.name}</span>
                    </div>
                    {v.reaction && <span className="text-xl">{v.reaction}</span>}
                 </div>
               ))
             ) : (
               <div className="text-center text-gray-500 py-8">
                 No views yet.
               </div>
             )}
          </div>
        </Modal>
      )}
    </>,
    document.body
  );
};
