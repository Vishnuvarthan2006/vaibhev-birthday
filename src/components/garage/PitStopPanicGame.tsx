import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Wrench,
  RotateCcw,
  AlertOctagon,
  Trophy,
  Zap,
  Gauge,
  Play,
} from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';

type PitPhase = 'intro' | 'box_entry' | 'wheel_loosen' | 'tyre_swap' | 'wheel_tighten' | 'jack_drop' | 'release' | 'complete';

interface WheelState {
  fl: boolean;
  fr: boolean;
  rl: boolean;
  rr: boolean;
}

export const PitStopPanicGame: React.FC = () => {
  const [phase, setPhase] = useState<PitPhase>('intro');
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [penalties, setPenalties] = useState<number>(0);
  const [penaltyMessage, setPenaltyMessage] = useState<string | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vaibhev_pitstop_best_time');
      return saved ? parseFloat(saved) : null;
    }
    return null;
  });

  // Track the state of the 4 wheels across stages
  const [loosenedWheels, setLoosenedWheels] = useState<WheelState>({ fl: false, fr: false, rl: false, rr: false });
  const [swappedWheels, setSwappedWheels] = useState<WheelState>({ fl: false, fr: false, rl: false, rr: false });
  const [tightenedWheels, setTightenedWheels] = useState<WheelState>({ fl: false, fr: false, rl: false, rr: false });

  const [lollipopGreen, setLollipopGreen] = useState<boolean>(false);

  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);
  const lollipopTimeoutRef = useRef<number | null>(null);

  const clearRunningTimers = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (lollipopTimeoutRef.current) {
      clearTimeout(lollipopTimeoutRef.current);
      lollipopTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearRunningTimers();
  }, []);

  const handleStartPitStop = () => {
    soundFx.playUiClick();
    clearRunningTimers();
    setPhase('box_entry');
    setElapsedMs(0);
    setPenalties(0);
    setPenaltyMessage(null);
    setLoosenedWheels({ fl: false, fr: false, rl: false, rr: false });
    setSwappedWheels({ fl: false, fr: false, rl: false, rr: false });
    setTightenedWheels({ fl: false, fr: false, rl: false, rr: false });
    setLollipopGreen(false);

    startTimeRef.current = performance.now();
    timerIntervalRef.current = window.setInterval(() => {
      setElapsedMs(Math.round(performance.now() - startTimeRef.current));
    }, 25);
  };

  // Step 1: Car stops on marks, player engages jacks
  const handleEngageJacks = () => {
    soundFx.playMiningHit();
    setPhase('wheel_loosen');
  };

  // Step 2: Loosen 4 wheel nuts
  const handleLoosenWheel = (corner: keyof WheelState) => {
    if (loosenedWheels[corner]) return;
    soundFx.playMiningHit();
    const next = { ...loosenedWheels, [corner]: true };
    setLoosenedWheels(next);

    if (next.fl && next.fr && next.rl && next.rr) {
      soundFx.playLightBeep(1);
      setPhase('tyre_swap');
    }
  };

  // Step 3: Swap old tyres for fresh softs
  const handleSwapTyre = (corner: keyof WheelState) => {
    if (swappedWheels[corner]) return;
    soundFx.playMiningHit();
    const next = { ...swappedWheels, [corner]: true };
    setSwappedWheels(next);

    if (next.fl && next.fr && next.rl && next.rr) {
      soundFx.playLightBeep(2);
      setPhase('wheel_tighten');
    }
  };

  // Step 4: Torque 4 wheel nuts securely
  const handleTightenWheel = (corner: keyof WheelState) => {
    if (tightenedWheels[corner]) return;
    soundFx.playReactionGreen();
    const next = { ...tightenedWheels, [corner]: true };
    setTightenedWheels(next);

    if (next.fl && next.fr && next.rl && next.rr) {
      soundFx.playLightBeep(3);
      setPhase('jack_drop');
    }
  };

  // Step 5: Drop jacks, initiate release sequence
  const handleDropJacks = () => {
    soundFx.playMiningHit();
    setPhase('release');

    // Random delay before lollipop turns green (0.4s to 0.9s)
    const delay = 400 + Math.random() * 500;
    lollipopTimeoutRef.current = window.setTimeout(() => {
      setLollipopGreen(true);
      soundFx.playReactionGreen();
    }, delay);
  };

  // Step 6: Lollipop release
  const handleReleaseCar = useCallback(() => {
    if (!lollipopGreen) {
      // Unsafe release! Tapped before green light
      soundFx.playUiClick();
      setPenalties((prev) => prev + 5000);
      setPenaltyMessage('UNSAFE RELEASE! +5.0s FIA Penalty added');
      return;
    }

    // Success! Stop timer
    clearRunningTimers();
    soundFx.playLightsOutChime();

    const rawMs = Math.round(performance.now() - startTimeRef.current);
    const totalMs = rawMs + penalties;
    setElapsedMs(totalMs);
    setPhase('complete');

    const totalSeconds = totalMs / 1000;
    setBestTime((prev) => {
      if (prev === null || totalSeconds < prev) {
        localStorage.setItem('vaibhev_pitstop_best_time', totalSeconds.toFixed(2));
        return parseFloat(totalSeconds.toFixed(2));
      }
      return prev;
    });
  }, [lollipopGreen, penalties]);

  const getPitStopRating = (seconds: number) => {
    if (seconds <= 2.2) {
      return { rating: '⚡ WORLD RECORD TIME! (Under 2.2s)', badge: 'SCUDERIA PIT GODS', color: 'text-amber-400', desc: 'Sub-2.2 second masterclass! McLaren and Red Bull pit crews are taking notes.' };
    }
    if (seconds <= 2.8) {
      return { rating: '🏆 GRAND PRIX PODIUM STOP (Under 2.8s)', badge: 'TIER 1 PIT CREW', color: 'text-emerald-400', desc: 'Flawless pit work! Lewis Hamilton maintains track position into Turn 1.' };
    }
    if (seconds <= 3.8) {
      return { rating: '🥈 SOLID CHAMPIONSHIP STOP (Under 3.8s)', badge: 'RELIABLE EXECUTION', color: 'text-gold-300', desc: 'Safe and clean stop. Minimal time lost in the pitlane.' };
    }
    return { rating: '🥉 FERRARI STRATEGY SPECIAL (> 3.8s)', badge: 'WHEEL NUT JAMMED', color: 'text-red-400', desc: 'Slight wheel gun delay or release penalty! Reset the jacks and drill again.' };
  };

  const formattedTime = (elapsedMs / 1000).toFixed(2);

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-red-500/40 bg-obsidian-950 p-5 sm:p-7 select-none shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              PIT STOP PANIC
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              F1 PIT CREW TIMED CHALLENGE • TARGET: SUB-2.4 SECONDS
            </span>
          </div>
        </div>

        {phase !== 'intro' && (
          <div className="flex items-center gap-2 font-mono text-sm px-3 py-1 rounded bg-black border border-red-500/30">
            <Gauge className="w-3.5 h-3.5 text-red-500" />
            <span className="font-display font-black text-white text-base tracking-wider">
              {formattedTime}s
            </span>
          </div>
        )}
      </div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-red-500/40 bg-red-950/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            🏎️
          </div>

          <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            FERRARI PIT BOX
          </h4>

          <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
            Lewis Hamilton is boxing this lap! Lead the 20-person pit crew to change all 4 wheels in record time.
          </p>

          <div className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-gray-300 space-y-1.5 text-left">
            <span className="text-gold-400 font-bold block mb-1">PIT CREW SEQUENCE:</span>
            <p>1. ⬆️ <span className="text-white font-bold">ENGAGE JACKS</span> the moment car arrives.</p>
            <p>2. 🔫 <span className="text-white font-bold">LOOSEN</span> all 4 wheel nuts.</p>
            <p>3. 🔴 <span className="text-white font-bold">SWAP</span> for 4 fresh Pirelli Softs.</p>
            <p>4. 🔒 <span className="text-white font-bold">TORQUE</span> all 4 nuts to 450 Nm.</p>
            <p>5. ⬇️ <span className="text-white font-bold">DROP JACKS</span> &amp; Wait for GREEN lollipop!</p>
          </div>

          <div className="pt-2">
            <GoldButton variant="ferrari" size="lg" onClick={handleStartPitStop} icon={<Play className="w-4 h-4 ml-0.5" />}>
              BOX! BOX! BOX!
            </GoldButton>
          </div>
        </div>
      )}

      {/* Active Pit Stop Interaction Area */}
      {phase !== 'intro' && phase !== 'complete' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Status Instruction Bar */}
          <div className="p-3 rounded-lg border border-red-500/30 bg-red-950/30 text-center font-mono text-xs">
            {phase === 'box_entry' && (
              <span className="text-red-400 font-bold uppercase animate-pulse">
                STEP 1: CAR IN BOX! HIT FRONT &amp; REAR JACKS!
              </span>
            )}
            {phase === 'wheel_loosen' && (
              <span className="text-amber-400 font-bold uppercase animate-pulse">
                STEP 2: TAP ALL 4 WHEEL GUNS TO LOOSEN OLD TYRES!
              </span>
            )}
            {phase === 'tyre_swap' && (
              <span className="text-cyan-400 font-bold uppercase animate-pulse">
                STEP 3: FIT 4 FRESH RED SOFT TYRES! TAP EACH CORNER!
              </span>
            )}
            {phase === 'wheel_tighten' && (
              <span className="text-emerald-400 font-bold uppercase animate-pulse">
                STEP 4: TORQUE ALL 4 WHEEL NUTS TO 450 NM!
              </span>
            )}
            {phase === 'jack_drop' && (
              <span className="text-gold-400 font-bold uppercase animate-pulse">
                STEP 5: ALL NUTS SECURED! DROP JACKS NOW!
              </span>
            )}
            {phase === 'release' && (
              <span className={lollipopGreen ? 'text-emerald-400 font-bold uppercase text-sm animate-bounce' : 'text-yellow-400 font-bold uppercase animate-pulse'}>
                {lollipopGreen ? '🟢 GREEN LIGHT! RELEASE HAMILTON NOW!' : '🔴 WAIT FOR GREEN LOLLIPOP! DO NOT JUMP!'}
              </span>
            )}
          </div>

          {/* F1 Car Pit Layout Graphic */}
          <div className="relative p-6 sm:p-8 rounded-xl bg-black border border-white/10 flex items-center justify-center min-h-[260px] overflow-hidden">
            {/* F1 Car Silhouette Outline */}
            <div className="relative w-40 sm:w-48 h-64 sm:h-72 border-2 border-red-600/40 rounded-3xl bg-gradient-to-b from-red-950/40 via-obsidian-950 to-red-950/60 flex flex-col items-center justify-between p-3 shadow-[0_0_40px_rgba(220,38,38,0.25)]">
              {/* Front Wing */}
              <div className="w-32 sm:w-36 h-3 bg-red-600 rounded-xs border border-white/20 shadow-xs" />

              {/* Cockpit / Driver */}
              <div className="w-12 h-16 rounded-full border border-gold-400/60 bg-black flex flex-col items-center justify-center font-mono">
                <span className="text-gold-400 font-bold text-xs">SF</span>
                <span className="text-[8px] text-gray-400">F1</span>
              </div>

              {/* Rear Wing */}
              <div className="w-28 sm:w-32 h-4 bg-red-700 rounded-xs border border-white/20 shadow-xs" />

              {/* Center Jack Buttons (Phase Dependent) */}
              {phase === 'box_entry' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2">
                  <button
                    onClick={handleEngageJacks}
                    className="px-6 py-4 rounded-xl bg-red-600 border-2 border-white text-white font-display font-black text-sm uppercase tracking-wider hover:bg-red-500 active:scale-95 transition-all shadow-[0_0_30px_rgba(220,38,38,0.8)] animate-pulse cursor-pointer"
                  >
                    ⬆️ ENGAGE JACKS
                  </button>
                </div>
              )}

              {phase === 'jack_drop' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2">
                  <button
                    onClick={handleDropJacks}
                    className="px-6 py-4 rounded-xl bg-amber-500 border-2 border-white text-black font-display font-black text-sm uppercase tracking-wider hover:bg-amber-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(245,158,11,0.8)] animate-bounce cursor-pointer"
                  >
                    ⬇️ DROP JACKS!
                  </button>
                </div>
              )}

              {phase === 'release' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xs p-2">
                  <div className={`w-14 h-14 rounded-full border-4 mb-3 flex items-center justify-center text-xl transition-all ${
                    lollipopGreen
                      ? 'bg-emerald-500 border-white text-white shadow-[0_0_40px_rgba(16,185,129,0.9)] animate-ping'
                      : 'bg-red-600 border-red-300 text-white shadow-[0_0_30px_rgba(220,38,38,0.8)]'
                  }`}>
                    {lollipopGreen ? 'GO!' : 'WAIT'}
                  </div>

                  <button
                    onClick={handleReleaseCar}
                    className={`px-8 py-3.5 rounded-xl font-display font-black text-base uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                      lollipopGreen
                        ? 'bg-emerald-500 border-2 border-white text-black shadow-[0_0_30px_rgba(16,185,129,0.8)]'
                        : 'bg-red-950 border border-red-500/50 text-red-200 hover:border-red-400'
                    }`}
                  >
                    {lollipopGreen ? '🚀 RELEASE CAR!' : 'HOLD POSITION'}
                  </button>
                </div>
              )}
            </div>

            {/* Front-Left Wheel Hub */}
            <div className="absolute -left-2 sm:left-12 top-10 sm:top-14">
              <WheelControl
                corner="fl"
                label="FRONT LEFT"
                phase={phase}
                isLoosened={loosenedWheels.fl}
                isSwapped={swappedWheels.fl}
                isTightened={tightenedWheels.fl}
                onLoosen={() => handleLoosenWheel('fl')}
                onSwap={() => handleSwapTyre('fl')}
                onTighten={() => handleTightenWheel('fl')}
              />
            </div>

            {/* Front-Right Wheel Hub */}
            <div className="absolute -right-2 sm:right-12 top-10 sm:top-14">
              <WheelControl
                corner="fr"
                label="FRONT RIGHT"
                phase={phase}
                isLoosened={loosenedWheels.fr}
                isSwapped={swappedWheels.fr}
                isTightened={tightenedWheels.fr}
                onLoosen={() => handleLoosenWheel('fr')}
                onSwap={() => handleSwapTyre('fr')}
                onTighten={() => handleTightenWheel('fr')}
              />
            </div>

            {/* Rear-Left Wheel Hub */}
            <div className="absolute -left-2 sm:left-12 bottom-10 sm:bottom-14">
              <WheelControl
                corner="rl"
                label="REAR LEFT"
                phase={phase}
                isLoosened={loosenedWheels.rl}
                isSwapped={swappedWheels.rl}
                isTightened={tightenedWheels.rl}
                onLoosen={() => handleLoosenWheel('rl')}
                onSwap={() => handleSwapTyre('rl')}
                onTighten={() => handleTightenWheel('rl')}
              />
            </div>

            {/* Rear-Right Wheel Hub */}
            <div className="absolute -right-2 sm:right-12 bottom-10 sm:bottom-14">
              <WheelControl
                corner="rr"
                label="REAR RIGHT"
                phase={phase}
                isLoosened={loosenedWheels.rr}
                isSwapped={swappedWheels.rr}
                isTightened={tightenedWheels.rr}
                onLoosen={() => handleLoosenWheel('rr')}
                onSwap={() => handleSwapTyre('rr')}
                onTighten={() => handleTightenWheel('rr')}
              />
            </div>
          </div>

          {/* Penalty Toast */}
          {penaltyMessage && (
            <div className="p-2.5 rounded-lg border border-red-500 bg-red-950 text-red-200 font-mono text-xs flex items-center justify-center gap-2 animate-bounce">
              <AlertOctagon className="w-4 h-4 text-red-400" />
              <span>{penaltyMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Completion Results Screen */}
      {phase === 'complete' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full border-2 border-red-500 bg-red-600/20 flex items-center justify-center text-red-400 mx-auto shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block">
            PIT STOP CONCLUDED
          </span>

          <h4 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
            STATIONARY PIT TIME
          </h4>

          <div className="font-display text-5xl sm:text-6xl font-black gold-text-gradient">
            {formattedTime} <span className="font-mono text-2xl text-gold-400 font-bold">sec</span>
          </div>

          {(() => {
            const rating = getPitStopRating(elapsedMs / 1000);
            return (
              <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-1">
                <span className={`font-display text-base font-bold uppercase ${rating.color} block`}>
                  {rating.rating}
                </span>
                <p className="text-xs text-gray-300 font-mono">
                  {rating.desc}
                </p>
                {penalties > 0 && (
                  <span className="text-[10px] text-red-400 font-mono block mt-1">
                    (Includes +{(penalties / 1000).toFixed(1)}s in penalties)
                  </span>
                )}
              </div>
            );
          })()}

          <div className="pt-2 flex items-center justify-center gap-3">
            <GoldButton variant="ferrari" size="md" onClick={handleStartPitStop} icon={<RotateCcw className="w-4 h-4" />}>
              BOX AGAIN
            </GoldButton>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="flex items-center gap-1.5 text-gold-400">
          <Zap className="w-3.5 h-3.5" />
          Personal Best: <span className="text-white font-bold">{bestTime ? `${bestTime}s` : 'None yet'}</span>
        </span>
        <span className="text-red-400">F1 WORLD RECORD: 1.80 SEC</span>
      </div>
    </div>
  );
};

interface WheelControlProps {
  corner: keyof WheelState;
  label: string;
  phase: PitPhase;
  isLoosened: boolean;
  isSwapped: boolean;
  isTightened: boolean;
  onLoosen: () => void;
  onSwap: () => void;
  onTighten: () => void;
}

const WheelControl: React.FC<WheelControlProps> = ({
  label,
  phase,
  isLoosened,
  isSwapped,
  isTightened,
  onLoosen,
  onSwap,
  onTighten,
}) => {
  if (phase === 'wheel_loosen') {
    return (
      <button
        onClick={onLoosen}
        disabled={isLoosened}
        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-90 ${
          isLoosened
            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'border-red-500 bg-red-950/60 text-white animate-pulse hover:bg-red-900 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
        }`}
      >
        <span className="text-xl">{isLoosened ? '✓' : '🔫'}</span>
        <span className="font-mono text-[9px] uppercase font-bold mt-1">
          {isLoosened ? 'UNLOCKED' : 'LOOSEN NUT'}
        </span>
      </button>
    );
  }

  if (phase === 'tyre_swap') {
    return (
      <button
        onClick={onSwap}
        disabled={isSwapped}
        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-90 ${
          isSwapped
            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'border-yellow-500 bg-yellow-950/60 text-yellow-300 animate-pulse hover:bg-yellow-900 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
        }`}
      >
        <span className="text-xl">{isSwapped ? '🔴' : '🛞'}</span>
        <span className="font-mono text-[9px] uppercase font-bold mt-1">
          {isSwapped ? 'SOFT FITTED' : 'FIT SOFT'}
        </span>
      </button>
    );
  }

  if (phase === 'wheel_tighten') {
    return (
      <button
        onClick={onTighten}
        disabled={isTightened}
        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-90 ${
          isTightened
            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'border-cyan-500 bg-cyan-950/60 text-cyan-300 animate-pulse hover:bg-cyan-900 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
        }`}
      >
        <span className="text-xl">{isTightened ? '🔒' : '🔧'}</span>
        <span className="font-mono text-[9px] uppercase font-bold mt-1">
          {isTightened ? '450 NM OK' : 'TORQUE NUT'}
        </span>
      </button>
    );
  }

  // Idle state
  return (
    <div className="p-2 sm:p-2.5 rounded-lg border border-white/10 bg-black/60 text-center flex flex-col items-center justify-center opacity-60">
      <span className="text-xs sm:text-sm">🛞</span>
      <span className="font-mono text-[8px] text-gray-400 mt-0.5">{label}</span>
    </div>
  );
};
