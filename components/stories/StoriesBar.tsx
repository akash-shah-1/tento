
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../../types';
import { StoryCircle } from './StoryCircle';
import { useStories } from '../../hooks/useStories';
import { StoryViewer } from './StoryViewer';
import { CreateStoryModal } from './CreateStoryModal';
import { StorySkeleton } from '../common/LoadingStates';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Avatar } from '../common/Avatar';

export const StoriesBar: React.FC = () => {
  const { 
    stories, 
    isLoading,
    activeStoryIndex, 
    activeItemIndex,
    viewStory, 
    closeStory, 
    nextStoryItem, 
    prevStoryItem,
    addStory,
    reactToStory 
  } = useStories();

  const [isCreating, setIsCreating] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Separate "My Story" from others for UI sorting
  const myStory = stories.find(s => s.userId === 'me');
  const otherStories = stories.filter(s => s.userId !== 'me');

  if (isLoading) {
    return (
      <div className="relative mb-6">
        <StorySkeleton />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className={`relative ${isMobile ? 'mb-4 mt-2' : 'mb-6'}`}>
        <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 no-scrollbar px-4 md:px-1 snap-x">
          
          {/* Add Story Button */}
          <div className="snap-start" onClick={() => setIsCreating(true)}>
             {isMobile ? (
               // Mobile: Rectangular Card
               <div className="relative w-28 h-44 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-primary-300 flex flex-col items-center justify-center bg-gray-50 flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-2">
                   <Plus className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold text-gray-700">Add Story</span>
               </div>
             ) : (
               // Desktop: Circle
               <StoryCircle isAdd onClick={() => setIsCreating(true)} />
             )}
          </div>

          {/* My Story (if exists) */}
          {myStory && (
            <div className="snap-start" onClick={() => viewStory(stories.indexOf(myStory))}>
              {isMobile ? (
                 <MobileStoryCard story={myStory} isOwner />
              ) : (
                 <StoryCircle story={myStory} onClick={() => {}} />
              )}
            </div>
          )}

          {/* Other Stories */}
          {otherStories.map((story) => (
            <div key={story.userId} className="snap-start" onClick={() => viewStory(stories.indexOf(story))}>
              {isMobile ? (
                 <MobileStoryCard story={story} />
              ) : (
                 <StoryCircle story={story} onClick={() => {}} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Viewer */}
      {activeStoryIndex !== null && (
        <StoryViewer 
          stories={stories}
          initialStoryIndex={activeStoryIndex}
          initialItemIndex={activeItemIndex}
          onClose={closeStory}
          onNext={nextStoryItem}
          onPrev={prevStoryItem}
          onReact={reactToStory}
        />
      )}

      {/* Creator Modal */}
      <CreateStoryModal 
        isOpen={isCreating} 
        onClose={() => setIsCreating(false)} 
        onSubmit={addStory} 
      />
    </div>
  );
};

const MobileStoryCard: React.FC<{ story: Story; isOwner?: boolean }> = ({ story, isOwner }) => {
  const latestItem = story.items[story.items.length - 1];
  
  return (
    <div className={`relative w-28 h-44 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 group ${story.allViewed ? 'ring-0' : 'ring-2 ring-primary-500 ring-offset-1'}`}>
      {/* Background Image */}
      {latestItem.type === 'image' || latestItem.type === 'video' ? (
        <img src={latestItem.url} alt="Story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs text-white font-bold" style={{ background: latestItem.background || '#333' }}>
          {latestItem.text?.slice(0, 30)}...
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
      
      {/* User Info */}
      <div className="absolute top-2 left-2">
        <div className={`rounded-full p-0.5 ${story.allViewed ? 'bg-gray-300' : 'bg-primary-500'}`}>
           <Avatar src={story.user.avatar} alt={story.user.name} size="xs" className="border border-white" />
        </div>
      </div>
      
      <p className="absolute bottom-3 left-2 right-2 text-white text-xs font-bold truncate text-shadow-sm">
        {isOwner ? 'Your Story' : story.user.name}
      </p>
    </div>
  );
};
