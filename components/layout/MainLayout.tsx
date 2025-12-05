
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
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
  const isFullWidthPage = currentView === 'healers' || currentView === 'messages' || currentView === 'profile' || currentView === 'settings';
  
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Pull to Refresh State
  const [pullStart, setPullStart] = useState(0);
  const [pullChange, setPullChange] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Handler
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollTop(scrollContainerRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pull to Refresh Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current?.scrollTop === 0) {
      setPullStart(e.targetTouches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!pullStart) return;
    const currentY = e.targetTouches[0].clientY;
    const diff = currentY - pullStart;
    
    if (diff > 0 && diff < 200) {
      setPullChange(diff);
    }
  };

  const handleTouchEnd = () => {
    if (pullChange > 80) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullChange(0);
      }, 1500); // Mock refresh
    } else {
      setPullChange(0);
    }
    setPullStart(0);
  };

  return (
    <div className="h-screen w-full bg-[#F0F2F5] font-sans text-gray-900 flex flex-col overflow-hidden">
      {/* 1. Header */}
      <Navbar currentView={currentView} setView={setView} />
      
      {/* 2. Scrollable Content Area */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto overflow-x-hidden relative" 
        id="main-scroll-container"
      >
        {/* Pull to Refresh Indicator */}
        <div 
          className="w-full flex justify-center items-center overflow-hidden transition-all duration-200"
          style={{ height: isRefreshing ? 60 : pullChange, opacity: pullChange > 0 ? 1 : 0 }}
        >
          <div className="bg-white p-2 rounded-full shadow-md">
            <Loader2 className={`w-6 h-6 text-primary-500 ${isRefreshing || pullChange > 0 ? 'animate-spin' : ''}`} />
          </div>
        </div>

        <div className={`pt-5 md:pt-6 px-0 md:px-4 lg:px-6 mx-auto flex justify-center pb-8 ${isFullWidthPage ? 'max-w-[1920px]' : 'max-w-[1920px]'}`}>
           {/* Responsive Grid System */}
           <div className={`grid gap-6 w-full ${
             isFullWidthPage 
               ? 'grid-cols-1 md:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr]' 
               : 'grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[320px_680px_320px] justify-center'
           }`}>
              
              {/* Left Sidebar */}
              <Sidebar currentUser={CURRENT_USER} currentView={currentView} setView={setView} isLoading={isLoading} />
              
              {/* Main Feed */}
              <main className="min-w-0 px-2 md:px-0 h-full">
                 {children}
              </main>
              
              {/* Right Sidebar */}
              {!isFullWidthPage && (
                <RightSidebar setSelectedHealer={setSelectedHealer} setView={setView} isLoading={isLoading} />
              )}
           </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-20 md:bottom-8 right-6 p-3 bg-white rounded-full shadow-lg border border-gray-100 z-40 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
          <ArrowUp className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 3. Footer */}
      <MobileBottomNav currentView={currentView} setView={setView} />
    </div>
  );
};
