import { useState, useEffect, useCallback } from 'react';
import type { ClueId, TreasureHuntState } from '../types/treasureHunt';
import { TREASURE_CLUES, MASTER_VAULT_CODE, verifyMasterCode } from '../data/treasureHuntData';
import { soundFx } from '../utils/audioFx';

const STORAGE_KEY = 'vaibhev_operation_mission_v2';
const EVENT_NAME = 'vaibhev_treasure_update_v2';

const DEFAULT_STATE: TreasureHuntState = {
  discoveredClueIds: [],
  isVaultUnlocked: false,
  revealedHints: {},
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
      revealedHints: typeof parsed.revealedHints === 'object' && parsed.revealedHints !== null ? parsed.revealedHints : {},
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
      };

      writeStorageState(nextState);
      setState(nextState);
      soundFx.playSecretUnlocked();
      return true;
    },
    [state]
  );

  const revealHint = useCallback(
    (clueId: string, hintNumber: 1 | 2) => {
      const currentLevel = state.revealedHints?.[clueId] || 0;
      if (currentLevel >= hintNumber) return;

      const nextHints = {
        ...(state.revealedHints || {}),
        [clueId]: hintNumber,
      };
      const nextState: TreasureHuntState = {
        ...state,
        revealedHints: nextHints,
      };
      writeStorageState(nextState);
      setState(nextState);
      soundFx.playUiClick();
    },
    [state]
  );

  const getHintLevel = useCallback(
    (clueId: string): number => {
      return state.revealedHints?.[clueId] || 0;
    },
    [state.revealedHints]
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

  const verifyAndUnlock = useCallback(
    (inputCode: string): boolean => {
      if (verifyMasterCode(inputCode)) {
        unlockVault();
        return true;
      }
      return false;
    },
    [unlockVault]
  );

  const resetProgress = useCallback(() => {
    const nextState: TreasureHuntState = {
      discoveredClueIds: [],
      isVaultUnlocked: false,
      revealedHints: {},
    };
    writeStorageState(nextState);
    setState(nextState);
    soundFx.playUiClick();
  }, []);

  // Compute Word 1 (MEGA) slots
  const word1Letters = [
    state.discoveredClueIds.includes('clue-1-vishnu') ? 'M' : '·',
    state.discoveredClueIds.includes('clue-2-santhosh') ? 'E' : '·',
    state.discoveredClueIds.includes('clue-3-akshaya') ? 'G' : '·',
    state.discoveredClueIds.includes('clue-4-deepthi') ? 'A' : '·',
  ];

  // Compute Word 2 (MIND) slots
  const word2Letters = [
    state.discoveredClueIds.includes('clue-6-savitha') ? 'M' : '·',
    state.discoveredClueIds.includes('clue-7-sathiya') ? 'I' : '·',
    state.discoveredClueIds.includes('clue-8-thiru') ? 'N' : '·',
    state.discoveredClueIds.includes('clue-9-rashmika') ? 'D' : '·',
  ];

  const hasBlueprint = state.discoveredClueIds.includes('clue-5-sanjitha');
  const totalDiscovered = state.discoveredClueIds.length;
  const isAllDiscovered = totalDiscovered >= TREASURE_CLUES.length;

  return {
    discoveredClueIds: state.discoveredClueIds,
    isVaultUnlocked: state.isVaultUnlocked,
    unlockedAt: state.unlockedAt,
    isClueDiscovered,
    discoverClue,
    revealHint,
    getHintLevel,
    unlockVault,
    verifyAndUnlock,
    resetProgress,
    word1Letters,
    word2Letters,
    hasBlueprint,
    totalDiscovered,
    totalClues: TREASURE_CLUES.length,
    isAllDiscovered,
    masterCode: MASTER_VAULT_CODE,
    allClues: TREASURE_CLUES,
  };
}
