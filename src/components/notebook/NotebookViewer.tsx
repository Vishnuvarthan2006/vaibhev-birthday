import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Shuffle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useNotebookEntries } from '../../hooks/useNotebookEntries';
import { NotebookCoverPage } from './NotebookCoverPage';
import { NotebookSpread } from './NotebookSpread';
import { NotebookEndingPage } from './NotebookEndingPage';
import { ChapterIndexDrawer } from './ChapterIndexDrawer';
import { soundFx } from '../../utils/audioFx';

interface NotebookViewerProps {
  onReturnToPaddock: () => void;
}

export const NotebookViewer: React.FC<NotebookViewerProps> = ({ onReturnToPaddock }) => {
  const { entries, totalEntries, reshuffle } = useNotebookEntries();

  /**
   * currentSpread:
   * 0: Cover & Prologue
   * 1 .. 9: The 9 randomized friend chapters (index = currentSpread - 1)
   * 10: Epilogue & Ending Page
   */
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [indexDrawerOpen, setIndexDrawerOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const totalSpreads = totalEntries + 2; // Cover + 9 Chapters + Ending

  const goToNextSpread = useCallback(() => {
    if (currentSpread < totalSpreads - 1) {
      soundFx.playPageTurn();
      setCurrentSpread((prev) => prev + 1);
    }
  }, [currentSpread, totalSpreads]);

  const goToPrevSpread = useCallback(() => {
    if (currentSpread > 0) {
      soundFx.playPageTurn();
      setCurrentSpread((prev) => prev - 1);
    }
  }, [currentSpread]);

  const jumpToEntryId = useCallback(
    (id: string) => {
      const idx = entries.findIndex((e) => e.id === id);
      if (idx !== -1) {
        soundFx.playPageTurn();
        setCurrentSpread(idx + 1);
      }
    },
    [entries]
  );

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (!next) {
      soundFx.playUiClick();
    }
  };

  // Keyboard Navigation: Left / Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSpread();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSpread();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSpread, goToPrevSpread]);

  // Determine current active chapter for the header
  const isCover = currentSpread === 0;
  const isEnding = currentSpread === totalSpreads - 1;
  const currentChapterIdx = currentSpread - 1;
  const activeEntry = !isCover && !isEnding ? entries[currentChapterIdx] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 bg-obsidian-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 select-none">
        {/* Return to Paddock */}
        <button
          onClick={() => {
            soundFx.playUiClick();
            onReturnToPaddock();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-500/40 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gold-400" />
          <span>THE PADDOCK</span>
        </button>

        {/* Center Progress Indicator */}
        <div className="text-center font-mono">
          <div className="text-xs sm:text-sm font-bold text-white tracking-wider">
            {isCover && 'PROLOGUE • THE NINE CHAPTERS'}
            {activeEntry && (
              <span className="text-gold-300">
                CHAPTER 0{currentChapterIdx + 1} / 0{totalEntries} •{' '}
                <span className="text-white font-normal">{activeEntry.friendName}</span>
              </span>
            )}
            {isEnding && 'EPILOGUE • THE END OF THE CHAPTERS'}
          </div>
          <div className="text-[10px] text-gray-400 tracking-widest mt-0.5">
            SPREAD {currentSpread + 1} OF {totalSpreads}
          </div>
        </div>

        {/* Right Tools: Index, Sound, Shuffle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIndexDrawerOpen(true)}
            title="Open Chapter Index"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10 text-xs font-mono text-gold-300 hover:bg-gold-500/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INDEX</span>
          </button>

          <button
            onClick={() => {
              soundFx.playUiClick();
              reshuffle();
              setCurrentSpread(0);
            }}
            title="Randomize Chapter Order For Fresh Session"
            className="p-2 rounded-lg border border-white/10 hover:border-gold-500/30 text-gray-400 hover:text-gold-300 transition-colors cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute page audio' : 'Mute page audio'}
            title={isMuted ? 'Unmute Page Sounds' : 'Mute Page Sounds'}
            className="p-2 rounded-lg border border-white/10 hover:border-gold-500/30 text-gray-400 hover:text-gold-300 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>
        </div>
      </div>

      {/* Physical Leather Journal Book Frame */}
      <div className="w-full relative leather-journal-cover rounded-2xl p-2.5 sm:p-5 md:p-6 mb-8 select-none">
        {/* Brass corner protectors on leather book */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-400/80 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-400/80 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-400/80 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400/80 rounded-br-sm pointer-events-none" />

        {/* Center Leather Spine Stitching Line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 pointer-events-none z-20">
          <div className="h-full w-0.5 mx-auto bg-gradient-to-b from-gold-500/40 via-gold-500/10 to-gold-500/40" />
        </div>

        {/* Spread Content */}
        <div className="relative z-10 w-full min-h-[580px] sm:min-h-[620px] flex items-center justify-center">
          {/* Spread 0: Cover / Preface */}
          {isCover && (
            <NotebookCoverPage
              onBegin={goToNextSpread}
              onOpenIndex={() => setIndexDrawerOpen(true)}
            />
          )}

          {/* Spreads 1..9: Individual Friend Chapters */}
          {!isCover && !isEnding && activeEntry && (
            <NotebookSpread
              key={activeEntry.id}
              entry={activeEntry}
              chapterIndex={currentChapterIdx}
              totalChapters={totalEntries}
            />
          )}

          {/* Spread 10: Epilogue / Ending */}
          {isEnding && (
            <NotebookEndingPage
              onReturnToPaddock={onReturnToPaddock}
              onRestart={() => {
                soundFx.playPageTurn();
                setCurrentSpread(0);
              }}
              onReshuffle={() => {
                soundFx.playUiClick();
                reshuffle();
                setCurrentSpread(0);
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom Page Turn Controls */}
      <div className="w-full flex items-center justify-between gap-4 select-none">
        <button
          onClick={goToPrevSpread}
          disabled={currentSpread === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === 0
              ? 'border-white/5 text-gray-600 bg-obsidian-900/40 cursor-not-allowed opacity-40'
              : 'border-white/10 hover:border-gold-400 bg-obsidian-900 text-gray-200 hover:text-gold-200 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-gold-400" />
          <span>PREVIOUS PAGE</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                soundFx.playPageTurn();
                setCurrentSpread(i);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSpread
                  ? 'w-6 bg-gold-400 shadow-[0_0_8px_#d4af37]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to spread ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextSpread}
          disabled={currentSpread === totalSpreads - 1}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === totalSpreads - 1
              ? 'border-white/5 text-gray-600 bg-obsidian-900/40 cursor-not-allowed opacity-40'
              : 'border-gold-500/40 hover:border-gold-400 bg-gradient-to-r from-gold-500/20 to-gold-500/10 text-gold-300 hover:text-gold-100 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]'
          }`}
        >
          <span>NEXT PAGE</span>
          <ChevronRight className="w-4 h-4 text-gold-400" />
        </button>
      </div>

      {/* Chapter Index Modal Drawer */}
      <ChapterIndexDrawer
        entries={entries}
        currentEntryId={activeEntry ? activeEntry.id : ''}
        isOpen={indexDrawerOpen}
        onClose={() => setIndexDrawerOpen(false)}
        onSelectEntry={jumpToEntryId}
        onReshuffle={() => {
          reshuffle();
          setCurrentSpread(0);
        }}
      />
    </div>
  );
};
