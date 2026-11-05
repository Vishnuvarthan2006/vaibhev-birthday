import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import type { GalleryPhoto } from '../../types/gallery';
import { soundFx } from '../../utils/audioFx';

interface PhotoCardProps {
  photo: GalleryPhoto;
  onClick: () => void;
  index: number;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="View photo"
      onClick={() => {
        soundFx.playUiClick();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundFx.playUiClick();
          onClick();
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-md border border-white/[0.12] bg-[#141217] transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)] focus:outline-hidden focus:ring-2 focus:ring-gold-400 select-none break-inside-avoid mb-4 sm:mb-6"
    >
      {/* Corner Accent (Ferrari Red on top left) */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10 overflow-hidden">
        <div className="w-12 h-1.5 -rotate-45 bg-gradient-to-r from-red-600 to-amber-500 transform -translate-x-3 translate-y-1 shadow-sm" />
      </div>

      {/* Image Container: clean presentation displaying ONLY the photo */}
      <div className="relative w-full overflow-hidden bg-[#141217] flex items-center justify-center">
        {!imageError ? (
          <img
            src={photo.imageUrl}
            alt="Captured memory"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-auto max-h-[75vh] object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          /* Fallback Placeholder Card */
          <div className="w-full aspect-[4/3] p-4 sm:p-6 bg-gradient-to-br from-[#1a1714] via-[#0d0c0a] to-[#070605] flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span className="text-red-400 font-bold uppercase">ARCHIVE</span>
              <span>FRAME</span>
            </div>

            <div className="flex flex-col items-center my-auto">
              <div className="w-10 h-10 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-2">
                <Camera className="w-5 h-5" />
              </div>
              <p className="font-mono text-[10px] text-gold-400/80 mt-1 max-w-[200px] truncate">
                {photo.imageUrl}
              </p>
            </div>

            <div className="w-full text-[9px] font-mono text-gray-400 truncate">
              Awaiting upload
            </div>
          </div>
        )}

        {/* Minimal Hover Overlay with Enlarge Button Only */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/80 border border-gold-400 text-gold-300 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
