
import React from 'react';
import { StoriesBar } from '../components/stories/StoriesBar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { CURRENT_USER } from '../data/index';
import { usePosts } from '../hooks/usePosts';

export const Home: React.FC = () => {
  const { posts, addPost, reactToPost, deletePost } = usePosts(CURRENT_USER);

  return (
    <>
      {/* StoriesBar self-manages via useStories hook */}
      <StoriesBar />
      
      <CreatePost onPostCreate={addPost} />
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onReact={reactToPost} 
            onDelete={deletePost}
          />
        ))}
      </div>
      
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="ml-2 text-gray-600 font-medium text-sm">You're all caught up</span>
        </div>
      </div>
    </>
  );
};
