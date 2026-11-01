import type { VideoEntry } from '../types/video';

/**
 * =========================================================================
 * SEPARATE VIDEO VAULT ARCHITECTURE
 * =========================================================================
 *
 * Distinct from photo gallery and notebook entries.
 * Place video files in /public/media/videos/ and add entries here.
 */
export const VIDEO_VAULT_ENTRIES: readonly VideoEntry[] = Object.freeze([
  {
    id: 'video-vault-1',
    title: 'The 9-Squad Birthday Montage',
    description: 'A cinematic tribute to Vaibhev from all 9 friends.',
    videoUrl: '/media/videos/birthday-tribute.mp4',
    posterUrl: '/media/videos/birthday-tribute-poster.jpg',
    duration: '03:44',
    category: 'tribute',
    featured: true,
  },
  {
    id: 'video-vault-2',
    title: 'Ferrari & F1 Highlights Reel',
    description: 'High revving Maranello horsepower and racecraft moments.',
    videoUrl: '/media/videos/f1-ferrari-reel.mp4',
    posterUrl: '/media/videos/f1-ferrari-poster.jpg',
    duration: '01:58',
    category: 'racing',
    featured: false,
  },
  {
    id: 'video-vault-3',
    title: 'Tung Tung Tung Sahur: Brainrot Special Edition',
    description: 'Guaranteed 100% genuine sleep-deprived hilarity.',
    videoUrl: '/media/videos/tung-tung-special.mp4',
    posterUrl: '/media/videos/tung-tung-poster.jpg',
    duration: '00:45',
    category: 'memes',
    featured: false,
  },
  {
    id: 'video-vault-4',
    title: 'The Blooper Reel',
    description: 'Behind the scenes of failed attempts at taking serious photos.',
    videoUrl: '/media/videos/squad-bloopers.mp4',
    posterUrl: '/media/videos/bloopers-poster.jpg',
    duration: '02:15',
    category: 'bloopers',
    featured: false,
  },
]);

export function getAllVaultVideos(): VideoEntry[] {
  return [...VIDEO_VAULT_ENTRIES];
}
