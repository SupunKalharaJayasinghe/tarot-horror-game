import { TAROT_78, SPREAD_LABELS } from "./tarot-data.js";

export function newDeck(rng=null){
  // deck with random reversed flags (seeded when rng provided)
  const R = rng || Math.random;
  return TAROT_78.map(card => ({
    ...card,
    reversed: R() < 0.45
  }));
}

export function stages(){
  // 8 around-table labels; center is the final Fate
  return SPREAD_LABELS;
}
