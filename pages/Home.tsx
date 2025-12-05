
import React from 'react';
import { Loader2 } from 'lucide-react';
import { StoriesBar } from '../components/stories/StoriesBar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostCard } from '../components/feed/PostCard';
import { CURRENT_USER } from '../data/index';
import { usePosts } from '../hooks/usePosts';
import { PostSkeleton } from '../components/common/LoadingStates';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const Home: React.FC = () => {
  const { posts, isLoading, isFetchingMore, addPost, reactToPost, deletePost, loadMorePosts } = usePosts(CURRENT_USER);
  const triggerRef = useInfiniteScroll(loadMorePosts, isFetchingMore || isLoading);

  return (
    <>
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
      
      {/* Infinite Scroll Trigger & Spinner */}
      {!isLoading && (
        <div ref={triggerRef as React.RefObject<HTMLDivElement>} className="py-8 flex justify-center w-full">
           {isFetchingMore ? (
             <div className="flex items-center space-x-2 text-gray-500">
               <Loader2 className="w-5 h-5 animate-spin" />
               <span className="text-sm">Loading more posts...</span>
             </div>
           ) : (
             <div className="h-10"></div> // Spacer to trigger intersection
           )}
        </div>
      )}
    </>
  );
};
