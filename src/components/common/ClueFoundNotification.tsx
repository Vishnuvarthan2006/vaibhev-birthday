import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { TREASURE_CLUES } from '../../data/treasureHuntData';
import type { ClueDefinition } from '../../types/treasureHunt';

interface ClueNotificationEventDetail {
  discoveredClueIds: string[];
}

interface ClueFoundNotificationProps {
  onOpenJournal?: () => void;
}

export const ClueFoundNotification: React.FC<ClueFoundNotificationProps> = ({
  onOpenJournal,
}) => {
  const [activeClue, setActiveClue] = useState<ClueDefinition | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let lastLength = 0;
    try {
      const stored = localStorage.getItem('vaibhev_operation_mission_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        lastLength = parsed.discoveredClueIds?.length || 0;
      }
    } catch {
      // Ignore
    }

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ClueNotificationEventDetail>;
      const currentIds = customEvent.detail?.discoveredClueIds || [];

      if (currentIds.length > lastLength) {
        lastLength = currentIds.length;
        const newestId = currentIds[currentIds.length - 1];
        const clue = TREASURE_CLUES.find((c) => c.id === newestId);

        if (clue) {
          setActiveClue(clue);
          setVisible(true);

          window.setTimeout(() => {
            setVisible(false);
          }, 4500);
        }
      } else {
        lastLength = currentIds.length;
      }
    };

    window.addEventListener('vaibhev_treasure_update_v2', handleUpdate);
    return () => window.removeEventListener('vaibhev_treasure_update_v2', handleUpdate);
  }, []);

  if (!visible || !activeClue) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        setVisible(false);
        if (onOpenJournal) onOpenJournal();
      }}
      className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border border-gold-400/80 bg-obsidian-950/95 p-4 shadow-[0_0_40px_rgba(212,175,55,0.4)] backdrop-blur-xl cursor-pointer select-none animate-bounce"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full border border-gold-400 bg-gold-500/20 flex items-center justify-center text-xl shrink-0">
          {activeClue.symbol}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-gold-400 text-[10px] font-mono uppercase font-bold tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>OPERATION VAIBHEV • CLUE 0{activeClue.number}</span>
          </div>

          <h4 className="font-display text-sm font-bold text-white mt-0.5">
            {activeClue.title}
          </h4>

          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-xs text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950/60 border border-emerald-500/40">
              FRAGMENT [{activeClue.revealedFragment}]
            </span>
            <span className="font-mono text-[10px] text-gray-300">
              {activeClue.flavorText.slice(0, 45)}...
            </span>
          </div>

          <div className="mt-2 text-[10px] font-mono text-gold-400/90 flex items-center gap-1 hover:underline">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Added to Mission Journal</span>
            <ArrowRight className="w-2.5 h-2.5 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
