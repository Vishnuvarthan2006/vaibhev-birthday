import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NotebookPhoto } from '../../types/notebook';


interface PhotoLightboxProps {
  photos: NotebookPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Lightbox Content Container */}
      <div
        className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Close */}
        <div className="w-full flex items-center justify-between text-white mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              title="Back to Notebook"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer mr-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>BACK</span>
            </button>
            <span className="font-mono text-xs text-gold-400 font-semibold px-2.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
              PHOTO {currentIndex + 1} OF {photos.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative w-full flex items-center justify-center rounded-lg overflow-hidden border border-white/10 bg-black/80 max-h-[75vh]">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || 'Scrapbook photograph'}
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              // Fallback to elegant placeholder if local image file doesn't exist yet
              (e.target as HTMLElement).style.display = 'none';
              const parent = (e.target as HTMLElement).parentElement;
              if (parent && !parent.querySelector('.img-fallback')) {
                const fallback = document.createElement('div');
                fallback.className =
                  'img-fallback p-12 text-center text-gray-400 flex flex-col items-center justify-center gap-3';
                fallback.innerHTML = `
                  <div class="w-16 h-16 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <p class="font-display text-white text-base font-semibold">Photograph Placeholder</p>
                  <p class="font-mono text-xs text-gold-400/80">Add your photo to: <code>${currentPhoto.url}</code></p>
                `;
                parent.appendChild(fallback);
              }
            }}
          />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-gold-500 text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-gold-500 text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        {currentPhoto.caption && (
          <div className="mt-3 text-center">
            <p className="font-handwriting text-xl sm:text-2xl text-gold-200">
              "{currentPhoto.caption}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
