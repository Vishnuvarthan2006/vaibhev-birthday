import type { NotebookEntry } from '../types/notebook';
import { getSessionShuffled, pureShuffle } from '../utils/shuffle';

/**
 * =========================================================================
 * THE NINE CHAPTERS: NOTEBOOK ENTRIES FOR VAIBHEV
 * =========================================================================
 *
 * HOW THE 9 FRIENDS EDIT THEIR ENTRY:
 * 1. Find your block below (friend-01 through friend-09).
 * 2. Replace 'friendName' with your real name.
 * 3. Customize your 'chapterTitle' and 'callsign'.
 * 4. Write your personal birthday message in 'writtenMessage'.
 * 5. Add your signoff in 'closingNote'.
 * 6. Place your photo files into /public/media/notebook/friend-0X/
 *    and update the 'photos' array.
 *
 * NOTE ON RANDOMIZATION:
 * - The original array below is canonical and NEVER modified or permanently reordered.
 * - On each new visit / browser session, chapters are randomized using getRandomizedNotebookEntries().
 * - Each entry keeps its unique ID and photos wherever it is presented.
 */
export const NOTEBOOK_ENTRIES: readonly NotebookEntry[] = Object.freeze([
  {
    id: 'friend-01',
    friendNumber: 1,
    friendName: 'Friend 01 (Replace with Name)',
    chapterTitle: 'Chapter I: The Telemetry of Loyalty',
    callsign: 'Pit Wall Strategist',
    tagline: 'Box, box, box for the ultimate birthday lap.',
    writtenMessage: `Happy Birthday, Vaibhev!

Another year older, another pole position in the grand prix of life. From obsessing over every Ferrari pitstop strategy to debating qualifying sectors and high-revving V10 engine notes, there's nobody else I'd rather analyze the telemetry with.

You bring a relentless energy and dedication to everything you touch. Whether we're tackling real-life challenges or just having late-night debates, your loyalty as a friend never wavers.

May this year bring you absolute P1 speed, zero mechanical penalties, and unlimited horsepower in everything you aim for. Keep pushing the limits!`,
    closingNote: 'Always in your corner on the pit wall, — Friend 01',
    photos: [
      {
        id: 'f01-p1',
        url: '/media/notebook/friend-01/photo-1.jpg',
        caption: 'Grand Prix memories with the squad',
        rotationDeg: -2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f01-p2',
        url: '/media/notebook/friend-01/photo-2.jpg',
        caption: 'Ferrari scarlet energy only',
        rotationDeg: 2.5,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'P1 FINISH',
  },
  {
    id: 'friend-02',
    friendNumber: 2,
    friendName: 'Friend 02 (Replace with Name)',
    chapterTitle: 'Chapter II: Still We Rise',
    callsign: 'Team Principal #44',
    tagline: 'Still we rise — Scuderia edition.',
    writtenMessage: `Vaibhev, my brother!

Watching you navigate life with the precision of Lewis Hamilton hitting the apex at Copse corner is always inspiring. You bring that same relentless drive, natural style, and luxury mindset to every single room you walk into.

Thank you for always setting high standards and reminding all of us to stay hungry, humble, and authentic. No matter how wild the journey gets, you always keep your eyes on the podium.

Wishing you a legendary year ahead. 24k gold standard only, always!`,
    closingNote: 'Hammer time every day, — Friend 02 (#44)',
    photos: [
      {
        id: 'f02-p1',
        url: '/media/notebook/friend-02/photo-1.jpg',
        caption: 'Pure podium celebration vibes',
        rotationDeg: 1.5,
        aspectRatio: 'square',
      },
      {
        id: 'f02-p2',
        url: '/media/notebook/friend-02/photo-2.jpg',
        caption: 'High octane milestone moments',
        rotationDeg: -3,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: '#44 SCUDERIA',
  },
  {
    id: 'friend-03',
    friendNumber: 3,
    friendName: 'Friend 03 (Replace with Name)',
    chapterTitle: 'Chapter III: Multiverse Coordinates',
    callsign: 'Friendly Neighborhood Spider-Bro',
    tagline: 'With great horsepower comes great celebration.',
    writtenMessage: `To the one and only Vaibhev,

If Peter Parker drove a Ferrari SF90 and had an immaculate obsession with hypercars, that would literally be you. Thank you for always being the most reliable person in the multiverse to web-sling through life's chaos with.

From the random deep talks to the uncontrollable laughs, having you in the squad makes every single day feel cinematic. You possess that genuine superhero trait of lifting everyone around you up.

Wishing you endless health, epic adventures, and a year that feels like an IMAX climax. You deserve nothing less!`,
    closingNote: 'Your friendly neighborhood ally, — Friend 03',
    photos: [
      {
        id: 'f03-p1',
        url: '/media/notebook/friend-03/photo-1.jpg',
        caption: 'Our Multiverse variant of Peter Parker',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'spider-crimson',
    stickerBadge: 'SPIDER-SENSE',
  },
  {
    id: 'friend-04',
    friendNumber: 4,
    friendName: 'Friend 04 (Replace with Name)',
    chapterTitle: 'Chapter IV: Forged in Netherite',
    callsign: 'Netherite Master Architect',
    tagline: 'Crafting legendary memories since day one.',
    writtenMessage: `Happy Birthday, Vaibhev!

You are that rare friend who is genuinely forged like full Netherite armor — resilient, top-tier, and completely impervious to the lava of life's daily stress.

Whether we are grinding through late-night work sessions or building elaborate memories together, you always bring 64 blocks of positive energy and unwavering loyalty.

May your upcoming year be packed with diamonds, rare loot, and flawless builds in whatever you pursue!`,
    closingNote: 'Unbreakable III enchanted, — Friend 04',
    photos: [
      {
        id: 'f04-p1',
        url: '/media/notebook/friend-04/photo-1.jpg',
        caption: 'Diamonds mined, memories built',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'NETHERITE TIER',
  },
  {
    id: 'friend-05',
    friendNumber: 5,
    friendName: 'Friend 05 (Replace with Name)',
    chapterTitle: 'Chapter V: The Tung Tung Tung Symphony',
    callsign: 'The Tung Tung Tung Commander',
    tagline: 'Wake up! Tung Tung Tung Sahur energy all day.',
    writtenMessage: `Yo Vaibhev!

If there's anyone who can appreciate ultra-luxury automotive engineering right alongside the highest tier of brainrot comedy, it is 100% you. TUNG TUNG TUNG SAHUR!

Never lose your incredible sense of humor and that infectious laugh that can rescue any gloomy day. The squad groupchat would be dead without your daily commentary.

May your year be completely free of brain rot and packed with massive personal wins!`,
    closingNote: 'Sahur alarm permanently set, — Friend 05',
    photos: [
      {
        id: 'f05-p1',
        url: '/media/notebook/friend-05/photo-1.jpg',
        caption: 'Peak comedic timing captured',
        rotationDeg: -2.5,
        aspectRatio: 'square',
      },
      {
        id: 'f05-p2',
        url: '/media/notebook/friend-05/photo-2.jpg',
        caption: 'The meme archive chronicles',
        rotationDeg: 2,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'SAHUR VERIFIED',
  },
  {
    id: 'friend-06',
    friendNumber: 6,
    friendName: 'Friend 06 (Replace with Name)',
    chapterTitle: 'Chapter VI: The High-Downforce Brotherhood',
    callsign: 'Aerodynamicist & Co-Pilot',
    tagline: 'Downforce maximum, drag minimum.',
    writtenMessage: `Happiest Birthday, Vaibhev!

Cruising through life with you as a co-pilot is an absolute masterclass in style, wit, and genuine warmth. Your passion for cars, mechanical excellence, and fine details inspires everyone to take pride in what they do.

Here is to roaring exhausts, open highway road trips, and countless more memories created in the fast lane.

Have a magnificent celebration today!`,
    closingNote: 'Eyes on the road, pedal down, — Friend 06',
    photos: [
      {
        id: 'f06-p1',
        url: '/media/notebook/friend-06/photo-1.jpg',
        caption: 'Cruising through the golden hour',
        rotationDeg: 1.5,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'V12 SYMPHONY',
  },
  {
    id: 'friend-07',
    friendNumber: 7,
    friendName: 'Friend 07 (Replace with Name)',
    chapterTitle: 'Chapter VII: Curva Grande at Full Throttle',
    callsign: 'Monza Telemetry Lead',
    tagline: 'Flat out through the Curva Grande.',
    writtenMessage: `Dear Vaibhev,

Every championship-winning squad needs an emotional anchor, and you are undeniably ours. From the high-energy banter to the deep, honest 2:00 AM conversations about life and ambitions, having you in my life has been one of my greatest blessings.

You face every hurdle with calm confidence and high spirits. May your next year be paved with smooth asphalt, 24k gold moments, and zero brake fade!`,
    closingNote: 'With deepest respect and warmth, — Friend 07',
    photos: [
      {
        id: 'f07-p1',
        url: '/media/notebook/friend-07/photo-1.jpg',
        caption: 'Unfiltered candid moments',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'GOLD STANDARD',
  },
  {
    id: 'friend-08',
    friendNumber: 8,
    friendName: 'Friend 08 (Replace with Name)',
    chapterTitle: 'Chapter VIII: The Maranello Dreamers',
    callsign: 'The Garage Curator',
    tagline: 'From Maranello with respect.',
    writtenMessage: `Happy Birthday, Vaibhev!

They say you can tell everything about someone by the machines they admire and the friends they keep close. You have immaculate taste in both.

May this year take you one step closer to parking that dream Prancing Horse in your real-life garage. Thank you for the laughs, the late-night road trips, and the unwavering brotherhood.

Cheers to another legendary lap around the sun!`,
    closingNote: 'Forza sempre, — Friend 08',
    photos: [
      {
        id: 'f08-p1',
        url: '/media/notebook/friend-08/photo-1.jpg',
        caption: 'Dream machine aesthetics',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'PRANCING HORSE',
  },
  {
    id: 'friend-09',
    friendNumber: 9,
    friendName: 'Friend 09 (Replace with Name)',
    chapterTitle: 'Chapter IX: The Chequered Flag Salute',
    callsign: 'The Chequered Flag Finisher',
    tagline: 'Rounding out the 9-squad salute.',
    writtenMessage: `To Vaibhev on your special day!

Closing out this 9-friend scrapbook with nothing but the deepest admiration and love for who you are. You inspire us, make us laugh till our ribs hurt, and set the standard for what authentic friendship looks like.

Take a bow, celebrate like a true champion on the top step of the podium, and know that all nine of us will always be standing right beside you.

Happy Birthday, brother!`,
    closingNote: 'Top step of the podium forever, — Friend 09',
    photos: [
      {
        id: 'f09-p1',
        url: '/media/notebook/friend-09/photo-1.jpg',
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
 * Returns canonical entries in original fixed order (Friend 01 -> Friend 09).
 */
export function getCanonicalNotebookEntries(): NotebookEntry[] {
  return [...NOTEBOOK_ENTRIES];
}

/**
 * Returns notebook entries shuffled uniquely for the current session.
 * Order persists across page navigation in the same session,
 * but randomizes afresh on a brand new browser visit/session.
 */
export function getRandomizedNotebookEntries(): NotebookEntry[] {
  return getSessionShuffled(NOTEBOOK_ENTRIES, 'vaibhev_notebook_order_v1');
}

/**
 * Forces a new randomized shuffle on demand.
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
