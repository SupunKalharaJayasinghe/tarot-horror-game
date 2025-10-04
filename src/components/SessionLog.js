const KEY = 'tarot_horror_journal_v1';

function loadAll() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function saveAll(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export function append(entry) {
  const all = loadAll();
  all.push({ time: Date.now(), ...entry });
  saveAll(all);
}

export function all() { return loadAll(); }

export function clear() { saveAll([]); }
