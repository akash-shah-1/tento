import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { ViewState } from '../../types';
import { CURRENT_USER } from '../../data/index';

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  setSelectedHealer: (healer: any) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentView, setView, setSelectedHealer }) => {
  // Determine if the current view needs full width (hiding the global right sidebar)
  const isFullWidthPage = currentView === 'healers' || currentView === 'messages' || currentView === 'profile';

  return (
    <div className="h-screen w-full bg-[#F0F2F5] font-sans text-gray-900 flex flex-col overflow-hidden">
      {/* 1. Header (Fixed Height, Non-scrolling) */}
      <Navbar currentView={currentView} setView={setView} />
      
      {/* 2. Scrollable Content Area (Takes remaining space) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" id="main-scroll-container">
        <div className={`pt-5 md:pt-6 px-0 md:px-4 lg:px-6 mx-auto flex justify-center pb-8 ${isFullWidthPage ? 'max-w-[1920px]' : 'max-w-[1920px]'}`}>
           {/* Responsive Grid System */}
           <div className={`grid gap-6 w-full ${
             isFullWidthPage 
               ? 'grid-cols-1 md:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr]' // 2-Col Layout for Healers/Messages
               : 'grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[320px_680px_320px] justify-center' // 3-Col Layout for Feed
           }`}>
              
              {/* Left Sidebar - Hidden on Mobile */}
              <Sidebar currentUser={CURRENT_USER} currentView={currentView} setView={setView} />
              
              {/* Main Feed / Content Area */}
              <main className="min-w-0 px-2 md:px-0 h-full">
                 {children}
              </main>
              
              {/* Right Sidebar - Only shown on Feed view */}
              {!isFullWidthPage && (
                <RightSidebar setSelectedHealer={setSelectedHealer} setView={setView} />
              )}
           </div>
        </div>
      </div>

      {/* 3. Footer Navigation (Mobile Only, Fixed Height, Non-scrolling) */}
      <MobileBottomNav currentView={currentView} setView={setView} />
    </div>
  );
};