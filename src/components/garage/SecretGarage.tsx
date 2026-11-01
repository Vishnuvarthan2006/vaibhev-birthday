import React, { useState, useMemo } from 'react';
import {
  Compass,
  Gauge,
  Flame,
  Hammer,
  Wrench,
  Shield,
  Car,
  BookOpen,
  Unlock,
  KeyRound,
  ArrowLeft,
  Sparkles,
  X,
} from 'lucide-react';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';
import { F1ReactionTest } from './F1ReactionTest';
import { BrainrotZone } from './BrainrotZone';
import { CraftingChallengeGame } from './CraftingChallengeGame';
import { PitStopPanicGame } from './PitStopPanicGame';
import { MarvelGuessGame } from './MarvelGuessGame';
import { CarTriviaGame } from './CarTriviaGame';
import { SyndicateKeystonePuzzle } from './SyndicateKeystonePuzzle';
import { MissionJournalModal } from './MissionJournalModal';
import { GrandFinalVault } from './GrandFinalVault';
import { GoldButton } from '../common/GoldButton';
import { soundFx } from '../../utils/audioFx';
import { getSessionShuffled } from '../../utils/shuffle';

interface SecretGarageProps {
  onReturnToPaddock: () => void;
  onReplayLaunch: () => void;
}

type GarageTab = 'speed' | 'chaos' | 'craft' | 'pitstop' | 'marvel' | 'cars' | 'vault';

interface GarageGameMeta {
  id: 'speed' | 'chaos' | 'craft' | 'pitstop' | 'marvel' | 'cars';
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
  iconColor: string;
}

const GARAGE_GAME_ITEMS: readonly GarageGameMeta[] = [
  {
    id: 'speed',
    title: 'The Need for Speed',
    icon: Gauge,
    activeClass: 'bg-red-600/30 border border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] font-bold',
    iconColor: 'text-red-400',
  },
  {
    id: 'chaos',
    title: 'The Chaos Theory',
    icon: Flame,
    activeClass: 'bg-amber-600/30 border border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.35)] font-bold',
    iconColor: 'text-amber-400',
  },
  {
    id: 'craft',
    title: 'Craft It or Lose It',
    icon: Hammer,
    activeClass: 'bg-emerald-600/30 border border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] font-bold',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'pitstop',
    title: 'Pit Stop Panic',
    icon: Wrench,
    activeClass: 'bg-red-600/30 border border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] font-bold',
    iconColor: 'text-red-400',
  },
  {
    id: 'marvel',
    title: 'Guess the Hero',
    icon: Shield,
    activeClass: 'bg-red-600/30 border border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] font-bold',
    iconColor: 'text-red-400',
  },
  {
    id: 'cars',
    title: 'Name That Machine',
    icon: Car,
    activeClass: 'bg-gold-500/30 border border-gold-400 text-white shadow-[0_0_20px_rgba(212,175,55,0.35)] font-bold',
    iconColor: 'text-gold-400',
  },
];

