export type ClueId =
  | 'clue-1-vishnu'
  | 'clue-2-santhosh'
  | 'clue-3-akshaya'
  | 'clue-4-deepthi'
  | 'clue-5-sanjitha'
  | 'clue-6-savitha'
  | 'clue-7-sathiya'
  | 'clue-8-thiru'
  | 'clue-9-rashmika';

export interface ClueDefinition {
  id: ClueId;
  number: number; // 1 to 9
  friendName: string; // The friend who contributed this clue
  title: string;
  locationName: string;
  crypticRiddle: string; // The cryptic opening riddle
  hint1: string; // Hint 1: Narrows down the location
  hint2: string; // Hint 2: Identifies the intended interaction
  revealedFragment: string; // e.g. "M", "E", "G", "A", "[BLUEPRINT]", "M", "I", "N", "D"
  isLetter: boolean; // true if gives a letter, false if blueprint
  targetWord?: 1 | 2; // Word 1 = "MEGA", Word 2 = "MIND"
  letterIndex?: number; // 1 to 4 within its word
  symbol: string;
  category:
    | 'f1'
    | 'spiderman'
    | 'minecraft'
    | 'brainrot'
    | 'syndicate'
    | 'notebook'
    | 'gallery'
    | 'vault'
    | 'paddock';
  flavorText: string;
}

export interface TreasureHuntState {
  discoveredClueIds: string[];
  isVaultUnlocked: boolean;
  unlockedAt?: string;
  revealedHints?: Record<string, number>; // clueId -> 1 or 2 hints revealed
}
