import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Image,
  Film,
  Sparkles,
  Lock,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { GoldButton } from '../common/GoldButton';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { NOTEBOOK_ENTRIES } from '../../data/notebookData';
import { GALLERY_PHOTOS } from '../../data/galleryData';
import { VIDEO_VAULT_ENTRIES } from '../../data/videoVaultData';

interface SectionPlaceholderProps {
  sectionId: 'notebook' | 'gallery' | 'vault' | 'easter-eggs';
  onReturnToPaddock: () => void;
  onReplayLaunch: () => void;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  sectionId,
  onReturnToPaddock,
  onReplayLaunch,
}) => {
  const getSectionDetails = () => {
    switch (sectionId) {
      case 'notebook':
        return {
          title: 'THE NOTEBOOK',
          subtitle: '9-Friend Interactive Memory Scrapbook',
          icon: <BookOpen className="w-8 h-8 text-gold-400" />,
          accent: 'gold',
          summary:
            'All 9 friend entries, randomized per-session order, and multi-photo attachments are structured and ready in the data layer.',
          stats: [
            { label: 'Friend Entries', value: `${NOTEBOOK_ENTRIES.length} Slots` },
            { label: 'Session Order', value: 'Non-Mutating Active' },
            { label: 'Photos Supported', value: 'Multi-Image Array' },
            { label: 'Next Stage', value: 'Stage 3 (Notebook UI)' },
          ],
        };
      case 'gallery':
        return {
          title: 'PHOTO ARCHIVE',
          subtitle: 'Curated Supercar & Squad Gallery',
          icon: <Image className="w-8 h-8 text-red-400" />,
          accent: 'ferrari',
          summary:
            'A standalone photographic vault distinct from the notebook. Categories for automotive, F1, squad, and candid memories are configured.',
          stats: [
            { label: 'Archive Items', value: `${GALLERY_PHOTOS.length} Prepared` },
            { label: 'Categories', value: 'F1, Squad, Cars, Chaos' },
            { label: 'Resolution', value: 'Full HD / 4K Ready' },
            { label: 'Next Stage', value: 'Stage 4 (Gallery UI)' },
          ],
        };
      case 'vault':
        return {
          title: 'VIDEO VAULT',
          subtitle: 'Cinema & Video Transmissions',
          icon: <Film className="w-8 h-8 text-gold-400" />,
          accent: 'gold',
          summary:
            'A high-octane video player theatre for group messages, birthday tributes, and unfiltered blooper reels.',
          stats: [
            { label: 'Video Vault Entries', value: `${VIDEO_VAULT_ENTRIES.length} Transmissions` },
            { label: 'Format Support', value: 'MP4 / WebM Streams' },
            { label: 'Cinematic Player', value: 'Cinema Mode Ready' },
            { label: 'Next Stage', value: 'Stage 5 (Video Vault)' },
          ],
        };
      case 'easter-eggs':
      default:
        return {
          title: 'SECRET MARANELLO GARAGE',
          subtitle: 'Hidden Easter Eggs, Minecraft & Memes',
          icon: <Sparkles className="w-8 h-8 text-rose-400" />,
          accent: 'ferrari',
          summary:
            'The brainrot vault, Tung Tung Tung Sahur alarm triggers, Netherite durability meters, and Spider-Sense alerts.',
          stats: [
            { label: 'Tung Sahur Sensor', value: 'Primed & Tuned' },
            { label: 'Minecraft Netherite', value: 'Block Audio Ready' },
            { label: 'Spider-Sense HUD', value: 'Tingling (100%)' },
            { label: 'Next Stage', value: 'Stage 6 (Easter Eggs)' },
          ],
        };
    }
  };

  const details = getSectionDetails();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Return Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onReturnToPaddock}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-obsidian-900/80 text-xs font-mono text-gray-300 hover:text-white hover:border-gold-500/40 hover:bg-obsidian-800 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gold-400" />
          <span>RETURN TO THE PADDOCK</span>
        </button>

        <LuxuryBadge variant="carbon" size="sm">
          SECTOR GATEWAY CONNECTED
        </LuxuryBadge>
      </div>

      {/* Main Holding Panel */}
      <div className="carbon-panel rounded-2xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden text-center sm:text-left">
        {/* Top Accent Strip */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            details.accent === 'ferrari'
              ? 'bg-gradient-to-r from-ferrari-500 to-ferrari-600'
              : 'bg-gradient-to-r from-gold-300 to-gold-600'
          }`}
        />

        {/* Icon & Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
          <div className="p-4 rounded-xl border border-white/10 bg-obsidian-900 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {details.icon}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ARCHITECTURE ROUTED
              </span>
              <span className="text-[10px] font-mono tracking-widest text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 flex items-center gap-1">
                <Lock className="w-3 h-3" /> IMPLEMENTATION SCHEDULED
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-wide">
              {details.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-gold-400 tracking-wider mt-1">
              {details.subtitle}
            </p>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
          {details.summary}
        </p>

        {/* Telemetry Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {details.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 rounded-lg bg-obsidian-900/70 border border-white/5 text-center sm:text-left"
            >
              <span className="text-[10px] font-mono text-gray-400 block mb-1">
                {stat.label}
              </span>
              <span className="font-display font-semibold text-white text-xs sm:text-sm">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-6 border-t border-white/[0.06]">
          <GoldButton
            variant="gold-solid"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onReturnToPaddock}
          >
            Back to Paddock
          </GoldButton>

          <GoldButton
            variant="carbon"
            size="md"
            icon={<RotateCcw className="w-4 h-4 text-gold-400" />}
            onClick={onReplayLaunch}
          >
            Replay F1 Launch
          </GoldButton>
        </div>
      </div>
    </div>
  );
};
