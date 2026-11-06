import type { VideoCategoryMeta, VideoEntry } from '../types/video';
import { getSessionShuffled } from '../utils/shuffle';

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
    description: 'Ferrari engine screams, Lewis Hamilton edits, and track days.',
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
export const VIDEO_VAULT_ENTRIES: readonly VideoEntry[] = Object.freeze([   {
    id: 'video-deepiti',
    title: 'Birthday Wish from Deepthi',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/deepthi-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:05',
    contributor: 'Deepthi'
  },
  {
    id: 'video-rash',
    title: 'Birthday Wish from Rashmika',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/rash-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:03',
    contributor: 'Rashmika'
  },
  {
    id: 'video-sath',
    title: 'Birthday Wish from Sathiya',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/sathiya-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:03',
    contributor: 'Sathiya'
  },
  {
    id: 'video-thiru',
    title: 'Birthday Wish from Thiru',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/thiru-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:03',
    contributor: 'Thiru'
  },
  {
    id: 'video-visnu',
    title: 'Birthday Wish from Vishnu',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/visnu-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:22',
    contributor: 'Vishnu'
  },
  {
    id: 'video-savi',
    title: 'Birthday Wish from Savitha',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/savi-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:04',
    contributor: 'Savi'
  },
  {
    id: 'video-sandy',
    title: 'Birthday Wish from Santhosh',
    description: 'Grand Prix wishes and telemetry breakdown for Vaibhev.',
    videoUrl: '/media/videos/sandy-bday.mp4', // <-- Match your filenam  e here
    duration: '  00:04',
    contributor: 'Santhosh'
  },
]);

export function getAllVaultVideos(): VideoEntry[] {
  return getSessionShuffled(VIDEO_VAULT_ENTRIES, 'vaibhev_video_session_order');
}

export function getFeaturedVideo(): VideoEntry | undefined {
  const shuffled = getAllVaultVideos();
  // Select the leading video from this session's shuffled order to spotlight as featured
  return shuffled[0] || VIDEO_VAULT_ENTRIES[0];
}

export function getVideosByCategory(category: string): VideoEntry[] {
  const videos = getAllVaultVideos();
  if (category === 'all') return videos;
  return videos.filter((v) => v.category === category);
}

export function getVideoCategories(): VideoCategoryMeta[] {
  return [...VIDEO_CATEGORIES];
}
