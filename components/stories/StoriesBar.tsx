
import React, { useState } from 'react';
import { Story } from '../../types';
import { StoryCircle } from './StoryCircle';
import { useStories } from '../../hooks/useStories';
import { StoryViewer } from './StoryViewer';
import { CreateStoryModal } from './CreateStoryModal';

export const StoriesBar: React.FC = () => {
  const { 
    stories, 
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

  // Separate "My Story" from others for UI sorting
  const myStory = stories.find(s => s.userId === 'me');
  const otherStories = stories.filter(s => s.userId !== 'me');

  return (
    <>
      <div className="relative mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-1 snap-x">
          {/* Add Story Button */}
          <div className="snap-start">
             <StoryCircle isAdd onClick={() => setIsCreating(true)} />
          </div>

          {/* My Story (if exists) */}
          {myStory && (
            <div className="snap-start">
              <StoryCircle 
                 story={myStory} 
                 onClick={() => viewStory(stories.indexOf(myStory))} 
              />
            </div>
          )}

          {/* Other Stories */}
          {otherStories.map((story) => (
            <div key={story.userId} className="snap-start">
              <StoryCircle 
                story={story} 
                onClick={() => viewStory(stories.indexOf(story))} 
              />
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
    </>
  );
};
