
import React from 'react';
import { Users, Clock, Bookmark, Video as VideoIcon, Layout, Calendar } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { User } from '../../types';
import { GROUPS } from '../../data/index';

interface SidebarProps {
  currentUser: User;
  currentView: string;
  setView: (view: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentView, setView }) => {
  return (
    <div className="hidden md:block">
      <div className="sticky top-[76px] h-[calc(100vh-88px)] overflow-y-auto no-scrollbar pr-2">
         <div className="mb-4">
           <SidebarItem 
             icon={null} 
             label={currentUser.name} 
             onClick={() => setView('profile')} 
             active={currentView === 'profile'}
             customIcon={<Avatar src={currentUser.avatar} alt="Me" size="sm" />} 
           />
         </div>
         
         <SidebarItem icon={Users} label="Friends" />
         <SidebarItem icon={Clock} label="Memories" />
         <SidebarItem icon={Bookmark} label="Saved" />
         <SidebarItem icon={Users} label="Groups" />
         <SidebarItem icon={VideoIcon} label="Video" />
         <SidebarItem icon={Layout} label="Feeds" />
         <SidebarItem icon={Calendar} label="Events" />
         <div className="border-b border-gray-300 my-4 mx-4"></div>
         
         <h3 className="px-4 text-gray-500 font-semibold text-lg mb-2">Shortcuts</h3>
         <SidebarItem icon={Users} label="Anxiety Support Circle" customIcon={<img src={GROUPS[0].image} className="w-8 h-8 rounded-lg" />} />
         <SidebarItem icon={Users} label="Mindful Living Daily" customIcon={<img src={GROUPS[2].image} className="w-8 h-8 rounded-lg" />} />
         
         <div className="px-4 mt-6">
           <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-4 text-white text-center shadow-lg">
             <p className="font-bold mb-2">Are you a Healer?</p>
             <p className="text-xs mb-3 text-white/90">Join our network to help others heal.</p>
             <button className="w-full bg-white text-primary-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors">
               Become a Healer
             </button>
           </div>
         </div>

         <div className="px-4 mt-6 text-xs text-gray-500">
            Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·  More · Meta © 2024
         </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ 
  icon: any; 
  label: string; 
  active?: boolean; 
  customIcon?: React.ReactNode;
  onClick?: () => void;
}> = ({ icon: Icon, label, active, customIcon, onClick }) => (
  <div onClick={onClick} className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
    {customIcon ? customIcon : <Icon className={`w-8 h-8 text-primary-500 p-1.5 ${active ? 'fill-current' : ''}`} />}
    <span className={`text-sm font-medium ${active ? 'text-primary-600' : 'text-gray-900'}`}>{label}</span>
  </div>
);
