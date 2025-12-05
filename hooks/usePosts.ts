
import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { POSTS } from '../data/index';
import { getFromStorage, saveToStorage } from '../utils/storage';

export const usePosts = (currentUser: User) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Initialize with mock data if storage is empty
      const storedPosts = getFromStorage<Post[]>('healspace_posts', []);
      if (storedPosts.length === 0) {
        setPosts(POSTS);
        saveToStorage('healspace_posts', POSTS);
      } else {
        setPosts(storedPosts);
      }
      setIsLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const addPost = (content: string, image: string | undefined, visibility: 'Public' | 'Private' | 'Friends', isAnonymous: boolean) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: isAnonymous ? 'anonymous' : currentUser.id,
      user: isAnonymous 
        ? { id: 'anon', name: 'Anonymous Member', handle: 'anonymous', avatar: 'https://ui-avatars.com/api/?name=Anonymous&background=random', isAnonymous: true } 
        : currentUser,
      content,
      image,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      visibility,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveToStorage('healspace_posts', updatedPosts);
  };

  const reactToPost = (postId: string, reactionType: string = 'Like') => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isSameReaction = post.userReaction === reactionType;
        
        // CASE 1: Post is already liked
        if (post.isLiked) {
            // Sub-case A: Clicking the SAME reaction -> Toggle OFF (Unlike)
            // Or if explicitly toggling 'Like' button when already liked
            if (isSameReaction || (reactionType === 'Like' && post.userReaction === 'Like')) {
                return {
                    ...post,
                    isLiked: false,
                    likes: Math.max(0, post.likes - 1),
                    userReaction: undefined
                };
            }
            
            // Sub-case B: Clicking a DIFFERENT reaction -> Switch Reaction (Count stays same)
            return {
                ...post,
                isLiked: true,
                userReaction: reactionType
            };
        }

        // CASE 2: Post is NOT liked -> Toggle ON
        return {
            ...post,
            isLiked: true,
            likes: post.likes + 1,
            userReaction: reactionType
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToStorage('healspace_posts', updatedPosts);
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(p => p.id !== postId);
    setPosts(updatedPosts);
    saveToStorage('healspace_posts', updatedPosts);
  };

  return { posts, isLoading, addPost, reactToPost, deletePost };
};
