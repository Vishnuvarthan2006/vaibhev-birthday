import type { GalleryCategoryMeta, GalleryPhoto } from '../types/gallery';
import { getSessionShuffled } from '../utils/shuffle';

/**
 * =========================================================================
 * EDITABLE GALLERY CATEGORIES
 * =========================================================================
 */
export const GALLERY_CATEGORIES: readonly GalleryCategoryMeta[] = Object.freeze([
  {
    id: 'all',
    label: 'All Frames',
    description: 'Every captured memory across all sectors.',
  },
  {
    id: 'squad-memories',
    label: 'Squad Memories',
    description: 'Adventures, road trips, and brotherhood moments.',
  },
  {
    id: 'celebrations',
    label: 'Celebrations',
    description: 'Birthdays, victories, and milestone nights.',
  },
  {
    id: 'random-moments',
    label: 'Random Moments',
    description: 'Candid laughs, 3:00 AM banter, and spontaneous chaos.',
  },
  {
    id: 'cars-f1',
    label: 'Cars & F1',
    description: 'Ferrari scarlet, Lewis Hamilton, track days, and automotive passion.',
  },
  {
    id: 'special-moments',
    label: 'Special Moments',
    description: 'Core memories that defined our friendships over the years.',
  },
]);

/**
 * Dynamic Vite Glob import:
 * Automatically discovers ANY photo placed in /public/media/gallery/
 * Supports all image formats: jpg, jpeg, png, webp, avif, gif, svg.
 */
const dynamicGalleryFiles = import.meta.glob(
  '/public/media/gallery/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}',
  { eager: true, query: '?url', import: 'default' }
);

function formatTitleFromFilename(filename: string): string {
  // Strip extension and folder path
  const base = filename.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
  // Convert dashes / underscores to spaces and capitalize
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Automatically discovered photos from the /public/media/gallery folder.
 */
const autoDiscoveredPhotos: GalleryPhoto[] = Object.keys(dynamicGalleryFiles).map((path, idx) => {
  // Vite dynamic glob url will be like "/media/gallery/photo-name.jpg"
  const url = path.replace(/^\/public/, '');
  const title = formatTitleFromFilename(path);
  return {
    id: `auto-gallery-${idx + 1}-${title.toLowerCase().replace(/\s+/g, '-')}`,
    title: title || `Memory Frame ${idx + 1}`,
    description: 'Captured moments with the squad.',
    imageUrl: url,
    category: 'squad-memories',
    dateOrEvent: 'Squad Archive',
    contributor: 'The Syndicate',
    featured: idx < 3,
    aspectRatio: 'landscape',
    tags: ['Squad', 'Memory', 'Archive'],
  };
});

/**
 * Fallback predefined photos if the folder is empty.
 */
export const DEFAULT_GALLERY_PHOTOS: readonly GalleryPhoto[] = Object.freeze([
  {
    id: 'photo-01',
    title: 'The Scuderia Maranello Dream',
    description: 'Ferrari racing red perfection and championship telemetry.',
    imageUrl: '/media/gallery/ferrari-sf90.jpg',
    category: 'cars-f1',
    dateOrEvent: 'Monza Grand Prix Weekend',
    contributor: 'The Syndicate',
    featured: true,
    aspectRatio: 'landscape',
    tags: ['Ferrari', 'F1', 'Scuderia'],
  },
  {
    id: 'photo-02',
    title: 'The 9-Squad Syndicate',
    description: 'All 9 friends assembled. Unbreakable bond since day one.',
    imageUrl: '/media/gallery/squad-collective.jpg',
    category: 'squad-memories',
    dateOrEvent: 'Annual Squad Summit',
    contributor: 'The Syndicate',
    featured: true,
    aspectRatio: 'landscape',
    tags: ['Squad', 'Brotherhood', '9Friends'],
  },
  {
    id: 'photo-03',
    title: 'Lewis Hamilton Masterclass',
    description: 'Hammer time in the rain. Proof that legends never back down.',
    imageUrl: '/media/gallery/hamilton-44.jpg',
    category: 'cars-f1',
    dateOrEvent: 'Silverstone Glory',
    contributor: 'The Syndicate',
    featured: true,
    aspectRatio: 'portrait',
    tags: ['LewisHamilton', 'HammerTime', 'GOAT'],
  },
]);

/**
 * Active photo list: Uses auto-discovered photos from folder if any exist,
 * otherwise falls back to defaults.
 */
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = Object.freeze(
  autoDiscoveredPhotos.length > 0 ? autoDiscoveredPhotos : DEFAULT_GALLERY_PHOTOS
);

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return getSessionShuffled(GALLERY_PHOTOS, 'vaibhev_gallery_session_order');
}

export function getGalleryPhotosByCategory(category: string): GalleryPhoto[] {
  const photos = getAllGalleryPhotos();
  if (category === 'all') return photos;
  return photos.filter((photo) => photo.category === category);
}

export function getGalleryCategories(): GalleryCategoryMeta[] {
  return [...GALLERY_CATEGORIES];
}
