import type { GalleryCategoryMeta, GalleryPhoto } from '../types/gallery';

/**
 * =========================================================================
 * EDITABLE GALLERY CATEGORIES
 * =========================================================================
 * The 9 friends can add, remove, or rename categories here.
 * Components read dynamically from this list.
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
    description: 'Ferrari scarlet, #44 Lewis Hamilton, track days, and automotive passion.',
  },
  {
    id: 'special-moments',
    label: 'Special Moments',
    description: 'Core memories that defined our friendships over the years.',
  },
]);

/**
 * =========================================================================
 * EDITABLE PHOTO ARCHIVE DATA
 * =========================================================================
 * HOW TO ADD A PHOTOGRAPH:
 * 1. Drop your image file into: /public/media/gallery/
 *    (e.g., /public/media/gallery/go-kart-race.jpg)
 * 2. Add an object to the GALLERY_PHOTOS array below.
 * 3. Save! No React code changes required.
 *
 * Aspect ratios supported: 'landscape' (4:3 / 16:9), 'portrait' (3:4), 'square' (1:1)
 */
export const GALLERY_PHOTOS: readonly GalleryPhoto[] = Object.freeze([
  {
    id: 'photo-01',
    title: 'The Scuderia Maranello Dream',
    description: 'Ferrari racing red perfection and championship telemetry.',
    imageUrl: '/media/gallery/ferrari-sf90.jpg',
    category: 'cars-f1',
    dateOrEvent: 'Monza Grand Prix Weekend',
    contributor: 'Kabir & Syndicate',
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
    contributor: 'Aarav',
    featured: true,
    aspectRatio: 'landscape',
    tags: ['Squad', 'Brotherhood', '9Friends'],
  },
  {
    id: 'photo-03',
    title: 'Lewis #44 Masterclass',
    description: 'Hammer time in the rain. Proof that legends never back down.',
    imageUrl: '/media/gallery/hamilton-44.jpg',
    category: 'cars-f1',
    dateOrEvent: 'Silverstone Glory',
    contributor: 'Siddharth',
    featured: true,
    aspectRatio: 'portrait',
    tags: ['LewisHamilton', 'LH44', 'GOAT'],
  },
  {
    id: 'photo-04',
    title: 'Midnight Drive & Supercar Chases',
    description: 'Exhaust notes vibrating through the quiet night streets.',
    imageUrl: '/media/gallery/night-drive.jpg',
    category: 'cars-f1',
    dateOrEvent: 'Highway Night Run',
    contributor: 'Arjun',
    featured: false,
    aspectRatio: 'portrait',
    tags: ['NightDrive', 'ExhaustNote', 'V8'],
  },
  {
    id: 'photo-05',
    title: 'The Birthday Milestone Toast',
    description: 'Raising a glass to the legend himself. Cheers to Vaibhev!',
    imageUrl: '/media/gallery/birthday-toast.jpg',
    category: 'celebrations',
    dateOrEvent: 'Grand Birthday Eve',
    contributor: 'Rohan',
    featured: false,
    aspectRatio: 'square',
    tags: ['Birthday', 'Cheers', 'Celebration'],
  },
  {
    id: 'photo-06',
    title: '3:00 AM Groupchat Delirium',
    description: 'Tung Tung Tung Sahur memes and inexplicable laughter at dawn.',
    imageUrl: '/media/gallery/brainrot-chaos.jpg',
    category: 'random-moments',
    dateOrEvent: 'All-Nighter Discord Call',
    contributor: 'Vikram',
    featured: false,
    aspectRatio: 'square',
    tags: ['Brainrot', 'TungTungTung', 'Chaos'],
  },
  {
    id: 'photo-07',
    title: 'Go-Karting Grand Prix Podium',
    description: 'Vaibhev taking P1 by two tenths of a second on the final corner.',
    imageUrl: '/media/gallery/karting-podium.jpg',
    category: 'celebrations',
    dateOrEvent: 'Annual Kart Championship',
    contributor: 'Dev',
    featured: false,
    aspectRatio: 'landscape',
    tags: ['Karting', 'P1', 'Champion'],
  },
  {
    id: 'photo-08',
    title: 'Late Night Spontaneous Road Trip',
    description: 'No destination, full fuel tank, and peak Spotify playlist.',
    imageUrl: '/media/gallery/road-trip-sunset.jpg',
    category: 'special-moments',
    dateOrEvent: 'Weekend Escapade',
    contributor: 'Aditya',
    featured: false,
    aspectRatio: 'portrait',
    tags: ['RoadTrip', 'GoldenHour', 'Memories'],
  },
  {
    id: 'photo-09',
    title: 'The Spider-Man Stance',
    description: 'Vaibhev attempting a full web-slinger pose on top of the car hood.',
    imageUrl: '/media/gallery/spiderman-pose.jpg',
    category: 'random-moments',
    dateOrEvent: 'Parking Lot Shenanigans',
    contributor: 'Nakul',
    featured: false,
    aspectRatio: 'square',
    tags: ['SpiderMan', 'Marvel', 'WebSlinger'],
  },
  {
    id: 'photo-10',
    title: 'The Netherite Fortress Raid',
    description: 'When the entire squad spent 6 continuous hours in the Nether.',
    imageUrl: '/media/gallery/minecraft-raid.jpg',
    category: 'special-moments',
    dateOrEvent: 'Server Launch Night',
    contributor: 'Aarav & Vikram',
    featured: false,
    aspectRatio: 'landscape',
    tags: ['Minecraft', 'Netherite', 'SquadGaming'],
  },
  {
    id: 'photo-11',
    title: 'Unfiltered Candid Laughter',
    description: 'The genuine smiles that happen when words aren\'t needed.',
    imageUrl: '/media/gallery/candid-laughs.jpg',
    category: 'squad-memories',
    dateOrEvent: 'Diner Hangout',
    contributor: 'Rohan',
    featured: false,
    aspectRatio: 'portrait',
    tags: ['Candid', 'RealMoments', 'Brothers'],
  },
  {
    id: 'photo-12',
    title: 'Victory Lap Commemoration',
    description: 'Another year of greatness in the books. Ready for the next season.',
    imageUrl: '/media/gallery/victory-lap.jpg',
    category: 'celebrations',
    dateOrEvent: 'Season Finale',
    contributor: 'The Syndicate',
    featured: true,
    aspectRatio: 'landscape',
    tags: ['VictoryLap', 'Milestone', 'VaibhevDay'],
  },
]);

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return [...GALLERY_PHOTOS];
}

export function getGalleryPhotosByCategory(category: string): GalleryPhoto[] {
  if (category === 'all') return [...GALLERY_PHOTOS];
  return GALLERY_PHOTOS.filter((photo) => photo.category === category);
}

export function getGalleryCategories(): GalleryCategoryMeta[] {
  return [...GALLERY_CATEGORIES];
}
