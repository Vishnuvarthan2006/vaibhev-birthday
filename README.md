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
- **`TREASURE_CLUES`**: Contains the definition of all 9 clues, each curated by one of the 9 friends.
- **`MASTER_VAULT_CODE`**: Defaults to `'MEGA MIND'`. Accepts `'MEGA MIND'` and `'MEGAMIND'` (case-insensitive).

### 2. The Six Secret Garage Arcade Games
1. **The Need for Speed** (`F1ReactionTest.tsx`):
   - F1 5-light starting gantry launch reaction test with false start penalty detection.
   - Core gameplay preserved. Unlocks Vishnu's Clue 1 on reaction $\le 380\text{ms}$.
2. **The Chaos Theory** (`BrainrotZone.tsx`):
   - Interactive soundboard featuring *Tung Tung Tung Sahur*, *Taluku Buluku*, *Scuderia V12*, *Spider-Thwip*, and *Emotional Damage*.
   - Core gameplay preserved. Unlocks Deepthi's Clue 4 when tapping *Tung Tung Tung Sahur* 3 times in rapid rhythm.
3. **Santhosh's Craft It or Lose It** (`CraftingChallengeGame.tsx`):
   - Minecraft crafting table challenge with 5 progressive rounds (Diamond Sword, Golden Apple, Combat Shield, Hunting Bow, Eye of Ender).
   - Dynamic inventory selection, live timer, combo streaks, crafting feedback, and final rank.
4. **Vishnu's Pit Stop Panic** (`PitStopPanicGame.tsx`):
   - High-intensity Formula 1 pit crew challenge.
   - Real-time car box entry, jacking up, 4-wheel nut loosening, tyre swapping to Pirelli Softs, torque verification, jack drop, and green lollipop release.
   - Millisecond stopwatch, personal best tracking, and time penalties for unsafe release.
5. **Akshaya's Guess the Hero** (`MarvelGuessGame.tsx`):
   - Marvel multiverse character identification challenge across 5 difficulty tiers.
   - Stylized CSS/SVG silhouettes, power profiles, ability telemetry, and authentic comic trivia facts.
6. **Deepthi's Name That Machine** (`CarTriviaGame.tsx`):
   - Sports car, supercar, and F1 machine identification challenge across 5 specification rounds.
   - Engine specs, aero profiles, top speeds, horsepower dyno stats, and historical automotive heritage facts.

### 3. Clue & Friend Assignment Map
1. **Vishnu (`clue-1-vishnu`)**: F1 Reaction Dyno in The Need for Speed $\to$ Letter **`M`** (Word 1, Letter 1)
2. **Santhosh (`clue-2-santhosh`)**: Classified Web Relay in Secret Garage $\to$ Letter **`E`** (Word 1, Letter 2)
3. **Akshaya (`clue-3-akshaya`)**: Ancient Bedrock Relic in Secret Garage $\to$ Letter **`G`** (Word 1, Letter 3)
4. **Deepthi (`clue-4-deepthi`)**: 3:00 AM Rhythm in The Chaos Theory $\to$ Letter **`A`** (Word 1, Letter 4)
5. **Sanjitha (`clue-5-sanjitha`)**: Syndicate Keystone in Secret Garage $\to$ Master Blueprint: **`TWO WORDS [4 + 4 LETTERS]`**
6. **Savitha (`clue-6-savitha`)**: Epilogue Wax Seal in 3D Notebook $\to$ Letter **`M`** (Word 2, Letter 1)
7. **Sathiya (`clue-7-sathiya`)**: Classified Shutter in Photo Archive $\to$ Letter **`I`** (Word 2, Letter 2)
8. **Thiru (`clue-8-thiru`)**: Classified Reel in Video Vault $\to$ Letter **`N`** (Word 2, Letter 3)
9. **Rashmika (`clue-9-rashmika`)**: Hamilton #44 Overdrive in Paddock HUD $\to$ Letter **`D`** (Word 2, Letter 4)

Result: **`M · E · G · A`** &nbsp; + &nbsp; **`M · I · N · D`** = **`MEGA MIND`**

### 3. The 9 Friends Roster
1. Vishnu
2. Santhosh
3. Akshaya
4. Deepthi
5. Sanjitha
6. Savitha
7. Sathiya
8. Thiru
9. Rashmika

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
