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
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-gray-900">
      <Navbar currentView={currentView} setView={setView} />
      
      <div className="pt-5 md:pt-6 px-0 md:px-4 lg:px-6 max-w-[1920px] mx-auto flex justify-center pb-20 md:pb-8">
         {/* Responsive Grid System matched to Navbar breakpoints */}
         <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[320px_680px_320px] gap-6 w-full justify-center">
            
            {/* Left Sidebar - Hidden on Mobile */}
            <Sidebar currentUser={CURRENT_USER} currentView={currentView} setView={setView} />
            
            {/* Main Feed */}
            <main className="min-w-0 px-2 md:px-0">
               {children}
            </main>
            
            {/* Right Sidebar - Hidden on Mobile/Tablet */}
            <RightSidebar setSelectedHealer={setSelectedHealer} setView={setView} />
         </div>
      </div>

      <MobileBottomNav currentView={currentView} setView={setView} />
    </div>
  );
};