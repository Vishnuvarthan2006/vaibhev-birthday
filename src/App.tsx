import React from 'react';
import {
  BookOpen,
  Image,
  Shuffle,
  FolderTree,
  Flame,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

import { AmbientBackground } from './components/layout/AmbientBackground';
import { HeaderNav } from './components/layout/HeaderNav';
import { LuxuryBadge } from './components/common/LuxuryBadge';
import { GoldButton } from './components/common/GoldButton';
import { RECIPIENT_PROFILE, SITE_SECTIONS } from './data/siteConfig';
import { useNotebookEntries } from './hooks/useNotebookEntries';

export const App: React.FC = () => {
  const { entries, totalEntries, reshuffle } = useNotebookEntries();

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f4e8c1]">
      <AmbientBackground />
      <HeaderNav />

      {/* Main Foundational Showcase Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10">
        {/* Foundation Hero Banner */}
        <section className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
            <LuxuryBadge variant="gold" size="sm">
              PHASE 1: FOUNDATION & ARCHITECTURE
            </LuxuryBadge>
            <LuxuryBadge variant="ferrari" size="sm">
              FERRARI F1 • #44 EDITION
            </LuxuryBadge>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> SYSTEM OPERATIONAL
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            <span className="gold-text-gradient">VAIBHEV</span>{' '}
            <span className="text-white/90">BIRTHDAY VAULT</span>
          </h1>

          <p className="text-gray-300 max-w-3xl text-sm sm:text-base leading-relaxed">
            The foundational design system, 9-friend notebook data architecture, media storage
            hierarchy, and session randomization engine have been established. Built for{' '}
            <span className="text-gold-300 font-medium">Scuderia Ferrari</span> speed,{' '}
            <span className="text-white font-medium">Black & Gold luxury</span>, and seamless deployment.
          </p>
        </section>

        {/* Grid Section 1: Notebook Architecture Verification */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-400" />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                  9-Friend Notebook Architecture
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Data structure ready. Session randomization active (current order displayed below without modifying source data).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <GoldButton
                variant="gold-outline"
                size="sm"
                icon={<Shuffle className="w-3.5 h-3.5" />}
                onClick={reshuffle}
              >
                Test Session Re-Shuffle
              </GoldButton>
              <LuxuryBadge variant="carbon" size="sm">
                {totalEntries} SLOTS LOCKED
              </LuxuryBadge>
            </div>
          </div>

          {/* 9-Slot Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="carbon-panel rounded-lg p-5 border border-white/[0.08] hover:border-gold-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Accent top stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    entry.accentStyle === 'ferrari-red'
                      ? 'bg-gradient-to-r from-ferrari-500 to-ferrari-600'
                      : entry.accentStyle === 'gold'
                      ? 'bg-gradient-to-r from-gold-300 to-gold-600'
                      : 'bg-gradient-to-r from-gray-500 to-gray-700'
                  }`}
                />

                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className="font-mono text-xs text-gold-400 tracking-wider">
                    DISPLAY SLOT #{index + 1}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                    ID: {entry.id}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-white text-base group-hover:text-gold-200 transition-colors">
                  {entry.friendName}
                </h3>

                <p className="font-mono text-xs text-red-400/90 mb-2">
                  Role: {entry.callsign}
                </p>

                <p className="text-xs text-gray-400 italic mb-4 line-clamp-2">
                  "{entry.tagline}"
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] font-mono text-gray-400">
                  <span>{entry.photos.length} Photo Attachments</span>
                  <span className="text-gold-400/90 font-medium">{entry.stickerBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grid Section 2: Planned Sections Architecture */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-gold-400" /> Planned Website Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Architecture roadmap to be built incrementally in subsequent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_SECTIONS.map((sec, idx) => (
              <div
                key={sec.id}
                className="carbon-panel rounded-lg p-5 border border-white/[0.08] relative group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded border border-gold-500/20 bg-gold-500/5 flex items-center justify-center font-mono text-xs font-bold text-gold-400">
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-300 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 uppercase">
                    {sec.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-1">
                  {sec.title}
                </h3>
                <p className="text-xs font-mono text-gold-400/80 mb-2">{sec.subtitle}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{sec.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grid Section 3: Media Architecture & Recipient Profile */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Media Structure Card */}
          <div className="carbon-panel rounded-lg p-6 border border-white/[0.08]">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-gold-400" /> Media Directory Architecture
            </h3>
            <ul className="space-y-3 font-mono text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">public/media/notebook/</span>
                  <p className="text-gray-400 text-[11px] font-sans">
                    Scrapbook photos for the 9 friend entries (multi-photo support).
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">public/media/gallery/</span>
                  <p className="text-gray-400 text-[11px] font-sans">
                    General photography, supercars, F1 moments, and squad memories.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">public/media/videos/</span>
                  <p className="text-gray-400 text-[11px] font-sans">
                    Birthday video vault, video tributes, and bloopers.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">public/media/static/</span>
                  <p className="text-gray-400 text-[11px] font-sans">
                    Ferrari crests, Hamilton #44 logos, badges, and background assets.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">public/media/audio/</span>
                  <p className="text-gray-400 text-[11px] font-sans">
                    Engine revs, Minecraft clicks, and Tung Tung Tung Sahur memes.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Preferences & Theme Blueprint Card */}
          <div className="carbon-panel rounded-lg p-6 border border-white/[0.08]">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-ferrari-400" /> Recipient Persona & Theme Blueprint
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-gray-400 font-mono">Recipient:</span>
                <span className="text-white font-semibold font-display tracking-wider">
                  {RECIPIENT_PROFILE.name}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-gray-400 font-mono">Colour Palette:</span>
                <span className="text-gold-300 font-medium">Matte Obsidian Black & 24k Gold</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-gray-400 font-mono">F1 Allegiance:</span>
                <span className="text-red-400 font-medium">
                  {RECIPIENT_PROFILE.favouriteF1Team} ({RECIPIENT_PROFILE.favouriteDriver} #{RECIPIENT_PROFILE.driverNumber})
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-gray-400 font-mono">Easter Egg Hooks:</span>
                <span className="text-gray-200">Tung Sahur • Minecraft • Spider-Sense</span>
              </div>
              <div className="pt-2">
                <span className="text-gray-400 font-mono block mb-1.5">Interests & Subtleties:</span>
                <div className="flex flex-wrap gap-1.5">
                  {RECIPIENT_PROFILE.passions.map((passion) => (
                    <span
                      key={passion}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-gray-300 border border-white/[0.06]"
                    >
                      {passion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-obsidian-950/80 px-6 py-4 text-center">
        <p className="text-xs font-mono text-gray-400">
          Scuderia 9-Squad Syndicate • Crafted with precision for Vaibhev • Foundation Stage Complete
        </p>
      </footer>
    </div>
  );
};

export default App;
