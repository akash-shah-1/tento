
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Comment, User } from '../../../types';
import { Avatar } from '../../common/Avatar';
import { CommentInput } from './CommentInput';
import { REACTION_MAP } from '../../../utils/constants';

interface CommentItemProps {
  comment: Comment;
  currentUser: User;
  onReply: (parentId: string, text: string) => void;
  onReact: (commentId: string, type: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, currentUser, onReply, onReact }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const reaction = comment.userReaction ? REACTION_MAP[comment.userReaction] : null;

  return (
    <div className="flex space-x-2 mb-2 group">
      {/* Connector Line for replies */}
      <div className="relative">
         <Avatar src={comment.user.avatar} alt={comment.user.name} size="sm" />
         {comment.replies && comment.replies.length > 0 && (
           <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-40px)] bg-gray-200 rounded-full"></div>
         )}
      </div>

      <div className="flex-1 max-w-[calc(100%-40px)]">
        {/* Bubble */}
        <div className="inline-block relative">
          <div className="bg-gray-100 rounded-2xl px-3 py-2">
            <h4 className="font-semibold text-[13px] text-gray-900 leading-4 mb-0.5">{comment.user.name}</h4>
            <p className="text-[15px] text-gray-800 leading-5 whitespace-pre-wrap">{comment.content}</p>
          </div>
          
          {/* Reaction Count Badge */}
          {comment.likes > 0 && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-sm border border-white px-1 py-0.5 flex items-center space-x-0.5 cursor-pointer">
              {Object.keys(comment.reactions).slice(0, 2).map(r => (
                 <span key={r} className="text-xs">{REACTION_MAP[r]?.emoji}</span>
              ))}
              <span className="text-[11px] text-gray-500 font-medium pl-0.5">{comment.likes}</span>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center space-x-3 mt-1 ml-1">
          <span className="text-xs text-gray-500">{comment.timestamp}</span>
          
          <div 
             className="relative"
             onMouseEnter={() => setShowReactionPicker(true)}
             onMouseLeave={() => setTimeout(() => setShowReactionPicker(false), 300)}
          >
            {showReactionPicker && (
               <div className="absolute bottom-6 left-0 bg-white rounded-full shadow-lg border border-gray-100 p-1 flex gap-1 z-20 animate-in zoom-in-95">
                  {Object.keys(REACTION_MAP).map(key => (
                    <button 
                      key={key} 
                      onClick={() => { onReact(comment.id, key); setShowReactionPicker(false); }}
                      className="text-xl hover:scale-125 transition-transform"
                    >
                      {REACTION_MAP[key].emoji}
                    </button>
                  ))}
               </div>
            )}
            <button 
              onClick={() => onReact(comment.id, 'Like')}
              className={`text-xs font-bold hover:underline ${reaction ? reaction.color : 'text-gray-500'}`}
            >
              {reaction ? reaction.label : 'Like'}
            </button>
          </div>
          
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="text-xs font-bold text-gray-500 hover:underline"
          >
            Reply
          </button>
        </div>

        {/* Input for Reply */}
        {isReplying && (
          <div className="mt-2 animate-in fade-in">
             <CommentInput 
               currentUser={currentUser} 
               autoFocus 
               onSubmit={(text) => {
                 onReply(comment.id, text);
                 setIsReplying(false);
               }} 
             />
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map(reply => (
              <CommentItem 
                key={reply.id} 
                comment={reply} 
                currentUser={currentUser} 
                onReply={onReply} 
                onReact={onReact} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
