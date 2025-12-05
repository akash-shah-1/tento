
import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { HealersPage } from './pages/Healers';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { MoodTracker } from './pages/MoodTracker';
import { SearchResults } from './pages/SearchResults';
import { Groups } from './pages/Groups';
import { Events } from './pages/Events';
import { BookingModal } from './components/healers/BookingModal';
import { CreatePostModal } from './components/feed/CreatePostModal'; // Import Global Modal
import { Toast } from './components/common/Toast';
import { LoadingBar } from './components/common/LoadingBar';
import { ViewState, Healer } from './types';
import { useSearch } from './hooks/useSearch';
import { usePosts } from './hooks/usePosts'; // Import for addPost action
import { CURRENT_USER } from './data/index';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('feed');
  const [selectedHealer, setSelectedHealer] = useState<Healer | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); // Global Create Post State
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Logic hooks
  const { addToHistory } = useSearch('');
  const { addPost } = usePosts(CURRENT_USER); // Get addPost logic

  // Page Transition Loading State
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedHealer]);

  const handleSetView = (view: ViewState) => {
    if (view === currentView && view !== 'search') return;
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsPageLoading(false);
    }, 600); // Simulate routing delay
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    addToHistory(query);
    handleSetView('search');
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
              return (
                <Home 
                  onOpenCreatePost={() => setIsCreatePostOpen(true)} 
                  onSelectHealer={(h) => { setSelectedHealer(h); handleSetView('healers'); }}
                />
              );
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
            case 'mood':
              return <MoodTracker />;
            case 'groups':
              return <Groups />;
            case 'events':
              return <Events />;
            case 'search':
              return <SearchResults query={searchQuery} setSelectedHealer={(h) => { setSelectedHealer(h); handleSetView('healers'); }} />;
            default:
              return <Home onOpenCreatePost={() => setIsCreatePostOpen(true)} onSelectHealer={(h) => { setSelectedHealer(h); handleSetView('healers'); }} />;
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
        onSearch={handleSearch}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
      >
        {renderContent()}
      </MainLayout>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        healer={selectedHealer} 
      />

      <CreatePostModal 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        currentUser={CURRENT_USER}
        onSubmit={(content, image, visibility, isAnonymous) => {
          addPost(content, image, visibility, isAnonymous);
          showToast('Post published successfully!');
        }}
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
