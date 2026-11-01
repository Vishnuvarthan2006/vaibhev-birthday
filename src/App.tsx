import React, { useState, useEffect } from 'react';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar, type AppView } from './components/layout/Navbar';
import { CinematicLanding } from './components/landing/CinematicLanding';
import { PaddockDashboard } from './components/paddock/PaddockDashboard';
import { NotebookViewer } from './components/notebook/NotebookViewer';
import { PhotoArchive } from './components/gallery/PhotoArchive';
import { VideoVault } from './components/video/VideoVault';
import { SecretGarage } from './components/garage/SecretGarage';
import { ClueFoundNotification } from './components/common/ClueFoundNotification';

const VALID_VIEWS: AppView[] = ['landing', 'paddock', 'notebook', 'gallery', 'vault', 'easter-eggs'];

export const App: React.FC = () => {
  // Read initial view from URL hash if user refreshed on a specific sector
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as AppView;
      if (VALID_VIEWS.includes(hash)) {
        return hash;
      }
    }
    return 'landing';
  });

  // Sync state with browser hash navigation (handles back/forward/refresh)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      if (VALID_VIEWS.includes(hash)) {
        setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when navigating to support browser refresh without losing view
  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (view === 'landing') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = view;
    }
  };

  const handleEnterPaddock = () => {
    navigateTo('paddock');
  };

  const handleSelectDestination = (destId: 'notebook' | 'gallery' | 'vault' | 'easter-eggs') => {
    navigateTo(destId);
  };

  const handleReplayLaunch = () => {
    navigateTo('landing');
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f4e8c1]">
      <AmbientBackground />

      {/* Persistent Navbar appears in Paddock & destination views */}
      {currentView !== 'landing' && (
        <Navbar
          currentView={currentView}
          onNavigate={navigateTo}
          onReplayLaunch={handleReplayLaunch}
        />
      )}

      {/* View Routing */}
      <main className="relative z-10 flex-1 flex flex-col">
        {currentView === 'landing' && (
          <CinematicLanding onEnterPaddock={handleEnterPaddock} />
        )}

        {currentView === 'paddock' && (
          <PaddockDashboard
            onSelectDestination={handleSelectDestination}
            onReplayLaunch={handleReplayLaunch}
          />
        )}

        {currentView === 'notebook' && (
          <NotebookViewer onReturnToPaddock={() => navigateTo('paddock')} />
        )}

        {currentView === 'gallery' && (
          <PhotoArchive
            onReturnToPaddock={() => navigateTo('paddock')}
            onNavigateToVault={() => navigateTo('vault')}
          />
        )}

        {currentView === 'vault' && (
          <VideoVault
            onReturnToPaddock={() => navigateTo('paddock')}
            onNavigateToGallery={() => navigateTo('gallery')}
          />
        )}

        {currentView === 'easter-eggs' && (
          <SecretGarage
            onReturnToPaddock={() => navigateTo('paddock')}
            onReplayLaunch={handleReplayLaunch}
          />
        )}
      </main>

      {/* Real-time Clue Discovery Notification across all views */}
      <ClueFoundNotification onOpenJournal={() => navigateTo('easter-eggs')} />

      {/* Subtle Paddock Footer (visible across all views) */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-obsidian-950/80 px-6 py-4 text-center">
        <p className="text-xs font-mono text-gray-400">
          Scuderia 9-Squad Syndicate • Maranello Telemetry • Crafted with precision for Vaibhev #44
        </p>
      </footer>
    </div>
  );
};

export default App;
