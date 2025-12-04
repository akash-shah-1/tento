
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';
import { useComments } from '../../../hooks/useComments';
import { User } from '../../../types';
import { CURRENT_USER } from '../../../utils/constants';

interface CommentSectionProps {
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { comments, addComment, toggleReaction } = useComments(postId);
  const [sortOrder, setSortOrder] = useState<'Relevant' | 'Newest'>('Relevant');

  // Simple sorting logic
  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === 'Relevant') return b.likes - a.likes;
    // Mock sort by date (reverse of mock array)
    return 0;
  });

  return (
    <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
      <div className="border-t border-gray-100 my-2"></div>
      
      {/* Sorting / Header */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setSortOrder(prev => prev === 'Relevant' ? 'Newest' : 'Relevant')}
          className="flex items-center text-gray-500 text-sm font-semibold hover:bg-gray-100 px-2 py-1 rounded"
        >
          {sortOrder === 'Relevant' ? 'Most Relevant' : 'Newest'}
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* View Previous Link */}
      {comments.length > 2 && (
         <button className="text-gray-500 font-semibold text-sm hover:underline mb-3 block">
           View more comments
         </button>
      )}

      {/* List */}
      <div className="space-y-1">
        {sortedComments.map(comment => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            currentUser={CURRENT_USER}
            onReply={(parentId, text) => addComment(text, undefined, parentId)}
            onReact={toggleReaction}
          />
        ))}
      </div>

      {/* Input */}
      <div className="mt-3 sticky bottom-0 bg-white pt-2">
         <CommentInput 
           currentUser={CURRENT_USER} 
           onSubmit={(text) => addComment(text)} 
         />
         <p className="text-[11px] text-gray-400 mt-1">Press Enter to post.</p>
      </div>
    </div>
  );
};
