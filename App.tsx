
import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { HealersPage } from './pages/Healers';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { BookingModal } from './components/healers/BookingModal';
import { Toast } from './components/common/Toast';
import { ViewState, Healer } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('feed');
  const [selectedHealer, setSelectedHealer] = useState<Healer | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedHealer]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  };

  const renderContent = () => {
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
        return <Profile showToast={showToast} />;
      case 'settings':
        return <Settings showToast={showToast} />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <MainLayout 
        currentView={currentView} 
        setView={setCurrentView} 
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
