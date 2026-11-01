import type { ClueDefinition } from '../types/treasureHunt';

export const MASTER_VAULT_CODE = 'MEGA MIND';

export function verifyMasterCode(input: string): boolean {
  if (!input) return false;
  const normalized = input.trim().replace(/\s+/g, ' ').toUpperCase();
  const compact = input.trim().replace(/\s+/g, '').toUpperCase();
  return normalized === 'MEGA MIND' || compact === 'MEGAMIND';
}

export const TREASURE_CLUES: readonly ClueDefinition[] = Object.freeze([
  {
    id: 'clue-1-vishnu',
    number: 1,
    friendName: 'Vishnu',
    title: 'The Starting Grid',
    locationName: 'Secret Garage • Reaction Dyno',
    crypticRiddle:
      'On the starting grid, champions do not wait for permission; they seize the apex the instant scarlet lights vanish into darkness. Prove your velocity where milliseconds crown legends to unlock the opening letter.',
    hint1:
      'Head to Sector 04 (The Secret Garage) and open the "Reaction Dyno" testing bay.',
    hint2:
      'Initialize the launch sequence. When the 5 red lights extinguish and flash GREEN, tap instantaneously to clock a reaction time under 380ms.',
    revealedFragment: 'M',
    isLetter: true,
    targetWord: 1,
    letterIndex: 1,
    symbol: '🏎️',
    category: 'f1',
    flavorText:
      'Lightning-fast reflexes clocked. Decrypted letter: [M] (Word 1, Letter 1).',
  },
  {
    id: 'clue-2-santhosh',
    number: 2,
    friendName: 'Santhosh',
    title: 'The Web Relay',
    locationName: 'Secret Garage • Classified Web Relay',
    crypticRiddle:
      'A tingling frequency vibrates through the spider web. Search the classified terminal in the Maranello garage to decode the hero\'s second glyph.',
    hint1:
      'Access Sector 04 (The Secret Garage).',
    hint2:
      'In the Secret Garage header, look for the spider web transmitter badge labeled "WEB RELAY 🔍" and inspect it.',
    revealedFragment: 'E',
    isLetter: true,
    targetWord: 1,
    letterIndex: 2,
    symbol: '🕸️',
    category: 'spiderman',
    flavorText:
      'Spider-Sense dialed to 100%. Decrypted letter: [E] (Word 1, Letter 2).',
  },
  {
    id: 'clue-3-akshaya',
    number: 3,
    friendName: 'Akshaya',
    title: 'The Ancient Core',
    locationName: 'Secret Garage • Ancient Bedrock Relic',
    crypticRiddle:
      'Deep in the Maranello subterranean vaults lies a hardened bedrock relic from the ancient deep. Inspect the classified relic vault to claim the third stone.',
    hint1:
      'Access Sector 04 (The Secret Garage).',
    hint2:
      'In the Secret Garage header, look for the dark bedrock anvil badge labeled "BEDROCK CORE 🔍" and inspect it.',
    revealedFragment: 'G',
    isLetter: true,
    targetWord: 1,
    letterIndex: 3,
    symbol: '⛏️',
    category: 'minecraft',
    flavorText:
      'Ancient Debris extracted. Decrypted letter: [G] (Word 1, Letter 3).',
  },
  {
    id: 'clue-4-deepthi',
    number: 4,
    friendName: 'Deepthi',
    title: 'The Chaos Signal',
    locationName: 'Secret Garage • Brainrot Soundboard',
    crypticRiddle:
      'When sleep deprivation overtakes the syndicate at 3:00 AM, a sacred drum rhythm echoes across the void. Sound the cadence in triple succession to summon the chaotic fourth cipher.',
    hint1:
      'Navigate to the "Brainrot Zone" soundboard inside the Secret Garage.',
    hint2:
      'Tap the large "Tung Tung Tung Sahur" drum button 3 times in rapid cadence before the beat counter resets to trigger party mode.',
    revealedFragment: 'A',
    isLetter: true,
    targetWord: 1,
    letterIndex: 4,
    symbol: '🥁',
    category: 'brainrot',
    flavorText:
      'Taluku Buluku unlocked! Decrypted letter: [A] (Word 1, Letter 4). First word complete!',
  },
  {
    id: 'clue-5-sanjitha',
    number: 5,
    friendName: 'Sanjitha',
    title: 'The Syndicate Keystone',
    locationName: 'Secret Garage • Syndicate Keystone',
    crypticRiddle:
      'Nine distinct minds form one unbreakable circle around a single legend. Connect every brother\'s callsign in the keystone grid to reveal how the scattered fragments fit together.',
    hint1:
      'Switch to the "Syndicate Keystone" tab within the Secret Garage.',
    hint2:
      'Click all nine callsigns in the keystone grid to light up the full syndicate circle.',
    revealedFragment: 'TWO WORDS [4 + 4 LETTERS]',
    isLetter: false,
    symbol: '🤝',
    category: 'syndicate',
    flavorText:
      'Syndicate circle complete! Master Blueprint unlocked: The final cipher is a famous 2-word nickname consisting of 4 letters and 4 letters [ _ _ _ _ ]  [ _ _ _ _ ].',
  },
  {
    id: 'clue-6-savitha',
    number: 6,
    friendName: 'Savitha',
    title: 'The Final Chapter',
    locationName: 'The 3D Notebook • Volume 01 Epilogue',
    crypticRiddle:
      'Beyond the ninth handwritten letter lies the final epilogue of brotherhood. Search where all nine signatures are bound under gold wax to reveal the sixth fragment.',
    hint1:
      'Open "The Notebook" from the Paddock and turn the pages until you reach the final Epilogue spread after Chapter IX.',
    hint2:
      'Look on the left signatures spread for the gold wax seal button marked "THE FINAL CHAPTER 🔍" and click it.',
    revealedFragment: 'M',
    isLetter: true,
    targetWord: 2,
    letterIndex: 1,
    symbol: '📖',
    category: 'notebook',
    flavorText:
      'Epilogue seal verified. Decrypted letter: [M] (Word 2, Letter 1).',
  },
  {
    id: 'clue-7-sathiya',
    number: 7,
    friendName: 'Sathiya',
    title: 'The Shutter Code',
    locationName: 'The Memory Archive • Top Deck Shutter',
    crypticRiddle:
      'Every frame in the visual anthology tells a story, but one encrypted shutter guards the secret telemetry of the entire archive. Inspect the top deck where memories are cataloged.',
    hint1:
      'Navigate to Sector 02: "Photo Archive" (The Memory Archive).',
    hint2:
      'In the top header bar next to the Video Vault link, look for the gold shutter badge labeled "THE SHUTTER CODE 🔍" and click it.',
    revealedFragment: 'I',
    isLetter: true,
    targetWord: 2,
    letterIndex: 2,
    symbol: '📸',
    category: 'gallery',
    flavorText:
      'Photo telemetry decrypted. Decrypted letter: [I] (Word 2, Letter 2).',
  },
  {
    id: 'clue-8-thiru',
    number: 8,
    friendName: 'Thiru',
    title: 'The Classified Transmission',
    locationName: 'The Video Vault • Classified Frequency Deck',
    crypticRiddle:
      'In the darkness of the screening theater, a red beacon broadcasts on an encrypted channel. Tune the transmission deck to receive the penultimate message.',
    hint1:
      'Navigate to Sector 03: "Video Vault" (The Video Vault).',
    hint2:
      'In the top header next to Photo Archive, tap the glowing red "CLASSIFIED TRANSMISSION 🔍" frequency beacon.',
    revealedFragment: 'N',
    isLetter: true,
    targetWord: 2,
    letterIndex: 3,
    symbol: '🎬',
    category: 'vault',
    flavorText:
      'Classified frequency decoded. Decrypted letter: [N] (Word 2, Letter 3).',
  },
  {
    id: 'clue-9-rashmika',
    number: 9,
    friendName: 'Rashmika',
    title: 'The Final Overdrive',
    locationName: 'The Paddock Dashboard • Sector Control',
    crypticRiddle:
      'The central command console monitors all four sectors. Triple-tap the sector status beacon in the Paddock command bar to unlock the final keystone.',
    hint1:
      'Navigate to "The Paddock" command console.',
    hint2:
      'In the top header bar next to Sector Control, tap the green "ALL 4 SECTORS READY" badge three times in rapid succession.',
    revealedFragment: 'D',
    isLetter: true,
    targetWord: 2,
    letterIndex: 4,
    symbol: '🏁',
    category: 'paddock',
    flavorText:
      'Overdrive engaged! Decrypted letter: [D] (Word 2, Letter 4). Second word complete!',
  },
]);

export function getAllClues(): ClueDefinition[] {
  return [...TREASURE_CLUES];
}

export function getClueById(id: string): ClueDefinition | undefined {
  return TREASURE_CLUES.find((c) => c.id === id);
}
