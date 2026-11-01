import React, { useState } from 'react';
import { ArrowRight, FastForward, Flag, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { F1GantryLights } from './F1GantryLights';
import { GoldButton } from '../common/GoldButton';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';
import { soundFx } from '../../utils/audioFx';

interface CinematicLandingProps {
  onEnterPaddock: () => void;
}

export const CinematicLanding: React.FC<CinematicLandingProps> = ({ onEnterPaddock }) => {
  const [isLightsOut, setIsLightsOut] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const handleLightsOut = () => {
    setIsLightsOut(true);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    setIsLightsOut(true);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playUiClick();
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-6 py-6 overflow-hidden">
      {/* Ferrari Light Streak Graphic */}
      <div className="ferrari-light-streak top-1/4 left-0 w-full" />
      <div
        className="ferrari-light-streak bottom-1/3 left-0 w-full"
        style={{ animationDelay: '4s' }}
      />

      {/* Top Telemetry Header Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <LuxuryBadge
            variant="ferrari"
            size="sm"
            icon={<Flag className="w-3 h-3 text-ferrari-400" />}
          >
            CIRCUIT DE MARANELLO • #44
          </LuxuryBadge>
          <span className="hidden sm:inline-block text-[11px] font-mono text-gray-400">
            LAT: 45°17'N • LON: 10°52'E
          </span>
        </div>

        {/* Audio Toggle & Skip CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute race audio' : 'Mute race audio'}
            className="p-2 rounded border border-white/10 bg-obsidian-900/80 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>

          {!isLightsOut && (
            <button
              onClick={handleSkip}
              className="px-3 py-1.5 rounded border border-white/10 bg-obsidian-900/80 text-xs font-mono text-gray-300 hover:text-white hover:border-white/30 flex items-center gap-1.5 transition-all"
            >
              <FastForward className="w-3.5 h-3.5 text-gold-400" />
              <span>SKIP TO PADDOCK</span>
            </button>
          )}
        </div>
      </div>

      {/* Central Hero Experience */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 my-auto py-8">
        {/* F1 Gantry Starting Lights */}
        <F1GantryLights onLightsOut={handleLightsOut} isSkipped={isSkipped} />

        {/* Post-Lights Out Cinematic Birthday Reveal */}
        <div
          className={`transition-all duration-1000 transform ${
            isLightsOut
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-40 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          {/* Eyebrow Flag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ferrari-500/15 border border-ferrari-500/40 text-red-400 font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(239,26,45,0.2)]">
            <span className="w-2 h-2 rounded-full bg-ferrari-500 animate-ping" />
            LIGHTS OUT &amp; AWAY WE GO
          </div>

          {/* Main Hero Typography */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] mb-4">
            <span className="block text-2xl sm:text-3xl md:text-4xl text-gray-400 font-bold tracking-widest mb-1">
              LIGHTS OUT.
            </span>
            <span className="gold-text-gradient gold-shimmer block">
              IT'S YOUR DAY,
            </span>
            <span className="text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]">
              {RECIPIENT_PROFILE.name}.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-sm md:text-base text-gold-300/90 tracking-wider max-w-2xl mx-auto uppercase font-medium mb-8">
            9 FRIENDS. ONE LEGEND. ONE UNFORGETTABLE EXPERIENCE.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton
              variant="gold-solid"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                soundFx.playUiClick();
                onEnterPaddock();
              }}
              className="w-full sm:w-auto px-8 py-4 text-sm tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              ENTER THE PADDOCK
            </GoldButton>

            <GoldButton
              variant="carbon"
              size="lg"
              icon={<Sparkles className="w-4 h-4 text-gold-400" />}
              onClick={() => {
                soundFx.playUiClick();
                onEnterPaddock();
              }}
              className="w-full sm:w-auto px-6 py-4 text-xs tracking-wider"
            >
              EXPLORE ARCHIVES
            </GoldButton>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="w-full max-w-5xl mx-auto z-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">SECTOR 1:</span>
          <span className="text-purple-400 font-bold">24.444s (PURPLE)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">TYRE COMPOUND:</span>
          <span className="text-red-400 font-bold">C5 SOFT [RED]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">DRIVER:</span>
          <span className="text-white font-bold">L. HAMILTON #44 / VAIBHEV</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">PADDOCK STATUS:</span>
          <span className="text-emerald-400 font-bold">GREEN FLAG</span>
        </div>
      </div>
    </div>
  );
};
