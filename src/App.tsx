import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiscoverModal } from './components/DiscoverModal';
import { PlacesModal } from './components/PlacesModal';
import { StoriesModal } from './components/StoriesModal';
import { OurSpaceModal } from './components/OurSpaceModal';
import { WatchStoryModal } from './components/WatchStoryModal';
import { INITIAL_BUCKET_LIST } from './data/romanticContent';
import type { ActiveTab, BucketListItem, Place } from './types';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('discover');
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isOurSpaceOpen, setIsOurSpaceOpen] = useState(false);
  const [isWatchStoryOpen, setIsWatchStoryOpen] = useState(false);

  // Shared couple bucket list state
  const [bucketList, setBucketList] = useState<BucketListItem[]>(INITIAL_BUCKET_LIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize with URL hash for browser history and deep links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      setIsDiscoverOpen(hash === 'date-ideas' || hash === 'discover');
      setIsPlacesOpen(hash === 'places');
      setIsStoriesOpen(hash === 'stories');
      setIsOurSpaceOpen(hash === 'our-space');
      setIsWatchStoryOpen(hash === 'watch-story');
      if (['date-ideas', 'discover', 'places', 'stories', 'our-space'].includes(hash)) {
        setActiveTab(hash as ActiveTab);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when modal opens/closes
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsDiscoverOpen(tab === 'discover' || tab === 'date-ideas');
    setIsPlacesOpen(tab === 'places');
    setIsStoriesOpen(tab === 'stories');
    setIsOurSpaceOpen(tab === 'our-space');
    setIsWatchStoryOpen(false);
    window.location.hash = tab;
  };

  const handleCloseAll = () => {
    setIsDiscoverOpen(false);
    setIsPlacesOpen(false);
    setIsStoriesOpen(false);
    setIsOurSpaceOpen(false);
    setIsWatchStoryOpen(false);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleStartExploring = () => {
    setActiveTab('discover');
    setIsPlacesOpen(false);
    setIsStoriesOpen(false);
    setIsOurSpaceOpen(false);
    setIsWatchStoryOpen(false);
    setIsDiscoverOpen(true);
    window.location.hash = 'discover';
  };

  const handleWatchStory = () => {
    setIsDiscoverOpen(false);
    setIsPlacesOpen(false);
    setIsStoriesOpen(false);
    setIsOurSpaceOpen(false);
    setIsWatchStoryOpen(true);
    window.location.hash = 'watch-story';
  };

  const handleOpenOurSpace = () => {
    setIsDiscoverOpen(false);
    setIsPlacesOpen(false);
    setIsStoriesOpen(false);
    setIsWatchStoryOpen(false);
    setIsOurSpaceOpen(true);
    window.location.hash = 'our-space';
  };

  const handleSaveToOurSpace = (text: string, category: string) => {
    const newItem: BucketListItem = {
      id: Date.now().toString(),
      text,
      category,
      completed: false,
      addedBy: 'You',
    };
    setBucketList((prev) => [newItem, ...prev]);
    showToast(`Added "${text}" to Our Space`);
  };

  const handleSavePlace = (place: Place) => {
    handleSaveToOurSpace(`Explore ${place.name} (${place.location})`, 'Horizon');
  };

  const handleToggleBucketItem = (id: string) => {
    setBucketList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddBucketItem = (text: string) => {
    handleSaveToOurSpace(text, 'Shared Dream');
  };

  return (
    <main className="relative w-full min-h-screen bg-[#100D0B] text-[#F5E5D2] font-sans selection:bg-[#D88B55]/30 selection:text-[#F5E5D2]">
      {/* Minimalist Header Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenOurSpace={handleOpenOurSpace}
      />

      {/* Hero Section matching Reference 2 with 100vh canvas */}
      <Hero
        onStartExploring={handleStartExploring}
        onWatchStory={handleWatchStory}
        onSelectFeature={handleSelectTab}
        onOpenOurSpace={handleOpenOurSpace}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1712]/90 border border-[#D88B55]/40 text-[#F5E5D2] text-xs shadow-2xl backdrop-blur-md animate-fadeIn">
          <Sparkles size={13} className="text-[#D88B55]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Curated Date Ideas & Discovery Modal */}
      <DiscoverModal
        isOpen={isDiscoverOpen}
        onClose={handleCloseAll}
        onSaveToOurSpace={handleSaveToOurSpace}
      />

      {/* Places to Explore Modal */}
      <PlacesModal
        isOpen={isPlacesOpen}
        onClose={handleCloseAll}
        onSavePlace={handleSavePlace}
      />

      {/* Real Couple Stories Modal */}
      <StoriesModal
        isOpen={isStoriesOpen}
        onClose={handleCloseAll}
      />

      {/* A Shared Space Modal */}
      <OurSpaceModal
        isOpen={isOurSpaceOpen}
        onClose={handleCloseAll}
        bucketList={bucketList}
        onToggleBucketItem={handleToggleBucketItem}
        onAddBucketItem={handleAddBucketItem}
      />

      {/* Watch the Story Video & Cinematic Narrative Modal */}
      <WatchStoryModal
        isOpen={isWatchStoryOpen}
        onClose={handleCloseAll}
      />
    </main>
  );
};

export default App;
