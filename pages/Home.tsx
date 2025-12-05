import React from 'react';
import { StoriesBar } from '../components/stories/StoriesBar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { CURRENT_USER } from '../data/index';
import { usePosts } from '../hooks/usePosts';
import { PostSkeleton } from '../components/common/LoadingStates';

export const Home: React.FC = () => {
  const { posts, isLoading, addPost, reactToPost, deletePost } = usePosts(CURRENT_USER);

  return (
    <>
      {/* StoriesBar self-manages via useStories hook and handles its own loading */}
      <StoriesBar />
      
      <CreatePost onPostCreate={addPost} />
      
      <div className="space-y-4">
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          posts.map(post => (
            <div key={post.id} className="animate-fade-in">
              <PostCard 
                post={post} 
                onReact={reactToPost} 
                onDelete={deletePost}
              />
            </div>
          ))
        )}
      </div>
      
      {!isLoading && (
        <div className="text-center py-10 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="ml-2 text-gray-600 font-medium text-sm">You're all caught up</span>
          </div>
        </div>
      )}
    </>
  );
};