export const SecretGarage: React.FC<SecretGarageProps> = ({
  onReturnToPaddock,
  onReplayLaunch,
}) => {
  const {
    totalDiscovered,
    totalClues,
    isVaultUnlocked,
    isClueDiscovered,
    discoverClue,
    word1Letters,
    word2Letters,
  } = useTreasureHunt();

  // Session-randomized ordering of game cards
  const orderedGames = useMemo(() => {
    return getSessionShuffled(GARAGE_GAME_ITEMS, 'vaibhev_garage_games_order');
  }, []);

  const [activeTab, setActiveTab] = useState<GarageTab>(() => {
    return orderedGames[0]?.id || 'speed';
  });
  const [journalOpen, setJournalOpen] = useState<boolean>(false);
  const [keystoneModalOpen, setKeystoneModalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: GarageTab) => {
    soundFx.playUiClick();
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Container */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Navigation Breadcrumb / Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <button
            onClick={() => {
              soundFx.playUiClick();
              onReturnToPaddock();
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-400 hover:text-gold-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO PADDOCK</span>
          </button>

          {/* Top Bar Actions & Classified Clue Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Secret Clue 2 Relay Trigger */}
            <button
              onClick={() => discoverClue('clue-2-santhosh')}
              title="Inspect Spider-Sense Web Relay"
              className={`font-mono text-xs px-2.5 py-1 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-2-santhosh')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-red-400/90 bg-black/40 border border-red-500/30 hover:border-red-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-2-santhosh') ? "WEB RELAY [E] DECODED ✓" : "WEB RELAY 🔍"}
            </button>

            {/* Secret Clue 3 Bedrock Trigger */}
            <button
              onClick={() => discoverClue('clue-3-akshaya')}
              title="Inspect Bedrock Core Relic"
              className={`font-mono text-xs px-2.5 py-1 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-3-akshaya')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-amber-400/90 bg-black/40 border border-amber-500/30 hover:border-amber-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-3-akshaya') ? "BEDROCK CORE [G] EXTRACTED ✓" : "BEDROCK CORE 🔍"}
            </button>

            {/* Secret Clue 5 Syndicate Keystone Trigger */}
            <button
              onClick={() => setKeystoneModalOpen(true)}
              title="Inspect Syndicate Keystone Grid"
              className={`font-mono text-xs px-2.5 py-1 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-5-sanjitha')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-gold-400/90 bg-black/40 border border-gold-500/30 hover:border-gold-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-5-sanjitha') ? "SYNDICATE KEYSTONE SOLVED ✓" : "SYNDICATE KEYSTONE 🔍"}
            </button>

            {/* Mission Journal HUD Button */}
            <button
              onClick={() => {
                soundFx.playUiClick();
                setJournalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5 text-gold-400" />
              <span>MISSION JOURNAL</span>
              <span className="px-1.5 py-0.2 rounded-full bg-gold-500/30 text-white font-bold text-[10px]">
                {totalDiscovered}/{totalClues}
              </span>
            </button>

            {isVaultUnlocked && (
              <button
                onClick={() => handleTabChange('vault')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/50 bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-all text-xs font-mono font-bold tracking-wider cursor-pointer animate-pulse"
              >
                <Unlock className="w-3.5 h-3.5 text-red-400" />
                <span>FINAL VAULT OPEN</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="py-8 sm:py-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>TOP SECRET • SECTOR 04</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            THE SECRET <span className="gold-text-gradient">GARAGE</span>
          </h1>

          <p className="mt-2.5 font-mono text-sm sm:text-base tracking-[0.25em] text-red-500 font-bold uppercase">
            SIX ARCADE CHALLENGES • OPERATION VAIBHEV TREASURE HUNT
          </p>

          <p className="mt-3.5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A classified underground test lab. Test your F1 reaction speed, build Minecraft artifacts, execute rapid pit stops, decode Marvel heroes, and benchmark supercars.
          </p>

          {/* Cipher Quick Ribbon Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl bg-obsidian-900/80 border border-gold-500/30">
            <span className="font-mono text-xs sm:text-sm text-gray-300 uppercase tracking-widest mr-2 font-bold">
              CIPHER CODE:
            </span>
            <div className="flex items-center gap-2">
              {word1Letters.map((char, i) => (
                <span
                  key={`w1-${i}`}
                  className={`w-7 h-9 sm:w-9 sm:h-11 rounded-lg flex items-center justify-center font-display font-black text-sm sm:text-base border ${
                    char !== '·'
                      ? 'border-gold-400 bg-gold-500/20 text-gold-300'
                      : 'border-white/10 bg-black/60 text-gray-400'
                  }`}
                >
                  {char}
                </span>
              ))}
              <span className="text-gold-500/60 font-bold px-1 text-base sm:text-lg">•</span>
              {word2Letters.map((char, i) => (
                <span
                  key={`w2-${i}`}
                  className={`w-7 h-9 sm:w-9 sm:h-11 rounded-lg flex items-center justify-center font-display font-black text-sm sm:text-base border ${
                    char !== '·'
                      ? 'border-gold-400 bg-gold-500/20 text-gold-300'
                      : 'border-white/10 bg-black/60 text-gray-400'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arcade Selector Navigation Tabs (Session-Randomized Order) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {orderedGames.map((game) => {
            const Icon = game.icon;
            const isCurrent = activeTab === game.id;
            return (
              <button
                key={game.id}
                onClick={() => handleTabChange(game.id)}
                className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                  isCurrent
                    ? game.activeClass
                    : 'bg-obsidian-900/90 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${game.iconColor}`} />
                <span>{game.title}</span>
              </button>
            );
          })}

          {isVaultUnlocked && (
            <button
              onClick={() => handleTabChange('vault')}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono transition-all cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 border border-white text-white font-bold shadow-[0_0_25px_rgba(220,38,38,0.7)]'
                  : 'bg-obsidian-900/90 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-400'
              }`}
            >
              <KeyRound className="w-4 h-4 text-gold-400" />
              <span>THE GRAND FINAL VAULT</span>
            </button>
          )}
        </div>

        {/* Tab Content Display */}
        <div className="mb-12">
          {/* Game 1: The Need for Speed (F1 Launch Dyno) */}
          {activeTab === 'speed' && (
            <F1ReactionTest
              isClueDiscovered={isClueDiscovered('clue-1-vishnu')}
              onClueUnlocked={() => discoverClue('clue-1-vishnu')}
            />
          )}

          {/* Game 2: The Chaos Theory (Brainrot Soundboard) */}
          {activeTab === 'chaos' && (
            <BrainrotZone
              isClueDiscovered={isClueDiscovered('clue-4-deepthi')}
              onClueUnlocked={() => discoverClue('clue-4-deepthi')}
            />
          )}

          {/* Game 3: Craft It or Lose It (Minecraft Crafting Challenge) */}
          {activeTab === 'craft' && <CraftingChallengeGame />}

          {/* Game 4: Pit Stop Panic (F1 Pit Stop Timed Challenge) */}
          {activeTab === 'pitstop' && <PitStopPanicGame />}

          {/* Game 5: Guess the Hero (Marvel Character Guessing) */}
          {activeTab === 'marvel' && <MarvelGuessGame />}

          {/* Game 6: Name That Machine (Car Identification Challenge) */}
          {activeTab === 'cars' && <CarTriviaGame />}

          {/* Grand Final Vault */}
          {activeTab === 'vault' && (
            <GrandFinalVault
              onReturnToPaddock={onReturnToPaddock}
              onReplayLaunch={onReplayLaunch}
            />
          )}
        </div>

        {/* Bottom Paddock Quick Return */}
        {activeTab !== 'vault' && (
          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="font-mono text-xs sm:text-sm text-gold-400/80 block">
                OPERATION VAIBHEV • SECTOR 04
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Explore the other sectors (Notebook, Photo Archive, Video Vault, Paddock) to gather
                the remaining clues!
              </span>
            </div>

            <div className="flex items-center gap-3">
              <GoldButton
                variant="gold-outline"
                size="md"
                onClick={() => {
                  soundFx.playUiClick();
                  onReturnToPaddock();
                }}
                icon={<Compass className="w-4 h-4" />}
              >
                RETURN TO PADDOCK
              </GoldButton>
            </div>
          </div>
        )}
      </div>

      {/* Sanjitha's Keystone Inspection Modal */}
      {keystoneModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Syndicate Keystone Grid"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 select-none animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundFx.playUiClick();
              setKeystoneModalOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => {
                soundFx.playUiClick();
                setKeystoneModalOpen(false);
              }}
              title="Close Keystone"
              className="absolute -top-12 right-0 p-2 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer bg-black/50"
            >
              <X className="w-5 h-5" />
            </button>
            <SyndicateKeystonePuzzle
              isClueDiscovered={isClueDiscovered('clue-5-sanjitha')}
              onClueUnlocked={() => discoverClue('clue-5-sanjitha')}
            />
          </div>
        </div>
      )}

      {/* Mission Journal Modal */}
      <MissionJournalModal
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
        onOpenVault={() => {
          setJournalOpen(false);
          setActiveTab('vault');
        }}
      />
    </div>
  );
};
