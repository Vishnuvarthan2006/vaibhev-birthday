import type { NotebookEntry } from '../types/notebook';
import { getSessionShuffled, pureShuffle } from '../utils/shuffle';

/**
 * =========================================================================
 * THE NINE CHAPTERS: NOTEBOOK ENTRIES FOR VAIBHEV
 * =========================================================================
 *
 * Contributed by the 9 friends:
 * 1. Vishnu
 * 2. Santhosh
 * 3. Akshaya
 * 4. Deepthi
 * 5. Sanjitha
 * 6. Savitha
 * 7. Sathiya
 * 8. Thiru
 * 9. Rashmika
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
    friendName: 'Vishnu',
    chapterTitle: 'Chapter I: The Telemetry of Loyalty',
    callsign: 'Pit Wall Strategist',
    tagline: 'Box, box, box for the ultimate birthday lap.',
    writtenMessage: `Happy Birthday, Vaibhev!

Another year older, another pole position in the grand prix of life. From obsessing over every Ferrari pitstop strategy to debating qualifying sectors and high-revving V10 engine notes, there's nobody else I'd rather analyze the telemetry with.

You bring a relentless energy and dedication to everything you touch. Whether we're tackling real-life challenges or just having late-night debates, your loyalty as a friend never wavers.

May this year bring you absolute P1 speed, zero mechanical penalties, and unlimited horsepower in everything you aim for. Keep pushing the limits!`,
    closingNote: 'Always in your corner on the pit wall, — Vishnu',
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
      {
        id: 'f01-p3',
        url: '/media/notebook/friend-01/photo-3.jpg',
        caption: 'Pit wall strategist at work',
        rotationDeg: -1.5,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'P1 FINISH',
  },
  {
    id: 'friend-02',
    friendNumber: 2,
    friendName: 'Santhosh',
    chapterTitle: 'Chapter II: The Photo Boi Chronicles',
    callsign: 'The Photo Boi',
    tagline: 'Preserving the craziest moments from behind the lens.',
    writtenMessage: `Happy Birthday, Vaibee!!

You have always been the person capturing all the moments from behind the camera and saving them up. Without you, a lot of things would have just remained memories. The future generations gotta know the crazy shit we did back in the days laa.

Thank you soo much for that! After every ethnic wear, every single person waits for your Drive link, and that's how you got your nickname, THE PHOTO BOI. You even get a free pass to stalk strangers as well (jk jk).

Anywayss, HAPPIEST BDAY!! You're old now as well... prolly, you'd be the only person with a better sense of humour than me. Keep smiling and making others laugh. Have the best year ahead!!`,
    closingNote: 'Keep smiling & making us laugh, — Santhosh',
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
      {
        id: 'f02-p3',
        url: '/media/notebook/friend-02/photo-3.jpg',
        caption: 'Hammer time memories',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f02-p4',
        url: '/media/notebook/friend-02/photo-4.jpg',
        caption: '24k gold standard always',
        rotationDeg: -1.5,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'SCUDERIA MARANELLO',
  },
  {
    id: 'friend-03',
    friendNumber: 3,
    friendName: 'Akshaya',
    chapterTitle: 'Chapter III: Multiverse Coordinates',
    callsign: 'Friendly Neighborhood Spider-Ally',
    tagline: 'With great horsepower comes great celebration.',
    writtenMessage: `To the one and only Vaibhev,

If Peter Parker drove a Ferrari SF90 and had an immaculate obsession with hypercars, that would literally be you. Thank you for always being the most reliable person in the multiverse to web-sling through life's chaos with.

From the random deep talks to the uncontrollable laughs, having you in the squad makes every single day feel cinematic. You possess that genuine superhero trait of lifting everyone around you up.

Wishing you endless health, epic adventures, and a year that feels like an IMAX climax. You deserve nothing less!`,
    closingNote: 'Your friendly neighborhood ally, — Akshaya',
    photos: [
      {
        id: 'f03-p1',
        url: '/media/notebook/friend-03/photo-1.jpg',
        caption: 'Our Multiverse variant of Peter Parker',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
      {
        id: 'f03-p2',
        url: '/media/notebook/friend-03/photo-2.jpg',
        caption: 'Web-slinging through chaos',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f03-p3',
        url: '/media/notebook/friend-03/photo-3.jpg',
        caption: 'Cinematic squad memories',
        rotationDeg: -1,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'spider-crimson',
    stickerBadge: 'SPIDER-SENSE',
  },
  {
    id: 'friend-04',
    friendNumber: 4,
    friendName: 'Deepthi',
    chapterTitle: 'Chapter IV: 1234 Pastimes & Peaceful Vibes',
    callsign: 'Java Lab Escape Artist',
    tagline: 'Quietly observing, making memories that last.',
    writtenMessage: `Happy birthday Vaibhev! I wish you a great and successful year ahead.

You are someone who seems quiet but observes everything around you. Us playing 1234 games when other ecm peeps are in java lab will be my all time favourite pastime.

Let us make more fun memories together and stay in touch even after college ends.`,
    closingNote: 'Peace, Dpt',
    photos: [
      {
        id: 'f04-p1',
        url: '/media/notebook/friend-04/photo-1.jpg',
        caption: 'Diamonds mined, memories built',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f04-p2',
        url: '/media/notebook/friend-04/photo-2.jpg',
        caption: 'Netherite tier memories',
        rotationDeg: -2,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'NETHERITE TIER',
  },
  {
    id: 'friend-05',
    friendNumber: 5,
    friendName: 'Sanjitha',
    chapterTitle: 'Chapter V: The Tung Tung Tung Symphony',
    callsign: 'The Tung Tung Tung Commander',
    tagline: 'Wake up! Tung Tung Tung Sahur energy all day.',
    writtenMessage: `Yo Vaibhev!

If there's anyone who can appreciate ultra-luxury automotive engineering right alongside the highest tier of brainrot comedy, it is 100% you. TUNG TUNG TUNG SAHUR!

Never lose your incredible sense of humor and that infectious laugh that can rescue any gloomy day. The squad groupchat would be dead without your daily commentary.

May your year be completely free of brain rot and packed with massive personal wins!`,
    closingNote: 'Sahur alarm permanently set, — Sanjitha',
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
    friendName: 'Savitha',
    chapterTitle: 'Chapter VI: The Gopal Chronicles & Kulfi Memories',
    callsign: 'Kulfi Mukkiyam Bigiluhh',
    tagline: 'Always here for your endless rants.',
    writtenMessage: `Hey mannnn!!! How did it alll starttttt.... I'm likee looking backk.... In the search I was so curious that I went to WhatsApp... Our first chat.... I have nooo clue what it is u sent me... a couple of pics and videos lolll on 21 Aug 2024.... Uffff we hv known each other for 2 years already...and the second one was 😂... I told i hv given u linked in req.... Were we that professional lol 😭😂...

Anywayssss....u are the person who is quiet but when it comes to roasting no one can beat you lol.... You throw bangersss ✨
And the way you always keep a soft smile... Please carry it with you inimelum in your life....
We had so much beautiful memories together...
Idk why I just got reminded of the kulfi memory 😅😂...
"Kulfi ah pudi daaa... Kulfi mukkiyam bigiluhh"...
Don't feel alone or left out....
I'm always here for you... And yess I'm always the person who you can tell endless rants... I won't ghost you... I mean who can 😂✨....

Happyyy happyyyy happyyy birthdayy Gopallll (idk why I came up with this name till date 😂).... Always be happy and yayyy roasting all of us 💖✨😂`,
    closingNote: 'Always here for you, — Savitha (Gopal\'s #1 fan ✨)',
    photos: [
      {
        id: 'f06-p1',
        url: '/media/notebook/friend-06/photo-1.jpg',
        caption: 'Cruising through the golden hour',
        rotationDeg: 1.5,
        aspectRatio: 'landscape',
      },
      {
        id: 'f06-p2',
        url: '/media/notebook/friend-06/photo-2.jpg',
        caption: 'High-downforce moments',
        rotationDeg: -2,
        aspectRatio: 'portrait',
      },
      {
        id: 'f06-p3',
        url: '/media/notebook/friend-06/photo-3.jpg',
        caption: 'Fast lane memories',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f06-p4',
        url: '/media/notebook/friend-06/photo-4.jpg',
        caption: 'Unstoppable brotherhood',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'ferrari-red',
    stickerBadge: 'V12 SYMPHONY',
  },
  {
    id: 'friend-07',
    friendNumber: 7,
    friendName: 'Sathiya',
    chapterTitle: 'Chapter VII: Curva Grande & Mallu Buddy Tech Talks',
    callsign: 'Tech & Automobile Co-Pilot',
    tagline: 'Tech yaps, automobile talks, and unforgettable car trips.',
    writtenMessage: `Yoo Happy Birthdayy Vaibhev!!

Bro is one of the best mallu baddies(buddy) out there. Love the way we yap over tech, and when it comes to automobiles you're the man. Though the NPTEL was a complete flop our lil car trip and the talk with the boys?? Peakkk.

Love that you have such a practical mind and also I genuinely appreciate your willingness to try new things and do things differently, even when it means going at it alone. It's not always easy, and I think it's pretty cool that you don't let that stop you.

Also you're pretty much behind all the memories we get to look back on, so thanks for always capturing them. Have a solid year ahead, man!!`,
    closingNote: 'Have a solid year ahead, — Sathiya',
    photos: [
      {
        id: 'f07-p1',
        url: '/media/notebook/friend-07/photo-1.jpg',
        caption: 'Unfiltered candid moments',
        rotationDeg: -1.5,
        aspectRatio: 'portrait',
      },
      {
        id: 'f07-p2',
        url: '/media/notebook/friend-07/photo-2.jpg',
        caption: 'Monza memories & brotherhood',
        rotationDeg: 2,
        aspectRatio: 'portrait',
      },
    ],
    accentStyle: 'gold',
    stickerBadge: 'GOLD STANDARD',
  },
  {
    id: 'friend-08',
    friendNumber: 8,
    friendName: 'Thiru',
    chapterTitle: 'Chapter VIII: The Maranello Dreamers',
    callsign: 'The Garage Curator',
    tagline: 'From Maranello with respect.',
    writtenMessage: `Happy Birthday, Vaibhev!

They say you can tell everything about someone by the machines they admire and the friends they keep close. You have immaculate taste in both.

May this year take you one step closer to parking that dream Prancing Horse in your real-life garage. Thank you for the laughs, the late-night road trips, and the unwavering brotherhood.

Cheers to another legendary lap around the sun!`,
    closingNote: 'Forza sempre, — Thiru',
    photos: [
      {
        id: 'f08-p1',
        url: '/media/notebook/friend-08/photo-1.jpeg',
        caption: 'Dream machine aesthetics',
        rotationDeg: 2,
        aspectRatio: 'landscape',
      },
      {
        id: 'f08-p2',
        url: '/media/notebook/friend-08/photo-2.jpeg',
        caption: 'Brotherhood moments',
        rotationDeg: -2.5,
        aspectRatio: 'portrait',
      },
      {
        id: 'f08-p3',
        url: '/media/notebook/friend-08/photo-3.jpeg',
        caption: 'Late night road trip vibes',
        rotationDeg: 1.5,
        aspectRatio: 'square',
      },
      {
        id: 'f08-p4',
        url: '/media/notebook/friend-08/photo-4.jpeg',
        caption: 'Forza sempre',
        rotationDeg: -1,
        aspectRatio: 'landscape',
      },
    ],
    accentStyle: 'carbon',
    stickerBadge: 'PRANCING HORSE',
  },
  {
    id: 'friend-09',
    friendNumber: 9,
    friendName: 'Rashmika',
    chapterTitle: 'Chapter IX: The Pazhampori Chronicles',
    callsign: 'Chief Ragebaiter',
    tagline: 'Yooooo പഴംപൊരി! Welcome to the club.',
    writtenMessage: `Yooooo പഴംപൊരി

welp first of all a very Happy Birthday (gramps) and welcome to the club!!

Anyways you are one of the only mallu friends i have and ragebaiting ya w the weird names from the south of kerala has always been fun😁😁😁

Anyways looking forward to more ragebaits hehe`,
    closingNote: 'Looking forward to more ragebaits hehe, — Rashmika',
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

export function getCanonicalNotebookEntries(): NotebookEntry[] {
  return [...NOTEBOOK_ENTRIES];
}

export function getRandomizedNotebookEntries(): NotebookEntry[] {
  return getSessionShuffled(NOTEBOOK_ENTRIES, 'vaibhev_notebook_order_v1');
}

export function getFreshlyShuffledEntries(): NotebookEntry[] {
  return pureShuffle(NOTEBOOK_ENTRIES);
}

export function getNotebookEntryById(id: string): NotebookEntry | undefined {
  return NOTEBOOK_ENTRIES.find((entry) => entry.id === id);
}
