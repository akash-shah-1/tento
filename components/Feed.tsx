
import React from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Smile, Lock, Globe, Users, Star, CheckCircle, Calendar, Bookmark, Clock } from 'lucide-react';
import { Post, Story, User, Healer } from '../types';
import { Card, Avatar, Button, Badge } from './Shared';
import { CURRENT_USER, HEALERS } from '../constants';

// --- Stories (Now handled in StoriesBar.tsx separately) ---
export const StoryRail: React.FC<{ stories: Story[] }> = ({ stories }) => {
  return null; // Deprecated here, moved logic to StoriesBar
};

// --- Mobile Shortcuts Grid (Refined) ---
export const MobileShortcuts: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-3 px-4 mb-6 md:hidden">
       <ShortcutItem icon={Users} label="Groups" color="bg-blue-50 text-blue-600" />
       <ShortcutItem icon={Calendar} label="Events" color="bg-red-50 text-red-600" />
       <ShortcutItem icon={Bookmark} label="Saved" color="bg-purple-50 text-purple-600" />
       <ShortcutItem icon={Smile} label="Friends" color="bg-green-50 text-green-600" />
    </div>
  );
};

const ShortcutItem: React.FC<{ icon: any; label: string; color: string }> = ({ icon: Icon, label, color }) => (
  <div className="flex flex-col items-center space-y-1.5 cursor-pointer group active:scale-95 transition-transform">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-xs font-medium text-gray-600">{label}</span>
  </div>
);

// --- Mobile Suggested Healers Rail (Minimal Circular Design) ---
export const SuggestedHealersRail: React.FC<{ onSelect: (h: Healer) => void }> = ({ onSelect }) => {
  return (
    <div className="mb-6 block md:hidden border-b border-gray-100 pb-6">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="font-bold text-gray-900 text-sm">Suggested Professionals</h3>
        <span className="text-xs text-primary-600 font-medium">See all</span>
      </div>
      <div className="flex space-x-5 overflow-x-auto pb-2 no-scrollbar px-4">
        {HEALERS.slice(0, 6).map((healer) => (
          <div 
            key={healer.id} 
            className="flex flex-col items-center flex-shrink-0 w-16 cursor-pointer"
            onClick={() => onSelect(healer)}
          >
            <div className="relative mb-2">
              <img src={healer.avatar} className="w-16 h-16 rounded-full object-cover border border-gray-100 p-0.5" alt="Avatar" />
              {healer.isVerified && (
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]">
                  <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-gray-900 truncate w-20 text-center">{healer.name.split(' ')[0]} {healer.name.split(' ')[1][0]}.</span>
            <span className="text-[10px] text-gray-500 truncate w-full text-center">{healer.title.split(' ')[0]}</span>
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
