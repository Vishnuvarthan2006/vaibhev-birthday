import React, { useState, useCallback } from 'react';
import { Eye, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';

interface SpiderSenseGameProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

const NODES = [
  { id: 'north', label: 'AGILITY', angle: -90, x: 50, y: 15 },
  { id: 'east', label: 'INSTINCT', angle: 0, x: 85, y: 50 },
  { id: 'south', label: 'COURAGE', angle: 90, x: 50, y: 85 },
  { id: 'west', label: 'LOYALTY', angle: 180, x: 15, y: 50 },
];

export const SpiderSenseGame: React.FC<SpiderSenseGameProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [activatedNodes, setActivatedNodes] = useState<string[]>([]);
  const [isTingling, setIsTingling] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      soundFx.playUiClick();
      if (activatedNodes.includes(nodeId) || isSuccess) return;

      const nextNodes = [...activatedNodes, nodeId];
      setActivatedNodes(nextNodes);

      if (nextNodes.length === NODES.length) {
        // Full sequence activated!
        setIsTingling(true);
        setIsSuccess(true);
        soundFx.playSpiderSenseTingle();

        if (onClueUnlocked) {
          onClueUnlocked();
        }

        setTimeout(() => {
          setIsTingling(false);
        }, 1800);
      }
    },
    [activatedNodes, isSuccess, onClueUnlocked]
  );

  const resetGame = () => {
    soundFx.playUiClick();
    setActivatedNodes([]);
    setIsSuccess(false);
    setIsTingling(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-red-500/30 bg-obsidian-950 p-6 sm:p-8 select-none shadow-[0_0_50px_rgba(220,38,38,0.1)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              SPIDER-SENSE FREQUENCY RADAR
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              ALIGN ALL 4 WEB NODES TO TUNE THE SENSORS
            </span>
          </div>
        </div>

        {isClueDiscovered ? (
          <span className="font-mono text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> CLUE 2 [A] DECODED
          </span>
        ) : (
          <span className="font-mono text-[11px] text-red-400 px-2 py-0.5 rounded bg-red-950/40 border border-red-500/30">
            TREASURE HUNT CLUE 2
          </span>
        )}
      </div>

      {/* Web Canvas & Radar Stage */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto my-6 flex items-center justify-center">
        {/* Shimmering Web Radar Rings (pure geometric SVG) */}
        <svg
          viewBox="0 0 200 200"
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ${
            isTingling ? 'animate-spin scale-105' : ''
          }`}
        >
          {/* Concentric Web Rings */}
          <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(220,38,38,0.25)" strokeWidth="1" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />

          {/* Web Strands / Spokes */}
          <line x1="10" y1="10" x2="190" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="190" y1="10" x2="10" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="rgba(220,38,38,0.3)" strokeWidth="1" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="rgba(220,38,38,0.3)" strokeWidth="1" />

          {/* Subtle Octagon connecting lines */}
          <polygon
            points="100,40 142,58 160,100 142,142 100,160 58,142 40,100 58,58"
            fill="none"
            stroke="rgba(220,38,38,0.2)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Pulsating Spider-Sense Radar Center */}
        <div
          className={`relative z-10 w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
            isSuccess
              ? 'border-red-400 bg-red-600/30 shadow-[0_0_40px_rgba(220,38,38,0.8)] scale-110'
              : 'border-gold-500/40 bg-black/80 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
          }`}
        >
          {/* Custom Web Glyph */}
          <div className="flex flex-col items-center">
            <Sparkles
              className={`w-6 h-6 transition-all duration-300 ${
                isSuccess ? 'text-white animate-bounce' : 'text-gold-400'
              }`}
            />
            <span className="font-mono text-[9px] font-bold text-gray-300 uppercase mt-1">
              {isSuccess ? '100% SYNC' : `${activatedNodes.length}/4 NODES`}
            </span>
          </div>

          {/* Ripple shockwave when active */}
          {isTingling && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-75" />
          )}
        </div>

        {/* 4 Interactive Node Buttons */}
        {NODES.map((node) => {
          const isActivated = activatedNodes.includes(node.id);

          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={`Activate ${node.label} Node`}
              className={`absolute z-20 flex flex-col items-center gap-1 p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                isActivated
                  ? 'bg-red-600/40 border-red-400 text-white shadow-[0_0_15px_rgba(220,38,38,0.7)] scale-105'
                  : 'bg-obsidian-900 border-white/10 text-gray-400 hover:border-gold-400 hover:text-white'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  isActivated ? 'bg-red-500 border-white' : 'bg-neutral-800 border-gray-500'
                }`}
              />
              <span className="font-mono text-[9px] font-bold tracking-wider">
                {node.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Message & Status */}
      <div className="text-center mt-4">
        {isSuccess ? (
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 animate-fadeIn">
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wide">
              ⚡ SPIDER-SENSE IS TINGLING AT 100%!
            </h4>
            <p className="text-xs text-gray-300 font-mono mt-1.5 max-w-md mx-auto leading-relaxed">
              "With great power comes great responsibility. But with great friends comes an
              unbreakable brotherhood."
            </p>
            <div className="mt-3 inline-flex items-center gap-2">
              <GoldButton variant="carbon" size="sm" onClick={resetGame} icon={<RotateCcw className="w-3.5 h-3.5" />}>
                RE-TUNE RADAR
              </GoldButton>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-400 font-mono">
            Click the four cardinal instinct nodes (Agility, Instinct, Courage, Loyalty) to calibrate
            Vaibhev's Spider-Sense.
          </p>
        )}
      </div>
    </div>
  );
};
