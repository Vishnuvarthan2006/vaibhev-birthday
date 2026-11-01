import React from 'react';
import { Gauge, Zap, Flame, ShieldAlert } from 'lucide-react';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';


export const TelemetryWidget: React.FC = () => {
  return (
    <div className="carbon-panel rounded-xl p-5 sm:p-6 border border-white/[0.08] relative overflow-hidden">
      {/* Subtle top indicator bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-gold-400" />
          <span className="font-display font-bold text-sm tracking-wider text-white uppercase">
            LIVE TELEMETRY HUD • PIT WALL TELEMETRICS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TELEMETRY LINK: ONLINE
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ferrari-500/10 text-red-400 border border-ferrari-500/20">
            CAR #{RECIPIENT_PROFILE.driverNumber}
          </span>
        </div>
      </div>

      {/* Main Telemetry Readout Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 font-mono text-center">
        {/* Speed */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1">TOP SPEED</span>
          <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            344 <span className="text-xs text-gold-400 font-mono">KM/H</span>
          </span>
          <span className="text-[9px] text-emerald-400 block mt-0.5">DRS ACTIVE</span>
        </div>

        {/* Revs & Gear */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1">GEAR &amp; RPM</span>
          <span className="font-display text-xl sm:text-2xl font-bold text-gold-300 tracking-tight">
            8TH <span className="text-xs text-gray-400 font-mono">/ 13.5K</span>
          </span>
          <span className="text-[9px] text-gold-400 block mt-0.5">PEAK TORQUE</span>
        </div>

        {/* Lap Sector Times */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1">BEST LAP</span>
          <span className="font-display text-xl sm:text-2xl font-bold text-purple-400 tracking-tight">
            1:18.444
          </span>
          <span className="text-[9px] text-purple-300 block mt-0.5">PURPLE SECTORS</span>
        </div>

        {/* Subtle Spider-Man Reference */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1 flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-red-400" /> SPIDER-SENSE
          </span>
          <span className="font-display text-lg sm:text-xl font-bold text-red-400 tracking-tight">
            100%
          </span>
          <span className="text-[9px] text-red-300/80 block mt-0.5">PETER VARIANT</span>
        </div>

        {/* Subtle Minecraft Reference */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3 text-cyan-400" /> MINING TIER
          </span>
          <span className="font-display text-base sm:text-lg font-bold text-cyan-300 tracking-tight">
            NETHERITE
          </span>
          <span className="text-[9px] text-cyan-400/80 block mt-0.5">UNBREAKABLE III</span>
        </div>

        {/* Subtle Brainrot / Sahur Meme Reference */}
        <div className="p-3 rounded-lg bg-obsidian-900/80 border border-white/5">
          <span className="text-[10px] text-gray-400 block mb-1 flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 text-gold-400" /> TUNG SAHUR
          </span>
          <span className="font-display text-lg sm:text-xl font-bold text-gold-400 tracking-tight">
            TUNGS
          </span>
          <span className="text-[9px] text-gold-300/80 block mt-0.5">100% WAKE UP</span>
        </div>
      </div>

      {/* RPM Rev Bar Visual */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
        <span className="text-[10px] font-mono text-gray-400 shrink-0">RPM SPECTRUM:</span>
        <div className="flex-1 h-2 rounded bg-black/60 border border-white/10 p-[1px] flex gap-0.5">
          {/* Green LEDs */}
          <div className="h-full flex-1 rounded-sm bg-emerald-500 opacity-90" />
          <div className="h-full flex-1 rounded-sm bg-emerald-500 opacity-90" />
          <div className="h-full flex-1 rounded-sm bg-emerald-500 opacity-90" />
          {/* Red LEDs */}
          <div className="h-full flex-1 rounded-sm bg-ferrari-500 opacity-95 shadow-[0_0_8px_#ef1a2d]" />
          <div className="h-full flex-1 rounded-sm bg-ferrari-500 opacity-95 shadow-[0_0_8px_#ef1a2d]" />
          <div className="h-full flex-1 rounded-sm bg-ferrari-500 opacity-95 shadow-[0_0_8px_#ef1a2d]" />
          {/* Blue / Gold Shift LEDs */}
          <div className="h-full flex-1 rounded-sm bg-blue-500 opacity-90 shadow-[0_0_8px_#3b82f6]" />
          <div className="h-full flex-1 rounded-sm bg-gold-400 opacity-100 shadow-[0_0_10px_#d4af37]" />
        </div>
        <span className="text-[10px] font-mono text-gold-400 font-bold shrink-0">SHIFT POINT</span>
      </div>
    </div>
  );
};
