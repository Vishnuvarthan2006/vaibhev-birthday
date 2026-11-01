import React, { useState } from 'react';
import {
  Compass,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Image,
  Film,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';
import { soundFx } from '../../utils/audioFx';


export type AppView = 'landing' | 'paddock' | 'notebook' | 'gallery' | 'vault' | 'easter-eggs';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onReplayLaunch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onReplayLaunch,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (!next) {
      soundFx.playUiClick();
    }
  };

  const navItems = [
    { id: 'paddock' as AppView, label: 'Paddock', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'notebook' as AppView, label: 'Notebook', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'gallery' as AppView, label: 'Photo Archive', icon: <Image className="w-3.5 h-3.5" /> },
    { id: 'vault' as AppView, label: 'Video Vault', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'easter-eggs' as AppView, label: 'Easter Eggs', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-obsidian-950/85 backdrop-blur-xl px-4 sm:px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Recipient Identity */}
        <div
          onClick={() => {
            soundFx.playUiClick();
            onNavigate('paddock');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-md border border-gold-500/30 bg-gradient-to-br from-[#1b1b26] to-[#0a0a0f] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-gold-400 transition-colors">
            <span className="font-display font-black text-base gold-text-gradient">V</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm text-white tracking-wider uppercase group-hover:text-gold-200 transition-colors">
                {RECIPIENT_PROFILE.name}
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-red-400 px-1.5 py-0.2 rounded bg-ferrari-500/10 border border-ferrari-500/20">
                #44
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 block tracking-wider">
              SCUDERIA PADDOCK
            </span>
          </div>
        </div>

        {/* Desktop Destination Links */}
        <nav className="hidden md:flex items-center gap-1 bg-obsidian-900/90 border border-white/5 p-1 rounded-lg">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-300 font-semibold border border-gold-500/30 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={isActive ? 'text-gold-400' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2">
          {/* Replay F1 Launch Button */}
          <button
            onClick={() => {
              soundFx.playUiClick();
              onReplayLaunch();
            }}
            title="Replay F1 Starting Grid Sequence"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-obsidian-900 text-xs font-mono text-gray-300 hover:text-gold-300 hover:border-gold-500/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden lg:inline">F1 LAUNCH</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute race audio' : 'Mute race audio'}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-md border border-white/10 bg-obsidian-900 text-gray-400 hover:text-gold-300 hover:border-gold-500/30 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-md border border-white/10 bg-obsidian-900 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1 pb-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-mono text-left transition-colors ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-300 font-semibold border border-gold-500/30'
                    : 'text-gray-300 hover:bg-white/[0.04]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              soundFx.playUiClick();
              onReplayLaunch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-mono text-gold-400 hover:bg-white/[0.04] mt-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REPLAY F1 STARTING GRID</span>
          </button>
        </div>
      )}
    </header>
  );
};
