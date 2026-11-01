import type { RecipientProfile, NavigationSection } from '../types/config';

export const RECIPIENT_PROFILE: RecipientProfile = {
  name: 'Vaibhev',
  preferredName: 'Vaibhev',
  favouriteF1Team: 'Scuderia Ferrari',
  favouriteDriver: 'Lewis Hamilton',
  driverNumber: 44,
  primaryColors: {
    black: '#08080a',
    gold: '#d4af37',
    ferrariRed: '#ef1a2d',
  },
  passions: [
    'Supercars & Automotive Engineering',
    'Formula 1 Racing & Ferrari Telemetry',
    'Lewis Hamilton (#44)',
    'Marvel & Spider-Man Universe',
    'Minecraft Building & Adventures',
    'Elite Brainrot Memes (Tung Tung Tung Sahur)',
  ],
  easterEggs: {
    tungSahurEnabled: true,
    minecraftSoundEnabled: true,
    spiderSenseEnabled: true,
    ferrariTelemetryEnabled: true,
  },
};

export const SITE_SECTIONS: readonly NavigationSection[] = [
  {
    id: 'landing',
    title: 'The Overture',
    subtitle: 'Cinematic Grand Prix Entrance',
    description: 'Immersive intro with Ferrari engine rev, golden shimmer, and milestone unveil.',
    iconName: 'Flame',
    badge: 'START ENGINE',
  },
  {
    id: 'dashboard',
    title: 'Paddock Control',
    subtitle: 'Birthday Telemetry Hub',
    description: 'Central luxury navigation console connecting all chapters of the experience.',
    iconName: 'Gauge',
    badge: 'TELEMETRY',
  },
  {
    id: 'notebook',
    title: 'The 9-Squad Ledger',
    subtitle: 'Interactive Memory Notebook',
    description: 'A 9-chapter personal scrapbook with randomized per-session order, personal messages, and photos.',
    iconName: 'BookOpen',
    badge: '9 ENTRIES',
  },
  {
    id: 'gallery',
    title: 'The Grand Gallery',
    subtitle: 'Curated Photographic Archives',
    description: 'Automotive showcase, high-octane candid moments, and timeless squad photographs.',
    iconName: 'Image',
    badge: 'GALLERY',
  },
  {
    id: 'vault',
    title: 'The Cinema Vault',
    subtitle: 'Exclusive Video Transmissions',
    description: 'High-definition video tributes, F1 reels, and unfiltered blooper reels from the squad.',
    iconName: 'Film',
    badge: 'VAULT',
  },
  {
    id: 'easter-eggs',
    title: 'Secret Maranello Garage',
    subtitle: 'Hidden Easter Eggs & Memes',
    description: 'Tung Tung Tung Sahur triggers, Minecraft diamond blocks, Spider-Sense alerts, and secret rev audio.',
    iconName: 'Sparkles',
    badge: 'TOP SECRET',
  },
];
