import type { NotebookEntry } from '../types/notebook';
import { getSessionShuffled, pureShuffle } from '../utils/shuffle';

/**
 * =========================================================================
 * 9 INDIVIDUAL FRIEND NOTEBOOK ENTRIES FOR VAIBHEV
 * =========================================================================
 *
 * HOW TO EDIT:
 * - Update 'friendName' with the friend's actual name.
 * - Add/edit 'callsign' (F1, Marvel, or gaming role).
 * - Update 'writtenMessage' with personal birthday message / story.
 * - Add or remove photos in the 'photos' array.
 * - Drop actual images into /public/media/notebook/friend-X/
 *
 * NOTE:
 * - The original array order below is canonical and NEVER mutated.
 * - Displayed order is randomized per visit/session using getRandomizedNotebookEntries().
 * - Each entry maintains its unique ID and attributes wherever it appears.
 */
export const NOTEBOOK_ENTRIES: readonly NotebookEntry[] = Object.freeze([
  {
    id: 'friend-entry-1',
    friendNumber: 1,
    friendName: 'Friend 1 (Name Here)',
    callsign: 'Pit Wall Strategist',
    tagline: 'Box, box, box for the ultimate birthday lap.',
    writtenMessage: `Happy Birthday Vaibhev!

Another year older, another pole position in the grand prix of life. From obsessing over every Ferrari pitstop strategy to debating telemetry and high-revving V10 engines, there's nobody else I'd rather analyze qualifying sectors with.

May this year bring you absolute P1 speed, zero engine penalties, and unlimited horsepower in everything you do. Keep pushing the limits!`,
    photos: [
      {
        id: 'f1-photo-1',
        url: '/media/notebook/friend-1/photo-1.jpg',
        caption: 'Pole position memories with the squad',
        rotationDeg: -2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f1-photo-2',
        url: '/media/notebook/friend-1/photo-2.jpg',
        caption: 'Ferrari red energy only',
        rotationDeg: 3,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'P1 FINISH',
  },
  {
    id: 'friend-entry-2',
    friendNumber: 2,
    friendName: 'Friend 2 (Name Here)',
    callsign: 'Team Principal #44',
    tagline: 'Still we rise — Ferrari edition.',
    writtenMessage: `Vaibhev, my brother!

Watching you navigate life with the precision of Lewis Hamilton hitting the apex at Copse corner is always inspiring. You bring that same relentless drive, style, and luxury mindset to every single room you enter.

Hope this birthday sets the stage for an legendary year ahead. Gold standard only, always!`,
    photos: [
      {
        id: 'f2-photo-1',
        url: '/media/notebook/friend-2/photo-1.jpg',
        caption: 'Pure podium celebration',
        rotationDeg: 1.5,
        aspectRatio: 'square',
      },
      {
        id: 'f2-photo-2',
        url: '/media/notebook/friend-2/photo-2.jpg',
        caption: 'High octane moments',
        rotationDeg: -3,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: '#44 SCUDERIA',
  },
  {
    id: 'friend-entry-3',
    friendNumber: 3,
    friendName: 'Friend 3 (Name Here)',
    callsign: 'Friendly Neighborhood Spider-Bro',
    tagline: 'With great horsepower comes great celebration.',
    writtenMessage: `To the one and only Vaibhev,

If Peter Parker had a Ferrari SF90 and an obsession with hypercars, that would literally be you. Thank you for always being the most reliable person to web-sling through chaos with.

Wishing you endless health, epic adventures, and a year that feels like a Marvel cinematic climax. You deserve the best!`,
    photos: [
      {
        id: 'f3-photo-1',
        url: '/media/notebook/friend-3/photo-1.jpg',
        caption: 'Our Multiverse variant of Peter Parker',
        rotationDeg: -1,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'spider-crimson',
    stickerBadge: 'SPIDER-SENSE',
  },
  {
    id: 'friend-entry-4',
    friendNumber: 4,
    friendName: 'Friend 4 (Name Here)',
    callsign: 'Netherite Master Architect',
    tagline: 'Crafting legendary moments since day one.',
    writtenMessage: `Happy Birthday Vaibhev!

You are that rare friend who is genuinely forged like full Netherite armor — resilient, top-tier, and never burning in the lava of life's challenges.

Whether we are grinding through projects or building elaborate late-night memories, you always bring 64 blocks of good vibes. Have the happiest birthday!`,
    photos: [
      {
        id: 'f4-photo-1',
        url: '/media/notebook/friend-4/photo-1.jpg',
        caption: 'Diamonds mined, memories made',
        rotationDeg: 2.5,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'NETHERITE TIER',
  },
  {
    id: 'friend-entry-5',
    friendNumber: 5,
    friendName: 'Friend 5 (Name Here)',
    callsign: 'The Tung Tung Tung Commander',
    tagline: 'Wake up! Tung Tung Tung Sahur energy all day.',
    writtenMessage: `Yo Vaibhev!

If there's anyone who can appreciate top-tier automotive luxury right alongside brainrot meme perfection, it's you. TUNG TUNG TUNG SAHUR!

Never lose your hilarious sense of humor and that infectious laugh. The squad wouldn't be complete without you. May your year be completely free of brain rot and packed with wins!`,
    photos: [
      {
        id: 'f5-photo-1',
        url: '/media/notebook/friend-5/photo-1.jpg',
        caption: 'Peak comedic timing',
        rotationDeg: -2.5,
        aspectRatio: 'square',
      },
      {
        id: 'f5-photo-2',
        url: '/media/notebook/friend-5/photo-2.jpg',
        caption: 'The meme archive',
        rotationDeg: 2,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'SAHUR VERIFIED',
  },
  {
    id: 'friend-entry-6',
    friendNumber: 6,
    friendName: 'Friend 6 (Name Here)',
    callsign: 'Aerodynamicist & Co-Pilot',
    tagline: 'Downforce maximum, drag minimum.',
    writtenMessage: `Happiest Birthday Vaibhev!

Driving through life with you as a friend is a masterclass in loyalty, laughs, and pure style. Your passion for cars and engineering always pushes everyone around you to aim higher and think bigger.

Here's to high-speed road trips, roaring exhausts, and many more late-night drives together!`,
    photos: [
      {
        id: 'f6-photo-1',
        url: '/media/notebook/friend-1/photo-1.jpg',
        caption: 'Cruising in style',
        rotationDeg: 1,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'V12 SYMPHONY',
  },
  {
    id: 'friend-entry-7',
    friendNumber: 7,
    friendName: 'Friend 7 (Name Here)',
    callsign: 'Monza Telemetry Lead',
    tagline: 'Flat out through the Curva Grande.',
    writtenMessage: `Dear Vaibhev,

Every great team needs a linchpin, and you are definitely ours. From the high-energy banter to the deep philosophical conversations at 2 AM, having you as a friend is a true privilege.

May your upcoming year be paved in 24k gold, full throttle and zero brake fade!`,
    photos: [
      {
        id: 'f7-photo-1',
        url: '/media/notebook/friend-2/photo-1.jpg',
        caption: 'Unfiltered candid moments',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'GOLD STANDARD',
  },
  {
    id: 'friend-entry-8',
    friendNumber: 8,
    friendName: 'Friend 8 (Name Here)',
    callsign: 'The Garage Curator',
    tagline: 'From Maranello with respect.',
    writtenMessage: `Happy Birthday Vaibhev!

They say you can tell a person by the cars they love and the people they keep around them. You have immaculate taste in both.

May this birthday bring you one step closer to parking your dream Prancing Horse in your real-life garage. Cheers to another legendary lap around the sun!`,
    photos: [
      {
        id: 'f8-photo-1',
        url: '/media/notebook/friend-1/photo-2.jpg',
        caption: 'Dream machine aesthetics',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'PRANCING HORSE',
  },
  {
    id: 'friend-entry-9',
    friendNumber: 9,
    friendName: 'Friend 9 (Name Here)',
    callsign: 'The Chequered Flag Finisher',
    tagline: 'Rounding out the 9-squad salute.',
    writtenMessage: `To Vaibhev on your special day!

Wrapping up this 9-friend scrapbook with nothing but immense respect and love for who you are. You inspire us, make us laugh till our stomachs hurt, and set the standard for what true friendship looks like.

Take a bow, celebrate like a champion on the top step of the podium, and know that all 9 of us have got your back always!`,
    photos: [
      {
        id: 'f9-photo-1',
        url: '/media/notebook/friend-2/photo-2.jpg',
        caption: 'The complete 9-squad collective',
        rotationDeg: -2,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'PODIUM CHAMPION',
  },
]);

/**
 * Returns canonical entries in original fixed order (Friend 1 -> Friend 9).
 */
export function getCanonicalNotebookEntries(): NotebookEntry[] {
  return [...NOTEBOOK_ENTRIES];
}

/**
 * Returns notebook entries shuffled uniquely for the current session.
 * Order persists across navigation in the same session, but randomizes on a fresh session.
 * Original data is NEVER modified.
 */
export function getRandomizedNotebookEntries(): NotebookEntry[] {
  return getSessionShuffled(NOTEBOOK_ENTRIES);
}

/**
 * Forces a new randomized shuffle (useful for an interactive "Shuffle Scrapbook" button).
 */
export function getFreshlyShuffledEntries(): NotebookEntry[] {
  return pureShuffle(NOTEBOOK_ENTRIES);
}

/**
 * Finds an entry by stable ID regardless of its randomized position.
 */
export function getNotebookEntryById(id: string): NotebookEntry | undefined {
  return NOTEBOOK_ENTRIES.find((entry) => entry.id === id);
}
