
import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Smile, Lock, Globe, Users, Star, CheckCircle } from 'lucide-react';
import { Post, Story, User, Healer } from '../types';
import { Card, Avatar, Button, Badge } from './Shared';
import { CURRENT_USER, HEALERS } from '../constants';

// --- Stories ---
export const StoryRail: React.FC<{ stories: Story[] }> = ({ stories }) => {
  return (
    <div className="relative mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-1">
        {/* Create Story */}
        <div className="flex flex-col items-center space-y-1 min-w-[72px] cursor-pointer group">
          <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-primary-300 p-0.5 group-hover:border-primary-500 transition-colors flex items-center justify-center bg-gray-50">
             <span className="text-2xl text-primary-500 font-light">+</span>
          </div>
          <span className="text-xs font-medium text-gray-700">Add Story</span>
        </div>

        {stories.map((story) => (
          <div key={story.userId} className="flex flex-col items-center space-y-1 min-w-[72px] cursor-pointer group">
            <div className={`rounded-full p-[2px] ${story.allViewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-primary-500 to-secondary-500'}`}>
              <div className="bg-white p-[2px] rounded-full">
                <img 
                  src={story.user.avatar} 
                  alt={story.user.name} 
                  className="w-14 h-14 rounded-full object-cover border border-gray-100 group-hover:scale-105 transition-transform duration-200" 
                />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-700 truncate w-16 text-center">{story.user.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Mobile Suggested Healers Rail ---
export const SuggestedHealersRail: React.FC<{ onSelect: (h: Healer) => void }> = ({ onSelect }) => {
  return (
    <div className="mb-6 block md:hidden">
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="font-bold text-gray-900">Suggested Healers</h3>
        <span className="text-xs text-primary-600 font-medium">See all</span>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar px-1 snap-x">
        {HEALERS.slice(0, 4).map((healer) => (
          <div 
            key={healer.id} 
            className="snap-center min-w-[200px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0"
            onClick={() => onSelect(healer)}
          >
            <div className="h-20 bg-gray-100 relative">
              <img src={healer.coverImage} className="w-full h-full object-cover" alt="Cover" />
            </div>
            <div className="px-3 pb-3 relative">
              <div className="flex justify-between items-end -mt-8 mb-2">
                 <img src={healer.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover bg-white" alt="Avatar" />
                 <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700 border border-yellow-100">
                   <Star className="w-3 h-3 fill-current mr-0.5" /> {healer.rating}
                 </div>
              </div>
              
              <h4 className="font-bold text-sm text-gray-900 truncate">{healer.name}</h4>
              <p className="text-xs text-primary-600 mb-2 truncate">{healer.title}</p>
              
              <div className="flex flex-wrap gap-1 mb-3 h-5 overflow-hidden">
                {healer.specialization.slice(0, 2).map(spec => (
                  <span key={spec} className="text-[10px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded border border-gray-100">{spec}</span>
                ))}
              </div>
              
              <Button size="sm" fullWidth className="text-xs h-8">Book Session</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Create Post (Desktop) ---
export const CreatePost: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card className="mb-6 p-4">
      <div className="flex space-x-4">
        <Avatar src={CURRENT_USER.avatar} alt="Me" size="md" />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 text-gray-500 text-sm cursor-text hover:bg-gray-200 transition-colors" onClick={onClick}>
            What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
          </div>
          <div className="flex items-center justify-between mt-3 pt-2">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" icon={ImageIcon} className="text-gray-500" onClick={onClick}>
                Photo
              </Button>
              <Button variant="ghost" size="sm" icon={Smile} className="text-gray-500" onClick={onClick}>
                Feeling
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <select className="text-xs bg-gray-50 border-none rounded-lg text-gray-500 py-1 pl-2 pr-6 cursor-pointer focus:ring-0">
                <option>Public</option>
                <option>Friends</option>
                <option>Only Me</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- Post Card ---
export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  // ... (Keeping existing PostCard implementation but exported for re-use if needed, though PostCard.tsx handles main logic)
  return null; 
};
