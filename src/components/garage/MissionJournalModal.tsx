import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  Sparkles,
  ChevronDown,
  MapPin,
  Flame,
} from 'lucide-react';
import { useTreasureHunt } from '../../hooks/useTreasureHunt';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';

interface MissionJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVault?: () => void;
}

export const MissionJournalModal: React.FC<MissionJournalModalProps> = ({
  isOpen,
  onClose,
  onOpenVault,
}) => {
  const {
    allClues,
    isClueDiscovered,
    totalDiscovered,
    totalClues,
    word1Letters,
    word2Letters,
    hasBlueprint,
    isAllDiscovered,
    isVaultUnlocked,
    unlockVault,
    verifyAndUnlock,
    revealHint,
    getHintLevel,
  } = useTreasureHunt();

  const [manualCode, setManualCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleManualUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyAndUnlock(manualCode);
    if (success) {
      setCodeError(false);
      if (onOpenVault) onOpenVault();
    } else {
      soundFx.playUiClick();
      setCodeError(true);
    }
  };

  const progressPercent = Math.round((totalDiscovered / totalClues) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Operation Vaibhev Mission Journal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 select-none animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playUiClick();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl lg:max-w-5xl rounded-2xl bg-obsidian-950 border border-gold-500/40 shadow-[0_0_80px_rgba(212,175,55,0.2)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-obsidian-900/90 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide uppercase">
                OPERATION VAIBHEV • MISSION JOURNAL
              </h2>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mt-0.5">
                9 SECRET CLUES • UNLOCK THE MASTERMIND CIPHER
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playUiClick();
              onClose();
            }}
            title="Close Mission Journal"
            className="p-2 rounded-full border border-gold-500/40 text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Mission Progress HUD */}
          <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900/80 border border-gold-500/25">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs sm:text-sm text-gold-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                CIPHER RECONSTRUCTION STATUS
              </span>
              <span className="font-mono text-xs sm:text-sm text-white font-bold">
                {totalDiscovered} / {totalClues} ({progressPercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-white/10 mb-5">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-gold-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Cipher Ribbon (Two Words: M E G A + M I N D) */}
            <div className="space-y-4 my-2">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                {/* Word 1: M - E - G - A */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  {word1Letters.map((char, idx) => {
                    const isFound = char !== '·';
                    return (
                      <div
                        key={`w1-${idx}`}
                        className={`w-11 h-14 sm:w-14 sm:h-18 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isFound
                            ? 'border-gold-400 bg-gold-500/20 text-gold-200 font-display font-black text-2xl sm:text-3xl shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                            : 'border-white/10 bg-black/60 text-gray-500 font-mono text-base sm:text-lg'
                        }`}
                      >
                        <span>{char}</span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 mt-0.5">
                          W1-#{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="hidden sm:block text-gold-500/50 font-bold text-2xl">•</div>

                {/* Word 2: M - I - N - D */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  {word2Letters.map((char, idx) => {
                    const isFound = char !== '·';
                    return (
                      <div
                        key={`w2-${idx}`}
                        className={`w-11 h-14 sm:w-14 sm:h-18 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isFound
                            ? 'border-gold-400 bg-gold-500/20 text-gold-200 font-display font-black text-2xl sm:text-3xl shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                            : 'border-white/10 bg-black/60 text-gray-500 font-mono text-base sm:text-lg'
                        }`}
                      >
                        <span>{char}</span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 mt-0.5">
                          W2-#{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Master Blueprint Status */}
              <div
                className={`p-3 rounded-xl border text-center font-mono text-xs sm:text-sm transition-colors ${
                  hasBlueprint
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                    : 'border-white/10 bg-black/40 text-gray-400'
                }`}
              >
                {hasBlueprint ? (
                  <span className="flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    MASTER BLUEPRINT UNLOCKED: "TWO WORDS [4 + 4 LETTERS]"
                  </span>
                ) : (
                  <span>🔒 MASTER BLUEPRINT LOCKED: Complete the Syndicate Keystone</span>
                )}
              </div>
            </div>
          </div>

          {/* Clues Breakdown List */}
          <div>
            <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
              THE NINE SECRET TRANSMISSIONS &amp; RIDDLES:
            </h3>

            <div className="space-y-3">
              {allClues.map((clue) => {
                const isDiscovered = isClueDiscovered(clue.id);
                const hintLevel = getHintLevel(clue.id);

                return (
                  <div
                    key={clue.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isDiscovered
                        ? 'bg-obsidian-900/90 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : 'bg-obsidian-950 border-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5 flex-1">
                        <span className="text-2xl sm:text-3xl mt-0.5">{clue.symbol}</span>
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs text-gold-400 font-bold uppercase px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/30">
                              CLUE 0{clue.number}
                            </span>
                            <span className="font-mono text-xs text-gray-400 uppercase">
                              {clue.locationName}
                            </span>
                            {isDiscovered && (
                              <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                                DECODED: [{clue.revealedFragment}]
                              </span>
                            )}
                          </div>

                          <h4 className="font-display text-base sm:text-lg font-bold text-white">
                            {clue.title}
                          </h4>

                          {/* Cryptic Riddle */}
                          <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs sm:text-sm text-gold-300/90 leading-relaxed">
                            <span className="text-gold-400 font-bold">Riddle:</span> "{clue.crypticRiddle}"
                          </div>

                          {/* Hints Drawer */}
                          <div className="space-y-2 pt-1">
                            {hintLevel >= 1 ? (
                              <div className="p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs sm:text-sm font-mono text-gray-300 flex items-start gap-2 animate-fadeIn">
                                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-gold-400 font-bold">Hint 1 (Location):</span> {clue.hint1}
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => revealHint(clue.id, 1)}
                                className="text-xs font-mono text-gold-400/80 hover:text-gold-300 underline flex items-center gap-1 cursor-pointer"
                              >
                                <ChevronDown className="w-3.5 h-3.5" /> Reveal Hint 1 (Location)
                              </button>
                            )}

                            {hintLevel >= 2 ? (
                              <div className="p-2.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs sm:text-sm font-mono text-gray-300 flex items-start gap-2 animate-fadeIn">
                                <Flame className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-red-400 font-bold">Hint 2 (Interaction):</span> {clue.hint2}
                                </div>
                              </div>
                            ) : hintLevel >= 1 ? (
                              <button
                                onClick={() => revealHint(clue.id, 2)}
                                className="text-xs font-mono text-red-400/80 hover:text-red-300 underline flex items-center gap-1 cursor-pointer"
                              >
                                <ChevronDown className="w-3.5 h-3.5" /> Reveal Hint 2 (Interaction)
                              </button>
                            ) : null}
                          </div>

                          {isDiscovered && (
                            <p className="text-xs sm:text-sm text-emerald-300/90 font-mono pt-1">
                              ✓ {clue.flavorText}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        {isDiscovered ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <HelpCircle className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Master Vault Trigger / Manual Override */}
          <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-900 border border-white/10">
            {isVaultUnlocked ? (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm sm:text-base font-bold uppercase mb-2">
                  <Unlock className="w-5 h-5" /> GRAND VAULT ACCESS AUTHORIZED
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-mono mb-4">
                  All 9 clues are synchronized. The syndicate's ultimate birthday tribute is unlocked!
                </p>
                <GoldButton
                  variant="gold-solid"
                  size="lg"
                  onClick={() => {
                    soundFx.playVaultFanfare();
                    if (onOpenVault) onOpenVault();
                    onClose();
                  }}
                  icon={<KeyRound className="w-4 h-4" />}
                >
                  ENTER THE FINAL VAULT
                </GoldButton>
              </div>
            ) : isAllDiscovered ? (
              <div className="text-center py-2">
                <span className="font-mono text-sm sm:text-base text-gold-400 uppercase font-bold block mb-1">
                  ALL 9 CLUES ASSEMBLED!
                </span>
                <p className="text-xs sm:text-sm text-gray-300 font-mono mb-4">
                  The two-word syndicate password [MEGA MIND] is fully pieced together. Enter it below or open the vault:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <GoldButton
                    variant="gold-solid"
                    size="lg"
                    onClick={() => {
                      unlockVault();
                      if (onOpenVault) onOpenVault();
                      onClose();
                    }}
                    icon={<Unlock className="w-4 h-4" />}
                  >
                    UNLOCK FINAL VAULT
                  </GoldButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualUnlock} className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-left">
                  <label htmlFor="manual-vault-code" className="font-mono text-xs sm:text-sm text-gray-300 font-bold uppercase flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-gold-400" />
                    DECRYPT CIPHER (TWO WORDS)
                  </label>
                  <p className="text-xs text-gray-400 font-mono">
                    Already deduced the final answer from the clues? Enter it directly:
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <input
                    id="manual-vault-code"
                    type="text"
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value.toUpperCase());
                      setCodeError(false);
                    }}
                    placeholder="E.G. MEGA MIND"
                    maxLength={12}
                    className="w-full sm:w-48 px-3.5 py-2.5 rounded-lg bg-black/80 border border-white/20 font-mono text-sm sm:text-base text-gold-300 placeholder-gray-500 uppercase tracking-widest focus:outline-hidden focus:border-gold-400 text-center font-bold"
                  />
                  <GoldButton variant="gold-outline" size="md" type="submit">
                    UNLOCK
                  </GoldButton>
                </div>
                {codeError && (
                  <span className="text-xs text-red-400 font-mono block sm:hidden">
                    Incorrect code. Review clues above!
                  </span>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
