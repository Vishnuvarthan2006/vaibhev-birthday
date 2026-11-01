import React, { useState, useMemo } from 'react';
import {
  Compass,
  Image as ImageIcon,
  Play,
  Film,
  Sparkles,
  Layers,
  ArrowLeft,
  Filter,
  User,
  Clock,
  Tv,
} from 'lucide-react';
import {
  getAllVaultVideos,
  getFeaturedVideo,
  getVideoCategories,
} from '../../data/videoData';
import type { VideoCategory, VideoEntry } from '../../types/video';
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
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);

  const categories = useMemo(() => getVideoCategories(), []);
  const allVideos = useMemo(() => getAllVaultVideos(), []);
  const featuredVideo = useMemo(() => getFeaturedVideo(), []);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'all') return allVideos;
    return allVideos.filter((v) => v.category === selectedCategory);
  }, [allVideos, selectedCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allVideos.length };
    allVideos.forEach((video) => {
      if (video.category) {
        counts[video.category] = (counts[video.category] || 0) + 1;
      }
    });
    return counts;
  }, [allVideos]);

  const handleOpenVideo = (video: VideoEntry) => {
    soundFx.playUiClick();
    setActiveVideo(video);
  };

  const handleCloseModal = () => {
    setActiveVideo(null);
  };

  const handleCategorySelect = (catId: VideoCategory) => {
    soundFx.playUiClick();
    setSelectedCategory(catId);
  };

  return (
    <div className="relative min-h-screen w-full pb-20 select-none">
      {/* Container */}
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
            {onNavigateToGallery && (
              <button
                onClick={() => {
                  soundFx.playUiClick();
                  onNavigateToGallery();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-950/20 text-gold-400 hover:border-gold-500/60 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>PHOTO ARCHIVE</span>
              </button>
            )}

            {/* Secret Clue 7 Trigger */}
            <button
              onClick={() => discoverClue('clue-7-vault')}
              title="Decode Classified Frequency Indicator"
              className={`font-mono text-xs px-2.5 py-1 rounded transition-all cursor-pointer ${
                isClueDiscovered('clue-7-vault')
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold'
                  : 'text-red-400/90 bg-black/40 border border-red-500/30 hover:border-red-400 hover:text-white animate-pulse'
              }`}
            >
              {isClueDiscovered('clue-7-vault') ? 'REEL [V] DECODED ✓' : 'CLASSIFIED TRANSMISSIONS 🔍'}
            </button>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="py-8 sm:py-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>VOLUME III • CINEMATIC REEL</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            THE VIDEO <span className="gold-text-gradient">VAULT</span>
          </h1>

          <p className="mt-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-red-500 font-bold uppercase">
            TRANSMISSIONS FROM THE SQUAD.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
            A private cinema screening room containing video tributes, motorsport soundbites,
            heartfelt messages, and unfiltered 3:00 AM meme archives from all 9 friends.
          </p>

          {/* Quick Telemetry Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 rounded-lg bg-obsidian-900/60 border border-white/[0.06] text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-white font-bold">{allVideos.length}</span> Transmissions
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span className="text-white font-bold">{categories.length - 1}</span> Channels
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-400 font-bold">Local MP4 / WebM</span> Hosting
            </div>
          </div>
        </div>

        {/* Large Featured Video Showcase */}
        {featuredVideo && selectedCategory === 'all' && (
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
              className="group relative cursor-pointer rounded-xl border-2 border-gold-500/40 bg-gradient-to-br from-[#1c1815] via-[#0d0c0a] to-[#080706] p-4 sm:p-8 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:border-gold-400 transition-all duration-300"
            >
              {/* Corner Gold Accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold-400" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold-400" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold-400" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left: Video Preview Poster / Slate */}
                <div className="lg:col-span-7 relative aspect-video rounded-lg overflow-hidden bg-black border border-white/10 group-hover:border-gold-500/50 transition-colors flex items-center justify-center shadow-2xl">
                  {featuredVideo.posterUrl ? (
                    <img
                      src={featuredVideo.posterUrl}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Overlay Center Play Button */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold-400 bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-white/20 font-mono text-xs text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{featuredVideo.duration || '04:18'}</span>
                  </div>
                </div>

                {/* Right: Featured Video Details */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-red-500 font-bold uppercase px-2 py-0.5 rounded bg-red-950/40 border border-red-500/40">
                      OFFICIAL TRIBUTE
                    </span>
                    <span className="font-mono text-[10px] text-gold-400 uppercase">
                      #44 COMMEMORATION
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                    {featuredVideo.title}
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {featuredVideo.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1.5 text-gold-400">
                      <User className="w-3.5 h-3.5" />
                      {featuredVideo.contributor || 'The 9 Friends'}
                    </span>
                    <span>{featuredVideo.resolution || '4K Cinema'}</span>
                  </div>

                  <div className="mt-6">
                    <GoldButton
                      variant="gold-solid"
                      size="md"
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

        {/* Video Category Filter Tabs */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 pb-2">
            <Filter className="w-3.5 h-3.5 text-gold-400/80" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
              Filter Transmissions:
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
                      ? 'bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
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

        {/* Video Cards Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
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
              No videos currently listed in this category. Place MP4 files into /public/media/videos/ to expand the archive.
            </p>
            <div className="mt-6">
              <GoldButton
                variant="gold-outline"
                size="sm"
                onClick={() => handleCategorySelect('all')}
              >
                VIEW ALL TRANSMISSIONS
              </GoldButton>
            </div>
          </div>
        )}

        {/* Bottom Paddock Quick Return */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs text-red-500 block">
              VAIBHEV'S BIRTHDAY GRAND PRIX • 2026
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              Classified transmissions curated by the 9-Squad Syndicate.
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

      {/* Dedicated Cinema Screening Modal */}
      {activeVideo && (
        <CinemaModal
          video={activeVideo}
          isOpen={activeVideo !== null}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
