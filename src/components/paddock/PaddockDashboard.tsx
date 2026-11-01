import React from 'react';
import {
  BookOpen,
  Image,
  Film,
  Sparkles,
  Flag,
  RotateCcw,
  Users,
  Compass,
} from 'lucide-react';
import { DestinationCard } from './DestinationCard';
import { TelemetryWidget } from './TelemetryWidget';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { GoldButton } from '../common/GoldButton';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';

export interface PaddockDashboardProps {
  onSelectDestination: (id: 'notebook' | 'gallery' | 'vault' | 'easter-eggs') => void;
  onReplayLaunch: () => void;
}

export const PaddockDashboard: React.FC<PaddockDashboardProps> = ({
  onSelectDestination,
  onReplayLaunch,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Paddock Header */}
      <section className="mb-10 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
            <LuxuryBadge
              variant="ferrari"
              size="sm"
              icon={<Flag className="w-3 h-3 text-ferrari-400" />}
            >
              SCUDERIA FERRAI • MARANELLO
            </LuxuryBadge>

            <LuxuryBadge
              variant="gold"
              size="sm"
              icon={<Compass className="w-3 h-3 text-gold-400" />}
            >
              SECTOR CONTROL
            </LuxuryBadge>

            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ALL 4 SECTORS READY
            </span>
          </div>

          {/* Quick Action: Replay Starting Sequence */}
          <GoldButton
            variant="carbon"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5 text-gold-400" />}
            onClick={onReplayLaunch}
          >
            Replay F1 Launch
          </GoldButton>
        </div>

        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
            <span className="gold-text-gradient block">THE PADDOCK</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 tracking-wider block mt-2">
              VAIBHEV'S COMMAND CONSOLE
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            Welcome to the central command hub. From here, navigate through the personal letters of the
            9-friend syndicate, unlock the curated photographic archives, access the cinematic video
            vault, or unearth the secret Easter eggs hidden in the garage.
          </p>
        </div>
      </section>

      {/* Main 4 Destination Gateways */}
      <section className="mb-12">
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

          {/* Destination 4: EASTER EGGS */}
          <DestinationCard
            id="easter-eggs"
            number="04"
            title="EASTER EGGS"
            subtitle="Secret Maranello Garage"
            description="Tung Tung Tung Sahur audio alarms, Netherite diamond mining clicks, Spider-Sense hazard warnings, and secret rev audio triggers hidden deep within the Maranello telemetry."
            icon={<Sparkles className="w-6 h-6 text-rose-400" />}
            badgeText="TOP SECRET"
            badgeVariant="ferrari"
            accentTheme="spider"
            onClick={() => onSelectDestination('easter-eggs')}
          />
        </div>
      </section>

      {/* Live F1 Telemetry HUD */}
      <section className="mb-12">
        <TelemetryWidget />
      </section>

      {/* 9-Friends Syndicate Status Strip */}
      <section className="carbon-panel rounded-xl p-6 border border-white/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                THE 9-FRIEND COLLECTIVE
              </h3>
              <p className="text-xs font-mono text-gray-400">
                9 Friends • 1 Recipient • 1 Legend • ∞ Memories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gold-400 font-semibold">
              SCUDERIA #44 • {RECIPIENT_PROFILE.name.toUpperCase()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
