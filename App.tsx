
import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { HealersPage } from './pages/Healers';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { BookingModal } from './components/healers/BookingModal';
import { Toast } from './components/common/Toast';
import { LoadingBar } from './components/common/LoadingBar';
import { ViewState, Healer } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('feed');
  const [selectedHealer, setSelectedHealer] = useState<Healer | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  // Page Transition Loading State
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedHealer]);

  const handleSetView = (view: ViewState) => {
    if (view === currentView) return;
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsPageLoading(false);
    }, 600); // Simulate routing delay
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  };

  const renderContent = () => {
    // Wrap content in fade container
    return (
      <div key={currentView} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {(() => {
          switch (currentView) {
            case 'feed':
              return <Home />;
            case 'healers':
              return (
                <HealersPage 
                  selectedHealer={selectedHealer} 
                  setSelectedHealer={setSelectedHealer}
                  onBook={() => setIsBookingOpen(true)} 
                />
              );
            case 'messages':
              return <Messages />;
            case 'profile':
              return <Profile showToast={showToast} setView={handleSetView} />;
            case 'settings':
              return <Settings showToast={showToast} />;
            default:
              return <Home />;
          }
        })()}
      </div>
    );
  };

  return (
    <>
      <LoadingBar isLoading={isPageLoading} />
      
      <MainLayout 
        currentView={currentView} 
        setView={handleSetView} 
        setSelectedHealer={setSelectedHealer}
      >
        {renderContent()}
      </MainLayout>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        healer={selectedHealer} 
      />

      {toast && (
        <Toast 
          message={toast.msg} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
};

export default App;
