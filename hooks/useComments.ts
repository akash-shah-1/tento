
import { useState, useEffect } from 'react';
import { Comment, User } from '../types';
import { MOCK_COMMENTS, CURRENT_USER } from '../utils/constants';
import { getFromStorage, saveToStorage } from '../utils/storage';

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // In a real app, we'd fetch by postId. Here we filter mock data or load from storage
    const allComments = getFromStorage<Comment[]>('healspace_comments', MOCK_COMMENTS);
    const postComments = allComments.filter(c => c.postId === postId);
    setComments(postComments);
  }, [postId]);

  const addComment = (content: string, image?: string, parentId: string | null = null) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      parentId,
      userId: CURRENT_USER.id,
      user: CURRENT_USER,
      content,
      image,
      timestamp: 'Just now',
      likes: 0,
      reactions: {},
      replies: []
    };

    // Helper to add nested reply
    const addReply = (list: Comment[]): Comment[] => {
      return list.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), newComment] };
        } else if (c.replies && c.replies.length > 0) {
          return { ...c, replies: addReply(c.replies) };
        }
        return c;
      });
    };

    let updatedComments;
    if (parentId) {
      updatedComments = addReply(comments);
    } else {
      updatedComments = [newComment, ...comments];
    }

    setComments(updatedComments);
    
    // Save all (in reality, we'd merge with other posts' comments)
    const allComments = getFromStorage<Comment[]>('healspace_comments', MOCK_COMMENTS);
    saveToStorage('healspace_comments', [...allComments, newComment]);
  };

  const toggleReaction = (commentId: string, reactionType: string) => {
    const updateReaction = (list: Comment[]): Comment[] => {
      return list.map(c => {
        if (c.id === commentId) {
          const hasReacted = c.userReaction === reactionType;
          const newReactions = { ...c.reactions };
          
          if (hasReacted) {
             delete newReactions[reactionType]; // Remove
          } else {
             // If changing reaction, remove old one first if exists
             if (c.userReaction && newReactions[c.userReaction]) {
               newReactions[c.userReaction]--;
               if (newReactions[c.userReaction] <= 0) delete newReactions[c.userReaction];
             }
             newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          }

          return {
            ...c,
            userReaction: hasReacted ? undefined : reactionType,
            reactions: newReactions,
            likes: Object.values(newReactions).reduce((a, b) => a + b, 0)
          };
        } else if (c.replies) {
          return { ...c, replies: updateReaction(c.replies) };
        }
        return c;
      });
    };

    const updated = updateReaction(comments);
    setComments(updated);
    // Persist...
  };

  return { comments, addComment, toggleReaction };
};
