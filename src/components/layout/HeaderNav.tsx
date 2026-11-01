import React from 'react';
import { Flag, Shield, Sparkles } from 'lucide-react';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { RECIPIENT_PROFILE } from '../../data/siteConfig';

export const HeaderNav: React.FC = () => {
  return (
    <header className="relative z-20 border-b border-white/[0.07] bg-obsidian-950/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Recipient Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded border border-gold-500/30 bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="font-display font-black text-lg gold-text-gradient">V</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base md:text-lg font-bold tracking-wider text-white uppercase">
                {RECIPIENT_PROFILE.name}
              </h1>
              <span className="text-[10px] font-mono tracking-widest text-gold-400/80 uppercase px-1.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                GP EDITION
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400 tracking-wider">
              9-SQUAD COLLECTIVE TRIBUTE
            </p>
          </div>
        </div>

        {/* Telemetry & Badges */}
        <div className="flex items-center gap-2.5">
          <LuxuryBadge
            variant="ferrari"
            size="sm"
            icon={<Flag className="w-3 h-3 text-ferrari-400" />}
          >
            SCUDERIA #{RECIPIENT_PROFILE.driverNumber}
          </LuxuryBadge>

          <LuxuryBadge
            variant="gold"
            size="sm"
            icon={<Sparkles className="w-3 h-3 text-gold-400" />}
          >
            BLACK & GOLD
          </LuxuryBadge>

          <LuxuryBadge
            variant="carbon"
            size="sm"
            icon={<Shield className="w-3 h-3 text-gray-400" />}
          >
            9 ENTRIES READY
          </LuxuryBadge>
        </div>
      </div>
    </header>
  );
};
