import React, { useState, useMemo } from 'react';
import {
  Compass,
  Film,
  Sparkles,
  Camera,
  Layers,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import {
  getAllGalleryPhotos,
  getGalleryCategories,
} from '../../data/galleryData';
import type { GalleryCategoryId } from '../../types/gallery';
import { PhotoCard } from './PhotoCard';
import { GalleryLightbox } from './GalleryLightbox';
import { GoldButton } from '../common/GoldButton';
import { soundFx } from '../../utils/audioFx';

interface PhotoArchiveProps {
  onReturnToPaddock: () => void;
  onNavigateToVault?: () => void;
}

export const PhotoArchive: React.FC<PhotoArchiveProps> = ({
  onReturnToPaddock,
  onNavigateToVault,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => getGalleryCategories(), []);
  const allPhotos = useMemo(() => getAllGalleryPhotos(), []);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return allPhotos;
    return allPhotos.filter((p) => p.category === selectedCategory);
  }, [allPhotos, selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allPhotos.length };
    allPhotos.forEach((photo) => {
      counts[photo.category] = (counts[photo.category] || 0) + 1;
    });
    return counts;
  }, [allPhotos]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleCategorySelect = (catId: GalleryCategoryId) => {
    soundFx.playUiClick();
    setSelectedCategory(catId);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Background ambiance is provided by AmbientBackground */}

      {/* Main Container */}
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

          <div className="flex items-center gap-2 sm:gap-4">
            {onNavigateToVault && (
              <button
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigateToVault();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 hover:border-red-500/60 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer"
              >
                <Film className="w-3.5 h-3.5" />
                <span>VIDEO VAULT</span>
              </button>
            )}

            <span className="font-mono text-xs text-gold-400/80 px-2.5 py-1 rounded bg-black/40 border border-gold-500/20">
              VAIBHEV #44 ARCHIVE
            </span>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="py-8 sm:py-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>VOLUME II • VISUAL ANTHOLOGY</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            THE MEMORY <span className="gold-text-gradient">ARCHIVE</span>
          </h1>

          <p className="mt-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-red-500 font-bold uppercase">
            EVERY FRAME HAS A STORY.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
            A curated photographic retrospective celebrating the shared road trips, track days,
            unfiltered laughter, and defining milestones of Vaibhev and the 9-Squad Syndicate.
          </p>

          {/* Quick Telemetry Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 rounded-lg bg-obsidian-900/60 border border-white/[0.06] text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-white font-bold">{allPhotos.length}</span> Frames
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span className="text-white font-bold">{categories.length - 1}</span> Sectors
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-400 font-bold">9</span> Contributors
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 pb-2">
            <Filter className="w-3.5 h-3.5 text-gold-400/80" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
              Filter by Sector:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 border border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-obsidian-900/70 border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-gold-500/30 text-gold-200'
                        : 'bg-white/10 text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Content Area */}
        {filteredPhotos.length > 0 ? (
          /* Responsive Masonry Layout via CSS columns */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, idx) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={idx}
                onClick={() => handleOpenLightbox(idx)}
              />
            ))}
          </div>
        ) : (
          /* Elegant Empty State */
          <div className="my-16 p-8 sm:p-12 rounded-xl bg-obsidian-900/40 border border-gold-500/20 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              No Frames In This Sector Yet
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              The squad hasn’t assigned any photos to this category. Drop files into /public/media/gallery/ to add memories.
            </p>
            <div className="mt-6">
              <GoldButton
                variant="gold-outline"
                size="sm"
                onClick={() => handleCategorySelect('all')}
              >
                VIEW ALL FRAMES
              </GoldButton>
            </div>
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
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={handleCloseLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};
