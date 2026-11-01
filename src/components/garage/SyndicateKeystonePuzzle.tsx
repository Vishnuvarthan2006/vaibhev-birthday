import React, { useState, useCallback } from 'react';
import { Users, CheckCircle2, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';

interface SyndicateKeystonePuzzleProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

const FRIENDS = [
  'Aarav',
  'Kabir',
  'Rohan',
  'Siddharth',
  'Arjun',
  'Vikram',
  'Dev',
  'Aditya',
  'Nakul',
];

export const SyndicateKeystonePuzzle: React.FC<SyndicateKeystonePuzzleProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [connectedFriends, setConnectedFriends] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(isClueDiscovered);

  const toggleFriend = useCallback(
    (name: string) => {
      soundFx.playUiClick();
      if (isCompleted) return;

      const next = connectedFriends.includes(name)
        ? connectedFriends.filter((f) => f !== name)
        : [...connectedFriends, name];

      setConnectedFriends(next);

      if (next.length === FRIENDS.length) {
        setIsCompleted(true);
        soundFx.playSecretUnlocked();
        if (onClueUnlocked) {
          onClueUnlocked();
        }
      }
    },
    [connectedFriends, isCompleted, onClueUnlocked]
  );

  const handleConnectAll = () => {
    soundFx.playUiClick();
    setConnectedFriends(FRIENDS);
    setIsCompleted(true);
    soundFx.playSecretUnlocked();
    if (onClueUnlocked) {
      onClueUnlocked();
    }
  };

  const resetPuzzle = () => {
    soundFx.playUiClick();
    setConnectedFriends([]);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-6 sm:p-8 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              THE 9-SQUAD SYNDICATE KEYSTONE
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              ACTIVATE ALL 9 BROTHERHOOD SIGNALS TO FORGE CLUE 9
            </span>
          </div>
        </div>

        {isClueDiscovered || isCompleted ? (
          <span className="font-mono text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> CLUE 9 [4] DECODED
          </span>
        ) : (
          <span className="font-mono text-[11px] text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30">
            TREASURE HUNT CLUE 9
          </span>
        )}
      </div>

      {/* Syndicate Grid */}
      <div className="my-6">
        <p className="text-xs text-gray-300 font-mono text-center mb-4 max-w-md mx-auto">
          9 friends who would cross continents for you. Tap each friend's callsign to complete the
          syndicate keystone:
        </p>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-lg mx-auto">
          {FRIENDS.map((name, idx) => {
            const isConnected = connectedFriends.includes(name) || isCompleted;

            return (
              <button
                key={name}
                onClick={() => toggleFriend(name)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isConnected
                    ? 'bg-gradient-to-br from-gold-500/25 to-amber-600/25 border-gold-400 text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.25)] scale-[1.02]'
                    : 'bg-obsidian-900 border-white/10 text-gray-400 hover:border-gold-500/40 hover:text-white'
                }`}
              >
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-mono mb-1">
                  {isConnected ? <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" /> : `#${idx + 1}`}
                </div>
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion message */}
      {isCompleted ? (
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/40 text-center animate-fadeIn my-4">
          <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
            <Heart className="w-4 h-4 fill-gold-400" />
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wide">
            THE 9-FRIEND SYNDICATE IS FULLY SYNCHRONIZED
          </h4>
          <p className="text-xs text-gold-300/90 font-mono mt-1">
            "One legend. Nine brothers. Countless memories." Clue 9 [4] has been locked into the
            master cipher!
          </p>
        </div>
      ) : (
        <div className="text-center my-4">
          <button
            onClick={handleConnectAll}
            className="text-xs font-mono text-gold-400/80 hover:text-gold-300 underline cursor-pointer"
          >
            Connect All 9 Instantly
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span>Active Signals: {isCompleted ? '9/9 (100%)' : `${connectedFriends.length}/9`}</span>
        <button
          onClick={resetPuzzle}
          className="text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset Grid
        </button>
      </div>
    </div>
  );
};
