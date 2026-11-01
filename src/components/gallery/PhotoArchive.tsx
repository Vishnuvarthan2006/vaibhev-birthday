import React, { useState, useMemo } from 'react';
import {
  Compass,
  Film,
  Sparkles,
  Camera,
  ArrowLeft,
} from 'lucide-react';
import { getAllGalleryPhotos } from '../../data/galleryData';
import { PhotoCard } from './PhotoCard';
import { GalleryLightbox } from './GalleryLightbox';
import { GoldButton } from '../common/GoldButton';
import { soundFx } from '../../utils/audioFx';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';

interface PhotoArchiveProps {
  onReturnToPaddock: () => void;
  onNavigateToVault?: () => void;
}

export const PhotoArchive: React.FC<PhotoArchiveProps> = ({
  onReturnToPaddock,
  onNavigateToVault,
}) => {
  const { isClueDiscovered, discoverClue } = useTreasureHunt();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Retrieve session-shuffled photographs in one continuous collection
  const allPhotos = useMemo(() => getAllGalleryPhotos(), []);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Background ambiance is provided by AmbientBackground */}

      {/* Main Container */}
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

          <div className="flex items-center gap-2 sm:gap-4">
            {onNavigateToVault && (
              <button
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigateToVault();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 hover:border-red-500/60 hover:text-white transition-all text-xs sm:text-sm font-mono tracking-wider cursor-pointer"
              >
                <Film className="w-4 h-4" />
                <span>VIDEO VAULT</span>
              </button>
            )}

            {/* Secret Clue 7 Shutter Trigger */}
            <button
              onClick={() => discoverClue('clue-7-sathiya')}
              title="Inspect Classified Shutter"
              className={`font-mono text-xs sm:text-sm px-3 py-1.5 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-7-sathiya')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-gold-400/80 bg-black/40 border border-gold-500/20 hover:border-gold-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-7-sathiya') ? "THE SHUTTER CODE [I] DECODED ✓" : "THE SHUTTER CODE 🔍"}
            </button>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="py-8 sm:py-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>VOLUME II • VISUAL ANTHOLOGY</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            THE MEMORY <span className="gold-text-gradient">ARCHIVE</span>
          </h1>

          <p className="mt-3 font-mono text-sm sm:text-base tracking-[0.25em] text-red-500 font-bold uppercase">
            EVERY FRAME HAS A STORY.
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto font-sans">
            A continuous photographic retrospective celebrating the shared road trips, track days,
            unfiltered laughter, and defining milestones of Vaibhev and the 9-Squad Syndicate.
          </p>

          {/* Quick Telemetry Bar with Total Photo Count */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-xl bg-obsidian-900/80 border border-white/[0.08] text-xs sm:text-sm font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gold-400" />
              <span className="text-white font-bold">{allPhotos.length}</span> Photographs
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-white font-bold">1</span> Continuous Archive
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold">9</span> Friends
            </div>
          </div>
        </div>

        {/* Continuous Masonry Layout */}
        {allPhotos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
            {allPhotos.map((photo, idx) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={idx}
                onClick={() => handleOpenLightbox(idx)}
              />
            ))}
          </div>
        ) : (
          <div className="my-16 p-8 sm:p-12 rounded-xl bg-obsidian-900/40 border border-gold-500/20 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              No Photographs Yet
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              The archive is awaiting memories. Drop files into /public/media/gallery/ to add photos.
            </p>
          </div>
        )}

        {/* Bottom Paddock Quick Return */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs text-gold-400/80 block">
              VAIBHEV'S BIRTHDAY GRAND PRIX • 2026
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              All 9 friends contributed memories to this archive.
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
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          photos={allPhotos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};
