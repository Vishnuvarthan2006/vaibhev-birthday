import React, { useState, useCallback } from 'react';
import { Pickaxe, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';

interface MinecraftMiningGameProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

interface BlockState {
  id: number;
  type: 'stone' | 'gold_ore' | 'diamond_ore' | 'ancient_debris' | 'obsidian';
  name: string;
  hitsRequired: number;
  currentHits: number;
  isBroken: boolean;
  dropName: string;
}

const INITIAL_BLOCKS: BlockState[] = [
  { id: 1, type: 'stone', name: 'Stone', hitsRequired: 2, currentHits: 0, isBroken: false, dropName: 'Cobblestone' },
  { id: 2, type: 'gold_ore', name: 'Gold Ore', hitsRequired: 3, currentHits: 0, isBroken: false, dropName: 'Raw Gold' },
  { id: 3, type: 'stone', name: 'Stone', hitsRequired: 2, currentHits: 0, isBroken: false, dropName: 'Cobblestone' },
  { id: 4, type: 'diamond_ore', name: 'Diamond Ore', hitsRequired: 4, currentHits: 0, isBroken: false, dropName: 'Diamond x3' },
  { id: 5, type: 'ancient_debris', name: 'Ancient Debris', hitsRequired: 5, currentHits: 0, isBroken: false, dropName: 'Netherite Ingot' },
  { id: 6, type: 'diamond_ore', name: 'Diamond Ore', hitsRequired: 4, currentHits: 0, isBroken: false, dropName: 'Diamond x3' },
  { id: 7, type: 'stone', name: 'Stone', hitsRequired: 2, currentHits: 0, isBroken: false, dropName: 'Cobblestone' },
  { id: 8, type: 'obsidian', name: 'Obsidian', hitsRequired: 5, currentHits: 0, isBroken: false, dropName: 'Obsidian' },
  { id: 9, type: 'gold_ore', name: 'Gold Ore', hitsRequired: 3, currentHits: 0, isBroken: false, dropName: 'Raw Gold' },
];

export const MinecraftMiningGame: React.FC<MinecraftMiningGameProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [blocks, setBlocks] = useState<BlockState[]>(INITIAL_BLOCKS);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [lastDrop, setLastDrop] = useState<string | null>(null);

  const mineBlock = useCallback(
    (blockId: number) => {
      setBlocks((prev) =>
        prev.map((block) => {
          if (block.id !== blockId || block.isBroken) return block;

          soundFx.playMiningHit();
          const nextHits = block.currentHits + 1;

          if (nextHits >= block.hitsRequired) {
            // Block is broken!
            if (block.type === 'diamond_ore' || block.type === 'ancient_debris') {
              soundFx.playDiamondFound();
            }

            // Award loot
            setInventory((inv) => ({
              ...inv,
              [block.dropName]: (inv[block.dropName] || 0) + 1,
            }));
            setLastDrop(`+1 ${block.dropName}!`);

            // If breaking the Ancient Debris, unlock Clue 3
            if (block.type === 'ancient_debris' && onClueUnlocked) {
              onClueUnlocked();
            }

            return { ...block, currentHits: nextHits, isBroken: true };
          }

          return { ...block, currentHits: nextHits };
        })
      );
    },
    [onClueUnlocked]
  );

  const resetMine = () => {
    soundFx.playUiClick();
    setBlocks(INITIAL_BLOCKS);
    setLastDrop(null);
  };

  const getBlockStyle = (type: BlockState['type']) => {
    switch (type) {
      case 'ancient_debris':
        return 'bg-[#3b271d] border-[#5a3a2b] text-amber-300 shadow-[inset_0_0_15px_rgba(212,175,55,0.4)]';
      case 'diamond_ore':
        return 'bg-[#2b3a42] border-[#38bdf8] text-cyan-300 shadow-[inset_0_0_12px_rgba(56,189,248,0.3)]';
      case 'gold_ore':
        return 'bg-[#3d3725] border-[#facc15] text-yellow-300 shadow-[inset_0_0_12px_rgba(250,204,21,0.3)]';
      case 'obsidian':
        return 'bg-[#150f24] border-[#7c3aed] text-purple-300';
      case 'stone':
      default:
        return 'bg-[#404040] border-[#525252] text-gray-300';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-6 sm:p-8 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400/60" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Pickaxe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              NETHERITE DEEP MINE
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              MINE ANCIENT DEBRIS TO EXTRACT CLUE 3
            </span>
          </div>
        </div>

        {isClueDiscovered ? (
          <span className="font-mono text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> CLUE 3 [I] DECODED
          </span>
        ) : (
          <span className="font-mono text-[11px] text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30">
            TREASURE HUNT CLUE 3
          </span>
        )}
      </div>

      {/* 3x3 Minecraft Voxel Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto my-6 p-4 rounded-xl bg-black/60 border border-white/10 shadow-inner">
        {blocks.map((block) => {
          const damageRatio = block.currentHits / block.hitsRequired;

          return (
            <div
              key={block.id}
              onClick={() => mineBlock(block.id)}
              className={`relative aspect-square rounded-sm border-2 p-2 flex flex-col justify-between items-center text-center cursor-pointer transition-transform duration-100 active:scale-95 select-none ${
                block.isBroken
                  ? 'bg-neutral-950 border-neutral-800 opacity-25 cursor-not-allowed pointer-events-none'
                  : getBlockStyle(block.type)
              }`}
            >
              {/* Voxel pixel texture grid pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] opacity-15 pointer-events-none" />

              {/* Block header name */}
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase truncate max-w-full">
                {block.name}
              </span>

              {/* Center Icon */}
              <div className="my-auto">
                <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6 opacity-75 group-hover:opacity-100" />
              </div>

              {/* Durability bar */}
              <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-emerald-400 transition-all duration-150"
                  style={{ width: `${(1 - damageRatio) * 100}%` }}
                />
              </div>

              {/* Cracking overlay representation */}
              {damageRatio > 0 && !block.isBroken && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center font-mono text-xs font-bold text-white/90">
                  {block.hitsRequired - block.currentHits} HITS
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mining Notification / Drop Alert */}
      {lastDrop && (
        <div className="text-center font-mono text-xs text-amber-300 animate-bounce mb-4 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lastDrop}</span>
        </div>
      )}

      {/* Inventory Bar */}
      <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-400">Inventory:</span>
          {Object.entries(inventory).length > 0 ? (
            Object.entries(inventory).map(([item, count]) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded bg-obsidian-900 border border-white/10 text-white font-bold"
              >
                {item}: <span className="text-gold-400">{count}</span>
              </span>
            ))
          ) : (
            <span className="text-gray-400">Empty (Click blocks to mine)</span>
          )}
        </div>

        <GoldButton variant="carbon" size="sm" onClick={resetMine} icon={<RotateCcw className="w-3.5 h-3.5" />}>
          REGENERATE VEIN
        </GoldButton>
      </div>
    </div>
  );
};
