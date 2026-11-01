# 📖 How the 9 Friends Edit The Notebook

Welcome! This guide explains how each of the 9 friends can add their personal message, chapter title, and photographs for Vaibhev.

---

### Step 1: Find Your Entry

Open:
`src/data/notebookData.ts`

Scroll to your assigned slot:
- `friend-01` (Friend 1)
- `friend-02` (Friend 2)
- `friend-03` (Friend 3)
- `friend-04` (Friend 4)
- `friend-05` (Friend 5)
- `friend-06` (Friend 6)
- `friend-07` (Friend 7)
- `friend-08` (Friend 8)
- `friend-09` (Friend 9)

---

### Step 2: Personalize Your Details & Message

In your block, update:
```ts
{
  id: 'friend-01',                       // DO NOT CHANGE the id
  friendNumber: 1,                       // Slot number (1 to 9)
  friendName: 'Alex Mercer',             // Put your real name here!
  chapterTitle: 'Chapter I: The Apex',   // Your custom chapter headline
  callsign: 'Pit Wall Strategist',       // Fun nickname / F1 / gaming role
  tagline: 'Box, box, box!',             // One-line quote
  writtenMessage: `Write your personal message here.

You can have multiple paragraphs.
Talk about memories, funny moments, Ferrari, inside jokes, or heartfelt wishes!`,
  closingNote: 'Always in your corner, — Alex',  // Your sign-off / signature
  ...
}
```

---

### Step 3: Add Your Photographs

1. Create or open your folder:
   `public/media/notebook/friend-01/` (match your friend number)
2. Copy your image files into that folder (e.g. `trip.jpg`, `dinner.png`, `ferrari.webp`).
3. In `src/data/notebookData.ts`, update your `photos` array:

```ts
photos: [
  {
    id: 'f01-p1',
    url: '/media/notebook/friend-01/trip.jpg',
    caption: 'Road trip to Monza 2024',
    rotationDeg: -2,                // Slight tilt (-3 to 3 degrees)
    aspectRatio: 'landscape',       // 'landscape' | 'portrait' | 'square'
  },
  {
    id: 'f01-p2',
    url: '/media/notebook/friend-01/candid.jpg',
    caption: 'Late night food runs',
    rotationDeg: 2.5,
    aspectRatio: 'portrait',
  },
]
```

> **Tip:** You can add 1, 2, 3, or more photos! If you don't have photos yet, leave the array empty (`photos: []`) and an elegant scrapbook placeholder will be displayed automatically.

---

### Step 4: Preview Your Changes Locally

Run in your terminal:
```bash
npm run dev
```

Open:
`http://localhost:5173/`

Click **"ENTER THE PADDOCK"** -> **"THE NOTEBOOK"** to see your chapter in real-time!

---

### Important Notes:
- **No code modification needed:** You only touch `src/data/notebookData.ts` and drop files into `public/media/notebook/friend-0X/`.
- **Randomization:** The website shuffles the presentation order on each new session so it feels like a fresh memory book every time. Don't worry if your chapter appears in a different position—your photos and message will ALWAYS stay attached to you!
