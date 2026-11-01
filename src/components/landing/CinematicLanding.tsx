import React, { useState } from 'react';
import { FastForward, Flag, Volume2, VolumeX } from 'lucide-react';
import { F1GantryLights } from './F1GantryLights';
import { BirthdayCelebrationReveal } from './BirthdayCelebrationReveal';
import { LuxuryBadge } from '../common/LuxuryBadge';
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
    onEnterPaddock();
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playUiClick();
    }
  };

  // Scene 2, 3, & 4: Spectacular Birthday Celebration Reveal immediately after lights out
  if (isLightsOut) {
    return (
      <BirthdayCelebrationReveal
        onEnterPaddock={onEnterPaddock}
        isMuted={isMuted}
        onToggleSound={toggleSound}
      />
    );
  }

  // Scene 1: F1 Starting Lights Sequence
  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-6 py-6 overflow-hidden select-none animate-fadeIn">
      {/* Ferrari Light Streak Graphic */}
      <div className="ferrari-light-streak top-1/4 left-0 w-full" />
      <div
        className="ferrari-light-streak bottom-1/3 left-0 w-full"
        style={{ animationDelay: '4s' }}
      />

      {/* Top Telemetry Header Bar */}
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <LuxuryBadge
            variant="ferrari"
            size="sm"
            icon={<Flag className="w-3.5 h-3.5 text-ferrari-400" />}
          >
            CIRCUIT DE MARANELLO • SCUDERIA
          </LuxuryBadge>
          <span className="hidden sm:inline-block text-xs font-mono text-gray-400">
            LAT: 45°17'N • LON: 10°52'E
          </span>
        </div>

        {/* Audio Toggle & Skip CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute race audio' : 'Mute race audio'}
            className="p-2.5 rounded-lg border border-white/10 bg-obsidian-900/80 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>

          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg border border-white/10 bg-obsidian-900/80 text-xs sm:text-sm font-mono text-gray-300 hover:text-white hover:border-white/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <FastForward className="w-4 h-4 text-gold-400" />
            <span>SKIP TO PADDOCK</span>
          </button>
        </div>
      </div>

      {/* Central Hero Experience: Scene 1 F1 Starting Gantry */}
      <div className="w-full max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col items-center text-center z-10 my-auto py-8">
        <F1GantryLights onLightsOut={handleLightsOut} isSkipped={isSkipped} />

        <div className="mt-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 font-mono text-xs sm:text-sm uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            START PROCEDURE ARMED • FORMATION LAP COMPLETE
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white uppercase tracking-wider">
            WATCH THE FIVE STARTING LIGHTS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-wider uppercase max-w-lg mx-auto">
            All five red lights illuminate sequentially. Stand by for the green flag release.
          </p>
        </div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto z-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">SECTOR 1:</span>
          <span className="text-purple-400 font-bold">24.180s (PURPLE)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">TYRE COMPOUND:</span>
          <span className="text-red-400 font-bold">C5 SOFT [RED]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">DRIVER:</span>
          <span className="text-white font-bold">SCUDERIA MARANELLO / VAIBHEV</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">PADDOCK STATUS:</span>
          <span className="text-emerald-400 font-bold">GREEN FLAG</span>
        </div>
      </div>
    </div>
  );
};
