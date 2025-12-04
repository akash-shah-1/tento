
import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { POSTS } from '../data/index';
import { getFromStorage, saveToStorage } from '../utils/storage';

export const usePosts = (currentUser: User) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Initialize with mock data if storage is empty
    const storedPosts = getFromStorage<Post[]>('healspace_posts', []);
    if (storedPosts.length === 0) {
      setPosts(POSTS);
      saveToStorage('healspace_posts', POSTS);
    } else {
      setPosts(storedPosts);
    }
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
      // Initialize reactions array (custom property not in original type, but we handle it locally)
      // For strict typing, we'd update types.ts, but standard Post interface works for basic view
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveToStorage('healspace_posts', updatedPosts);
  };

  const reactToPost = (postId: string, reactionType: string = 'like') => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        // Toggle like if same reaction or just adding reaction
        // Simple boolean toggle logic for now based on original types
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
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

  return { posts, addPost, reactToPost, deletePost };
};
