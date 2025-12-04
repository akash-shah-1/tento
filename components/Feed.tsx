import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Smile, Lock, Globe, Users } from 'lucide-react';
import { Post, Story, User } from '../types';
import { Card, Avatar, Button } from './Shared';
import { CURRENT_USER } from '../constants';

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

// --- Create Post ---
export const CreatePost: React.FC = () => {
  return (
    <Card className="mb-6 p-4">
      <div className="flex space-x-4">
        <Avatar src={CURRENT_USER.avatar} alt="Me" size="md" />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 text-gray-500 text-sm cursor-text hover:bg-gray-200 transition-colors">
            What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
          </div>
          <div className="flex items-center justify-between mt-3 pt-2">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" icon={ImageIcon} className="text-gray-500">
                Photo
              </Button>
              <Button variant="ghost" size="sm" icon={Smile} className="text-gray-500">
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
  const isAnonymous = post.user.isAnonymous;
  
  const VisibilityIcon = {
    'Public': Globe,
    'Friends': Users,
    'Private': Lock
  }[post.visibility] || Globe;

  return (
    <Card className="mb-4 md:mb-6">
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar 
              src={post.user.avatar} 
              alt={post.user.name} 
              size="md" 
              className={isAnonymous ? "opacity-90" : ""}
            />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900">
                {post.user.name}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <span>{post.timestamp}</span>
                <span className="mx-1.5">•</span>
                <VisibilityIcon className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-50">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line mb-4">
          {post.content}
        </p>

        {post.image && (
          <div className="mb-4 -mx-4 md:-mx-5 mt-2">
            <img src={post.image} alt="Post attachment" className="w-full object-cover max-h-[400px]" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-1">
            <div className="bg-primary-100 p-1 rounded-full">
              <Heart className="w-3 h-3 text-primary-500 fill-current" />
            </div>
            <span>{post.likes} likes</span>
          </div>
          <div className="flex space-x-3">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3">
          <ActionButton icon={Heart} label="Like" active={post.isLiked} activeColor="text-red-500 fill-current" />
          <ActionButton icon={MessageSquare} label="Comment" />
          <ActionButton icon={Share2} label="Share" />
        </div>
      </div>
    </Card>
  );
};

const ActionButton: React.FC<{ icon: any; label: string; active?: boolean; activeColor?: string }> = ({ icon: Icon, label, active, activeColor }) => (
  <button className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-gray-50 transition-colors ${active ? activeColor : 'text-gray-600'}`}>
    <Icon className={`w-5 h-5 ${active ? '' : ''}`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);