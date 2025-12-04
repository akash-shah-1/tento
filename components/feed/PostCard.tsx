
import React, { useState, useRef } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Lock, Globe, Users, Bookmark, Flag, Edit, Trash2 } from 'lucide-react';
import { Post } from '../../types';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { ReactionPicker } from './ReactionPicker';
import { ShareDrawer } from './ShareDrawer';
import { CommentSection } from './comments/CommentSection';
import { REACTION_MAP } from '../../utils/constants';

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
  const reactionTimerRef = useRef<any>(null);

  const isAnonymous = post.user.isAnonymous;
  const isLongText = post.content.length > 250;
  
  const VisibilityIcon = {
    'Public': Globe,
    'Friends': Users,
    'Private': Lock
  }[post.visibility] || Globe;

  const handleMouseEnterLike = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => setShowReactionPicker(true), 500);
  };

  const handleMouseLeaveLike = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => setShowReactionPicker(false), 300);
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
            {/* Like Button with Reaction Picker */}
            <div 
              className="relative flex-1" 
              onMouseEnter={handleMouseEnterLike} 
              onMouseLeave={handleMouseLeaveLike}
            >
              <ReactionPicker 
                isVisible={showReactionPicker} 
                onSelect={(reaction) => {
                  onReact?.(post.id, reaction);
                  setShowReactionPicker(false);
                }} 
              />
              <ActionButton 
                icon={activeReaction ? (() => <span className="text-lg">{activeReaction.emoji}</span>) : Heart} 
                label={activeReaction ? activeReaction.label : "Like"} 
                active={!!activeReaction} 
                activeColor={activeReaction ? activeReaction.color : "text-gray-600"}
                onClick={() => onReact?.(post.id, 'Like')}
              />
            </div>
            
            <ActionButton 
              icon={MessageSquare} 
              label="Comment" 
              onClick={() => setShowComments(!showComments)} 
            />
            <ActionButton icon={Share2} label="Share" onClick={() => setShowShareDrawer(true)} />
          </div>
        </div>

        {/* Comment Section */}
        {showComments && <CommentSection postId={post.id} />}
      </Card>

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

const OptionItem: React.FC<{ icon: any; label: string; color?: string; onClick?: () => void }> = ({ icon: Icon, label, color = "text-gray-700", onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors text-sm font-medium ${color}`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);
