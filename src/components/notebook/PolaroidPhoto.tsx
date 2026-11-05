import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import type { NotebookPhoto } from '../../types/notebook';

interface PolaroidPhotoProps {
  photo: NotebookPhoto;
  accentStyle?: 'gold' | 'ferrari-red' | 'carbon' | 'spider-crimson';
  onClick?: () => void;
  index?: number;
  /** Max height of the image (e.g. '220px' or '32vh'). Controls size without cropping. */
  maxImgH?: string;
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  photo,
  accentStyle = 'gold',
  onClick,
  index = 0,
  maxImgH = '200px',
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

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="polaroid-card relative p-2 sm:p-2.5 pb-5 sm:pb-6 rounded shadow-lg cursor-pointer w-full mx-auto select-none group"
    >
      {/* Washi Tape Strip at top */}
      <div
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 ${getTapeClass()} rounded-xs z-10`}
      />

      {/*
        Image Frame:
        - No fixed aspect ratio → frame wraps the actual image shape
        - bg-[#f7f2e9] is a warm paper tone — shows as letterbox if image
          is capped by maxImgH, replacing the previous black box
        - object-contain prevents any cropping
        - w-full h-auto = natural proportions; maxImgH caps height for page fit
      */}
      <div className="relative w-full overflow-hidden rounded-xs bg-[#f7f2e9]">
        {imageLoaded ? (
          <img
            src={photo.url}
            alt={photo.caption || 'Scrapbook memory'}
            onError={() => setImageLoaded(false)}
            style={{ maxHeight: maxImgH }}
            className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder shown when the image file hasn't been placed yet */
          <div className="w-full aspect-[4/3] bg-neutral-100 border border-dashed border-neutral-300 p-3 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-2">
              <Camera className="w-4 h-4" />
            </div>
            <span className="font-display text-neutral-600 text-xs font-semibold">
              Photo Slot Ready
            </span>
            <span className="font-mono text-[9px] text-gold-600/80 mt-1 max-w-[160px] truncate">
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
      <div className="mt-1.5 px-1 text-center flex items-center justify-center">
        <p className="font-handwriting text-base sm:text-lg text-neutral-800 leading-tight">
          {photo.caption || 'Unforgettable memory'}
        </p>
      </div>
    </div>
  );
};
