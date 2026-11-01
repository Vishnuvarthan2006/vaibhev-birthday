import React from 'react';
import { cn } from '../../utils/cn';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold-solid' | 'gold-outline' | 'ferrari' | 'carbon';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  variant = 'gold-solid',
  size = 'md',
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider font-semibold transition-all duration-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantStyles = {
    'gold-solid':
      'bg-gradient-to-r from-[#dfc472] via-[#d4af37] to-[#b89327] text-obsidian-950 font-bold hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-[0.98]',
    'gold-outline':
      'bg-transparent border border-gold-500/40 text-gold-300 hover:border-gold-400 hover:bg-gold-500/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-[0.98]',
    ferrari:
      'bg-gradient-to-r from-ferrari-500 to-ferrari-600 text-white border border-ferrari-400/50 hover:brightness-110 hover:shadow-[0_0_20px_rgba(239,26,45,0.4)] active:scale-[0.98]',
    carbon:
      'bg-obsidian-850/90 text-gray-200 border border-white/10 hover:border-gold-500/30 hover:bg-obsidian-800 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5',
    md: 'text-xs px-5 py-2.5',
    lg: 'text-sm px-7 py-3.5',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="opacity-90">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
