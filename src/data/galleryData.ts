import type { GalleryPhoto } from '../types/gallery';

/**
 * =========================================================================
 * SEPARATE PHOTO GALLERY DATA ARCHITECTURE
 * =========================================================================
 *
 * Distinct from the 9 notebook friend entries.
 * Place photos in /public/media/gallery/ and add entries here.
 */
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = Object.freeze([
  {
    id: 'gallery-item-1',
    title: 'The Scuderia Dream',
    description: 'Ferrari scarlet red perfection & track telemetry.',
    imageUrl: '/media/gallery/ferrari-sf90.jpg',
    category: 'f1',
    dateOrEvent: 'Grand Prix Season',
    featured: true,
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-item-2',
    title: 'The Squad Syndicate',
    description: 'The 9 friends gathered for the annual celebration.',
    imageUrl: '/media/gallery/squad-collective.jpg',
    category: 'squad',
    dateOrEvent: 'Squad Archives',
    featured: true,
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-item-3',
    title: 'Automotive Passion',
    description: 'Precision engineering, carbon aerodynamics, and pure exhaust note.',
    imageUrl: '/media/gallery/supercar-night.jpg',
    category: 'automotive',
    dateOrEvent: 'Night Drives',
    featured: false,
    aspectRatio: 'portrait',
  },
  {
    id: 'gallery-item-4',
    title: 'Brainrot Chronicles: Tung Tung Tung',
    description: 'When the sleep deprivation hits and the meme archives unlock.',
    imageUrl: '/media/gallery/meme-archives.jpg',
    category: 'chaos',
    dateOrEvent: '3:00 AM Groupchat',
    featured: false,
    aspectRatio: 'square',
  },
  {
    id: 'gallery-item-5',
    title: 'Lewis Hamilton Tribute',
    description: '#44 - Master of the wet track, champion of perseverance.',
    imageUrl: '/media/gallery/hamilton-44.jpg',
    category: 'f1',
    dateOrEvent: 'Silverstone Glory',
    featured: true,
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-item-6',
    title: 'Unfiltered Memories',
    description: 'Moments that defined our journey together.',
    imageUrl: '/media/gallery/candid-laughs.jpg',
    category: 'memories',
    dateOrEvent: 'Milestone Vault',
    featured: false,
    aspectRatio: 'portrait',
  },
]);

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return [...GALLERY_PHOTOS];
}

export function getGalleryPhotosByCategory(category: string): GalleryPhoto[] {
  if (category === 'all') return [...GALLERY_PHOTOS];
  return GALLERY_PHOTOS.filter((photo) => photo.category === category);
}
