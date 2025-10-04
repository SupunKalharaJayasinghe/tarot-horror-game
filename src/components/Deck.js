import { mulberry32, shuffle } from '../utils/rng.js';

async function loadCards() {
  const res = await fetch('/src/data/cards.json');
  if (!res.ok) throw new Error('Failed to load cards.json');
  return res.json();
}

export async function createDeck(seed) {
  const cards = await loadCards();
  const rnd = mulberry32(Number(seed) || 0);
  const deck = shuffle(cards.slice(), rnd);
  let index = 0;
  return {
    draw() {
      if (index >= deck.length) return null;
      const card = deck[index++];
      const isReversed = rnd() < 0.5;
      return { ...card, isReversed };
    },
    remaining() { return deck.length - index; },
    size() { return deck.length; }
  };
}
