import type { VideoCategoryMeta, VideoEntry } from '../types/video';

/**
 * =========================================================================
 * EDITABLE VIDEO VAULT CATEGORIES
 * =========================================================================
 * The 9 friends can add or change video categories here.
 */
export const VIDEO_CATEGORIES: readonly VideoCategoryMeta[] = Object.freeze([
  {
    id: 'all',
    label: 'All Transmissions',
    description: 'Every captured video reel and squad broadcast.',
  },
  {
    id: 'tribute',
    label: 'Tributes & Montages',
    description: 'Cinematic birthday tributes assembled by the squad.',
  },
  {
    id: 'racing',
    label: 'Motorsport & Telemetry',
    description: 'Ferrari engine screams, Lewis #44 edits, and track days.',
  },
  {
    id: 'wishes',
    label: 'Personal Wishes',
    description: 'Direct video messages and heartfelt birthday speeches.',
  },
  {
    id: 'memes',
    label: 'Memes & Brainrot',
    description: 'Tung Tung Tung Sahur and top tier groupchat comedy.',
  },
  {
    id: 'bloopers',
    label: 'The Blooper Reel',
    description: 'Unfiltered chaos and failed recording takes.',
  },
]);

/**
 * =========================================================================
 * EDITABLE VIDEO VAULT ARCHITECTURE
 * =========================================================================
 * HOW TO ADD A VIDEO:
 * 1. Place your MP4 or WebM video file in: /public/media/videos/
 *    (e.g., /public/media/videos/birthday-tribute.mp4)
 * 2. Optional: place a thumbnail image in: /public/media/videos/
 *    (e.g., /public/media/videos/birthday-tribute-poster.jpg)
 * 3. Add an entry to the VIDEO_VAULT_ENTRIES array below.
 * 4. Save! No React code changes required.
 *
 * NOTE: Videos never autoplay with sound. The user controls playback.
 */
export const VIDEO_VAULT_ENTRIES: readonly VideoEntry[] = Object.freeze([
  {
    id: 'video-vault-1',
    title: 'The 9-Squad Master Birthday Tribute',
    description: 'A cinematic compilation celebrating Vaibhev: the motorsport passion, the brotherhood, and the moments that made us legends.',
    videoUrl: '/media/videos/birthday-tribute.mp4',
    posterUrl: '/media/videos/birthday-tribute-poster.jpg',
    duration: '04:18',
    contributor: 'The 9-Friend Syndicate',
    category: 'tribute',
    dateAdded: 'Birthday Season 2026',
    featured: true,
    resolution: '4K Cinema',
    aspectRatio: '16/9',
  },
  {
    id: 'video-vault-2',
    title: 'Scuderia Maranello & Lewis #44 Symphony',
    description: 'Pure high-revving Ferrari V12 and turbo-hybrid horsepower soundtrack dedicated to our favourite F1 driver.',
    videoUrl: '/media/videos/f1-ferrari-reel.mp4',
    posterUrl: '/media/videos/f1-ferrari-poster.jpg',
    duration: '02:05',
    contributor: 'Kabir & Siddharth',
    category: 'racing',
    dateAdded: 'Race Weekend',
    featured: false,
    resolution: '1080p 60fps',
    aspectRatio: '16/9',
  },
  {
    id: 'video-vault-3',
    title: 'Tung Tung Tung Sahur: Brainrot Special Edition',
    description: 'The definitive 3:00 AM squad discord brainrot edit. Guaranteed 100% sleep deprivation humour.',
    videoUrl: '/media/videos/tung-tung-special.mp4',
    posterUrl: '/media/videos/tung-tung-poster.jpg',
    duration: '00:54',
    contributor: 'Vikram',
    category: 'memes',
    dateAdded: '3:00 AM Archive',
    featured: false,
    resolution: '1080p',
    aspectRatio: '16/9',
  },
  {
    id: 'video-vault-4',
    title: 'The Uncut Blooper Reel: 100 Takes Later',
    description: 'Behind the scenes: 9 grown friends completely unable to record a serious birthday message without collapsing into laughter.',
    videoUrl: '/media/videos/squad-bloopers.mp4',
    posterUrl: '/media/videos/bloopers-poster.jpg',
    duration: '03:12',
    contributor: 'Arjun & Nakul',
    category: 'bloopers',
    dateAdded: 'Vault Archives',
    featured: false,
    resolution: '1080p',
    aspectRatio: '16/9',
  },
  {
    id: 'video-vault-5',
    title: 'Personal Wishes from the Syndicate',
    description: 'Individual birthday messages, toasts, and heartfelt roasts from Aarav, Rohan, Dev, and Aditya.',
    videoUrl: '/media/videos/personal-wishes.mp4',
    posterUrl: '/media/videos/personal-wishes-poster.jpg',
    duration: '05:30',
    contributor: 'Aarav, Rohan, Dev, Aditya',
    category: 'wishes',
    dateAdded: 'Grand Prix Eve',
    featured: false,
    resolution: '4K UHD',
    aspectRatio: '16/9',
  },
  {
    id: 'video-vault-6',
    title: 'Minecraft Netherite Raid: Live Comms',
    description: 'The chaotic audio recordings from the night Vaibhev led the squad through ancient debris mining.',
    videoUrl: '/media/videos/minecraft-raid.mp4',
    posterUrl: '/media/videos/minecraft-raid-poster.jpg',
    duration: '01:45',
    contributor: 'Aarav & Vikram',
    category: 'memes',
    dateAdded: 'Server Logs',
    featured: false,
    resolution: '1080p',
    aspectRatio: '16/9',
  },
]);

export function getAllVaultVideos(): VideoEntry[] {
  return [...VIDEO_VAULT_ENTRIES];
}

export function getFeaturedVideo(): VideoEntry | undefined {
  return VIDEO_VAULT_ENTRIES.find((v) => v.featured) || VIDEO_VAULT_ENTRIES[0];
}

export function getVideosByCategory(category: string): VideoEntry[] {
  if (category === 'all') return [...VIDEO_VAULT_ENTRIES];
  return VIDEO_VAULT_ENTRIES.filter((v) => v.category === category);
}

export function getVideoCategories(): VideoCategoryMeta[] {
  return [...VIDEO_CATEGORIES];
}
