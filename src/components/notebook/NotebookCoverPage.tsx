import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { GoldButton } from '../common/GoldButton';

import { RECIPIENT_PROFILE } from '../../data/siteConfig';

interface NotebookCoverPageProps {
  onBegin: () => void;
  onOpenIndex: () => void;
}

export const NotebookCoverPage: React.FC<NotebookCoverPageProps> = ({
  onBegin,
  onOpenIndex,
}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl border border-gold-500/30">
      {/* Left Facing Page: Book Cover & Emblem */}
      <div className="paper-page-dark book-spine-left p-6 sm:p-10 md:p-12 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-white/10 relative">
        {/* Subtle gold corner brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />

        <div className="w-full flex items-center justify-between text-xs font-mono text-gold-400/80 mb-6">
          <span>VOLUME 01 • MEMORABILIA</span>
          <span>EST. 9 FRIENDS</span>
        </div>

        {/* Central Gold Crest */}
        <div className="my-auto py-6 flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold-400/50 bg-gradient-to-br from-[#2a2418] via-[#15120c] to-[#0a0806] flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.25)] mb-6">
            <span className="font-display font-black text-3xl sm:text-4xl gold-text-gradient">
              V
            </span>
          </div>

          <span className="font-mono text-xs tracking-[0.3em] text-red-400 font-bold uppercase mb-2">
            SCUDERIA FERRAI • #44
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            THE NINE <br />
            <span className="gold-text-gradient">CHAPTERS</span>
          </h1>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-4" />

          <p className="font-mono text-xs sm:text-sm text-gold-300 tracking-widest uppercase max-w-sm">
            NINE PEOPLE. COUNTLESS MEMORIES. ONE VERY SPECIAL PERSON.
          </p>
        </div>

        <div className="text-[10px] font-mono text-gray-400">
          PRODUCED WITH UNCONDITIONAL LOVE FOR {RECIPIENT_PROFILE.name.toUpperCase()}
        </div>
      </div>

      {/* Right Facing Page: Prologue & Inscription */}
      <div className="paper-page book-spine-right p-6 sm:p-10 md:p-12 flex flex-col justify-between text-neutral-900 relative">
        {/* Subtle gold corner brackets */}
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/60" />

        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-neutral-300 pb-3 mb-6">
          <span className="uppercase tracking-wider font-semibold">THE PROLOGUE</span>
          <span className="text-gold-700 font-bold">CHAPTER 00</span>
        </div>

        {/* Handwritten Foreword Inscription */}
        <div className="my-auto space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-wide">
            To Our Brother &amp; Friend, Vaibhev:
          </h2>

          <div className="font-handwriting text-2xl sm:text-3xl text-neutral-800 leading-relaxed space-y-3">
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

          <div className="pt-2 text-right">
            <p className="font-handwriting text-2xl text-gold-700 font-bold">
              — The Nine-Squad Collective
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-neutral-300 flex flex-col sm:flex-row items-center gap-3">
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
            className="w-full sm:w-auto px-4 py-2.5 rounded border border-neutral-400/60 hover:border-neutral-700 text-xs font-mono font-semibold text-neutral-700 hover:text-neutral-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-gold-600" />
            <span>Chapter Index</span>
          </button>
        </div>
      </div>
    </div>
  );
};
