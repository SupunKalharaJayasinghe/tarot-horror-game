// Basic random helpers (unseeded)
export const rand = (min, max) => Math.random() * (max - min) + min;
export const choice = arr => arr[Math.floor(Math.random() * arr.length)];
export const degToRad = d => (d * Math.PI) / 180;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const sleep = ms => new Promise(r => setTimeout(r, ms));

// Seeded RNG utilities (deterministic per-session based on player input)
// xmur3 string hash -> 32-bit seed
function xmur3(str){
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++){
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function(){
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

// mulberry32 PRNG
function mulberry32(a){
  return function(){
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFromString(s){
  const h = xmur3(s);
  return h();
}

export function makeRng(seed){
  return mulberry32(seed >>> 0);
}

export function rngFromProfile(profile, sessionDate=new Date()){
  const day = sessionDate.toISOString().slice(0,10); // yyyy-mm-dd
  const key = `${profile.name||""}|${profile.birth||""}|${profile.ascendant||""}|${profile.gender||""}|${day}`;
  return makeRng(seedFromString(key));
}

// Utility: age from birthdate (yyyy-mm-dd)
export function ageFromBirth(birth){
  if (!birth) return null;
  const d = new Date(birth);
  if (isNaN(d)) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

// Seeded versions of helpers
export const randRng = (rng, min, max) => rng() * (max - min) + min;
export const choiceRng = (rng, arr) => arr[Math.floor(rng() * arr.length)];
