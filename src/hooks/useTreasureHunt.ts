import { useState, useEffect, useCallback } from 'react';
import type { ClueId, TreasureHuntState } from '../types/treasureHunt';
import { TREASURE_CLUES, MASTER_VAULT_CODE } from '../data/treasureHuntData';
import { soundFx } from '../utils/audioFx';

const STORAGE_KEY = 'vaibhev_operation_mission_v1';
const EVENT_NAME = 'vaibhev_treasure_update';

const DEFAULT_STATE: TreasureHuntState = {
  discoveredClueIds: [],
  isVaultUnlocked: false,
};

function readStorageState(): TreasureHuntState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      discoveredClueIds: Array.isArray(parsed.discoveredClueIds) ? parsed.discoveredClueIds : [],
      isVaultUnlocked: Boolean(parsed.isVaultUnlocked),
      unlockedAt: parsed.unlockedAt,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeStorageState(state: TreasureHuntState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
  } catch {
    // Ignore storage quota errors
  }
}

export function useTreasureHunt() {
  const [state, setState] = useState<TreasureHuntState>(readStorageState);

  // Sync state across components and tabs
  useEffect(() => {
    const handleUpdate = () => {
      setState(readStorageState());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const isClueDiscovered = useCallback(
    (clueId: ClueId | string): boolean => {
      return state.discoveredClueIds.includes(clueId);
    },
    [state.discoveredClueIds]
  );

  const discoverClue = useCallback(
    (clueId: ClueId | string): boolean => {
      if (state.discoveredClueIds.includes(clueId)) {
        return false; // Already discovered
      }

      const nextIds = [...state.discoveredClueIds, clueId];
      const nextState: TreasureHuntState = {
        ...state,
        discoveredClueIds: nextIds,
        // Auto-unlock vault if all 9 are collected
        isVaultUnlocked: state.isVaultUnlocked || nextIds.length >= TREASURE_CLUES.length,
        unlockedAt:
          nextIds.length >= TREASURE_CLUES.length && !state.isVaultUnlocked
            ? new Date().toISOString()
            : state.unlockedAt,
      };

      writeStorageState(nextState);
      setState(nextState);
      soundFx.playSecretUnlocked();
      return true;
    },
    [state]
  );

  const unlockVault = useCallback(() => {
    const nextState: TreasureHuntState = {
      ...state,
      isVaultUnlocked: true,
      unlockedAt: state.unlockedAt || new Date().toISOString(),
    };
    writeStorageState(nextState);
    setState(nextState);
    soundFx.playVaultFanfare();
  }, [state]);

  const resetProgress = useCallback(() => {
    const nextState: TreasureHuntState = {
      discoveredClueIds: [],
      isVaultUnlocked: false,
    };
    writeStorageState(nextState);
    setState(nextState);
    soundFx.playUiClick();
  }, []);

  // Compute cipher letter array (0-8)
  const cipherLetters = TREASURE_CLUES.map((clue) => {
    return state.discoveredClueIds.includes(clue.id) ? clue.cipherLetter : '·';
  });

  const totalDiscovered = state.discoveredClueIds.length;
  const isAllDiscovered = totalDiscovered >= TREASURE_CLUES.length;

  return {
    discoveredClueIds: state.discoveredClueIds,
    isVaultUnlocked: state.isVaultUnlocked,
    unlockedAt: state.unlockedAt,
    isClueDiscovered,
    discoverClue,
    unlockVault,
    resetProgress,
    cipherLetters,
    totalDiscovered,
    totalClues: TREASURE_CLUES.length,
    isAllDiscovered,
    masterCode: MASTER_VAULT_CODE,
    allClues: TREASURE_CLUES,
  };
}
