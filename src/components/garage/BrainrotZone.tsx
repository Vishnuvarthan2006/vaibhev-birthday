import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, CheckCircle2, RotateCcw, Flame } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';

interface BrainrotZoneProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

const MEMES = ['🥁', '🏎️', '🕸️', '💀', '🔥', '🧢', '✨', '🕺'];

export const BrainrotZone: React.FC<BrainrotZoneProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [tungCount, setTungCount] = useState<number>(0);
  const [isHyperMode, setIsHyperMode] = useState<boolean>(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
  };

  const handleTungClick = useCallback(() => {
    soundFx.playTungBeat(1.0 + (tungCount % 3) * 0.2);

    const next = tungCount + 1;
    setTungCount(next);
    setActiveSpeech('TUNG TUNG TUNG SAHUR! 🥁');

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      setTungCount(0);
    }, 2500);

    // Tapping 3 times triggers Hyper-Brainrot Party & unlocks Clue 4
    if (next === 3) {
      setIsHyperMode(true);
      setActiveSpeech('TALUKU BULUKU! 100% BRAINROT ENGAGED! 🔥');

      if (onClueUnlocked) {
        onClueUnlocked();
      }

      setTimeout(() => {
        setIsHyperMode(false);
      }, 3500);
    }
  }, [tungCount, onClueUnlocked]);

  const playCustomEffect = (speechText: string, soundType: string) => {
    setActiveSpeech(speechText);
    switch (soundType) {
      case 'tung':
        soundFx.playTungBeat(1.2);
        break;
      case 'spider':
        soundFx.playSpiderSenseTingle();
        break;
      case 'f1':
        soundFx.playLightsOutChime();
        break;
      case 'ding':
        soundFx.playDiamondFound();
        break;
      default:
        soundFx.playUiClick();
    }
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-6 sm:p-8 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Floating Meme Emoji Particles during HyperMode */}
      {isHyperMode && (
        <div className="absolute inset-0 pointer-events-none z-30 flex flex-wrap justify-around items-center opacity-80 animate-pulse">
          {MEMES.map((emoji, idx) => (
            <span
              key={idx}
              className="text-4xl animate-bounce"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              THE CHAOS THEORY
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              BRAINROT SOUNDBOARD &amp; RHYTHM CHALLENGE • TAP TUNG 3 TIMES TO UNLOCK CLUE 4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {isClueDiscovered ? (
            <span className="font-mono text-[11px] text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> CLUE 4 [A] DECODED
            </span>
          ) : (
            <span className="font-mono text-[11px] text-gold-400 px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/30">
              CLUE 4 REWARD [A]
            </span>
          )}
        </div>
      </div>

      {/* Primary Meme Button: Tung Tung Tung Sahur */}
      <div className="my-6 text-center">
        <button
          onClick={handleTungClick}
          className={`w-full py-8 sm:py-10 px-4 rounded-xl border-2 font-display text-xl sm:text-2xl font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
            isHyperMode
              ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 border-white text-black shadow-[0_0_50px_rgba(251,191,36,0.8)] animate-pulse'
              : 'bg-gradient-to-r from-[#241c14] to-[#14100c] border-gold-500/50 text-gold-300 hover:border-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]'
          }`}
        >
          <span>🥁 TUNG TUNG TUNG SAHUR 🥁</span>
          <span className="block font-mono text-xs font-normal text-gold-400/80 mt-1">
            Tap count: {tungCount}/3 for Taluku Buluku mode
          </span>
        </button>
      </div>

      {/* Soundboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <button
          onClick={() => playCustomEffect('TALUKU BULUKU! 🔥', 'tung')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">🗣️ Taluku Buluku</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-gold-400">
            3:00 AM Call
          </span>
        </button>

        <button
          onClick={() => playCustomEffect('MARANELLO V12 AT 15,000 RPM! 🏎️', 'f1')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-red-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">🏎️ V12 Redline</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-red-400">
            Scuderia Maranello
          </span>
        </button>

        <button
          onClick={() => playCustomEffect('THWIP! SPIDER-SENSE TINGLE! 🕸️', 'spider')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-red-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">🕸️ Web Thwip</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-red-400">
            Multiverse Shenanigans
          </span>
        </button>

        <button
          onClick={() => playCustomEffect('WHAT DA DOG DOIN? 🐕', 'ding')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">🐕 What Da Dog Doin</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-gold-400">
            Unfiltered Vines
          </span>
        </button>

        <button
          onClick={() => playCustomEffect('ANCIENT DEBRIS ACQUIRED! ⛏️', 'ding')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">⛏️ Netherite Ding</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-gold-400">
            Minecraft Flex
          </span>
        </button>

        <button
          onClick={() => playCustomEffect('EMOTIONAL DAMAGE! 💀', 'tung')}
          className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-red-500/40 text-left transition-colors cursor-pointer group"
        >
          <span className="text-sm block">💀 Emotional Damage</span>
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-red-400">
            Squad Roast
          </span>
        </button>
      </div>

      {/* Active Speech Box */}
      {activeSpeech && (
        <div className="mt-4 p-3 rounded-lg bg-black/60 border border-gold-500/30 text-center font-mono text-xs text-gold-300 animate-fadeIn">
          {activeSpeech}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="flex items-center gap-1.5 text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          Certified 100% Genuine Syndicate Brainrot
        </span>
        <button
          onClick={() => setTungCount(0)}
          className="text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset Beat
        </button>
      </div>
    </div>
  );
};
