
import React from 'react';
import { Users, Clock, Bookmark, Video as VideoIcon, Layout, Calendar, Settings, ChevronDown } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { User } from '../../types';
import { GROUPS } from '../../data/index';
import { SidebarSkeleton } from '../common/LoadingStates';

interface SidebarProps {
  currentUser: User;
  currentView: string;
  setView: (view: any) => void;
  isLoading?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentView, setView, isLoading }) => {
  if (isLoading) {
    return (
      <div className="hidden md:block pl-2">
        <div className="sticky top-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pr-2 pb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block pl-2">
      {/* Sticky positioning relative to scroll container */}
      <div className="sticky top-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pr-2 pb-6">
         
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 min-h-full">
           {/* Profile Snippet */}
           <div className="mb-6">
             <SidebarItem 
               icon={null} 
               label={currentUser.name} 
               onClick={() => setView('profile')} 
               active={currentView === 'profile'}
               customIcon={<Avatar src={currentUser.avatar} alt="Me" size="sm" className="w-10 h-10" />} 
             />
           </div>
           
           {/* Navigation Links */}
           <div className="space-y-1">
             <SidebarItem icon={Users} label="Friends" />
             {/* <SidebarItem icon={Clock} label="Memories" /> */}
             <SidebarItem icon={Bookmark} label="Saved" onClick={() => setView('profile')} />
             <SidebarItem icon={Users} label="Groups" />
             {/* <SidebarItem icon={VideoIcon} label="Video" /> */}
             {/* <SidebarItem icon={Layout} label="Feeds" /> */}
             <SidebarItem icon={Calendar} label="Events" />
             <SidebarItem icon={ChevronDown} label="See more" />
           </div>

           <div className="border-b border-gray-100 my-4 mx-2"></div>

           <div className="space-y-1">
              <SidebarItem icon={Settings} label="Settings" onClick={() => setView('settings')} active={currentView === 'settings'} />
           </div>
           
           {/* Shortcuts */}
           <div className="mt-6">
              <div className="flex justify-between items-center px-3 mb-2 group cursor-pointer">
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Shortcuts</h3>
                <span className="text-blue-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
              </div>
              <div className="space-y-1">
                <SidebarItem icon={Users} label="Anxiety Support Circle" customIcon={<img src={GROUPS[0].image} className="w-8 h-8 rounded-lg object-cover" />} />
                <SidebarItem icon={Users} label="Mindful Living Daily" customIcon={<img src={GROUPS[2].image} className="w-8 h-8 rounded-lg object-cover" />} />
              </div>
           </div>
           
           {/* CTA Card */}
           <div className="mt-8">
             <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-4 text-white text-center shadow-md">
               <p className="font-bold mb-1 text-sm">Are you a Healer?</p>
               <p className="text-xs mb-3 text-white/90 leading-tight">Join our network to help others heal.</p>
               <button className="w-full bg-white text-primary-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                 Become a Healer
               </button>
             </div>
           </div>

           <div className="px-1 mt-6 text-[10px] text-gray-400 leading-relaxed text-center">
              Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·  More · HealSpace © 2024
           </div>
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
  <div onClick={onClick} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${active ? 'bg-gray-100 text-primary-600' : 'hover:bg-gray-50 text-gray-700'}`}>
    {customIcon ? customIcon : <Icon className={`w-5 h-5 ${active ? 'text-primary-600 fill-current' : 'text-gray-500 group-hover:text-gray-700'}`} />}
    <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
  </div>
);
