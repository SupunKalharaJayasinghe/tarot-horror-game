const listeners = new Set();

export const state = {
  view: 'home',
  spread: 'one-card',
  seed: null,
  players: [],
  session: { draws: [] }
};

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
