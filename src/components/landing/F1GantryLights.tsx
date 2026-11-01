import React, { useEffect, useState, useCallback, useRef } from 'react';
import { soundFx } from '../../utils/audioFx';

interface F1GantryLightsProps {
  onLightsOut: () => void;
  isSkipped?: boolean;
}

export type GantryState = 'standby' | 'counting' | 'holding' | 'lights_out';

export const F1GantryLights: React.FC<F1GantryLightsProps> = ({
  onLightsOut,
  isSkipped = false,
}) => {
  // Number of illuminated red lights: 0 to 5
  const [activeLightsCount, setActiveLightsCount] = useState<number>(0);
  const [gantryState, setGantryState] = useState<GantryState>(() =>
    isSkipped ? 'lights_out' : 'counting'
  );
  const timerRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timerRef.current.forEach((t) => window.clearTimeout(t));
    timerRef.current = [];
  }, []);

  const triggerLightsOut = useCallback(() => {
    setActiveLightsCount(0);
    setGantryState('lights_out');
    soundFx.playLightsOutChime();
    onLightsOut();
  }, [onLightsOut]);

  // Main F1 Start Sequence
  useEffect(() => {
    if (isSkipped) {
      clearAllTimers();
      const skipTimer = window.setTimeout(() => {
        triggerLightsOut();
      }, 0);
      timerRef.current.push(skipTimer);
      return () => clearAllTimers();
    }

    clearAllTimers();



    // Sequential illumination: Light 1, 2, 3, 4, 5
    const lightInterval = 850; // ms per light

    for (let i = 1; i <= 5; i++) {
      const t = window.setTimeout(() => {
        setActiveLightsCount(i);
        soundFx.playLightBeep(i);

        if (i === 5) {
          // All 5 lights ON. Hold for random FIA-like interval (1200ms - 1800ms)
          setGantryState('holding');
          const randomHold = 1300 + Math.floor(Math.random() * 500);

          const holdTimer = window.setTimeout(() => {
            triggerLightsOut();
          }, randomHold);

          timerRef.current.push(holdTimer);
        }
      }, i * lightInterval);

      timerRef.current.push(t);
    }

    return () => {
      clearAllTimers();
    };
  }, [isSkipped, triggerLightsOut, clearAllTimers]);

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none">
      {/* Telemetry Status Strip */}
      <div className="flex items-center gap-3 mb-4 text-xs sm:text-sm font-mono tracking-widest text-gray-300">
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              gantryState === 'lights_out'
                ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]'
                : gantryState === 'holding'
                ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-red-500 animate-ping'
            }`}
          />
          {gantryState === 'standby' && 'GRID FORMATION'}
          {gantryState === 'counting' && `START PROCEDURE: ${activeLightsCount} / 5`}
          {gantryState === 'holding' && 'WAIT FOR REDS...'}
          {gantryState === 'lights_out' && 'TRACK GREEN • RACE STARTED'}
        </span>
        <span className="text-white/20">|</span>
        <span className="text-gold-400 font-semibold">FIA START GANTRY</span>
      </div>

      {/* Physical Gantry Frame Bar */}
      <div className="relative px-6 sm:px-10 py-4 rounded-xl border border-white/15 bg-gradient-to-b from-[#181822] via-[#0e0e13] to-[#07070a] shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
        {/* Overhead bridge mounting brackets */}
        <div className="absolute -top-3 left-1/4 w-4 h-4 bg-neutral-800 border-t border-l border-white/20 -translate-x-1/2" />
        <div className="absolute -top-3 right-1/4 w-4 h-4 bg-neutral-800 border-t border-r border-white/20 translate-x-1/2" />

        {/* 5 Gantry Light Pods */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
          {[1, 2, 3, 4, 5].map((lightIndex) => {
            const isLit = gantryState !== 'lights_out' && activeLightsCount >= lightIndex;

            return (
              <div
                key={lightIndex}
                className="gantry-pod w-12 sm:w-16 md:w-20 py-3.5 sm:py-5 px-2 sm:px-3 rounded-lg flex flex-col items-center gap-2.5 sm:gap-3"
              >
                {/* Secondary amber bezel (dim) */}
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-neutral-900 border border-neutral-700/60" />

                {/* Primary F1 Red Launch Light (illuminates sequentially) */}
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all duration-150 ${
                    isLit ? 'gantry-light-on' : 'gantry-light-off'
                  }`}
                />

                {/* Lower Red Launch Light */}
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all duration-150 ${
                    isLit ? 'gantry-light-on' : 'gantry-light-off'
                  }`}
                />

                {/* Pod Index Label */}
                <span className="font-mono text-xs text-gray-300 font-semibold mt-1">
                  0{lightIndex}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live RPM / Clutch Indicator */}
      <div className="mt-5 flex items-center gap-5 text-sm sm:text-base font-mono">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">ENGINE:</span>
          <span className="text-red-400 font-bold tracking-wider">
            {gantryState === 'lights_out' ? '13,200 RPM' : '11,800 RPM'}
          </span>
        </div>
        <div className="w-1 h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-gray-400">GEAR:</span>
          <span className="text-gold-400 font-bold">
            {gantryState === 'lights_out' ? '1ST • 98 KM/H' : 'NEUTRAL / CLUTCH'}
          </span>
        </div>
      </div>
    </div>
  );
};
