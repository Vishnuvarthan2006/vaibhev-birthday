# Scuderia 9-Squad Syndicate • Vaibhev's Birthday Grand Prix (#44)

An ultra-premium, interactive birthday website crafted for **Vaibhev** by his syndicate of **9 friends**.

Combines the aesthetics of **Ferrari Formula 1 (#44 Lewis Hamilton)**, luxury automotive engineering, a realistic **3D page-turning memory notebook**, an editorial **Photo Archive**, a private **Cinema Video Vault**, and the classified **Secret Garage** featuring **Operation Vaibhev: The Nine-Clue Treasure Hunt**.

---

## 🏎️ Website Architecture & Destinations

1. **Cinematic Landing Page:** F1 5-light starting gantry with Web Audio telemetry beeps, "LIGHTS OUT" sequence, and reveal of the birthday experience.
2. **The Paddock Dashboard:** Central mission control with live pit wall telemetry HUD, Ferrari #44 gauges, and gateway routing to all sectors.
3. **The Notebook ("The Nine Chapters"):** A physical 3D leather journal with realistic paper curl, live mouse drag physics, multi-photo polaroids, and personal letters from each of the 9 friends.
4. **Photo Archive ("The Memory Archive"):** Editorial masonry photography gallery with category filters, full-screen lightbox with touch swipe support, and lazy loading.
5. **Video Vault ("The Video Vault"):** Private cinema screening room featuring featured video spotlight, local MP4 streaming, and custom controls (no autoplay sound).
6. **Secret Garage ("Operation Vaibhev"):** Underground test lab housing 4 interactive experiences and the 9-clue syndicate treasure hunt unlocking the Grand Final Vault.

---

## 🛠️ Secret Garage & Easter Egg Customization Guide

All Easter Egg clues, riddles, and puzzle ciphers are decoupled from code into clean data structures.

### 1. Editing Treasure Hunt Clues & Riddles
Open [`src/data/treasureHuntData.ts`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/treasureHuntData.ts):
- **`TREASURE_CLUES`**: Contains the definition of all 9 clues.
  ```typescript
  {
    id: 'clue-1-reaction',
    number: 1,
    title: 'Maranello Reaction Telemetry',
    locationName: 'Secret Garage • Reaction Dyno',
    riddleHint: 'Where starting lights extinguish and reaction times are clocked...',
    cipherLetter: 'V',
    cipherIndex: 0,
    symbol: '🏎️',
    flavorText: 'Reflexes sharper than an apex overtake at Monza.',
  }
  ```
- **`MASTER_VAULT_CODE`**: Defaults to `'VAIBHEV44'`. You can change this code string at any time.

### 2. The Four Interactive Mini-Games
Located in `src/components/garage/`:
- **F1 Reaction Dyno (`F1ReactionTest.tsx`):**
  - Reaction time test with sequential gantry lights and false start penalty detection.
  - Target time to unlock Clue 1: $\le 380\text{ms}$ (easily adjustable in code).
- **Spider-Sense Radar (`SpiderSenseGame.tsx`):**
  - Concentric web radar with 4 cardinal instinct nodes: *Agility, Instinct, Courage, Loyalty*.
  - Tapping all 4 nodes triggers the Spider-Sense particle resonance and unlocks Clue 2.
- **Netherite Deep Mine (`MinecraftMiningGame.tsx`):**
  - 3x3 interactive voxel grid with Minecraft pickaxe sounds and crack overlays.
  - Mining the central Ancient Debris drops a Netherite Ingot and unlocks Clue 3.
- **Brainrot Chaos Zone (`BrainrotZone.tsx`):**
  - Interactive soundboard featuring *Tung Tung Tung Sahur*, *Taluku Buluku*, *Scuderia V12*, *Spider-Thwip*, and *Emotional Damage*.
  - Tapping the "Tung Tung Tung Sahur" rhythm button 3 times triggers *Taluku Buluku* party mode and unlocks Clue 4.

### 3. Clues Discovered Across Other Website Sectors
- **Clue 5 (`clue-5-notebook`):** Hidden on the Epilogue spread of the 3D Notebook. Tap the gold wax seal on the closing spread to decode `[H]`.
- **Clue 6 (`clue-6-gallery`):** Hidden in the Photo Archive header. Tap the `VAIBHEV #44 ARCHIVE` shutter badge to decode `[E]`.
- **Clue 7 (`clue-7-vault`):** Hidden in the Video Vault header. Tap the `CLASSIFIED TRANSMISSIONS` frequency badge to decode `[V]`.
- **Clue 8 (`clue-8-paddock`):** Hidden in the Live Telemetry HUD. Tap the `CAR #44` driver badge 3 times to enter Overdrive and decode `[4]`.
- **Clue 9 (`clue-9-syndicate`):** Located in the Secret Garage. Tap all 9 friend nodes in the Syndicate Keystone to decode `[4]`.

### 4. Customizing the Final Vault Birthday Dispatch
Open [`src/components/garage/GrandFinalVault.tsx`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/components/garage/GrandFinalVault.tsx):
- Edit the collective letter text signed by the 9 friends.
- Swap the photo slot `/public/media/gallery/squad-collective.jpg` for your favorite syndicate group photo.

---

## 📸 Media Contribution Guide for Friends

To add photos, videos, and notebook polaroids without touching React code, read:
👉 [`src/data/MEDIA_CONTRIBUTION_GUIDE.md`](file:///C:/Users/VELMURUGAN.M/.gemini/antigravity/scratch/vaibhev-birthday/src/data/MEDIA_CONTRIBUTION_GUIDE.md)

---

## 💻 Development & Build Scripts

```bash
# Start local development server
npm run dev

# Run Oxlint static code analysis
npm run lint

# Compile TypeScript and create production bundle
npm run build
```
