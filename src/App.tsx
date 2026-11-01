import React, { useState } from 'react';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar, type AppView } from './components/layout/Navbar';
import { CinematicLanding } from './components/landing/CinematicLanding';
import { PaddockDashboard } from './components/paddock/PaddockDashboard';
import { SectionPlaceholder } from './components/layout/SectionPlaceholder';
import { NotebookViewer } from './components/notebook/NotebookViewer';

export const App: React.FC = () => {
  // Current view state: 'landing' initially for the F1 start experience
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const handleEnterPaddock = () => {
    setCurrentView('paddock');
  };

  const handleSelectDestination = (destId: 'notebook' | 'gallery' | 'vault' | 'easter-eggs') => {
    setCurrentView(destId);
  };

  const handleReplayLaunch = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f4e8c1]">
      <AmbientBackground />

      {/* Persistent Navbar appears in Paddock & destination views */}
      {currentView !== 'landing' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
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
          <NotebookViewer onReturnToPaddock={() => setCurrentView('paddock')} />
        )}

        {(currentView === 'gallery' ||
          currentView === 'vault' ||
          currentView === 'easter-eggs') && (
          <SectionPlaceholder
            sectionId={currentView}
            onReturnToPaddock={() => setCurrentView('paddock')}
            onReplayLaunch={handleReplayLaunch}
          />
        )}
      </main>


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
