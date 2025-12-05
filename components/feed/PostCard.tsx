
import React, { useState, useRef } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Lock, Globe, Users, Bookmark, Flag, Edit, Trash2 } from 'lucide-react';
import { Post } from '../../types';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { ReactionPicker } from './ReactionPicker';
import { ShareDrawer } from './ShareDrawer';
import { CommentSection } from './comments/CommentSection';
import { REACTION_MAP } from '../../utils/constants';
import { Modal } from '../common/Modal'; // Import Modal
import { useMediaQuery } from '../../hooks/useMediaQuery'; // Import hook

interface PostCardProps {
  post: Post;
  onReact?: (id: string, type: string) => void;
  onDelete?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onReact, onDelete }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showShareDrawer, setShowShareDrawer] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Responsive check
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Refs for timers and touch handling
  const reactionTimerRef = useRef<any>(null);
  const longPressTimerRef = useRef<any>(null);

  const isAnonymous = post.user.isAnonymous;
  const isLongText = post.content.length > 250;
  
  const VisibilityIcon = {
    'Public': Globe,
    'Friends': Users,
    'Private': Lock
  }[post.visibility] || Globe;

  // Desktop Hover Logic
  const handleMouseEnterLike = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => setShowReactionPicker(true), 500);
  };

  const handleMouseLeaveLike = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => setShowReactionPicker(false), 300);
  };

  // Mobile Long Press Logic
  const handleTouchStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowReactionPicker(true);
    }, 500); // 500ms long press
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  // Get active reaction details
  const activeReaction = post.userReaction ? REACTION_MAP[post.userReaction] : null;

  return (
    <>
      <Card className="mb-4 md:mb-6 overflow-visible">
        <div className="p-4 md:p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 relative">
            <div className="flex items-center space-x-3">
              <Avatar 
                src={post.user.avatar} 
                alt={post.user.name} 
                size="md" 
                className={`border border-gray-100 ${isAnonymous ? "opacity-90" : ""}`}
              />
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                  {post.user.name}
                  {/* Feeling Display */}
                  {post.feeling && (
                    <span className="font-normal text-gray-500"> is feeling <span className="text-gray-800 font-medium">{post.feeling}</span></span>
                  )}
                  {!post.feeling && !isAnonymous && Math.random() > 0.8 && (
                    <span className="font-normal text-gray-500"> is feeling <span role="img" aria-label="happy">😇</span> blessed</span>
                  )}
                </h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="hover:underline cursor-pointer">{post.timestamp}</span>
                  <span className="mx-1.5">•</span>
                  <VisibilityIcon className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600 rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {/* Options Dropdown */}
            {showOptions && (
              <div 
                className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 w-48 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onMouseLeave={() => setShowOptions(false)}
              >
                <div className="py-1">
                   <OptionItem icon={Bookmark} label="Save Post" />
                   <OptionItem icon={Flag} label="Report Post" />
                   {post.userId === 'me' && (
                     <>
                       <div className="border-t border-gray-100 my-1"></div>
                       <OptionItem icon={Edit} label="Edit Post" />
                       <OptionItem icon={Trash2} label="Move to trash" color="text-red-600" onClick={() => onDelete?.(post.id)} />
                     </>
                   )}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-3">
             <p className="text-gray-800 text-[15px] md:text-base leading-relaxed whitespace-pre-line">
               {isLongText && !showFullText ? post.content.slice(0, 250) + '...' : post.content}
             </p>
             {isLongText && (
               <button 
                 onClick={() => setShowFullText(!showFullText)}
                 className="text-gray-500 font-semibold hover:underline text-sm mt-1"
               >
                 {showFullText ? 'See less' : 'See more'}
               </button>
             )}
          </div>

          {post.image && (
            <div className="mb-4 -mx-4 md:-mx-5 mt-2 bg-gray-100">
              <img src={post.image} alt="Post attachment" className="w-full object-cover max-h-[500px]" />
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-1.5 cursor-pointer hover:underline">
              {post.likes > 0 && (
                <div className="flex -space-x-1">
                   {/* If user reacted, show their reaction first if possible, else generic */}
                   <div className="bg-primary-500 rounded-full p-1 border-2 border-white z-20">
                      <span className="text-[10px] leading-none text-white block">
                        {activeReaction ? activeReaction.emoji : '👍'}
                      </span>
                   </div>
                </div>
              )}
              <span>{post.likes > 0 ? post.likes : 'Be the first to like'}</span>
            </div>
            <div className="flex space-x-4">
              <span className="hover:underline cursor-pointer" onClick={() => setShowComments(!showComments)}>{post.comments} comments</span>
              <span className="hover:underline cursor-pointer">{post.shares} shares</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-1 px-2 md:px-4">
            {/* Like Button Container with Hover/Touch Logic */}
            <div 
              className="relative flex-1" 
              onMouseEnter={handleMouseEnterLike} 
              onMouseLeave={handleMouseLeaveLike}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ReactionPicker 
                isVisible={showReactionPicker} 
                onSelect={(reaction) => {
                  onReact?.(post.id, reaction);
                  setShowReactionPicker(false);
                }} 
              />
              <LikeButton 
                activeReaction={activeReaction}
                onClick={() => {
                  // If already reacted with something specific, toggle it off by passing SAME reaction
                  if (activeReaction) {
                    onReact?.(post.id, activeReaction.label);
                  } else {
                    onReact?.(post.id, 'Like');
                  }
                }}
              />
            </div>
            
            <ActionButton 
              icon={MessageSquare} 
              label="Comment" 
              onClick={() => setShowComments(true)} 
            />
            <ActionButton icon={Share2} label="Share" onClick={() => setShowShareDrawer(true)} />
          </div>
        </div>

        {/* Desktop Comment Section (Inline) */}
        {!isMobile && showComments && <CommentSection postId={post.id} />}
      </Card>

      {/* Mobile Comment Drawer */}
      {isMobile && (
        <Modal 
          isOpen={showComments} 
          onClose={() => setShowComments(false)}
          title="Comments"
          zIndex={60}
        >
          <div className="-mx-6 -my-4">
            <CommentSection postId={post.id} />
          </div>
        </Modal>
      )}

      <ShareDrawer 
        isOpen={showShareDrawer} 
        onClose={() => setShowShareDrawer(false)} 
        postUrl={`https://healspace.app/post/${post.id}`}
      />
    </>
  );
};

const ActionButton: React.FC<{ icon: any; label: string; active?: boolean; activeColor?: string; onClick?: () => void }> = ({ icon: Icon, label, active, activeColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group ${active ? activeColor : 'text-gray-500'}`}
  >
    {typeof Icon === 'function' ? <Icon /> : <Icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'scale-110' : 'group-hover:scale-110 transition-transform duration-200'}`} />}
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

const LikeButton: React.FC<{ activeReaction: any; onClick: () => void }> = ({ activeReaction, onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    // Trigger Bounce
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    // Trigger Particles if becoming active (i.e., currently null)
    if (!activeReaction) {
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60, // Random spread X
        y: (Math.random() - 0.5) * 60 - 30, // Random spread Y (mostly up)
        color: ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700); // Clear after animation
    }

    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className={`relative flex-1 w-full flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group ${activeReaction ? activeReaction.color : 'text-gray-500'}`}
    >
      <div className="relative">
        {/* Main Icon */}
        <div className={`transform transition-transform duration-200 ${isBouncing ? 'animate-bounce-scale' : 'group-hover:scale-110'}`}>
          {activeReaction ? (
            <span className="text-lg md:text-xl">{activeReaction.emoji}</span>
          ) : (
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </div>

        {/* Particles */}
        {particles.map(p => (
          <span 
            key={p.id}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full animate-particle-burst pointer-events-none"
            style={{ 
              backgroundColor: p.color,
              '--tw-translate-x': `${p.x}px`,
              '--tw-translate-y': `${p.y}px`
            } as React.CSSProperties}
          ></span>
        ))}
      </div>
      <span className="text-sm font-semibold">{activeReaction ? activeReaction.label : 'Like'}</span>
    </button>
  );
};

const OptionItem: React.FC<{ icon: any; label: string; color?: string; onClick?: () => void }> = ({ icon: Icon, label, color = "text-gray-700", onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-sm font-medium ${color}`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);
