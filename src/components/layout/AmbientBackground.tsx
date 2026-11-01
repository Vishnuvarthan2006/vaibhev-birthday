import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm charcoal deep backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0e] via-[#09080b] to-[#070608]" />

      {/* Subtle Scuderia Ferrari crimson accent on upper-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-ferrari-500/10 blur-[130px]" />

      {/* Warm champagne atmospheric bloom on bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#e8ddcb]/7 blur-[160px]" />

      {/* Antique gold atmospheric bloom on top-center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[48rem] h-[26rem] rounded-full bg-[#d4af37]/6 blur-[150px]" />

      {/* Precision telemetry grid pattern */}
      <div className="absolute inset-0 telemetry-grid opacity-25" />

      {/* Cinematic peripheral vignette */}
      <div className="absolute inset-0 cinematic-vignette" />
    </div>
  );
};
