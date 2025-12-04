import React, { useState } from 'react';
import { Home, Search, MessageCircle, Bell, LayoutGrid, ChevronDown, BookOpen, Users } from 'lucide-react';
import { ViewState } from '../../types';
import { CURRENT_USER } from '../../data/index';
import { Avatar } from '../common/Avatar';

interface NavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 h-14">
      {/* Container - flex layout with proper spacing */}
      <div className="max-w-[1920px] mx-auto px-4 h-full flex justify-between items-center">
        
        {/* LEFT: Logo & Search - Responsive Width */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 md:w-[260px] lg:w-[260px] xl:w-[320px]">
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => setView('feed')}>
             <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            {/* Logo Text - Hidden on small mobile, visible on larger screens */}
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 hidden sm:block">
              HealSpace
            </span>
          </div>
          
          {/* Desktop Search */}
          <div className="relative hidden xl:block w-full max-w-[240px] ml-4">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400" />
             </div>
             <input
               type="text"
               className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 border-none rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:bg-white transition-all"
               placeholder="Search HealSpace"
             />
          </div>
          {/* Mobile Search Icon */}
          <button className="xl:hidden p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors ml-2 flex-shrink-0">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* CENTER: Navigation Icons - Hidden on Mobile */}
        <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 flex-1 max-w-[680px] px-2 h-full">
           <NavIcon active={currentView === 'feed'} onClick={() => setView('feed')} icon={Home} label="Home" />
           <NavIcon active={false} onClick={() => setView('feed')} icon={BookOpen} label="Stories" />
           <NavIcon active={currentView === 'healers'} onClick={() => setView('healers')} icon={Users} label="Healers" />
           <NavIcon active={currentView === 'messages'} onClick={() => setView('messages')} icon={MessageCircle} label="Messages" badge={2} />
        </div>

        {/* RIGHT: Profile & Actions - Responsive Width */}
        <div className="flex items-center justify-end space-x-2 flex-shrink-0 md:w-[260px] lg:w-[260px] xl:w-[320px]">
           {/* User Chip - Hidden on smaller screens */}
           <div className="hidden xl:flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-full pr-4 transition-colors mr-2" onClick={() => setView('profile')}>
              <Avatar src={CURRENT_USER.avatar} alt="Profile" size="sm" />
              <span className="text-sm font-semibold text-gray-900">{CURRENT_USER.name.split(' ')[0]}</span>
           </div>

           <NavActionBtn icon={LayoutGrid} label="Menu" className="hidden md:flex" />
           <NavActionBtn icon={MessageCircle} label="Messenger" badge={2} className="xl:hidden hidden md:flex" />
           <NavActionBtn icon={Bell} label="Notifications" badge={5} />
           
           {/* Mobile Profile Avatar */}
           <div className="relative md:hidden" onClick={() => setView('profile')}>
             <Avatar src={CURRENT_USER.avatar} alt="Profile" size="sm" />
           </div>
           
           {/* Desktop Dropdown */}
           <div className="hidden md:flex relative cursor-pointer" onClick={() => setView('profile')}>
             <div className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
               <ChevronDown className="w-5 h-5 text-gray-700" />
             </div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const NavIcon: React.FC<{ active: boolean; onClick: () => void; icon: any; label: string; badge?: number }> = ({ active, onClick, icon: Icon, label, badge }) => (
  <div className="relative h-full flex items-center px-1 sm:px-2 md:px-6 lg:px-8 group cursor-pointer w-full justify-center" onClick={onClick}>
    <div className={`relative p-2 rounded-lg group-hover:bg-gray-100 transition-colors ${active ? '' : ''}`}>
      <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors ${active ? 'text-primary-500 fill-current' : 'text-gray-500 group-hover:text-gray-700'}`} strokeWidth={active ? 2.5 : 2} />
      {badge && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
          {badge}
        </span>
      )}
    </div>
    {active && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-500 rounded-t-full"></span>}
  </div>
);

const NavActionBtn: React.FC<{ icon: any; label: string; badge?: number; className?: string }> = ({ icon: Icon, label, badge, className = '' }) => (
  <button className={`relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors group flex-shrink-0 ${className}`}>
    <Icon className="w-5 h-5 text-gray-800" />
    {badge && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
        {badge}
      </span>
    )}
  </button>
);