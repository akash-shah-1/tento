
import React, { useState, useRef, useEffect } from 'react';
import { Home, Search, MessageCircle, User, Bell, Menu, PlusSquare, Smile, Users, LayoutGrid, ChevronDown, LogOut, Settings, X, Clock } from 'lucide-react';
import { ViewState } from '../../types';
import { CURRENT_USER } from '../../data/index';
import { Avatar } from '../common/Avatar';

interface NavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavProps> = ({ currentView, setView }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100 h-14">
      <div className="max-w-[1920px] mx-auto px-4 h-full flex justify-between items-center">
        
        {/* LEFT: Logo & Search */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 md:w-[260px] lg:w-[260px] xl:w-[320px]">
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => setView('feed')}>
             <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 hidden sm:block">
              HealSpace
            </span>
          </div>
          
          {/* Desktop Search with Facebook-style Dropdown */}
          <div className="relative hidden xl:block w-full max-w-[240px] ml-4" ref={searchRef}>
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className={`h-4 w-4 ${isSearchFocused ? 'text-primary-500' : 'text-gray-400'}`} />
             </div>
             <input
               type="text"
               onFocus={() => setIsSearchFocused(true)}
               className={`block w-full pl-10 pr-3 py-2.5 bg-gray-100 border-none rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:bg-white transition-all ${isSearchFocused ? 'shadow-md' : ''}`}
               placeholder="Search HealSpace"
             />
             
             {/* Search Dropdown */}
             {isSearchFocused && (
               <div className="absolute top-full left-0 w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 mt-2 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                 <div className="flex justify-between items-center px-3 py-2">
                   <span className="text-sm font-bold text-gray-900">Recent Searches</span>
                   <button className="text-xs text-blue-600 hover:underline">Edit</button>
                 </div>
                 <ul>
                   {['Anxiety Support', 'Dr. Emily', 'Meditation Groups'].map((term, i) => (
                     <li key={i} className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer group">
                       <div className="flex items-center">
                         <div className="bg-gray-100 p-1.5 rounded-full mr-3 group-hover:bg-white transition-colors">
                           <Clock className="w-4 h-4 text-gray-500" />
                         </div>
                         <span className="text-sm text-gray-700">{term}</span>
                       </div>
                       <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
                         <X className="w-3 h-3" />
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
          </div>
          
          <button className="xl:hidden p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors ml-2 flex-shrink-0">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* CENTER: Navigation Icons */}
        <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 flex-1 max-w-[680px] px-2 h-full">
           <NavIcon active={currentView === 'feed'} onClick={() => setView('feed')} icon={Home} label="Home" />
           {/* Replaced Stories with Mood Tracker */}
           <NavIcon active={currentView === 'mood'} onClick={() => setView('mood')} icon={Smile} label="Mood Tracker" />
           <NavIcon active={currentView === 'healers'} onClick={() => setView('healers')} icon={Users} label="Healers" />
           <NavIcon active={currentView === 'messages'} onClick={() => setView('messages')} icon={MessageCircle} label="Messages" badge={2} />
        </div>

        {/* RIGHT: Profile & Actions */}
        <div className="flex items-center justify-end space-x-2 flex-shrink-0 md:w-[260px] lg:w-[260px] xl:w-[320px]">
           <div className="hidden xl:flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-full pr-4 transition-colors mr-2" onClick={() => setView('profile')}>
              <Avatar src={CURRENT_USER.avatar} alt="Profile" size="sm" />
              <span className="text-sm font-semibold text-gray-900">{CURRENT_USER.name.split(' ')[0]}</span>
           </div>

           <NavActionBtn icon={LayoutGrid} label="Menu" className="hidden md:flex" />
           {/* Mobile Messenger Icon in Header */}
           <NavActionBtn icon={MessageCircle} label="Messenger" badge={2} className="flex xl:hidden" onClick={() => setView('messages')} />
           <NavActionBtn icon={Bell} label="Notifications" badge={5} />
           
           <div className="relative">
             <div className="cursor-pointer p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hidden md:flex" onClick={() => setShowProfileMenu(!showProfileMenu)}>
               <ChevronDown className="w-5 h-5 text-gray-700" />
             </div>
             {showProfileMenu && (
               <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95">
                 <button onClick={() => { setView('profile'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                   <Users className="w-4 h-4 mr-2" /> Profile
                 </button>
                 <button onClick={() => { setView('settings'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                   <Settings className="w-4 h-4 mr-2" /> Settings
                 </button>
                 <div className="border-t border-gray-100 my-1"></div>
                 <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                   <LogOut className="w-4 h-4 mr-2" /> Log Out
                 </button>
               </div>
             )}
           </div>

           <div className="relative md:hidden" onClick={() => setView('profile')}>
             <Avatar src={CURRENT_USER.avatar} alt="Profile" size="sm" />
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

const NavActionBtn: React.FC<{ icon: any; label: string; badge?: number; className?: string; onClick?: () => void }> = ({ icon: Icon, label, badge, className = '', onClick }) => (
  <button onClick={onClick} className={`relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors group flex-shrink-0 ${className}`}>
    <Icon className="w-5 h-5 text-gray-800" />
    {badge && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
        {badge}
      </span>
    )}
  </button>
);
