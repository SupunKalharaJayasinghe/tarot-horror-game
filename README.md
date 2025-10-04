# Tarot Horror Game (Vanilla Web)

A no-build Tarot reading experience with a sinister vibe. Runs on plain HTML/CSS/JS and a tiny dev server.

## Quick Start

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run start
```

This launches live-server and opens `public/index.html` on port 5173.

## Project Structure

```
tarot-horror-game/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.webmanifest
│   └── icons/
│
├── src/
│   ├── app.js
│   ├── styles/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── theme.css
│   │   └── components.css
│   ├── assets/
│   │   ├── images/
│   │   └── audio/
│   ├── data/
│   │   ├── cards.json
│   │   ├── spreads.json
│   │   └── prompts.json
│   ├── components/
│   │   ├── Card.js
│   │   ├── Deck.js
│   │   ├── Spread.js
│   │   ├── Reader.js
│   │   ├── Players.js
│   │   ├── SessionLog.js
│   │   ├── AudioFX.js
│   │   ├── Modal.js
│   │   └── Toast.js
│   ├── state/
│   │   ├── store.js
│   │   └── persistence.js
│   ├── utils/
│   │   ├── rng.js
│   │   ├── dom.js
│   │   ├── time.js
│   │   └── accessibility.js
│   └── views/
│       ├── HomeView.js
│       ├── ReadingView.js
│       └── JournalView.js
│
├── tests/
│   └── deck.test.js
├── .editorconfig
├── LICENSE (MIT)
└── package.json
```

## How it works

- **Data-driven content**: `src/data/*.json` holds cards, spreads, and prompts so non-devs can edit.
- **Seeded RNG**: `src/utils/rng.js` provides deterministic shuffles for reproducible readings.
- **State**: `src/state/store.js` + `src/state/persistence.js` keep view/spread/seed across refreshes.
- **Views**: `Home → Reading → Journal` assembled by `src/app.js` without a router.

## Customize

- **Icons**: Add `public/icons/icon-192.png` and `icon-512.png` for PWA metadata.
- **Assets**: Place art/audio in `src/assets/images/` and `src/assets/audio/`.
- **Cards/Spreads**: Expand `src/data/cards.json` to all 78 cards; add more layouts to `spreads.json`.
- **Theme**: Tweak colors/effects in `src/styles/theme.css` and component looks in `components.css`.

## Scripts

- `npm run start` — runs `live-server` at the project root, opening `public/index.html`.

## Roadmap

- Audio FX with user-gesture unlock.
- Accessibility (focus traps, reduced motion), keyboard controls.
- Session export as PDF.
- More spreads (Celtic Cross), multi-player facilitator tools.