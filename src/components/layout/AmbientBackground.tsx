import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Matte black deep backdrop */}
      <div className="absolute inset-0 bg-[#060608]" />

      {/* Subtle Scuderia Ferrari crimson glow on upper-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-ferrari-500/10 blur-[130px]" />

      {/* Subtle 24k Gold atmospheric warm bloom on bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#d4af37]/8 blur-[150px]" />

      {/* Central subtle highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[45rem] h-[25rem] rounded-full bg-[#dfc472]/4 blur-[140px]" />

      {/* Precision telemetry grid pattern */}
      <div className="absolute inset-0 telemetry-grid opacity-30" />

      {/* Cinematic peripheral vignette */}
      <div className="absolute inset-0 cinematic-vignette" />
    </div>
  );
};
