import React from 'react';
import { cn } from '../../utils/cn';

interface LuxuryBadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'ferrari' | 'carbon';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const LuxuryBadge: React.FC<LuxuryBadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className,
  icon,
}) => {
  const variantStyles = {
    gold: 'bg-gold-500/10 text-gold-300 border-gold-500/30 shadow-[0_0_12px_rgba(212,175,55,0.12)]',
    ferrari: 'bg-ferrari-500/10 text-red-400 border-ferrari-500/40 shadow-[0_0_12px_rgba(239,26,45,0.15)]',
    carbon: 'bg-obsidian-800/80 text-gray-300 border-white/10',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider font-medium',
    md: 'text-xs px-3.5 py-1 tracking-widest font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 uppercase font-mono rounded-full border transition-all duration-300',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </span>
  );
};
