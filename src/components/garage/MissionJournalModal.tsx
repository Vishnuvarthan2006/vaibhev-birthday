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
    cipherLetters,
    isAllDiscovered,
    isVaultUnlocked,
    unlockVault,
    masterCode,
  } = useTreasureHunt();

  const [manualCode, setManualCode] = useState<string>('');
  const [codeError, setCodeError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleManualUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim().toUpperCase() === masterCode) {
      unlockVault();
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
      <div className="relative w-full max-w-3xl rounded-xl bg-obsidian-950 border border-gold-500/40 shadow-[0_0_80px_rgba(212,175,55,0.2)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-obsidian-900/90 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
                OPERATION VAIBHEV • MISSION JOURNAL
              </h2>
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                9 SCUDERIA CLUES SCATTERED ACROSS THE ARCHIVE
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playUiClick();
              onClose();
            }}
            title="Close Mission Journal"
            className="p-1.5 rounded-full border border-gold-500/40 text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Mission Progress HUD */}
          <div className="p-4 sm:p-5 rounded-xl bg-obsidian-900/80 border border-gold-500/25">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                CIPHER RECONSTRUCTION STATUS
              </span>
              <span className="font-mono text-xs text-white font-bold">
                {totalDiscovered} / {totalClues} ({progressPercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/10 mb-4">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-gold-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Cipher Ribbon (V A I B H E V 4 4) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 my-2">
              {cipherLetters.map((char, idx) => {
                const isFound = char !== '·';
                return (
                  <div
                    key={idx}
                    className={`w-8 h-10 sm:w-11 sm:h-13 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      isFound
                        ? 'border-gold-400 bg-gold-500/20 text-gold-200 font-display font-black text-lg sm:text-2xl shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                        : 'border-white/10 bg-black/60 text-gray-400 font-mono text-sm sm:text-base'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 mt-0.5">
                      #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clues Breakdown List */}
          <div>
            <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
              THE NINE SECRET TRANSMISSIONS:
            </h3>

            <div className="space-y-2.5">
              {allClues.map((clue) => {
                const isDiscovered = isClueDiscovered(clue.id);

                return (
                  <div
                    key={clue.id}
                    className={`p-3.5 sm:p-4 rounded-lg border transition-all ${
                      isDiscovered
                        ? 'bg-obsidian-900/90 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : 'bg-obsidian-950 border-white/[0.06] opacity-85'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xl sm:text-2xl mt-0.5">{clue.symbol}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-gray-400 uppercase">
                              CLUE #{clue.number} • {clue.locationName}
                            </span>
                            {isDiscovered && (
                              <span className="font-mono text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950/60 border border-emerald-500/30">
                                DECODED: [{clue.cipherLetter}]
                              </span>
                            )}
                          </div>

                          <h4 className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
                            {clue.title}
                          </h4>

                          {isDiscovered ? (
                            <p className="text-xs text-emerald-300/90 font-mono mt-1">
                              ✓ {clue.flavorText}
                            </p>
                          ) : (
                            <p className="text-xs text-gold-400/80 font-mono mt-1 italic">
                              💡 Riddle: {clue.riddleHint}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 mt-1">
                        {isDiscovered ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <HelpCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Master Vault Trigger / Manual Override */}
          <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10">
            {isVaultUnlocked ? (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold uppercase mb-2">
                  <Unlock className="w-5 h-5" /> GRAND VAULT ACCESS AUTHORIZED
                </div>
                <p className="text-xs text-gray-300 font-mono mb-4">
                  All 9 clues are synchronized. The syndicate's ultimate birthday tribute is unlocked!
                </p>
                <GoldButton
                  variant="gold-solid"
                  size="md"
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
                <span className="font-mono text-xs text-gold-400 uppercase font-bold block mb-1">
                  ALL 9 CLUES ASSEMBLED!
                </span>
                <p className="text-xs text-gray-300 font-mono mb-4">
                  The full cipher [VAIBHEV44] is complete. Click below to unlock the final vault:
                </p>
                <GoldButton
                  variant="gold-solid"
                  size="md"
                  onClick={() => {
                    unlockVault();
                    if (onOpenVault) onOpenVault();
                    onClose();
                  }}
                  icon={<Unlock className="w-4 h-4" />}
                >
                  DECRYPT & OPEN FINAL VAULT
                </GoldButton>
              </div>
            ) : (
              <form onSubmit={handleManualUnlock} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 text-left">
                  <label htmlFor="manual-vault-code" className="font-mono text-xs text-gray-300 font-bold uppercase flex items-center gap-1.5 mb-1">
                    <Lock className="w-3.5 h-3.5 text-gold-400" />
                    MANUAL CIPHER OVERRIDE
                  </label>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Already deduced the 9-character syndicate code? Enter it directly:
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    id="manual-vault-code"
                    type="text"
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value.toUpperCase());
                      setCodeError(false);
                    }}
                    placeholder="E.G. VAIBHEV44"
                    maxLength={10}
                    className="w-full sm:w-36 px-3 py-2 rounded bg-black/80 border border-white/20 font-mono text-sm text-gold-300 placeholder-gray-500 uppercase tracking-widest focus:outline-hidden focus:border-gold-400 text-center"
                  />
                  <GoldButton variant="gold-outline" size="sm" type="submit">
                    UNLOCK
                  </GoldButton>
                </div>
                {codeError && (
                  <span className="text-[11px] text-red-400 font-mono block sm:hidden">
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
