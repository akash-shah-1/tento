import React from 'react';
import { Home, MessageCircle, User, Users, PlusSquare } from 'lucide-react';
import { ViewState } from '../../types';

interface NavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const MobileBottomNav: React.FC<NavProps> = ({ currentView, setView }) => {
  return (
    // Removed 'fixed bottom-0' to let flexbox handle position at bottom of container
    <div className="md:hidden bg-white border-t border-gray-200 z-50 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.05)] flex-shrink-0">
      <div className="flex justify-around items-center h-16">
        <MobileNavItem active={currentView === 'feed'} onClick={() => setView('feed')} icon={Home} label="Home" />
        <MobileNavItem active={currentView === 'healers'} onClick={() => setView('healers')} icon={Users} label="Healers" />
        <div className="flex flex-col items-center justify-center -mt-6">
           <button className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-3.5 rounded-full shadow-lg shadow-primary-500/30 active:scale-95 transition-transform border-4 border-white">
             <PlusSquare className="w-6 h-6" />
           </button>
        </div>
        <MobileNavItem active={currentView === 'messages'} onClick={() => setView('messages')} icon={MessageCircle} label="Messages" />
        <MobileNavItem active={currentView === 'profile'} onClick={() => setView('profile')} icon={User} label="Profile" />
      </div>
    </div>
  );
};

const MobileNavItem: React.FC<{ active: boolean; onClick: () => void; icon: any; label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center py-2 ${
      active ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);