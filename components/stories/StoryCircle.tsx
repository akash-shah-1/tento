
import React from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../../types';

interface StoryCircleProps {
  story?: Story;
  isAdd?: boolean;
  onClick: () => void;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ story, isAdd, onClick }) => {
  if (isAdd) {
    return (
      <div className="flex flex-col items-center space-y-1 min-w-[72px] cursor-pointer group" onClick={onClick}>
        <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-primary-300 p-0.5 group-hover:border-primary-500 transition-colors flex items-center justify-center bg-gray-50">
           <Plus className="w-6 h-6 text-primary-500" />
        </div>
        <span className="text-xs font-medium text-gray-700">Add Story</span>
      </div>
    );
  }

  if (!story) return null;

  return (
    <div className="flex flex-col items-center space-y-1 min-w-[72px] cursor-pointer group" onClick={onClick}>
      <div className={`rounded-full p-[2px] ${story.allViewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-primary-500 to-secondary-500'}`}>
        <div className="bg-white p-[2px] rounded-full">
          <img 
            src={story.user.avatar} 
            alt={story.user.name} 
            className="w-14 h-14 rounded-full object-cover border border-gray-100 group-hover:scale-105 transition-transform duration-200" 
          />
        </div>
      </div>
      <span className="text-xs font-medium text-gray-700 truncate w-16 text-center">
        {story.userId === 'me' ? 'Your Story' : story.user.name.split(' ')[0]}
      </span>
    </div>
  );
};
