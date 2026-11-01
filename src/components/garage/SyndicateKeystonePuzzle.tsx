import React, { useState, useCallback } from 'react';
import { Users, CheckCircle2, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { pureShuffle } from '../../utils/shuffle';

interface SyndicateKeystonePuzzleProps {
  onClueUnlocked?: () => void;
  isClueDiscovered?: boolean;
}

const FRIENDS = [
  'Vishnu',
  'Santhosh',
  'Akshaya',
  'Deepthi',
  'Sanjitha',
  'Savitha',
  'Sathiya',
  'Thiru',
  'Rashmika',
];

export const SyndicateKeystonePuzzle: React.FC<SyndicateKeystonePuzzleProps> = ({
  onClueUnlocked,
  isClueDiscovered = false,
}) => {
  const [friendsList, setFriendsList] = useState<string[]>(() => pureShuffle(FRIENDS));
  const [connectedFriends, setConnectedFriends] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(isClueDiscovered);

  const toggleFriend = useCallback(
    (name: string) => {
      soundFx.playUiClick();
      if (isCompleted) return;

      const next = connectedFriends.includes(name)
        ? connectedFriends.filter((f: string) => f !== name)
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
    setFriendsList(pureShuffle(FRIENDS));
    setConnectedFriends([]);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-gold-500/30 bg-obsidian-950 p-6 sm:p-10 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4.5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-xl font-bold text-white tracking-wide uppercase">
              THE SYNDICATE KEYSTONE
            </h3>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mt-0.5">
              ACTIVATE ALL 9 SYNDICATE SIGNALS TO UNLOCK THE MASTER BLUEPRINT
            </span>
          </div>
        </div>

        {isClueDiscovered || isCompleted ? (
          <span className="font-mono text-xs text-emerald-400 px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> MASTER BLUEPRINT DECODED ✓
          </span>
        ) : (
          <span className="font-mono text-xs text-gold-400 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30">
            CLUE 05 • KEYSTONE
          </span>
        )}
      </div>

      {/* Syndicate Grid */}
      <div className="my-6">
        <p className="text-xs sm:text-sm text-gray-300 font-mono text-center mb-5 max-w-lg mx-auto">
          9 friends who would cross continents for you. Tap each friend's callsign to assemble the
          syndicate keystone:
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
          {friendsList.map((name, idx) => {
            const isConnected = connectedFriends.includes(name) || isCompleted;

            return (
              <button
                key={name}
                onClick={() => toggleFriend(name)}
                className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isConnected
                    ? 'bg-gradient-to-br from-gold-500/25 to-amber-600/25 border-gold-400 text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.25)] scale-[1.02]'
                    : 'bg-obsidian-900 border-white/10 text-gray-400 hover:border-gold-500/40 hover:text-white'
                }`}
              >
                <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono mb-1.5">
                  {isConnected ? <CheckCircle2 className="w-4 h-4 text-gold-400" /> : `#${idx + 1}`}
                </div>
                <span className="font-display text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">
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
            MASTER BLUEPRINT UNLOCKED
          </h4>
          <p className="text-xs text-gold-300/90 font-mono mt-1">
            "TWO WORDS: [4 + 4 LETTERS]" — Blueprint reveals the cipher architecture!
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
