import React, { useState } from 'react';
import {
  BookOpen,
  Image,
  Film,
  Sparkles,
  Flag,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { DestinationCard } from './DestinationCard';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { GoldButton } from '../common/GoldButton';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';
import { soundFx } from '../../utils/audioFx';

export interface PaddockDashboardProps {
  onSelectDestination: (id: 'notebook' | 'gallery' | 'vault' | 'easter-eggs') => void;
  onReplayLaunch: () => void;
}

export const PaddockDashboard: React.FC<PaddockDashboardProps> = ({
  onSelectDestination,
  onReplayLaunch,
}) => {
  const { isClueDiscovered, discoverClue } = useTreasureHunt();
  const [clickCount, setClickCount] = useState<number>(0);

  const handleSectorStatusClick = () => {
    soundFx.playUiClick();
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 3) {
      discoverClue('clue-9-rashmika');
      setClickCount(0);
    }
  };

  return (
    <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-14">
      {/* Paddock Header */}
      <section className="mb-12 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <LuxuryBadge
              variant="ferrari"
              size="sm"
              icon={<Flag className="w-3.5 h-3.5 text-ferrari-400" />}
            >
              SCUDERIA FERRARI • MARANELLO
            </LuxuryBadge>

            <LuxuryBadge
              variant="gold"
              size="sm"
              icon={<Compass className="w-3.5 h-3.5 text-gold-400" />}
            >
              SECTOR CONTROL
            </LuxuryBadge>

            {/* Clue 9 Trigger: Unobtrusively integrated into Sector Status badge */}
            <button
              type="button"
              onClick={handleSectorStatusClick}
              title={
                isClueDiscovered('clue-9-rashmika')
                  ? 'All 4 Sectors Synchronized [D] ✓'
                  : 'Sector Status: Online'
              }
              className={`text-xs font-mono px-3 py-1 rounded-full border font-bold transition-all cursor-pointer ${
                isClueDiscovered('clue-9-rashmika')
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
              {isClueDiscovered('clue-9-rashmika')
                ? 'ALL 4 SECTORS READY [D] ✓'
                : 'ALL 4 SECTORS READY'}
            </button>
          </div>

          {/* Quick Action: Replay Starting Sequence */}
          <GoldButton
            variant="carbon"
            size="sm"
            icon={<RotateCcw className="w-4 h-4 text-gold-400" />}
            onClick={onReplayLaunch}
          >
            Replay F1 Launch
          </GoldButton>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
            <span className="gold-text-gradient block">THE PADDOCK</span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 tracking-wider block mt-2">
              VAIBHEV'S COMMAND CONSOLE
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed font-sans max-w-3xl">
            Welcome to the central command hub. From here, navigate through the personal letters of the
            9-friend syndicate, unlock the curated photographic archives, access the cinematic video
            vault, or unearth the secret Easter eggs hidden in the garage.
          </p>
        </div>
      </section>

      {/* Main 4 Destination Gateways */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_#d4af37]" />
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
              SECTORS &amp; GATEWAYS
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-400">
            SELECT A GATEWAY TO INITIALIZE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Destination 1: THE NOTEBOOK */}
          <DestinationCard
            id="notebook"
            number="01"
            title="THE NOTEBOOK"
            subtitle="Personal Letters & Scrapbook"
            description="Nine individual handwritten letters, intimate stories, and attached photographs from every member of the squad. Each visit shuffles the chapters anew while preserving their original identities."
            icon={<BookOpen className="w-6 h-6 text-gold-400" />}
            badgeText="9 CHAPTERS LOCKED"
            badgeVariant="gold"
            accentTheme="gold"
            onClick={() => onSelectDestination('notebook')}
          />

          {/* Destination 2: PHOTO ARCHIVE */}
          <DestinationCard
            id="gallery"
            number="02"
            title="PHOTO ARCHIVE"
            subtitle="Curated Photographic Vault"
            description="Supercars, trackdays, candid memories, and milestone celebrations. A dedicated high-resolution visual timeline capturing the camaraderie of the squad across the years."
            icon={<Image className="w-6 h-6 text-red-400" />}
            badgeText="ARCHIVE READY"
            badgeVariant="ferrari"
            accentTheme="ferrari"
            onClick={() => onSelectDestination('gallery')}
          />

          {/* Destination 3: VIDEO VAULT */}
          <DestinationCard
            id="vault"
            number="03"
            title="VIDEO VAULT"
            subtitle="Cinema & Video Transmissions"
            description="Cinematic birthday montages, unfiltered group banter, F1 tributes, and hilarious blooper reels transmitted directly to the paddock for the ultimate screening experience."
            icon={<Film className="w-6 h-6 text-gold-400" />}
            badgeText="CINEMA READY"
            badgeVariant="carbon"
            accentTheme="carbon"
            onClick={() => onSelectDestination('vault')}
          />

          {/* Destination 4: SECRET GARAGE */}
          <DestinationCard
            id="easter-eggs"
            number="04"
            title="SECRET GARAGE"
            subtitle="Operation Vaibhev • Treasure Hunt"
            description="Six arcade challenges, reaction dyno, chaos soundboards, pit stop challenges, and the 9-clue treasure hunt to unlock the grand final vault."
            icon={<Sparkles className="w-6 h-6 text-rose-400" />}
            badgeText="9 CLUES TO SOLVE"
            badgeVariant="ferrari"
            accentTheme="spider"
            onClick={() => onSelectDestination('easter-eggs')}
          />
        </div>
      </section>
    </div>
  );
};
