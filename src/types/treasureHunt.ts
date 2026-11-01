export type ClueId =
  | 'clue-1-reaction'
  | 'clue-2-spider'
  | 'clue-3-minecraft'
  | 'clue-4-brainrot'
  | 'clue-5-notebook'
  | 'clue-6-gallery'
  | 'clue-7-vault'
  | 'clue-8-paddock'
  | 'clue-9-syndicate';

export interface ClueDefinition {
  id: ClueId;
  number: number; // 1 to 9
  title: string;
  locationName: string;
  riddleHint: string;
  cipherLetter: string; // The letter/digit it unlocks: V-A-I-B-H-E-V-4-4
  cipherIndex: number; // 0 to 8
  symbol: string;
  category:
    | 'f1'
    | 'spiderman'
    | 'minecraft'
    | 'brainrot'
    | 'notebook'
    | 'gallery'
    | 'vault'
    | 'paddock'
    | 'syndicate';
  flavorText: string;
}

export interface TreasureHuntState {
  discoveredClueIds: string[];
  isVaultUnlocked: boolean;
  unlockedAt?: string;
}
