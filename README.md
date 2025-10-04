The 9th Fate — Web MVP

Quick start with npm (recommended)
1) Install dependencies:
   npm install
2) Start the dev server:
   npm run dev
   Vite will open http://localhost:5173/html/index.html
3) Build for production (optional):
   npm run build
   npm run preview

Alternative (without npm)
- You can still serve via any static HTTP server (for ES modules), e.g.:
  - Python 3: python -m http.server 5173
    Then open http://localhost:5173/html/index.html

How to play
1) Fill in your name, birthdate, zodiac, and fear.
2) Click “Begin Reading”. Nine cards flip clockwise starting at the NCP (top). The central Fate card flips last.
3) “Reshuffle” randomizes the scatter. “New Player” clears inputs.

Notes
- Draws and reversed flags are seeded per session from your inputs + today’s date for coherent, “uncanny” readings.
- Fate and the nine cards are independent draws; the on-table elements are visual placeholders.
- A local log (Book of Fates) is saved to localStorage under key book_of_fates.

Dev
- JS modules in /js, HTML in /html, styles in /style.
- You can expand tarot-data.js with full upright/reversed horror texts per card.
- Styling uses Tailwind CDN + custom CSS.
