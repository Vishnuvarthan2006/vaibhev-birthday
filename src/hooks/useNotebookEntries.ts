import { useState, useMemo, useCallback } from 'react';
import type { NotebookEntry } from '../types/notebook';
import {
  NOTEBOOK_ENTRIES,
  getRandomizedNotebookEntries,
  getFreshlyShuffledEntries,
} from '../data/notebookData';
import { resetSessionShuffle } from '../utils/shuffle';

export interface UseNotebookEntriesReturn {
  entries: NotebookEntry[];
  totalEntries: number;
  activeEntry: NotebookEntry;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToId: (id: string) => void;
  reshuffle: () => void;
  canonicalEntries: readonly NotebookEntry[];
}

/**
 * Hook for managing the interactive 9-friend notebook.
 * - Randomizes entry presentation order on each visit/session without mutating original data.
 * - Preserves item identity, photos, and messages regardless of displayed slot.
 */
export function useNotebookEntries(): UseNotebookEntriesReturn {
  // Start with randomized entries for current session
  const [entries, setEntries] = useState<NotebookEntry[]>(() => {
    return getRandomizedNotebookEntries();
  });

  const [activeIndex, setActiveIndex] = useState(0);


  const totalEntries = entries.length;

  const activeEntry = useMemo(() => {
    return entries[activeIndex] || entries[0] || NOTEBOOK_ENTRIES[0];
  }, [entries, activeIndex]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalEntries);
  }, [totalEntries]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalEntries) % totalEntries);
  }, [totalEntries]);

  const goToId = useCallback(
    (id: string) => {
      const idx = entries.findIndex((e) => e.id === id);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    },
    [entries]
  );

  const reshuffle = useCallback(() => {
    resetSessionShuffle();
    const fresh = getFreshlyShuffledEntries();
    setEntries(fresh);
    setActiveIndex(0);
  }, []);

  return {
    entries,
    totalEntries,
    activeEntry,
    activeIndex,
    setActiveIndex,
    goToNext,
    goToPrevious,
    goToId,
    reshuffle,
    canonicalEntries: NOTEBOOK_ENTRIES,
  };
}
