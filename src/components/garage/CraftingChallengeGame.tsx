import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Hammer,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  Play,
  Flame,
} from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';
import { pureShuffle } from '../../utils/shuffle';

interface Ingredient {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface RecipeRound {
  id: number;
  targetName: string;
  targetIcon: string;
  targetCategory: string;
  description: string;
  required: Record<string, number>;
  difficulty: 'Novice' | 'Apprentice' | 'Journeyman' | 'Master' | 'Legendary';
  hint: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: 'stick', name: 'Stick', icon: '🥢', color: 'border-amber-700 bg-amber-950/40 text-amber-300' },
  { id: 'cobblestone', name: 'Cobblestone', icon: '🪨', color: 'border-stone-500 bg-stone-900/60 text-stone-300' },
  { id: 'iron_ingot', name: 'Iron Ingot', icon: '⛓️', color: 'border-zinc-400 bg-zinc-900/60 text-zinc-200' },
  { id: 'gold_ingot', name: 'Gold Ingot', icon: '🪙', color: 'border-yellow-500 bg-yellow-950/40 text-yellow-300' },
  { id: 'diamond', name: 'Diamond', icon: '💎', color: 'border-cyan-400 bg-cyan-950/40 text-cyan-300' },
  { id: 'netherite_ingot', name: 'Netherite Ingot', icon: '⬛', color: 'border-purple-600 bg-purple-950/40 text-purple-300' },
  { id: 'apple', name: 'Red Apple', icon: '🍎', color: 'border-red-500 bg-red-950/40 text-red-300' },
  { id: 'string', name: 'String', icon: '🧵', color: 'border-neutral-400 bg-neutral-900/60 text-neutral-300' },
  { id: 'wood_plank', name: 'Oak Plank', icon: '🪵', color: 'border-amber-600 bg-amber-950/40 text-amber-200' },
  { id: 'diamond_chestplate', name: 'Diamond Armour', icon: '🛡️', color: 'border-cyan-500 bg-cyan-950/50 text-cyan-200' },
  { id: 'blaze_powder', name: 'Blaze Powder', icon: '🔥', color: 'border-orange-500 bg-orange-950/40 text-orange-300' },
  { id: 'ender_pearl', name: 'Ender Pearl', icon: '🔮', color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300' },
];

const RECIPES: RecipeRound[] = [
  {
    id: 1,
    targetName: 'Diamond Sword',
    targetIcon: '🗡️',
    targetCategory: 'WEAPONS & TOOLS',
    description: 'The iconic blade of legends. Sharp enough to pierce the Ender Dragon.',
    required: { diamond: 2, stick: 1 },
    difficulty: 'Novice',
    hint: '2 Diamonds stacked above 1 Stick',
  },
  {
    id: 2,
    targetName: 'Golden Apple',
    targetIcon: '🍏',
    targetCategory: 'CONSUMABLES',
    description: 'Enchanted sustenance granting Regeneration II and Absorption.',
    required: { apple: 1, gold_ingot: 8 },
    difficulty: 'Apprentice',
    hint: '1 Red Apple surrounded by 8 Gold Ingots',
  },
  {
    id: 3,
    targetName: 'Combat Shield',
    targetIcon: '🛡️',
    targetCategory: 'DEFENCE',
    description: 'Deflects incoming skeleton arrows and creeper blast shockwaves.',
    required: { wood_plank: 6, iron_ingot: 1 },
    difficulty: 'Journeyman',
    hint: '6 Oak Planks with 1 Iron Ingot reinforcement',
  },
  {
    id: 4,
    targetName: 'Hunting Bow',
    targetIcon: '🏹',
    targetCategory: 'RANGED WEAPONS',
    description: 'Long-range sniper weapon strung with spider silk and carved branches.',
    required: { stick: 3, string: 3 },
    difficulty: 'Master',
    hint: '3 Sticks curved with 3 Strings',
  },
  {
    id: 5,
    targetName: 'Eye of Ender',
    targetIcon: '👁️',
    targetCategory: 'MYSTICAL ARTEFACT',
    description: 'Locates the subterranean Stronghold portal to the End dimension.',
    required: { ender_pearl: 1, blaze_powder: 1 },
    difficulty: 'Legendary',
    hint: '1 Ender Pearl infused with 1 Blaze Powder',
  },
];

type GamePhase = 'intro' | 'playing' | 'roundSuccess' | 'gameOver';

export const CraftingChallengeGame: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [recipes, setRecipes] = useState<RecipeRound[]>(() => pureShuffle(RECIPES));
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [selectedCounts, setSelectedCounts] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const timerRef = useRef<number | null>(null);
  const currentRecipe = recipes[roundIdx] || recipes[0];

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStartGame = () => {
    soundFx.playUiClick();
    setRecipes(pureShuffle(RECIPES));
    setPhase('playing');
    setRoundIdx(0);
    setScore(0);
    setStreak(0);
    setSelectedCounts({});
    setTimeLeft(25);
    setFeedback(null);
  };

