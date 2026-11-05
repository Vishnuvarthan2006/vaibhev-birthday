import React, { useState } from 'react';
import { Play, Clock, User, Film } from 'lucide-react';
import type { VideoEntry } from '../../types/video';
import { soundFx } from '../../utils/audioFx';

interface VideoCardProps {
  video: VideoEntry;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [videoError, setVideoError] = useState<boolean>(false);

  // Appending #t=0.1 prompts HTML5 video engines to fetch and render the first frame
  const previewSource = video.videoUrl
    ? video.videoUrl.includes('#')
      ? video.videoUrl
      : `${video.videoUrl}#t=0.1`
    : '';

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
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
      className="group relative cursor-pointer rounded-lg border border-white/[0.12] bg-gradient-to-b from-[#18161b] via-[#131215] to-[#0e0d10] overflow-hidden transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)] focus:outline-hidden focus:ring-2 focus:ring-gold-400 select-none flex flex-col"
    >
      {/* Film Strip Perforation Effect along top edge */}
      <div className="w-full h-3 bg-neutral-950 flex items-center justify-around px-2 border-b border-white/[0.06] select-none pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-1.5 rounded-xs bg-white/10 group-hover:bg-gold-500/30 transition-colors"
          />
        ))}
      </div>

      {/* Video Preview Stage (Auto-renders first frame preview directly from the video file) */}
      <div className="relative w-full aspect-video bg-neutral-950 overflow-hidden flex items-center justify-center">
        {previewSource && !videoError ? (
          <video
            src={previewSource}
            preload="metadata"
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          />
        ) : (
          /* Fallback Cinema Slate if video is pending upload */
          <div className="w-full h-full p-4 bg-gradient-to-br from-[#1a1714] via-[#0d0c0a] to-[#070605] flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span className="text-red-400 font-bold uppercase">SCUDERIA MARANELLO</span>
              <span>{video.resolution || 'HD'}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-1.5 group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-display text-xs font-bold text-white uppercase tracking-tight line-clamp-1">
                {video.title}
              </span>
              <span className="font-mono text-[9px] text-gold-400/80 mt-0.5 truncate max-w-[190px]">
                {video.videoUrl}
              </span>
            </div>

            <div className="w-full text-[9px] font-mono text-gray-400">
              Click to Open Screening Room
            </div>
          </div>
        )}

        {/* Duration Badge (Top Right) */}
        {video.duration && (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-white/15 text-white font-mono text-xs backdrop-blur-xs">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>{video.duration}</span>
          </div>
        )}

        {/* Hover / Inactive Center Play Button */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center z-10">
          <div className="w-14 h-14 rounded-full border border-gold-400/80 bg-black/80 text-gold-400 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] transform transition-transform duration-300 group-hover:scale-115 group-hover:bg-red-600/90 group-hover:border-red-400 group-hover:text-white">
            <Play className="w-6 h-6 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Film Strip Perforation Effect along bottom edge of thumbnail */}
      <div className="w-full h-3 bg-neutral-950 flex items-center justify-around px-2 border-t border-b border-white/[0.06] select-none pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-1.5 rounded-xs bg-white/10 group-hover:bg-gold-500/30 transition-colors"
          />
        ))}
      </div>

      {/* Video Content & Story Description */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
            {video.title}
          </h3>

          {video.description && (
            <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        {/* Contributor and Video Metadata Footer */}
        <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-1.5 text-gold-400/90 truncate">
            <User className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{video.contributor || 'Syndicate Member'}</span>
          </div>

          <span className="text-[11px] uppercase tracking-wider text-gray-400 shrink-0">
            {video.resolution || '1080p'}
          </span>
        </div>
      </div>
    </div>
  );
};
