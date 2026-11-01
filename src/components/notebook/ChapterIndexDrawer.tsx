import React from 'react';
import { X, BookOpen, ChevronRight, Shuffle } from 'lucide-react';
import type { NotebookEntry } from '../../types/notebook';
import { soundFx } from '../../utils/audioFx';

interface ChapterIndexDrawerProps {
  entries: NotebookEntry[];
  currentEntryId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectEntry: (id: string) => void;
  onReshuffle: () => void;
}

export const ChapterIndexDrawer: React.FC<ChapterIndexDrawerProps> = ({
  entries,
  currentEntryId,
  isOpen,
  onClose,
  onSelectEntry,
  onReshuffle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="carbon-panel rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-gold-500/30 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                THE NINE CHAPTERS INDEX
              </h2>
              <p className="font-mono text-xs text-gold-400">
                Current Session Order (Randomized Per Visit)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playUiClick();
                onReshuffle();
              }}
              title="Re-deal / Shuffle session order"
              className="p-2 rounded-lg border border-white/10 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Index"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
          {entries.map((entry, idx) => {
            const isCurrent = entry.id === currentEntryId;

            return (
              <div
                key={entry.id}
                onClick={() => {
                  soundFx.playPageTurn();
                  onSelectEntry(entry.id);
                  onClose();
                }}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                  isCurrent
                    ? 'border-gold-400 bg-gold-500/15 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'border-white/[0.07] bg-obsidian-900/60 hover:border-gold-500/40 hover:bg-obsidian-850'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      isCurrent
                        ? 'border-gold-400 bg-gold-500 text-obsidian-950 shadow-md'
                        : 'border-white/10 bg-black/40 text-gold-400 group-hover:border-gold-400/50'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-display text-sm sm:text-base font-bold truncate ${
                          isCurrent ? 'text-gold-200' : 'text-white group-hover:text-gold-200'
                        }`}
                      >
                        {entry.friendName}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-gold-400 text-obsidian-950 font-bold uppercase shrink-0">
                          READING
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-gray-400 truncate">
                      {entry.chapterTitle || `Chapter 0${idx + 1}`} • Role: {entry.callsign}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[10px] font-mono text-gold-400/80 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                    {entry.photos.length} Photos
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isCurrent ? 'text-gold-400' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="p-4 border-t border-white/[0.08] bg-obsidian-950/80 text-center">
          <p className="text-[11px] font-mono text-gray-400">
            Click any chapter above to turn directly to that friend's page.
          </p>
        </div>
      </div>
    </div>
  );
};