  const handleNextRound = useCallback(() => {
    if (roundIdx + 1 < recipes.length) {
      setRoundIdx((prev) => prev + 1);
      setSelectedCounts({});
      setTimeLeft(25);
      setPhase('playing');
      setFeedback(null);
    } else {
      clearTimer();
      setPhase('gameOver');
      soundFx.playVaultFanfare();
    }
  }, [roundIdx, recipes.length]);

  // Round timer countdown
  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            // Time out on this round
            setFeedback({ message: `Time ran out! Recipe was: ${currentRecipe.hint}`, isError: true });
            soundFx.playUiClick();
            setStreak(0);
            window.setTimeout(() => {
              handleNextRound();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [phase, currentRecipe, handleNextRound]);

  const addIngredient = (id: string) => {
    if (phase !== 'playing') return;
    soundFx.playMiningHit();
    setSelectedCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setFeedback(null);
  };

  const removeIngredient = (id: string) => {
    if (phase !== 'playing') return;
    soundFx.playUiClick();
    setSelectedCounts((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
    setFeedback(null);
  };

  const clearBench = () => {
    soundFx.playUiClick();
    setSelectedCounts({});
    setFeedback(null);
  };

  const handleCraft = () => {
    if (phase !== 'playing') return;

    // Check if selected ingredients match currentRecipe.required exactly
    const req = currentRecipe.required;
    const reqKeys = Object.keys(req);
    const selKeys = Object.keys(selectedCounts).filter((k) => selectedCounts[k] > 0);

    const matchesAllKeys =
      reqKeys.length === selKeys.length &&
      reqKeys.every((k) => (selectedCounts[k] || 0) === req[k]);

    if (matchesAllKeys) {
      // Success!
      soundFx.playDiamondFound();
      const timeBonus = timeLeft * 10;
      const roundScore = 200 + timeBonus + (streak * 50);
      setScore((prev) => prev + roundScore);
      setStreak((prev) => prev + 1);
      setPhase('roundSuccess');
      setFeedback({
        message: `✓ CRAFTED SUCCESS! +${roundScore} pts (${currentRecipe.targetName})`,
        isError: false,
      });

      window.setTimeout(() => {
        handleNextRound();
      }, 1600);
    } else {
      // Incorrect combination
      soundFx.playUiClick();
      setStreak(0);

      // Helpful hint
      let detail = 'Incorrect materials!';
      const missingKeys = reqKeys.filter((k) => (selectedCounts[k] || 0) < req[k]);
      const excessKeys = selKeys.filter((k) => !req[k] || selectedCounts[k] > req[k]);

      if (missingKeys.length > 0) {
        const item = INGREDIENTS.find((i) => i.id === missingKeys[0]);
        detail = `Need more ${item?.name || 'materials'}!`;
      } else if (excessKeys.length > 0) {
        const item = INGREDIENTS.find((i) => i.id === excessKeys[0]);
        detail = `Too many ${item?.name || 'items'} on the bench!`;
      }

      setFeedback({
        message: `Crafting Failed: ${detail}`,
        isError: true,
      });
    }
  };

  const getRankDetails = (finalScore: number) => {
    if (finalScore >= 1600) {
      return { rank: 'NETHERITE GRANDMASTER CRAFTER', color: 'text-purple-400', desc: 'Flawless crafting intuition. You could survive Hardcore mode blindfolded!' };
    }
    if (finalScore >= 1100) {
      return { rank: 'DIAMOND TIER ENGINEER', color: 'text-cyan-400', desc: 'Exceptional recipe recall! Your survival base is fully automated.' };
    }
    if (finalScore >= 600) {
      return { rank: 'IRON GOLEM BLACKSMITH', color: 'text-gold-300', desc: 'Solid crafting knowledge. You survived the first night and built an anvil.' };
    }
    return { rank: 'WOODEN PICKAXE ROOKIE', color: 'text-amber-400', desc: 'Punching oak trees is honest work. Practice makes perfect!' };
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-5 sm:p-7 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400/60" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
            <Hammer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              CRAFT IT OR LOSE IT
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              MINECRAFT CRAFTING CHALLENGE • 5 PROGRESSIVE ROUNDS
            </span>
          </div>
        </div>

        {phase === 'playing' && (
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-gray-400">
              Round <span className="text-white font-bold">{roundIdx + 1}/{recipes.length}</span>
            </span>
            <span className="text-gold-400">
              Score: <span className="text-white font-bold">{score}</span>
            </span>
          </div>
        )}
      </div>

      {/* Phase 1: Intro Screen */}
      {phase === 'intro' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            🧱
          </div>

          <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            THE 3x3 CRAFTING WORKBENCH
          </h4>

          <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
            Test your Minecraft recipe knowledge! In each round, you will be tasked with forging a legendary item. Select the exact ingredients and craft before the countdown expires.
          </p>

          <div className="p-3 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-gray-400 space-y-1 text-left">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CRAFTING RULES:</span>
            </div>
            <p>• 5 Rounds: Tools, Weapons, Armor, &amp; Mystic Artifacts</p>
            <p>• Faster crafts yield massive time bonus points</p>
            <p>• Incorrect ratios or extra items will fail the recipe</p>
          </div>

          <div className="pt-2">
            <GoldButton variant="gold-solid" size="lg" onClick={handleStartGame} icon={<Play className="w-4 h-4 ml-0.5" />}>
              ENTER CRAFTING BENCH
            </GoldButton>
          </div>
        </div>
      )}

      {/* Phase 2: Playing & RoundSuccess Screen */}
      {(phase === 'playing' || phase === 'roundSuccess') && (
        <div className="space-y-5 animate-fadeIn">
          {/* Target Recipe HUD Card */}
          <div className="p-4 rounded-xl border border-gold-500/30 bg-gradient-to-r from-obsidian-900 to-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-xl border-2 border-gold-400 bg-gold-500/10 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(212,175,55,0.25)] shrink-0 animate-pulse">
                {currentRecipe.targetIcon}
              </div>

              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
                    {currentRecipe.difficulty}
                  </span>
                  <span className="font-mono text-[9px] uppercase text-gray-400">
                    {currentRecipe.targetCategory}
                  </span>
                </div>

                <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase mt-0.5">
                  TARGET: {currentRecipe.targetName}
                </h4>

                <p className="text-xs text-gray-300 font-mono mt-0.5 line-clamp-1">
                  {currentRecipe.description}
                </p>
              </div>
            </div>

            {/* Timer Pill */}
            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 font-mono">
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                timeLeft <= 5
                  ? 'border-red-500 bg-red-950/60 text-red-400 animate-bounce'
                  : 'border-white/10 bg-black/60 text-gold-400'
              }`}>
                <span>⏱️ {timeLeft}s</span>
              </div>
              {streak > 1 && (
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-500" /> {streak}x STREAK
                </span>
              )}
            </div>
          </div>

          {/* Active Crafting Table (Bench) */}
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-400">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-white font-bold">
                <Hammer className="w-3.5 h-3.5 text-gold-400" />
                CRAFTING BENCH MATERIALS ({Object.values(selectedCounts).reduce((a, b) => a + b, 0)} Items)
              </span>

              {Object.keys(selectedCounts).length > 0 && (
                <button
                  onClick={clearBench}
                  className="text-red-400 hover:text-red-300 text-[11px] underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Bench Slot Displays */}
            <div className="min-h-[72px] p-3 rounded-lg bg-black/70 border border-dashed border-white/20 flex flex-wrap items-center gap-2 justify-center">
              {Object.keys(selectedCounts).length === 0 ? (
                <p className="text-xs font-mono text-gray-500 italic">
                  Bench is empty. Click ingredients below to add them to the recipe.
                </p>
              ) : (
                Object.entries(selectedCounts).map(([ingId, count]) => {
                  const item = INGREDIENTS.find((i) => i.id === ingId);
                  if (!item || count <= 0) return null;

                  return (
                    <button
                      key={ingId}
                      onClick={() => removeIngredient(ingId)}
                      title={`Click to remove 1 ${item.name}`}
                      className="px-3 py-1.5 rounded-lg border border-gold-500/40 bg-gold-500/10 text-white flex items-center gap-2 hover:bg-red-950/40 hover:border-red-500/50 transition-all cursor-pointer group"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="font-mono text-xs font-bold">{item.name}</span>
                      <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-black text-gold-400 font-bold">
                        x{count}
                      </span>
                      <span className="text-[10px] text-red-400 opacity-0 group-hover:opacity-100 font-mono ml-0.5">
                        ✕
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-gray-400">
                <span className="text-gold-400 font-bold">Recipe Hint:</span> {currentRecipe.hint}
              </div>

              <GoldButton
                variant="gold-solid"
                size="sm"
                onClick={handleCraft}
                disabled={Object.keys(selectedCounts).length === 0 || phase === 'roundSuccess'}
                icon={<Hammer className="w-3.5 h-3.5" />}
              >
                FORGE ITEM
              </GoldButton>
            </div>

            {/* Live Feedback Banner */}
            {feedback && (
              <div
                className={`mt-3 p-2.5 rounded-lg border text-center font-mono text-xs animate-fadeIn ${
                  feedback.isError
                    ? 'border-red-500/50 bg-red-950/50 text-red-300 flex items-center justify-center gap-1.5'
                    : 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300 flex items-center justify-center gap-1.5'
                }`}
              >
                {feedback.isError ? <XCircle className="w-4 h-4 text-red-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

          {/* Ingredient Inventory Tray */}
          <div>
            <h5 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2.5 flex items-center justify-between">
              <span>AVAILABLE INGREDIENTS (CLICK TO ADD):</span>
              <span className="text-[10px] text-gray-500">Inventory Slot Selector</span>
            </h5>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
              {INGREDIENTS.map((item) => {
                const isSelected = (selectedCounts[item.id] || 0) > 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => addIngredient(item.id)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-gold-400 bg-obsidian-900 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'border-white/10 bg-obsidian-950 hover:border-white/30 hover:bg-obsidian-900'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="font-mono text-[11px] font-bold text-gray-200 line-clamp-1">
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] text-gray-400 mt-0.5">
                      {selectedCounts[item.id] ? `x${selectedCounts[item.id]} in bench` : '+ Add'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Game Over Screen */}
      {phase === 'gameOver' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full border-2 border-gold-400 bg-gold-500/20 flex items-center justify-center text-gold-300 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block">
            CHALLENGE COMPLETE • ALL 5 ROUNDS CONQUERED
          </span>

          <h4 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
            CRAFTING BENCH RESULTS
          </h4>

          <div className="font-display text-4xl sm:text-5xl font-black gold-text-gradient">
            {score} <span className="font-mono text-lg text-gold-400 font-bold">PTS</span>
          </div>

          {(() => {
            const rank = getRankDetails(score);
            return (
              <div className="p-4 rounded-xl bg-obsidian-900 border border-gold-500/30">
                <span className={`font-display text-base font-bold uppercase ${rank.color} block`}>
                  {rank.rank}
                </span>
                <p className="text-xs text-gray-300 font-mono mt-1">
                  {rank.desc}
                </p>
              </div>
            );
          })()}

          <div className="pt-3 flex items-center justify-center gap-3">
            <GoldButton variant="gold-solid" size="md" onClick={handleStartGame} icon={<RotateCcw className="w-4 h-4" />}>
              PLAY AGAIN
            </GoldButton>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="text-emerald-400">ARCADE SERIES • 100% VANILLA MINECRAFT RECIPES</span>
        <span className="text-gold-400">CRAFT IT OR LOSE IT</span>
      </div>
    </div>
  );
};
