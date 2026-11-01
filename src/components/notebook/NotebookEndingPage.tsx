import React from 'react';
import { RotateCcw, Compass, Shuffle, Heart, Award } from 'lucide-react';
import { GoldButton } from '../common/GoldButton';
import { NOTEBOOK_ENTRIES } from '../../data/notebookData';
import { soundFx } from '../../utils/audioFx';

interface NotebookEndingPageProps {
  onReturnToPaddock: () => void;
  onRestart: () => void;
  onReshuffle: () => void;
}

export const NotebookEndingPage: React.FC<NotebookEndingPageProps> = ({
  onReturnToPaddock,
  onRestart,
  onReshuffle,
}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl border border-gold-500/30">
      {/* Left Facing Page: The 9 Signatures & Badges */}
      <div className="paper-page book-spine-left p-6 sm:p-10 md:p-12 flex flex-col justify-between text-neutral-900 border-b md:border-b-0 md:border-r border-neutral-300 relative">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-neutral-300 pb-3 mb-6">
          <span className="uppercase tracking-wider font-semibold">THE SQUAD SIGNATURES</span>
          <span className="text-gold-700 font-bold">9 / 9 VERIFIED</span>
        </div>

        {/* 9 Friends Stamps / Grid */}
        <div className="my-auto py-4">
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-4">
            Signed &amp; Sealed by the 9-Squad:
          </h3>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
            {NOTEBOOK_ENTRIES.map((friend, idx) => (
              <div
                key={friend.id}
                className="p-2 sm:p-3 rounded-lg border border-neutral-300 bg-white/70 shadow-xs flex flex-col items-center justify-center"
              >
                <span className="font-handwriting text-xl sm:text-2xl text-neutral-900 font-bold leading-none">
                  {friend.friendName.split(' ')[0] || `Friend ${idx + 1}`}
                </span>
                <span className="font-mono text-[9px] text-gold-700 uppercase tracking-wider mt-1">
                  {friend.stickerBadge || 'APPROVED'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-lg bg-gold-500/10 border border-gold-600/30 flex items-center gap-3">
            <Award className="w-5 h-5 text-gold-700 shrink-0" />
            <p className="font-mono text-xs text-neutral-700 leading-tight">
              All 9 chapters preserved. The bond between Vaibhev and the squad is certified forever.
            </p>
          </div>
        </div>

        <div className="text-[10px] font-mono text-neutral-500 text-center">
          SCUDERIA FERRAI 9-SQUAD • PODIUM FINISH
        </div>
      </div>

      {/* Right Facing Page: The Concluding Message */}
      <div className="paper-page-dark book-spine-right p-6 sm:p-10 md:p-12 flex flex-col justify-between items-center text-center text-white relative">
        <div className="w-full flex items-center justify-between text-xs font-mono text-gold-400 border-b border-white/10 pb-3 mb-6">
          <span className="uppercase tracking-wider">EPILOGUE</span>
          <span className="text-red-400 font-bold">FINAL SECTOR</span>
        </div>

        <div className="my-auto py-6 max-w-md">
          <div className="w-14 h-14 rounded-full border border-gold-400/40 bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-5 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Heart className="w-7 h-7 text-red-500 fill-red-500/30" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-snug mb-4">
            <span className="block text-gray-400 text-base sm:text-lg mb-1">
              THE END OF THE CHAPTERS.
            </span>
            <span className="gold-text-gradient block">
              NEVER THE END OF THE MEMORIES.
            </span>
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-4" />

          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-8">
            Thank you for being the legend you are. This scrapbook will remain here as your personal
            vault whenever you want to revisit the stories, photos, and wishes from the nine of us.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GoldButton
              variant="gold-solid"
              size="md"
              icon={<Compass className="w-4 h-4" />}
              onClick={() => {
                soundFx.playUiClick();
                onReturnToPaddock();
              }}
              className="w-full sm:w-auto"
            >
              Return to Paddock
            </GoldButton>

            <button
              onClick={() => {
                soundFx.playPageTurn();
                onRestart();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded border border-white/20 hover:border-gold-400 text-xs font-mono text-gray-200 hover:text-gold-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
              <span>Read Again</span>
            </button>

            <button
              onClick={() => {
                soundFx.playUiClick();
                onReshuffle();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded border border-white/20 hover:border-gold-400 text-xs font-mono text-gray-200 hover:text-gold-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Shuffle the 9 chapters into a fresh random order"
            >
              <Shuffle className="w-3.5 h-3.5 text-red-400" />
              <span>Re-Shuffle</span>
            </button>
          </div>
        </div>

        <div className="text-[10px] font-mono text-gray-400">
          VAIBHEV'S BIRTHDAY ARCHIVE • CHEQUERED FLAG
        </div>
      </div>
    </div>
  );
};
