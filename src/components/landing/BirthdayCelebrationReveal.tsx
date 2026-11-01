import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Sparkles, Volume2, VolumeX, Flag } from 'lucide-react';
import { GoldButton } from '../common/GoldButton';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { soundFx } from '../../utils/audioFx';

interface BirthdayCelebrationRevealProps {
  onEnterPaddock: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  sparkle: boolean;
}

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  alpha: number;
}

const GOLD_PALETTE = ['#d4af37', '#ffd700', '#f59e0b', '#fef08a', '#ffffff'];
const FERRARI_PALETTE = ['#ef1a2d', '#dc2626', '#b91c1c', '#f87171'];

export const BirthdayCelebrationReveal: React.FC<BirthdayCelebrationRevealProps> = ({
  onEnterPaddock,
  isMuted,
  onToggleSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene3Visible, setScene3Visible] = useState<boolean>(false);
  const [scene4Visible, setScene4Visible] = useState<boolean>(false);

  // Play celebration fanfare on mount
  useEffect(() => {
    soundFx.playCelebrationFanfare();

    // Scene 3 entrance delay (second message)
    const tScene3 = window.setTimeout(() => {
      setScene3Visible(true);
    }, 1100);

    // Scene 4 entrance delay (Enter button highlight)
    const tScene4 = window.setTimeout(() => {
      setScene4Visible(true);
    }, 1800);

    return () => {
      clearTimeout(tScene3);
      clearTimeout(tScene4);
    };
  }, []);

  // Canvas fireworks and confetti simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fireworkParticles: FireworkParticle[] = [];
    const confettiPieces: ConfettiPiece[] = [];

    // Initialize initial confetti shower
    const confettiCount = prefersReducedMotion ? 25 : 85;
    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        w: 6 + Math.random() * 8,
        h: 10 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        color:
          Math.random() > 0.35
            ? GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)]
            : FERRARI_PALETTE[Math.floor(Math.random() * FERRARI_PALETTE.length)],
        alpha: 0.8 + Math.random() * 0.2,
      });
    }

    const spawnFirework = (
      x: number,
      y: number,
      pattern: 'sphere' | 'willow' | 'ring' | 'strobe' = 'sphere',
      colorType: 'gold' | 'ferrari' | 'champagne' = 'gold'
    ) => {
      if (prefersReducedMotion) return;

      let palette: string[];
      if (colorType === 'ferrari') {
        palette = FERRARI_PALETTE;
      } else if (colorType === 'champagne') {
        palette = ['#ffffff', '#fdfbf7', '#ffd700', '#fef08a'];
      } else {
        palette = GOLD_PALETTE;
      }

      const count = pattern === 'willow' ? 55 + Math.floor(Math.random() * 40) : 40 + Math.floor(Math.random() * 35);
      soundFx.playFireworkBurst();

      for (let i = 0; i < count; i++) {
        let angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        let speed: number;
        let decay: number;
        let sparkle = Math.random() > 0.4;
        let size = 2 + Math.random() * 2.5;

        if (pattern === 'ring') {
          // Double concentric ring
          const ringRadius = i % 2 === 0 ? 5.5 : 3.2;
          speed = ringRadius + (Math.random() - 0.5) * 0.8;
          decay = 0.014 + Math.random() * 0.012;
        } else if (pattern === 'willow') {
          // Cascading long trails
          speed = 2.0 + Math.random() * 4.0;
          decay = 0.008 + Math.random() * 0.01; // slower decay for weeping willow effect
          sparkle = true;
          size = 2.2 + Math.random() * 2.8;
        } else if (pattern === 'strobe') {
          // Strobe twinkle
          speed = 3.5 + Math.random() * 4.5;
          decay = 0.016 + Math.random() * 0.015;
          sparkle = true;
        } else {
          // Dynamic spherical burst
          speed = 2.5 + Math.random() * 5.8;
          decay = 0.012 + Math.random() * 0.018;
        }

        fireworkParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay,
          color: palette[Math.floor(Math.random() * palette.length)],
          size,
          sparkle,
        });
      }
    };

    // Staggered organic initial burst sequence
    const patterns: Array<'sphere' | 'willow' | 'ring' | 'strobe'> = ['sphere', 'willow', 'ring', 'strobe'];
    const colors: Array<'gold' | 'ferrari' | 'champagne'> = ['gold', 'ferrari', 'champagne', 'gold'];

    const timeouts: number[] = [];
    // 1st burst: left-center
    timeouts.push(
      window.setTimeout(() => {
        spawnFirework(width * (0.2 + Math.random() * 0.15), height * (0.22 + Math.random() * 0.12), 'sphere', 'gold');
      }, 50)
    );
    // 2nd burst: right-center
    timeouts.push(
      window.setTimeout(() => {
        spawnFirework(width * (0.65 + Math.random() * 0.15), height * (0.2 + Math.random() * 0.12), 'willow', 'ferrari');
      }, 250)
    );
    // 3rd burst: high-center champagne
    timeouts.push(
      window.setTimeout(() => {
        spawnFirework(width * (0.42 + Math.random() * 0.16), height * (0.14 + Math.random() * 0.1), 'ring', 'champagne');
      }, 500)
    );
    // 4th burst: wide golden flourish
    timeouts.push(
      window.setTimeout(() => {
        spawnFirework(width * (0.3 + Math.random() * 0.4), height * (0.26 + Math.random() * 0.1), 'willow', 'gold');
      }, 850)
    );

    // Unpredictable dynamic interval generator
    let lastBurst = Date.now();
    let currentInterval = 800 + Math.random() * 900;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Organic periodic fireworks with variable timing and patterns
      const now = Date.now();
      if (!prefersReducedMotion && now - lastBurst > currentInterval) {
        lastBurst = now;
        currentInterval = 700 + Math.random() * 1100; // Unpredictable interval between 700ms and 1800ms
        const targetX = width * (0.15 + Math.random() * 0.7);
        const targetY = height * (0.12 + Math.random() * 0.32);
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        spawnFirework(targetX, targetY, randomPattern, randomColor);
      }

      // Render & update fireworks
      for (let i = fireworkParticles.length - 1; i >= 0; i--) {
        const p = fireworkParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          fireworkParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sparkle && Math.random() > 0.5 ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render & update confetti
      for (let i = 0; i < confettiPieces.length; i++) {
        const c = confettiPieces[i];
        c.y += c.vy;
        c.x += c.vx + Math.sin(c.y * 0.02) * 0.5;
        c.rotation += c.rotationSpeed;

        if (c.y > height + 20) {
          c.y = -20;
          c.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = c.alpha;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleEnter = useCallback(() => {
    soundFx.playUiClick();
    onEnterPaddock();
  }, [onEnterPaddock]);

  return (
    <div className="relative min-h-[92vh] w-full flex flex-col justify-between items-center px-4 sm:px-6 py-6 select-none overflow-hidden animate-fadeIn">
      {/* Interactive Canvas for Fireworks and Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Radial Gold and Ferrari Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),rgba(239,26,45,0.1)_50%,transparent_75%)] pointer-events-none blur-3xl" />

      {/* Top Bar with Audio & Direct Skip */}
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <LuxuryBadge
            variant="ferrari"
            size="sm"
            icon={<Flag className="w-3.5 h-3.5 text-ferrari-400" />}
          >
            CIRCUIT DE MARANELLO • SCUDERIA
          </LuxuryBadge>
          <span className="hidden sm:inline-block text-xs font-mono text-gold-400 font-bold tracking-wider">
            SCUDERIA SPECIAL COMMEMORATION
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleSound}
            aria-label={isMuted ? 'Unmute celebration audio' : 'Mute celebration audio'}
            className="p-2.5 rounded-xl border border-white/10 bg-obsidian-900/80 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>

          <button
            onClick={handleEnter}
            className="px-4 py-2 rounded-xl border border-gold-500/30 bg-obsidian-900/90 text-xs sm:text-sm font-mono text-gold-300 hover:text-white hover:border-gold-400 flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            <span>SKIP TO PADDOCK</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>
      </div>

      {/* Central Grand Birthday Reveal Stage */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center z-20 my-auto py-4 sm:py-8">
        {/* Eyebrow Milestone Ribbon */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-red-600/20 via-amber-600/20 to-gold-500/20 border border-gold-400/50 text-gold-300 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 shadow-[0_0_25px_rgba(212,175,55,0.3)] animate-pulse">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>SCUDERIA CHAMPION • OFFICIAL BIRTHDAY HONOURS</span>
          <Sparkles className="w-4 h-4 text-gold-400" />
        </div>

        {/* Scene 2: The Main Reveal */}
        <div className="space-y-4">
          <span className="block font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.25em] text-gold-400 uppercase drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
            HAPPY BIRTHDAY,
          </span>

          {/* VAIBHEV: Colossal, magnificent visual centrepiece */}
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] 2xl:text-[11.5rem] font-black tracking-tight leading-none uppercase my-2">
            <span className="gold-text-gradient gold-shimmer block drop-shadow-[0_0_70px_rgba(212,175,55,0.7)]">
              VAIBHEV!
            </span>
          </h1>

          {/* Birthdate Tag: 6 NOVEMBER 2006 */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl bg-black/70 border border-gold-400/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] my-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-lg sm:text-2xl md:text-3xl font-black tracking-[0.3em] text-white">
              6 NOVEMBER 2006
            </span>
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          </div>

          {/* Celebratory Message */}
          <p className="font-display text-sm sm:text-lg md:text-xl font-bold tracking-[0.25em] text-red-500 uppercase drop-shadow-[0_2px_10px_rgba(239,26,45,0.5)]">
            TODAY, THE WORLD GOT ITS LEGEND.
          </p>
        </div>

        {/* Scene 3: The Birthday Message (Animated entrance) */}
        <div
          className={`mt-8 sm:mt-10 transition-all duration-1000 transform ${
            scene3Visible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative px-6 sm:px-12 py-5 rounded-2xl bg-gradient-to-r from-obsidian-950 via-[#181410] to-obsidian-950 border border-gold-400/40 shadow-[0_0_50px_rgba(212,175,55,0.25)] max-w-3xl mx-auto">
            {/* Ferrari-red accent line on top */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <h2 className="font-mono text-base sm:text-xl md:text-2xl font-black text-gold-200 tracking-[0.2em] uppercase leading-relaxed">
              9 FRIENDS. COUNTLESS MEMORIES. ONE LEGEND.
            </h2>
            <p className="font-mono text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-widest">
              Curated with pure brotherhood &amp; Scuderia passion.
            </p>
          </div>
        </div>

        {/* Scene 4: Enter the Paddock CTA */}
        <div
          className={`mt-10 sm:mt-12 transition-all duration-700 transform ${
            scene4Visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <GoldButton
            variant="gold-solid"
            size="lg"
            icon={<ArrowRight className="w-6 h-6 ml-1 transition-transform group-hover:translate-x-1" />}
            onClick={handleEnter}
            className="px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-bold tracking-[0.2em] shadow-[0_0_50px_rgba(212,175,55,0.45)] hover:shadow-[0_0_70px_rgba(212,175,55,0.65)] hover:scale-105 transition-all cursor-pointer"
          >
            ENTER THE PADDOCK →
          </GoldButton>
        </div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto z-20 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">CIRCUIT TELEMETRY:</span>
          <span className="text-purple-400 font-bold">MONZA SECTOR 1 PURPLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">TYRE SPEC:</span>
          <span className="text-red-400 font-bold">ROSSO CORSA C5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">RECIPIENT:</span>
          <span className="text-white font-bold">VAIBHEV • MASTERMIND</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold-400 font-semibold">STATUS:</span>
          <span className="text-emerald-400 font-bold animate-pulse">GRAND PRIX IN PROGRESS</span>
        </div>
      </div>
    </div>
  );
};
