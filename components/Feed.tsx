
import React from 'react';
import { Image as ImageIcon, Smile, Lock, Globe, Users, CheckCircle } from 'lucide-react';
import { Card } from './common/Card';
import { Avatar } from './common/Avatar';
import { Button } from './common/Button';
import { CURRENT_USER, HEALERS } from '../data/index';
import { CreatePostModal } from './CreatePostModal';

// --- Suggested Healers Rail (Minimal Attractive Design) ---
export const SuggestedHealersRail: React.FC<{ onSelect: (h: any) => void }> = ({ onSelect }) => {
  return (
    <div className="mb-6 block md:hidden py-5 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border-y border-blue-50/50">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="font-bold text-gray-900 text-sm tracking-tight">Recommended Professionals</h3>
        <span className="text-xs text-primary-600 font-semibold cursor-pointer hover:bg-white/50 px-2 py-1 rounded-full transition-colors">View all</span>
      </div>
      <div className="flex space-x-5 overflow-x-auto pb-2 no-scrollbar px-4 snap-x">
        {HEALERS.slice(0, 6).map((healer) => (
          <div 
            key={healer.id} 
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group snap-center"
            onClick={() => onSelect(healer)}
          >
            <div className="relative mb-2 transition-transform transform group-active:scale-95 duration-200">
              {/* Gradient Ring */}
              <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-primary-400 via-secondary-400 to-primary-400 shadow-sm">
                <div className="bg-white p-[2px] rounded-full w-full h-full">
                  <img src={healer.avatar} className="w-full h-full rounded-full object-cover" alt={healer.name} />
                </div>
              </div>
              
              {/* Verified Badge */}
              {healer.isVerified && (
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-[2px] shadow-sm ring-1 ring-white">
                  <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
                </div>
              )}
            </div>
            
            <span className="text-xs font-semibold text-gray-800 text-center truncate w-20 group-hover:text-primary-600 transition-colors">
              {healer.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Create Post (Desktop) ---
export const CreatePost: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
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
    </>
  );
};
