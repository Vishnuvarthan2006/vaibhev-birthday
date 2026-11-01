import React, { useEffect, useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Calendar,
  User,
  Tag,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { GalleryPhoto } from '../../types/gallery';
import { soundFx } from '../../utils/audioFx';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [failedPhotoId, setFailedPhotoId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const currentPhoto = photos[currentIndex];
  const hasPhotos = photos.length > 0;
  const imageError = currentPhoto ? failedPhotoId === currentPhoto.id : false;

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playUiClick();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        soundFx.playUiClick();
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        soundFx.playUiClick();
        onNavigate((currentIndex + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      // Swiped left -> next photo
      soundFx.playUiClick();
      onNavigate((currentIndex + 1) % photos.length);
    } else if (diff < -minSwipeDistance) {
      // Swiped right -> prev photo
      soundFx.playUiClick();
      onNavigate((currentIndex - 1 + photos.length) % photos.length);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isOpen || !hasPhotos || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl select-none animate-fadeIn"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Controls & Counter */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/[0.08] bg-obsidian-950/80 z-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-gold-500/30 bg-gold-500/10">
            FRAME {currentIndex + 1} OF {photos.length}
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-gray-400">
            {currentPhoto.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-400/40 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundFx.playUiClick();
              onClose();
            }}
            title="Close Lightbox (Esc)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">CLOSE</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => {
            soundFx.playUiClick();
            onNavigate((currentIndex - 1 + photos.length) % photos.length);
          }}
          title="Previous Photo (Left Arrow)"
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-gold-400 hover:border-gold-400/60 hover:bg-black/80 transition-all backdrop-blur-md shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Photo or Fallback Box */}
        <div className="relative max-h-[75vh] max-w-[90vw] flex items-center justify-center">
          {!imageError ? (
            <img
              key={currentPhoto.id}
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              onError={() => setFailedPhotoId(currentPhoto.id)}
              className="max-h-[72vh] max-w-[85vw] object-contain rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10"
            />
          ) : (
            /* Branded F1 Fallback card if the photo file is pending upload */
            <div className="w-[340px] sm:w-[500px] h-[320px] sm:h-[400px] rounded-lg bg-gradient-to-br from-[#1c1815] via-[#0d0c0a] to-[#080706] border-2 border-gold-500/40 p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-400/60" />

              <div className="font-mono text-[10px] tracking-widest text-red-500 font-bold uppercase">
                SCUDERIA MEMORY REEL • SLOT RESERVED
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border border-gold-400/50 bg-gold-400/10 flex items-center justify-center text-gold-400 mb-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                  {currentPhoto.title}
                </h3>
                <p className="font-mono text-xs text-gold-300 mt-2 max-w-sm line-clamp-2">
                  {currentPhoto.description || 'Awaiting file in public/media/gallery/'}
                </p>
                <div className="mt-3 px-3 py-1 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-gray-400">
                  Target File: {currentPhoto.imageUrl}
                </div>
              </div>

              <div className="font-mono text-[10px] text-gold-400/60 uppercase">
                READY FOR SQUAD MEDIA UPLOAD
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            soundFx.playUiClick();
            onNavigate((currentIndex + 1) % photos.length);
          }}
          title="Next Photo (Right Arrow)"
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-gold-400 hover:border-gold-400/60 hover:bg-black/80 transition-all backdrop-blur-md shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Info Bar: Metadata & Story */}
      <div className="border-t border-white/[0.08] bg-obsidian-950/90 px-4 sm:px-8 py-3 sm:py-4 z-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <span>{currentPhoto.title}</span>
              {currentPhoto.featured && (
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/40">
                  Featured
                </span>
              )}
            </h2>
            {currentPhoto.description && (
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 line-clamp-2">
                {currentPhoto.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px] text-gray-400 shrink-0">
            {currentPhoto.contributor && (
              <span className="flex items-center gap-1.5 text-gold-400/90">
                <User className="w-3.5 h-3.5 text-gold-400" />
                {currentPhoto.contributor}
              </span>
            )}
            {currentPhoto.dateOrEvent && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {currentPhoto.dateOrEvent}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-red-400">
              <Tag className="w-3.5 h-3.5" />
              {currentPhoto.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
