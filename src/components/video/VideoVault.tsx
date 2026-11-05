import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  Play,
  Film,
  Sparkles,
  ArrowLeft,
  User,
  Clock,
  Tv,
} from 'lucide-react';
import {
  getAllVaultVideos,
  getFeaturedVideo,
} from '../../data/videoData';
import type { VideoEntry } from '../../types/video';
import { VideoCard } from './VideoCard';
import { CinemaModal } from './CinemaModal';
import { GoldButton } from '../common/GoldButton';
import { soundFx } from '../../utils/audioFx';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';

interface VideoVaultProps {
  onReturnToPaddock: () => void;
  onNavigateToGallery?: () => void;
}

export const VideoVault: React.FC<VideoVaultProps> = ({
  onReturnToPaddock,
  onNavigateToGallery,
}) => {
  const { isClueDiscovered, discoverClue } = useTreasureHunt();
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);

  const allVideos = useMemo(() => getAllVaultVideos(), []);
  const featuredVideo = useMemo(() => getFeaturedVideo(), []);

  const handleOpenVideo = (video: VideoEntry) => {
    soundFx.playUiClick();
    setActiveVideo(video);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Container */}
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
            {onNavigateToGallery && (
              <button
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigateToGallery();
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gold-500/30 bg-gold-950/20 text-gold-400 hover:border-gold-500/60 hover:text-white transition-all text-xs sm:text-sm font-mono tracking-wider cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>PHOTO ARCHIVE</span>
              </button>
            )}

            {/* Secret Clue 8 Reel Trigger */}
            <button
              onClick={() => discoverClue('clue-8-thiru')}
              title="Decode Classified Transmission Frequency"
              className={`font-mono text-xs sm:text-sm px-3 py-1.5 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-8-thiru')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-red-400/90 bg-black/40 border border-red-500/30 hover:border-red-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-8-thiru') ? "TRANSMISSION [N] DECODED ✓" : "CLASSIFIED TRANSMISSION 🔍"}
            </button>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="py-8 sm:py-14 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-mono uppercase tracking-widest mb-4">
            <Film className="w-4 h-4" />
            <span>VOLUME III • CINEMATIC REEL</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            THE VIDEO <span className="gold-text-gradient">VAULT</span>
          </h1>

          <p className="mt-3 font-mono text-sm sm:text-base tracking-[0.25em] text-red-500 font-bold uppercase">
            TRANSMISSIONS FROM THE SQUAD.
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A private cinema screening room containing video tributes, motorsport soundbites,
            heartfelt messages, and unfiltered meme archives from all 9 friends.
          </p>

          {/* Quick Telemetry Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-xl bg-obsidian-900/60 border border-white/[0.08] text-xs sm:text-sm font-mono text-gray-300">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-gold-400" />
              <span className="text-white font-bold">{allVideos.length}</span> Transmissions
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold">Automatic Video Frame Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">Local MP4 / WebM</span> Hosting
            </div>
          </div>
        </div>

        {/* Large Featured Video Showcase */}
        {featuredVideo && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gold-500/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold-300">
                  FEATURED SQUAD SCREENING
                </span>
              </div>
              <span className="font-mono text-[10px] text-gray-400 uppercase">
                PREMIERE EDITION
              </span>
            </div>

            <div
              onClick={() => handleOpenVideo(featuredVideo)}
              className="group relative cursor-pointer rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-[#1c1815] via-[#0d0c0a] to-[#080706] p-5 sm:p-10 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:border-gold-400 transition-all duration-300"
            >
              {/* Corner Gold Accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
                {/* Left: Video Preview from video source itself */}
                <div className="lg:col-span-7 relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-gold-500/50 transition-colors flex items-center justify-center shadow-2xl">
                  {featuredVideo.videoUrl && (
                    <video
                      src={
                        featuredVideo.videoUrl.includes('#')
                          ? featuredVideo.videoUrl
                          : `${featuredVideo.videoUrl}#t=0.1`
                      }
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                  )}

                  {/* Overlay Center Play Button */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold-400 bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 ml-1" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 font-mono text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gold-400" />
                    <span>{featuredVideo.duration || '04:18'}</span>
                  </div>
                </div>

                {/* Right: Featured Video Details */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs tracking-widest text-red-500 font-bold uppercase px-2.5 py-1 rounded bg-red-950/40 border border-red-500/40">
                      OFFICIAL TRIBUTE
                    </span>
                    <span className="font-mono text-xs text-gold-400 uppercase">
                      SCUDERIA COMMEMORATION
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                    {featuredVideo.title}
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                    {featuredVideo.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center gap-4 text-xs sm:text-sm font-mono text-gray-400">
                    <span className="flex items-center gap-1.5 text-gold-400">
                      <User className="w-4 h-4" />
                      {featuredVideo.contributor || 'The 9 Friends'}
                    </span>
                    <span>{featuredVideo.resolution || '4K Cinema'}</span>
                  </div>

                  <div className="mt-6">
                    <GoldButton
                      variant="gold-solid"
                      size="lg"
                      onClick={() => handleOpenVideo(featuredVideo)}
                      icon={<Play className="w-4 h-4 ml-0.5" />}
                    >
                      COMMENCE SCREENING
                    </GoldButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Cards Grid - all transmissions without category filter clutter */}
        {allVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleOpenVideo(video)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="my-16 p-8 sm:p-12 rounded-xl bg-obsidian-900/40 border border-red-500/20 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full border border-red-500/30 bg-red-950/20 flex items-center justify-center text-red-400 mx-auto mb-4">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              No Transmissions Found
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              Place MP4 files into /public/media/videos/ to expand the archive.
            </p>
          </div>
        )}

        {/* Cinema Screening Room Modal */}
        {activeVideo && (
          <CinemaModal
            video={activeVideo}
            isOpen={!!activeVideo}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};
