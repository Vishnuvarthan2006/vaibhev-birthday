import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import type { NotebookPhoto } from '../../types/notebook';

interface PolaroidPhotoProps {
  photo: NotebookPhoto;
  accentStyle?: 'gold' | 'ferrari-red' | 'carbon' | 'spider-crimson';
  onClick?: () => void;
  index?: number;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  photo,
  accentStyle = 'gold',
  onClick,
  index = 0,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);
  const rotation = photo.rotationDeg ?? (index % 2 === 0 ? -2 : 2.5);

  const getTapeClass = () => {
    switch (accentStyle) {
      case 'ferrari-red':
      case 'spider-crimson':
        return 'washi-tape-ferrari';
      case 'carbon':
        return 'bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-700 shadow-sm opacity-90';
      case 'gold':
      default:
        return 'washi-tape-gold';
    }
  };

  // Derive aspect ratio class from the photo's aspectRatio hint
  const frameAspect =
    photo.aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : photo.aspectRatio === 'square'
        ? 'aspect-square'
        : 'aspect-[4/3]'; // landscape (default)

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="polaroid-card relative p-2.5 sm:p-3.5 pb-5 sm:pb-6 rounded shadow-lg cursor-pointer w-full mx-auto select-none group"
    >
      {/* Washi Tape Strip at top */}
      <div
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 ${getTapeClass()} rounded-xs z-10`}
      />

      {/* Image Frame — aspect ratio adapts to portrait / square / landscape */}
      <div className={`relative w-full ${frameAspect} bg-neutral-900 rounded-xs overflow-hidden flex items-center justify-center`}>
        {imageLoaded ? (
          <img
            src={photo.url}
            alt={photo.caption || 'Scrapbook memory'}
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Elegant placeholder if friend hasn't placed their image file yet */
          <div className="w-full h-full bg-gradient-to-br from-[#1a1714] to-[#0d0c0a] border border-gold-500/20 p-4 flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-2">
              <Camera className="w-4 h-4" />
            </div>
            <span className="font-display text-white text-xs font-semibold">
              Photo Slot Ready
            </span>
            <span className="font-mono text-[9px] text-gold-400/80 mt-1 max-w-[190px] truncate">
              {photo.url}
            </span>
          </div>
        )}

        {/* Hover zoom pill */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1 rounded-full bg-black/75 border border-gold-400 text-gold-300 font-mono text-[10px] tracking-wider flex items-center gap-1 shadow-md">
            <ZoomIn className="w-3 h-3" /> ENLARGE
          </span>
        </div>
      </div>

      {/* Handwritten Caption */}
      <div className="mt-2.5 px-1 text-center min-h-[28px] flex items-center justify-center">
        <p className="font-handwriting text-lg sm:text-xl text-neutral-800 leading-tight">
          {photo.caption || 'Unforgettable memory'}
        </p>
      </div>
    </div>
  );
};
