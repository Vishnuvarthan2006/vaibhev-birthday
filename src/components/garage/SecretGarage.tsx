import React, { useState } from 'react';
import {
  Compass,
  Gauge,
  Eye,
  Pickaxe,
  Flame,
  Users,
  BookOpen,
  Unlock,
  KeyRound,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';
import { F1ReactionTest } from './F1ReactionTest';
import { SpiderSenseGame } from './SpiderSenseGame';
import { MinecraftMiningGame } from './MinecraftMiningGame';
import { BrainrotZone } from './BrainrotZone';
import { SyndicateKeystonePuzzle } from './SyndicateKeystonePuzzle';
import { MissionJournalModal } from './MissionJournalModal';
import { GrandFinalVault } from './GrandFinalVault';
import { GoldButton } from '../common/GoldButton';
import { soundFx } from '../../utils/audioFx';

interface SecretGarageProps {
  onReturnToPaddock: () => void;
  onReplayLaunch: () => void;
}

type GarageTab = 'f1' | 'spider' | 'minecraft' | 'brainrot' | 'syndicate' | 'vault';

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
    cipherLetters,
  } = useTreasureHunt();

  const [activeTab, setActiveTab] = useState<GarageTab>('f1');
  const [journalOpen, setJournalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: GarageTab) => {
    soundFx.playUiClick();
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
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

          {/* Mission Journal HUD Button */}
          <div className="flex items-center gap-3">
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
        <div className="py-8 sm:py-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TOP SECRET • SECTOR 04</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            THE SECRET <span className="gold-text-gradient">GARAGE</span>
          </h1>

          <p className="mt-2 font-mono text-xs sm:text-sm tracking-[0.25em] text-red-500 font-bold uppercase">
            OPERATION VAIBHEV: THE NINE-CLUE TREASURE HUNT
          </p>

          <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
            A classified Maranello underground testing lab. Solve interactive challenges, test your
            reflexes, and uncover the 9 scattered clues to decrypt the ultimate birthday vault.
          </p>

          {/* Cipher Quick Ribbon Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-lg bg-obsidian-900/80 border border-gold-500/30">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest mr-2">
              CIPHER CODE:
            </span>
            <div className="flex items-center gap-1.5">
              {cipherLetters.map((char, i) => (
                <span
                  key={i}
                  className={`w-6 h-7 sm:w-7 sm:h-8 rounded flex items-center justify-center font-display font-bold text-xs sm:text-sm border ${
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

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => handleTabChange('f1')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'f1'
                ? 'bg-red-600/30 border border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                : 'bg-obsidian-900/80 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5 text-red-400" />
            <span>Reaction Dyno</span>
          </button>

          <button
            onClick={() => handleTabChange('spider')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'spider'
                ? 'bg-red-600/30 border border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                : 'bg-obsidian-900/80 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-red-400" />
            <span>Spider-Sense</span>
          </button>

          <button
            onClick={() => handleTabChange('minecraft')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'minecraft'
                ? 'bg-amber-600/30 border border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-obsidian-900/80 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Pickaxe className="w-3.5 h-3.5 text-amber-400" />
            <span>Netherite Mine</span>
          </button>

          <button
            onClick={() => handleTabChange('brainrot')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'brainrot'
                ? 'bg-gold-500/30 border border-gold-400 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-obsidian-900/80 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-gold-400" />
            <span>Brainrot Zone</span>
          </button>

          <button
            onClick={() => handleTabChange('syndicate')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'syndicate'
                ? 'bg-gold-500/30 border border-gold-400 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'bg-obsidian-900/80 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-gold-400" />
            <span>Syndicate Keystone</span>
          </button>

          {isVaultUnlocked && (
            <button
              onClick={() => handleTabChange('vault')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 border border-white text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)]'
                  : 'bg-obsidian-900/80 border border-gold-500/40 text-gold-300 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-gold-400" />
              <span>THE GRAND FINAL VAULT</span>
            </button>
          )}
        </div>

        {/* Tab Content Display */}
        <div className="mb-12">
          {activeTab === 'f1' && (
            <F1ReactionTest
              isClueDiscovered={isClueDiscovered('clue-1-reaction')}
              onClueUnlocked={() => discoverClue('clue-1-reaction')}
            />
          )}

          {activeTab === 'spider' && (
            <SpiderSenseGame
              isClueDiscovered={isClueDiscovered('clue-2-spider')}
              onClueUnlocked={() => discoverClue('clue-2-spider')}
            />
          )}

          {activeTab === 'minecraft' && (
            <MinecraftMiningGame
              isClueDiscovered={isClueDiscovered('clue-3-minecraft')}
              onClueUnlocked={() => discoverClue('clue-3-minecraft')}
            />
          )}

          {activeTab === 'brainrot' && (
            <BrainrotZone
              isClueDiscovered={isClueDiscovered('clue-4-brainrot')}
              onClueUnlocked={() => discoverClue('clue-4-brainrot')}
            />
          )}

          {activeTab === 'syndicate' && (
            <SyndicateKeystonePuzzle
              isClueDiscovered={isClueDiscovered('clue-9-syndicate')}
              onClueUnlocked={() => discoverClue('clue-9-syndicate')}
            />
          )}

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
              <span className="font-mono text-xs text-gold-400/80 block">
                OPERATION VAIBHEV • SECTOR 04
              </span>
              <span className="text-[11px] text-gray-400 font-mono">
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
