# Scuderia 9-Squad Syndicate • Media Contribution Guide
**Crafted for Vaibhev's Birthday Grand Prix Edition**

This guide explains how all **9 friends** can add photographs and videos to the website **without writing or editing any React components**.

---

## 🏎️ Overview of the Media Folders

All media assets are stored inside the `public/` directory:

| Section | Local Files Directory | Config File to Edit |
| :--- | :--- | :--- |
| **Photo Archive** | `public/media/gallery/` | [`src/data/galleryData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/galleryData.ts) |
| **Video Vault** | `public/media/videos/` | [`src/data/videoData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/videoData.ts) |
| **3D Notebook** | `public/media/notebook/friend-01/` to `friend-09/` | [`src/data/notebookData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/notebookData.ts) |

---

## 📸 Part 1: How to Add Photos to "The Memory Archive"

### Step 1: Copy your image file
1. Choose an image (JPG, PNG, or WebP).
2. Save it inside: `public/media/gallery/`  
   *Example: `public/media/gallery/go-kart-race.jpg`*

### Step 2: Register it in `src/data/galleryData.ts`
Open [`src/data/galleryData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/galleryData.ts) and add your entry to `GALLERY_PHOTOS`:

```typescript
{
  id: 'photo-13',
  title: 'Karting Grand Prix P1',
  description: 'Vaibhev overtaking on the final chicane with pure racecraft.',
  imageUrl: '/media/gallery/go-kart-race.jpg',
  category: 'cars-f1', // See categories below
  dateOrEvent: 'Karting Championship 2024',
  contributor: 'Kabir',
  featured: false, // Set to true to give it a gold badge
  aspectRatio: 'landscape', // 'landscape', 'portrait', or 'square'
  tags: ['Karting', 'P1', 'Ferrari'],
},
```

### Available Categories (or customize them!):
- `'squad-memories'` (Squad Memories)
- `'celebrations'` (Celebrations)
- `'random-moments'` (Random Moments)
- `'cars-f1'` (Cars & F1)
- `'special-moments'` (Special Moments)

> **Tip:** You can add new categories by simply adding them to `GALLERY_CATEGORIES` in the same file!

---

## 🎬 Part 2: How to Add Videos to "The Video Vault"

### Step 1: Copy your video file
1. Export your video as an **MP4** or **WebM** (H.264 video codec recommended).
2. Save it inside: `public/media/videos/`  
   *Example: `public/media/videos/birthday-tribute.mp4`*
3. *(Optional)* Save a video thumbnail/poster: `public/media/videos/birthday-tribute-poster.jpg`

### Step 2: Register it in `src/data/videoData.ts`
Open [`src/data/videoData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/videoData.ts) and add your entry to `VIDEO_VAULT_ENTRIES`:

```typescript
{
  id: 'video-vault-7',
  title: 'Birthday Road Trip Highlights',
  description: 'Uncut dashcam and GoPro footage from the midnight drive to the hills.',
  videoUrl: '/media/videos/road-trip-highlights.mp4',
  posterUrl: '/media/videos/road-trip-poster.jpg', // Optional
  duration: '02:45',
  contributor: 'Arjun & Rohan',
  category: 'tribute', // 'tribute' | 'racing' | 'wishes' | 'memes' | 'bloopers'
  dateAdded: 'November 2026',
  featured: false, // Set to true to spotlight it in the main cinema showcase
  resolution: '1080p 60fps',
},
```

### Key Player Features:
- **No Autoplay Noise:** Videos will **never** blast audio on load. Sound is 100% controlled by the viewer.
- **Custom Screening Modal:** Includes play/pause, time scrubber, volume slider, mute toggle, and full-screen support.
- **Graceful Fallbacks:** If a video file isn't uploaded yet, an interactive F1 telemetry slate lets users preview the player immediately.

---

## 📖 Part 3: How to Update Notebook Memories for Each Friend

Each of the 9 friends has a dedicated chapter in the 3D Notebook:

1. Look in `public/media/notebook/`:
   - `friend-01` (Aarav)
   - `friend-02` (Kabir)
   - `friend-03` (Rohan)
   - `friend-04` (Siddharth)
   - `friend-05` (Arjun)
   - `friend-06` (Vikram)
   - `friend-07` (Dev)
   - `friend-08` (Aditya)
   - `friend-09` (Nakul)
2. Place polaroid photos in your folder (e.g. `public/media/notebook/friend-01/photo-1.jpg`).
3. Update your chapter's letter and photo captions in [`src/data/notebookData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/notebookData.ts).

---

## ⚡ Media Quality & Sizing Recommendations

| Media Type | Recommended Resolution | Recommended Max File Size | Recommended Tool |
| :--- | :--- | :--- | :--- |
| **Gallery Photos** | 1920 × 1440 or 1920 × 1080 | < 800 KB per photo | [TinyPNG](https://tinypng.com/) / Squoosh |
| **Video Files** | 1080p (1920 × 1080) @ 30/60fps | < 50 MB per video | [Handbrake](https://handbrake.fr/) |
| **Polaroid Photos** | 1200 × 900 (4:3 aspect ratio) | < 500 KB per photo | Mobile crop / TinyPNG |
