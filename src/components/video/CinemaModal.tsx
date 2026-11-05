import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Film,
  Calendar,
  User,
  Tag,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import type { VideoEntry } from '../../types/video';
import { soundFx } from '../../utils/audioFx';

interface CinemaModalProps {
  video: VideoEntry;
  isOpen: boolean;
  onClose: () => void;
}

export const CinemaModal: React.FC<CinemaModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [prevVideoId, setPrevVideoId] = useState<string>(video.id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Fallback simulated timer if source video file is missing
  const [simulatedTime, setSimulatedTime] = useState<number>(0);
  const simulatedTimerRef = useRef<number | null>(null);

  // Reset state declaratively during render if video prop changes
  if (prevVideoId !== video.id) {
    setPrevVideoId(video.id);
    setIsPlaying(false);
    setCurrentTime(0);
    setSimulatedTime(0);
    setVideoError(false);
  }

  // Format seconds to mm:ss
  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    soundFx.playUiClick();
    if (videoError) {
      // Toggle simulated playback
      setIsPlaying((prev) => !prev);
      return;
    }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocked unmuted autoplay or file failed, fallback
          setVideoError(true);
          setIsPlaying(true);
        });
    }
  }, [isPlaying, videoError]);

  // Handle Simulated playback timer when video file is missing
  useEffect(() => {
    if (videoError && isPlaying) {
      simulatedTimerRef.current = window.setInterval(() => {
        setSimulatedTime((t) => (t >= 180 ? 0 : t + 1));
      }, 1000);
    } else {
      if (simulatedTimerRef.current) clearInterval(simulatedTimerRef.current);
    }
    return () => {
      if (simulatedTimerRef.current) clearInterval(simulatedTimerRef.current);
    };
  }, [videoError, isPlaying]);

  // Video element event listeners
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Scrubber seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoError) {
      setSimulatedTime(targetTime);
      return;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      if (videoRef.current) videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = val;
      }
    }
  };

  const toggleMute = useCallback(() => {
    soundFx.playUiClick();
    if (isMuted) {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume > 0 ? volume : 0.5;
      }
    } else {
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    }
  }, [isMuted, volume]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playUiClick();
        onClose();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration || 9999,
            videoRef.current.currentTime + 5
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay, toggleMute, toggleFullscreen, onClose]);

  // Auto-hide controls on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  if (!isOpen) return null;

  const activeDuration = videoError ? 180 : duration || 0;
  const activeCurrentTime = videoError ? simulatedTime : currentTime;
  const progressPercent = activeDuration > 0 ? (activeCurrentTime / activeDuration) * 100 : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cinema Screening Room"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 select-none animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playUiClick();
          onClose();
        }
      }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-5xl 2xl:max-w-6xl rounded-2xl bg-obsidian-950 border border-gold-500/30 shadow-[0_0_80px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden max-h-[95vh]"
      >
        {/* Cinema Film Strip Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/[0.08] bg-obsidian-900/90 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playUiClick();
                onClose();
              }}
              title="Back to Video Vault"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:text-white transition-all text-xs font-mono font-bold tracking-wider cursor-pointer mr-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span className="font-mono text-xs sm:text-sm text-gold-400 font-bold uppercase tracking-widest hidden sm:inline">
              CINEMA SCREENING ROOM • MARANELLO TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-xs text-gray-400 border border-white/10 px-2.5 py-1 rounded">
              {video.resolution || 'HD 1080p'}
            </span>
            <button
              onClick={() => {
                soundFx.playUiClick();
                onClose();
              }}
              title="Close Screening (Esc)"
              className="p-2 rounded-full border border-gold-500/40 text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {!videoError ? (
            <video
              key={video.id}
              ref={videoRef}
              src={video.videoUrl}
              poster={video.posterUrl}
              preload="metadata"
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              onError={() => setVideoError(true)}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />
          ) : (
            /* Cinema Test Slate / Fallback when local MP4 file is awaiting upload */
            <div
              onClick={togglePlay}
              className="w-full h-full relative cursor-pointer flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-br from-[#1c1815] via-[#0d0c0a] to-[#080706] text-center select-none overflow-hidden"
            >
              {/* Telemetry Grid & Corner Marks */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_70%)]" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400/70" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400/70" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400/70" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400/70" />

              {/* Slate Header */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-gray-400 z-10">
                <span className="text-red-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  SLOT CONFIGURED • AWAITING MP4
                </span>
                <span className="text-gold-400">{video.duration || '03:30'}</span>
              </div>

              {/* Slate Center Details */}
              <div className="flex flex-col items-center my-auto z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold-500/60 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-4 shadow-[0_0_30px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 sm:w-9 sm:h-9" />
                  ) : (
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1" />
                  )}
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight max-w-lg">
                  {video.title}
                </h2>

                <p className="font-mono text-xs text-gold-300 mt-2 max-w-md">
                  {video.description || 'Squad video transmission channel'}
                </p>

                <div className="mt-4 px-3.5 py-1.5 rounded bg-black/80 border border-white/10 font-mono text-[11px] text-gray-300 flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-gold-400" />
                  <span>Target: {video.videoUrl}</span>
                </div>

                {isPlaying && (
                  <div className="mt-3 font-mono text-[11px] text-emerald-400 tracking-wider animate-pulse flex items-center gap-1.5">
                    <span>PLAYBACK SIMULATION ACTIVE • {formatTime(simulatedTime)}</span>
                  </div>
                )}
              </div>

              {/* Slate Footer */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-400 z-10">
                <span>SCUDERIA MEDIA VAULT</span>
                <span className="text-gold-400/80">PRESS SPACEBAR OR CLICK TO TEST</span>
              </div>
            </div>
          )}

          {/* Big Center Play Button Overlay (when paused) */}
          {!isPlaying && !videoError && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity z-10"
            >
              <div className="w-20 h-20 rounded-full border-2 border-gold-400 bg-black/75 text-gold-300 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform">
                <Play className="w-9 h-9 ml-1 text-gold-400" />
              </div>
            </div>
          )}

          {/* Custom In-Player Controls Overlay (fade in on hover/interaction) */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-5 transition-opacity duration-300 z-20 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Progress Bar */}
            <div className="relative mb-3 flex items-center group/scrubber cursor-pointer">
              <input
                type="range"
                min="0"
                max={activeDuration || 100}
                step="0.1"
                value={activeCurrentTime}
                onChange={handleSeek}
                aria-label="Seek progress"
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-400 focus:outline-hidden"
              />
              <div
                className="absolute left-0 top-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-gold-400 rounded-lg pointer-events-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-3 text-white">
              {/* Left: Play/Pause, Rewind, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-2 rounded-full hover:bg-white/10 text-gold-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      setCurrentTime(0);
                    } else {
                      setSimulatedTime(0);
                    }
                  }}
                  title="Restart video"
                  aria-label="Restart video"
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Current Time / Duration */}
                <div className="font-mono text-xs text-gray-300 tracking-wider">
                  <span className="text-white font-bold">{formatTime(activeCurrentTime)}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span>{formatTime(activeDuration)}</span>
                </div>
              </div>

              {/* Right: Volume, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Volume Slider & Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1.5 text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-red-400" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="w-14 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-400 hidden sm:block"
                  />
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen (F)"
                  aria-label="Toggle Fullscreen"
                  className="p-1.5 text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Story & Metadata Panel */}
        <div className="p-5 sm:p-7 bg-obsidian-950 border-t border-white/[0.08] overflow-y-auto max-h-[30vh]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                  {video.category || 'Tribute'}
                </span>
                {video.featured && (
                  <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    Featured Screening
                  </span>
                )}
              </div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                {video.title}
              </h2>
              {video.description && (
                <p className="text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">
                  {video.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap sm:flex-col gap-2.5 font-mono text-xs sm:text-sm text-gray-400 shrink-0">
              {video.contributor && (
                <span className="flex items-center gap-2 text-gold-400/90">
                  <User className="w-4 h-4 text-gold-400" />
                  {video.contributor}
                </span>
              )}
              {video.dateAdded && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {video.dateAdded}
                </span>
              )}
              <span className="flex items-center gap-2 text-gray-400">
                <Tag className="w-4 h-4" />
                Local File: {video.videoUrl}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
