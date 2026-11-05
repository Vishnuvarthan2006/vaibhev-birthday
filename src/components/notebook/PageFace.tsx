import React from 'react';
import type { NotebookEntry, NotebookPhoto } from '../../types/notebook';
import { PolaroidPhoto } from './PolaroidPhoto';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';
import { NOTEBOOK_ENTRIES } from '../../data/notebookData';
import { GoldButton } from '../common/GoldButton';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';
import {
  ArrowRight,
  BookOpen,
  Camera,
  Heart,
  Award,
  RotateCcw,
  Compass,
  Shuffle,
} from 'lucide-react';

interface PageFaceProps {
  spreadIndex: number;
  side: 'left' | 'right';
  entries: NotebookEntry[];
  totalEntries: number;
  onBegin?: () => void;
  onOpenIndex?: () => void;
  onReturnToPaddock?: () => void;
  onRestart?: () => void;
  onReshuffle?: () => void;
  onOpenPhoto?: (photoIdx: number, friendEntry: NotebookEntry) => void;
}

export const PageFace: React.FC<PageFaceProps> = ({
  spreadIndex,
  side,
  entries,
  totalEntries,
  onBegin,
  onOpenIndex,
  onReturnToPaddock,
  onRestart,
  onReshuffle,
  onOpenPhoto,
}) => {
  const { isClueDiscovered, discoverClue } = useTreasureHunt();

  const totalSpreads = totalEntries + 2;
  const isCover = spreadIndex === 0;
  const isEnding = spreadIndex === totalSpreads - 1;
  const chapterIdx = spreadIndex - 1;
  const entry = !isCover && !isEnding ? entries[chapterIdx] : null;

  // =========================================================================
  // 1. SPREAD 0: THE COVER & PROLOGUE
  // =========================================================================
  if (isCover) {
    if (side === 'left') {
      return (
        <div className="w-full h-full paper-page-dark book-spine-left p-5 sm:p-8 md:p-9 flex flex-col justify-between items-center text-center select-none relative overflow-hidden">
          {/* Subtle gold corner brackets */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold-400/60" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold-400/60" />

          <div className="w-full flex items-center justify-between text-xs font-mono text-gold-400/80 mb-4">
            <span>VOLUME 01 • MEMORABILIA</span>
            <span>EST. 9 FRIENDS</span>
          </div>

          <div className="my-auto py-4 flex flex-col items-center">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-gold-400/60 bg-gradient-to-br from-[#2a2418] via-[#15120c] to-[#0a0806] flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)] mb-4">
              <span className="font-display font-black text-2xl sm:text-3xl gold-text-gradient">
                V
              </span>
            </div>

            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-red-400 font-bold uppercase mb-2">
              SCUDERIA FERRARI • SPECIAL EDITION
            </span>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              THE NINE <br />
              <span className="gold-text-gradient">CHAPTERS</span>
            </h1>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-3" />

            <p className="font-mono text-xs sm:text-sm text-gold-300 tracking-widest uppercase max-w-sm">
              NINE PEOPLE. COUNTLESS MEMORIES. ONE VERY SPECIAL PERSON.
            </p>
          </div>

          <div className="text-xs font-mono text-gray-400">
            PRODUCED FOR {RECIPIENT_PROFILE.name.toUpperCase()}
          </div>
        </div>
      );
    }

    // Cover Right Page (Prologue)
    return (
      <div className="w-full h-full paper-page book-spine-right p-5 sm:p-8 md:p-9 flex flex-col justify-between text-neutral-900 select-none relative overflow-hidden">
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold-500/60" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold-500/60" />

        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-neutral-500 border-b border-neutral-300 pb-3 mb-5">
          <span className="uppercase tracking-wider font-semibold">THE PROLOGUE</span>
          <span className="text-gold-700 font-bold">CHAPTER 00</span>
        </div>

        <div className="my-auto space-y-4">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-wide">
            To Our Brother &amp; Friend, Vaibhev:
          </h2>

          <div className="font-handwriting text-2xl sm:text-3xl text-neutral-800 leading-relaxed space-y-3.5">
            <p>
              Inside this scrapbook journal are nine individual chapters, each penned by one of the
              nine friends who stand proudly in your pit crew.
            </p>
            <p>
              We've gathered our personal memories, uncensored laughs, heartfelt wishes, and
              photographs from our journey together. No matter where life takes us next, this ledger
              is your reminder of what you mean to all of us.
            </p>
          </div>

          <div className="pt-3 text-right">
            <p className="font-handwriting text-3xl text-gold-700 font-bold">
              — The Nine-Squad Collective
            </p>
          </div>
        </div>

        <div className="pt-5 border-t border-neutral-300 flex flex-wrap items-center gap-3">
          <GoldButton
            variant="gold-solid"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onBegin}
            className="w-full sm:w-auto"
          >
            Begin Chapter I
          </GoldButton>

          <button
            onClick={onOpenIndex}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-neutral-400 hover:border-neutral-700 text-xs sm:text-sm font-mono font-semibold text-neutral-700 hover:text-neutral-950 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-gold-600" />
            <span>Chapter Index</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. SPREAD 10: EPILOGUE & ENDING PAGE
  // =========================================================================
  if (isEnding) {
    if (side === 'left') {
      return (
        <div className="w-full h-full paper-page book-spine-left p-5 sm:p-7 md:p-8 flex flex-col justify-between text-neutral-900 select-none relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-neutral-300 pb-2 mb-3">
            <span className="uppercase tracking-wider font-semibold">THE SQUAD SIGNATURES</span>
            <span className="text-gold-700 font-bold">9 / 9 VERIFIED</span>
          </div>

          <div className="my-auto py-1">
            <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900 mb-2.5">
              Signed &amp; Sealed by the 9-Squad:
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              {NOTEBOOK_ENTRIES.map((friend, idx) => (
                <div
                  key={friend.id}
                  className="p-1 sm:p-1.5 rounded border border-neutral-300 bg-white/70 shadow-xs flex flex-col items-center justify-center"
                >
                  <span className="font-handwriting text-base sm:text-lg text-neutral-900 font-bold leading-none">
                    {friend.friendName.split(' ')[0] || `Friend ${idx + 1}`}
                  </span>
                  <span className="font-mono text-[8px] text-gold-700 uppercase tracking-wider mt-0.5 truncate max-w-full">
                    {friend.stickerBadge || 'APPROVED'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 rounded bg-gold-500/10 border border-gold-600/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-700 shrink-0" />
                <p className="font-mono text-[10px] sm:text-[11px] text-neutral-700 leading-tight">
                  All 9 chapters preserved. The bond between Vaibhev and the squad is certified forever.
                </p>
              </div>

              {/* Secret Clue 6 Wax Seal Trigger */}
              <button
                onClick={() => discoverClue('clue-6-savitha')}
                title="Inspect Scuderia Epilogue Wax Seal"
                className="shrink-0 px-2 py-1 rounded-full border border-gold-600/40 bg-gold-500/20 text-gold-900 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider hover:bg-gold-500/30 transition-all cursor-pointer shadow-xs animate-pulse"
              >
                {isClueDiscovered('clue-6-savitha') ? "GOLD SEAL [M] VERIFIED ✓" : "THE FINAL CHAPTER 🔍"}
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-neutral-500 text-center">
            SCUDERIA FERRAI 9-SQUAD • PODIUM FINISH
          </div>
        </div>
      );
    }

    // Ending Right Page
    return (
      <div className="w-full h-full paper-page-dark book-spine-right p-5 sm:p-7 md:p-8 flex flex-col justify-between items-center text-center text-white select-none relative overflow-hidden">
        <div className="w-full flex items-center justify-between text-xs font-mono text-gold-400 border-b border-white/10 pb-2 mb-3">
          <span className="uppercase tracking-wider">EPILOGUE</span>
          <span className="text-red-400 font-bold">FINAL SECTOR</span>
        </div>

        <div className="my-auto py-3 max-w-sm">
          <div className="w-11 h-11 rounded-full border border-gold-400/40 bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Heart className="w-5 h-5 text-red-500 fill-red-500/30" />
          </div>

          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-snug mb-2">
            <span className="block text-gray-400 text-xs sm:text-sm mb-1">
              THE END OF THE CHAPTERS.
            </span>
            <span className="gold-text-gradient block">
              NEVER THE END OF THE MEMORIES.
            </span>
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-2.5" />

          <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
            Thank you for being the legend you are. This scrapbook will remain here as your personal
            vault whenever you want to revisit the stories, photos, and wishes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <GoldButton
              variant="gold-solid"
              size="sm"
              icon={<Compass className="w-3.5 h-3.5" />}
              onClick={onReturnToPaddock}
              className="w-full sm:w-auto text-xs px-3 py-1.5"
            >
              Return to Paddock
            </GoldButton>

            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-2.5 py-1.5 rounded border border-white/20 hover:border-gold-400 text-xs font-mono text-gray-200 hover:text-gold-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-gold-400" />
              <span>Read Again</span>
            </button>

            <button
              onClick={onReshuffle}
              className="w-full sm:w-auto px-2.5 py-1.5 rounded border border-white/20 hover:border-gold-400 text-xs font-mono text-gray-200 hover:text-gold-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Shuffle the 9 chapters into a fresh random order"
            >
              <Shuffle className="w-3 h-3 text-red-400" />
              <span>Re-Shuffle</span>
            </button>
          </div>
        </div>

        <div className="text-[10px] font-mono text-gray-400">
          VAIBHEV'S BIRTHDAY ARCHIVE • CHEQUERED FLAG
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. CHAPTER SPREADS 1 TO 9 (FRIEND ENTRIES)
  // =========================================================================
  if (!entry) return null;

  const paragraphs = entry.writtenMessage
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  // Left Page: The Handwritten Letter
  if (side === 'left') {
    return (
      <div className="w-full h-full paper-page book-spine-left p-5 sm:p-8 md:p-9 flex flex-col justify-between text-neutral-900 select-none relative overflow-hidden">
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold-600/50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold-600/50" />

        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-neutral-500 border-b border-neutral-300/80 pb-2.5 mb-3">
            <span className="uppercase tracking-widest font-semibold text-gold-700">
              CHAPTER {chapterIdx + 1} OF {totalEntries}
            </span>
            <span className="text-xs uppercase tracking-wider text-neutral-400">
              SLOT: {entry.id}
            </span>
          </div>

          <div className="mb-3">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
              {entry.chapterTitle || `Chapter 0${chapterIdx + 1}`}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-display font-semibold text-sm sm:text-base text-neutral-800">
                {entry.friendName}
              </span>
              {entry.callsign && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 border border-neutral-300 font-bold">
                  {entry.callsign}
                </span>
              )}
            </div>
          </div>

          <div className="font-handwriting text-xl sm:text-2xl md:text-3xl text-neutral-850 leading-relaxed space-y-3 my-3 max-h-[52vh] md:max-h-none overflow-y-auto pr-1">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {entry.closingNote && (
            <div className="mt-3 pt-2.5 border-t border-neutral-300/60 text-right">
              <p className="font-handwriting text-2xl sm:text-3xl text-gold-800 font-bold">
                {entry.closingNote}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-neutral-300/80 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>VAIBHEV • NINE CHAPTERS</span>
          <span>PAGE {String((chapterIdx + 1) * 2 - 1).padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  // Right Page: The Scrapbook Photos
  return (
    <div className="w-full h-full paper-page book-spine-right p-5 sm:p-8 md:p-9 flex flex-col justify-between text-neutral-900 select-none relative overflow-hidden">
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold-600/50" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold-600/50" />

      <div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-neutral-500 border-b border-neutral-300/80 pb-2.5 mb-3">
          <span className="uppercase tracking-widest font-semibold text-neutral-700">
            PHOTO ARCHIVE &amp; SCRAPBOOK
          </span>
          {entry.stickerBadge && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-gold-500/20 text-gold-800 border border-gold-600/30 font-bold uppercase">
              {entry.stickerBadge}
            </span>
          )}
        </div>

        {entry.photos && entry.photos.length > 0 ? (
          <div
            className={`py-1 overflow-y-auto max-h-[62vh] pr-1 ${
              entry.photos.length === 1
                ? 'flex items-center justify-center'
                : entry.photos.length === 2
                  ? 'grid grid-cols-2 gap-3 items-center'
                  : entry.photos.length === 3
                    ? 'grid grid-cols-2 gap-3 items-start'
                    : 'grid grid-cols-2 gap-3 items-start'
            }`}
          >
            {entry.photos.map((photo: NotebookPhoto, pIdx: number) => (
              <div
                key={photo.id || pIdx}
                className={
                  // For 3 photos: last one spans both columns and is centred
                  entry.photos.length === 3 && pIdx === 2
                    ? 'col-span-2 flex justify-center'
                    : ''
                }
              >
                <PolaroidPhoto
                  photo={photo}
                  index={pIdx}
                  accentStyle={entry.accentStyle}
                  onClick={() => onOpenPhoto?.(pIdx, entry)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[260px] flex flex-col items-center justify-center p-5 text-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100/60 my-3">
            <div className="w-10 h-10 rounded-full border border-gold-600/30 bg-gold-500/10 flex items-center justify-center text-gold-700 mb-2">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="font-display font-semibold text-neutral-800 text-sm">
              Scrapbook Photo Awaiting
            </h4>
            <p className="font-mono text-xs text-neutral-500 mt-1 max-w-xs">
              Drop images into <code>public/media/notebook/{entry.id}/</code>
            </p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-neutral-300/80 flex items-center justify-between text-xs font-mono text-neutral-400">
        <span>MEMORIES WITH {entry.friendName.toUpperCase()}</span>
        <span>PAGE {String((chapterIdx + 1) * 2).padStart(2, '0')}</span>
      </div>
    </div>
  );
};
