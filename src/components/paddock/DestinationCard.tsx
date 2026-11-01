import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LuxuryBadge } from '../common/LuxuryBadge';
import { soundFx } from '../../utils/audioFx';

export interface DestinationCardProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  badgeVariant?: 'gold' | 'ferrari' | 'carbon';
  accentTheme?: 'gold' | 'ferrari' | 'spider' | 'carbon';
  onClick: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  number,
  title,
  subtitle,
  description,
  icon,
  badgeText,
  badgeVariant = 'gold',
  accentTheme = 'gold',
  onClick,
}) => {
  const getAccentBorder = () => {
    switch (accentTheme) {
      case 'ferrari':
        return 'group-hover:border-ferrari-500/60 group-hover:shadow-[0_0_30px_rgba(239,26,45,0.2)]';
      case 'spider':
        return 'group-hover:border-red-600/60 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]';
      case 'carbon':
        return 'group-hover:border-neutral-400/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]';
      case 'gold':
      default:
        return 'group-hover:border-gold-500/60 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]';
    }
  };

  const getTopStripe = () => {
    switch (accentTheme) {
      case 'ferrari':
        return 'bg-gradient-to-r from-ferrari-500 via-ferrari-400 to-transparent';
      case 'spider':
        return 'bg-gradient-to-r from-red-600 via-rose-500 to-transparent';
      case 'carbon':
        return 'bg-gradient-to-r from-neutral-400 via-neutral-600 to-transparent';
      case 'gold':
      default:
        return 'bg-gradient-to-r from-gold-300 via-gold-500 to-transparent';
    }
  };

  return (
    <div
      onClick={() => {
        soundFx.playUiClick();
        onClick();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundFx.playUiClick();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between p-7 sm:p-9 rounded-2xl carbon-panel border border-white/[0.08] cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500/50 select-none overflow-hidden ${getAccentBorder()}`}
    >
      {/* Top Accent Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-80 ${getTopStripe()}`} />

      {/* Decorative Technical Corner Reticles */}
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/20 group-hover:border-gold-400/80 transition-colors" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/20 group-hover:border-gold-400/80 transition-colors" />

      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-gold-400 px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/20">
              {number}
            </span>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
              SECTOR GATE
            </span>
          </div>

          <LuxuryBadge variant={badgeVariant} size="sm">
            {badgeText}
          </LuxuryBadge>
        </div>

        {/* Destination Icon & Title */}
        <div className="flex items-start gap-4 sm:gap-5 mb-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-obsidian-900/90 text-gold-400 group-hover:text-gold-200 group-hover:border-gold-500/40 transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] shrink-0">
            {icon}
          </div>

          <div className="flex-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide group-hover:text-gold-200 transition-colors">
              {title}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-gold-400/80 tracking-wider uppercase mt-1">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-2 mb-6 font-sans">
          {description}
        </p>
      </div>

      {/* Footer Access Trigger */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono">
        <span className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-2 font-medium">
          INITIALIZE GATEWAY
        </span>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 group-hover:border-gold-400 bg-obsidian-900 flex items-center justify-center text-gray-400 group-hover:text-gold-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};
