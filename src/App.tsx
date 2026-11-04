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

  // Ambient sound generator via Web Audio API (gentle warm cosmic drone, harmonic & calming)
  const [isAmbiancePlaying, setIsAmbiancePlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize with URL hash for browser history and deep links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'date-ideas' || hash === 'discover') {
        setActiveTab(hash as ActiveTab);
        setIsDiscoverOpen(true);
      } else if (hash === 'places') {
        setActiveTab('places');
        setIsPlacesOpen(true);
      } else if (hash === 'stories') {
        setActiveTab('stories');
        setIsStoriesOpen(true);
      } else if (hash === 'our-space') {
        setActiveTab('our-space');
        setIsOurSpaceOpen(true);
      } else if (hash === 'watch-story') {
        setIsWatchStoryOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when modal opens/closes
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'discover' || tab === 'date-ideas') {
      setIsDiscoverOpen(true);
      window.location.hash = tab;
    } else if (tab === 'places') {
      setIsPlacesOpen(true);
      window.location.hash = 'places';
    } else if (tab === 'stories') {
      setIsStoriesOpen(true);
      window.location.hash = 'stories';
    } else if (tab === 'our-space') {
      setIsOurSpaceOpen(true);
      window.location.hash = 'our-space';
    }
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
    setIsDiscoverOpen(true);
    window.location.hash = 'discover';
  };

  const handleWatchStory = () => {
    setIsWatchStoryOpen(true);
    window.location.hash = 'watch-story';
  };

  const handleOpenOurSpace = () => {
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

  // Toggle ambient atmospheric soundscape using Web Audio API
  const toggleAmbiance = () => {
    if (isAmbiancePlaying) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsAmbiancePlaying(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Warm harmonic drone (Chord: C3, G3, E4 softly filtered)
        const freqs = [130.81, 196.0, 329.63];
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          oscGain.gain.setValueAtTime(0.3, ctx.currentTime);

          // Subtle LFO for breathing wave effect
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.1, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(oscGain.gain);

          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start();
          lfo.start();
        });

        filter.connect(masterGain);
        masterGain.connect(ctx.destination);
        setAudioCtx(ctx);
        setIsAmbiancePlaying(true);
        showToast('Ambient horizon audio active');
      } catch (err) {
        console.error('Web Audio error:', err);
      }
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#100D0B] text-[#F5E5D2] font-sans selection:bg-[#D88B55]/30 selection:text-[#F5E5D2]">
      {/* Minimalist Header Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenOurSpace={handleOpenOurSpace}
        isAmbiancePlaying={isAmbiancePlaying}
        onToggleAmbiance={toggleAmbiance}
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
