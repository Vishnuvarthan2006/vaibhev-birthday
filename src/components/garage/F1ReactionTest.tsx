import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Gauge, RotateCcw, Award, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';

interface F1ReactionTestProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

type TestState = 'idle' | 'armed' | 'green' | 'early' | 'complete';

export const F1ReactionTest: React.FC<F1ReactionTestProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [testState, setTestState] = useState<TestState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vaibhev_f1_best_reaction');
      return saved ? parseFloat(saved) : null;
    }
    return null;
  });
  const [activeLights, setActiveLights] = useState<number>(0);

  const startTimeRef = useRef<number>(0);
  const lightsIntervalRef = useRef<number | null>(null);
  const greenTimeoutRef = useRef<number | null>(null);

  // Clear all running timers on unmount
  useEffect(() => {
    return () => {
      if (lightsIntervalRef.current) clearInterval(lightsIntervalRef.current);
      if (greenTimeoutRef.current) clearTimeout(greenTimeoutRef.current);
    };
  }, []);

  const startTest = useCallback(() => {
    soundFx.playUiClick();
    if (lightsIntervalRef.current) clearInterval(lightsIntervalRef.current);
    if (greenTimeoutRef.current) clearTimeout(greenTimeoutRef.current);

    setTestState('armed');
    setReactionTime(null);
    setActiveLights(0);

    let currentLight = 0;
    lightsIntervalRef.current = window.setInterval(() => {
      currentLight += 1;
      setActiveLights(currentLight);
      soundFx.playLightBeep(currentLight);

      if (currentLight >= 5) {
        if (lightsIntervalRef.current) clearInterval(lightsIntervalRef.current);

        // Random delay before lights go green (1.2s to 3.0s)
        const delay = 1200 + Math.random() * 1800;
        greenTimeoutRef.current = window.setTimeout(() => {
          setTestState('green');
          startTimeRef.current = performance.now();
          soundFx.playReactionGreen();
        }, delay);
      }
    }, 1000);
  }, []);

  const handleClickAction = useCallback(() => {
    if (testState === 'armed') {
      // Clicked too early!
      if (lightsIntervalRef.current) clearInterval(lightsIntervalRef.current);
      if (greenTimeoutRef.current) clearTimeout(greenTimeoutRef.current);
      setTestState('early');
      setActiveLights(0);
      soundFx.playUiClick();
    } else if (testState === 'green') {
      // Success! Calculate reaction time
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setTestState('complete');
      soundFx.playLightsOutChime();

      setBestTime((prev) => {
        if (prev === null || elapsed < prev) {
          localStorage.setItem('vaibhev_f1_best_reaction', elapsed.toString());
          return elapsed;
        }
        return prev;
      });

      // Target time for unlocking Clue 1: <= 380ms (fair and fun)
      if (elapsed <= 380 && onClueUnlocked) {
        onClueUnlocked();
      }
    }
  }, [testState, onClueUnlocked]);

  const getTierDetails = (ms: number) => {
    if (ms < 220) {
      return {
        rating: 'LEWIS HAMILTON #44 GOD-TIER',
        badge: 'SCUDERIA POLE POSITION',
        color: 'text-amber-400',
        desc: 'Unbelievable launch reflexes! You matched Lewis Hamilton launching off the grid at Silverstone.',
      };
    }
    if (ms < 280) {
      return {
        rating: 'GRAND PRIX PODIUM REFLEXES',
        badge: 'FRONT ROW CONTENDER',
        color: 'text-emerald-400',
        desc: 'Sensational reaction time. Straight into Turn 1 with supreme authority.',
      };
    }
    if (ms < 380) {
      return {
        rating: 'TOP-10 RACECRAFT',
        badge: 'TARGET TIME MET',
        color: 'text-gold-300',
        desc: 'Solid launch! Fast enough to extract the Maranello telemetry frequency.',
      };
    }
    return {
      rating: 'PIT LANE STALL',
      badge: 'TRY AGAIN FOR SUB-380MS',
      color: 'text-red-400',
      desc: 'Slight clutch hesitation! Drink an espresso and launch again.',
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-6 sm:p-8 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400/60" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              MARANELLO REACTION DYNO #44
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              TARGET: SUB-380MS TO UNLOCK CLUE 1
            </span>
          </div>
        </div>

        {isClueDiscovered ? (
          <span className="font-mono text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> CLUE 1 [V] DECODED
          </span>
        ) : (
          <span className="font-mono text-[11px] text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30">
            TREASURE HUNT CLUE 1
          </span>
        )}
      </div>

      {/* F1 Gantry Lights Display */}
      <div className="my-6 p-4 rounded-xl bg-black border border-white/10 flex items-center justify-around shadow-inner max-w-lg mx-auto">
        {Array.from({ length: 5 }).map((_, idx) => {
          const isRed = testState === 'armed' && activeLights > idx;
          const isGreen = testState === 'green';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-150 ${
                  isGreen
                    ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.9)] animate-pulse'
                    : isRed
                    ? 'bg-red-600 border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.9)]'
                    : 'bg-neutral-900 border-neutral-700 opacity-40'
                }`}
              />
              <span className="font-mono text-[9px] text-gray-400">T{idx + 1}</span>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Button Area */}
      <div className="my-6 text-center">
        {testState === 'idle' && (
          <div className="py-4">
            <p className="text-xs sm:text-sm text-gray-300 mb-4 font-mono max-w-md mx-auto">
              5 red lights illuminate sequentially. When the lights extinguish and turn{' '}
              <span className="text-emerald-400 font-bold">GREEN</span>, tap instantly!
            </p>
            <GoldButton
              variant="ferrari"
              size="lg"
              onClick={startTest}
              icon={<Zap className="w-4 h-4" />}
            >
              INITIALIZE REACTION TEST
            </GoldButton>
          </div>
        )}

        {(testState === 'armed' || testState === 'green') && (
          <div
            onClick={handleClickAction}
            className={`w-full py-12 rounded-xl border-2 cursor-pointer transition-all duration-100 flex flex-col items-center justify-center select-none active:scale-[0.98] ${
              testState === 'green'
                ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[0_0_50px_rgba(16,185,129,0.5)]'
                : 'bg-red-950/40 border-red-500/40 text-red-200 hover:border-red-400'
            }`}
          >
            <span className="font-display text-2xl sm:text-4xl font-black uppercase tracking-wider">
              {testState === 'green' ? 'TAP NOW! GO GO GO!' : 'WAIT FOR GREEN...'}
            </span>
            <span className="font-mono text-xs mt-2 opacity-80">
              {testState === 'green' ? 'Click anywhere inside!' : 'Do not jump start!'}
            </span>
          </div>
        )}

        {testState === 'early' && (
          <div className="py-4 p-6 rounded-xl bg-red-950/30 border border-red-500/40 text-center">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2 animate-bounce" />
            <h4 className="font-display text-xl font-bold text-white uppercase">
              FALSE START DETECTED!
            </h4>
            <p className="text-xs text-red-300 font-mono mt-1">
              Jumped the start! The FIA race stewards gave you a 5-second penalty.
            </p>
            <div className="mt-4">
              <GoldButton variant="ferrari" size="sm" onClick={startTest}>
                TRY AGAIN
              </GoldButton>
            </div>
          </div>
        )}

        {testState === 'complete' && reactionTime !== null && (
          <div className="py-4 p-6 rounded-xl bg-obsidian-900 border border-gold-500/40 text-center animate-fadeIn">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block">
              RECORDED REACTION TIME
            </span>
            <div className="font-display text-4xl sm:text-6xl font-black gold-text-gradient my-2">
              {reactionTime} <span className="text-2xl font-mono text-gold-400">ms</span>
            </div>

            {(() => {
              const details = getTierDetails(reactionTime);
              return (
                <div className="mt-2">
                  <span
                    className={`font-display text-sm sm:text-base font-bold uppercase ${details.color} block`}
                  >
                    {details.rating}
                  </span>
                  <p className="text-xs text-gray-300 font-mono mt-1 max-w-md mx-auto">
                    {details.desc}
                  </p>
                </div>
              );
            })()}

            <div className="flex items-center justify-center gap-3 mt-6">
              <GoldButton
                variant="carbon"
                size="sm"
                onClick={startTest}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                RE-TEST REFLEXES
              </GoldButton>
            </div>
          </div>
        )}
      </div>

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-gold-400" />
          Best Record: <span className="text-white font-bold">{bestTime ? `${bestTime} ms` : 'None yet'}</span>
        </span>
        <span className="text-red-400 uppercase">HAMILTON #44 BENCHMARK: 215MS</span>
      </div>
    </div>
  );
};
