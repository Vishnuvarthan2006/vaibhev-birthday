import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Heart,
  RotateCcw,
  Compass,
  Volume2,
  VolumeX,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';

interface GrandFinalVaultProps {
  onReturnToPaddock: () => void;
  onReplayLaunch: () => void;
}

const SPARKS = Array.from({ length: 24 });

export const GrandFinalVault: React.FC<GrandFinalVaultProps> = ({
  onReturnToPaddock,
  onReplayLaunch,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
  };

  return (
    <div className="relative min-h-[85vh] w-full max-w-4xl mx-auto px-4 py-8 select-none animate-fadeIn">
      {/* Celebration Confetti Sparkles (pure CSS animation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {SPARKS.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold-400 opacity-60 animate-ping"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              animationDelay: `${(i * 200) % 2400}ms`,
              animationDuration: `${1200 + ((i * 300) % 1800)}ms`,
            }}
          />
        ))}
      </div>

      {/* Main Vault Panel */}
      <div className="relative z-10 rounded-2xl border-2 border-gold-400 bg-gradient-to-b from-[#1c1815] via-[#0d0c0a] to-[#070605] p-6 sm:p-10 shadow-[0_0_100px_rgba(212,175,55,0.3)]">
        {/* Top Gold Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-400" />

        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-gold-500/30 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-red-500 font-bold px-2.5 py-1 rounded bg-red-950/40 border border-red-500/40">
              MISSION STATUS: DECRYPTED
            </span>
            <span className="font-mono text-xs text-gold-400">CIPHER: [VAIBHEV44]</span>
          </div>

          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-full border border-gold-500/40 text-gold-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Center Trophy Icon & Big Title */}
        <div className="text-center my-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold-400 bg-gradient-to-br from-gold-500/30 to-amber-600/30 flex items-center justify-center text-gold-300 mx-auto mb-4 shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-bounce">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-red-500 font-bold uppercase block mb-1">
            SCUDERIA SYNDICATE • GRAND PRIX OF LIFE
          </span>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            HAPPY BIRTHDAY, <span className="gold-text-gradient">{RECIPIENT_PROFILE.name}</span>!
          </h1>

          <p className="mt-3 font-mono text-xs sm:text-sm text-gold-300 tracking-widest uppercase">
            "9 BROTHERS. ONE LEGEND. ONE UNSTOPPABLE FORCE."
          </p>
        </div>

        {/* Group Photo Space / Tribute Canvas */}
        <div className="my-8 rounded-xl border border-gold-500/40 bg-black/80 overflow-hidden relative shadow-2xl">
          <div className="w-full aspect-[16/9] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1a1510] to-[#0a0806]">
            <div className="w-16 h-16 rounded-full border border-gold-400/40 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-3 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
              THE 9-SQUAD SYNDICATE COMMEMORATION
            </h3>
            <p className="font-mono text-xs text-gold-300 mt-2 max-w-md">
              Aarav • Kabir • Rohan • Siddharth • Arjun • Vikram • Dev • Aditya • Nakul
            </p>
            <div className="mt-4 px-3 py-1 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-gray-400">
              Target Photo Slot: /public/media/gallery/squad-collective.jpg
            </div>
          </div>
        </div>

        {/* Collective Letter from all 9 Friends */}
        <div className="my-8 p-6 sm:p-8 rounded-xl bg-obsidian-900/90 border border-gold-500/30 text-left space-y-4">
          <div className="flex items-center gap-2 text-gold-400 border-b border-white/[0.08] pb-3">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              THE COLLECTIVE BROTHERHOOD DISPATCH
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
            Vaibhev, if this website proves anything, it's that you mean the world to all nine of
            us. Through all the late-night F1 strategy debates, the spontaneous midnight road
            trips, the Minecraft grind, and the unhinged 3:00 AM Discord calls, you’ve been the
            glue, the driver, and the brother we all look up to.
          </p>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
            Like Lewis Hamilton taking on Monza with relentless grit, you tackle every challenge in
            life with pure passion and unapologetic charisma. We couldn’t be prouder to share this
            journey with you.
          </p>

          <p className="text-sm sm:text-base text-gold-300 font-serif italic pt-2">
            "Here’s to another lap around the sun, another pole position, and a lifetime of
            victories ahead. Happy Birthday, Champ!"
          </p>

          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs text-gray-300 font-bold">
                Signed by All 9 Brothers
              </span>
            </div>
            <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">
              FORZA VAIBHEV #44
            </span>
          </div>
        </div>

        {/* Commemorative Certificate Pill */}
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-400/40 text-center my-6">
          <div className="inline-flex items-center gap-2 text-gold-300 font-mono text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-gold-400" />
            OFFICIAL CERTIFICATE OF COMPLETION
          </div>
          <p className="font-mono text-xs text-white">
            HONORARY SCUDERIA MARANELLO LIFETIME BROTHERHOOD AWARD
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-4">
          <GoldButton
            variant="gold-solid"
            size="md"
            onClick={() => {
              soundFx.playUiClick();
              onReturnToPaddock();
            }}
            icon={<Compass className="w-4 h-4" />}
          >
            RETURN TO PADDOCK
          </GoldButton>

          <GoldButton
            variant="carbon"
            size="md"
            onClick={() => {
              soundFx.playUiClick();
              onReplayLaunch();
            }}
            icon={<RotateCcw className="w-4 h-4 text-gold-400" />}
          >
            REPLAY LIGHTS OUT LAUNCH
          </GoldButton>
        </div>
      </div>
    </div>
  );
};
