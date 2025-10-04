import { ZODIAC, TAROT_78 } from "./tarot-data.js";
import { fillAscendantOptions, makeCardEl, flipCard, resetCardFace, transcriptPush, transcriptClear, setPlayerLabel } from "./ui.js";
import { newDeck, stages } from "./game-state.js";
import { ncpLine, fateLine } from "./ncp.js";
import { rand, sleep, rngFromProfile } from "./utils.js";

let deck = [];
let cardEls = [];
let pos = [];
let centerCardEl = null;
let selectedNine = null;
let isReading = false;

const centerPoint = () => {
  const wrap = document.getElementById("table-wrap").getBoundingClientRect();
  return { x: wrap.width/2, y: wrap.height/2, rect: wrap };
};

function mountCards(){
  const field = document.getElementById("card-field");
  field.innerHTML = "";
  cardEls = TAROT_78.map(c => {
    // Start face-down
    const el = makeCardEl(c, /*faceUp*/ false);
    field.appendChild(el);
    return el;
  });
}

function stackDeckAtCenter(){
  const { x, y } = centerPoint();
  requestAnimationFrame(()=>{
    cardEls.forEach((el, i)=>{
      // Stack all cards at center with tiny offset for texture
      const jitter = (n) => (n - 0.5) * 2; // -1..1
      const px = x + jitter(Math.random()) * 4;
      const py = y + jitter(Math.random()) * 4;
      el.style.left = `${px - (el.offsetWidth/2)}px`;
      el.style.top  = `${py - (el.offsetHeight/2)}px`;
      el.style.setProperty("--zrot", `${Math.floor(jitter(Math.random()) * 6)}deg`);
      el.dataset.angle = String(0);
      // ensure face-down
      el.classList.remove("reversed","tarot-face-up","card-flip");
      el.classList.add("tarot-face-down");
    });
  });
}

async function animateNcpShuffle(){
  // Minimal visual shuffle near center
  const { x, y } = centerPoint();
  const passes = 3;
  for (let p=0;p<passes;p++){
    for (let i=0;i<cardEls.length;i++){
      const el = cardEls[i];
      const dx = rand(-30, 30);
      const dy = rand(-30, 30);
      const rotZ = rand(-12, 12);
      el.style.left = `${x + dx - (el.offsetWidth/2)}px`;
      el.style.top  = `${y + dy - (el.offsetHeight/2)}px`;
      el.style.setProperty("--zrot", `${rotZ}deg`);
    }
    await sleep(160);
  }
  // Return to center stack
  stackDeckAtCenter();
  await sleep(150);
}

function getPlayer(){
  return {
    name: document.getElementById("in-name").value.trim(),
    birth: document.getElementById("in-birth").value,
    ascendant: document.getElementById("in-ascendant").value,
    gender: document.getElementById("in-gender").value
  };
}

function moveEl(el, x, y, rotZ){
  el.style.left = `${x - (el.offsetWidth/2)}px`;
  el.style.top  = `${y - (el.offsetHeight/2)}px`;
  el.style.setProperty("--zrot", `${rotZ}deg`);
}

function pickElementsByIds(ids){
  const map = new Map(cardEls.map(el => [el.dataset.cardId, el]));
  return ids.map(id => map.get(String(id))).filter(Boolean);
}

async function runReading(){
  const player = getPlayer();
  setPlayerLabel(player.name);
  transcriptClear();

  // Stack deck face-down and let the NCP shuffle automatically
  stackDeckAtCenter();
  transcriptPush(`<div class=\"text-xs text-zinc-500\">…the NCP gathers and shuffles the deck…</div>`);
  await animateNcpShuffle();

  const rng = rngFromProfile(player, new Date());
  deck = newDeck(rng);

  // Seeded Fisher-Yates over the 78
  const order = [...deck];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  // Take first 9
  selectedNine = order.slice(0, 9);
  // 8 around, 1 center (last)
  const around = selectedNine.slice(0, 8);
  const center = selectedNine[8];

  // Map to elements
  const mapIdToEl = new Map(cardEls.map(el => [el.dataset.cardId, el]));
  const aroundEls = around.map(c => mapIdToEl.get(String(c.id))).filter(Boolean);
  centerCardEl = mapIdToEl.get(String(center.id));

  // Place around the table at 8 anchor positions (starting at top, then right-to-left i.e., counterclockwise)
  const { x, y, rect } = centerPoint();
  const R = rect.width * 0.36;
  const deg = d => (d * Math.PI) / 180;
  // Reading order from the NCP’s perspective: RIGHT to LEFT
  // Start at top (in front of NCP), then proceed to top-right, right, bottom-right, bottom, bottom-left, left, top-left
  const anglesDeg = [270, 315, 0, 45, 90, 135, 180, 225];

  for (let i=0;i<aroundEls.length;i++){
    const a = deg(anglesDeg[i % anglesDeg.length]);
    const px = x + R * Math.cos(a);
    const py = y + R * Math.sin(a);
    const rotZ = (anglesDeg[i % anglesDeg.length] - 90) + rand(-8,8); // orient roughly facing center
    const el = aroundEls[i];
    if (!el) continue;
    // set front label (but keep face-down until reading)
    const card = around[i];
    const titleEl = el.querySelector(".card-front .card-title");
    if (titleEl) titleEl.textContent = card.name;
    if (card.reversed) el.classList.add("reversed"); else el.classList.remove("reversed");
    el.classList.remove("card-flip","tarot-face-up");
    el.classList.add("tarot-face-down");
    moveEl(el, px, py, rotZ);
  }

  // Place center fortune (face-down for now)
  const cpx = x;
  const cpy = y;
  if (centerCardEl){
    const titleEl = centerCardEl.querySelector(".card-front .card-title");
    if (titleEl) titleEl.textContent = center.name;
    if (center.reversed) centerCardEl.classList.add("reversed"); else centerCardEl.classList.remove("reversed");
    centerCardEl.classList.remove("card-flip","tarot-face-up");
    centerCardEl.classList.add("tarot-face-down");
    moveEl(centerCardEl, cpx, cpy, rand(-4,4));
  }

  // Move the unused 69 cards outside the round table (neat stack at bottom-left)
  const usedIds = new Set(selectedNine.map(c => String(c.id)));
  const leftovers = cardEls.filter(el => !usedIds.has(el.dataset.cardId));
  
  // Position the deck stack outside the table, bottom-left area (away from transcript)
  const stackX = x - rect.width * 0.55; // Increased distance from board
  const stackY = y + rect.width * 0.45; // Moved further down
  
  leftovers.forEach((el, i)=>{
    // Create a realistic deck stack with minimal random offset
    const stackDepth = i * 0.15; // Very small depth increment per card
    const randomX = (Math.random() - 0.5) * 1; // Tiny random horizontal jitter
    const randomY = (Math.random() - 0.5) * 1; // Tiny random vertical jitter
    
    moveEl(el, stackX + randomX + stackDepth, stackY + randomY + stackDepth, rand(-1,1));
    el.classList.remove("reversed","card-flip","tarot-face-up");
    el.classList.add("tarot-face-down");
  });

  // Reading sequence: 8 around in right-to-left order (anglesDeg sequence), then center fortune
  const labels = stages(); // 8 labels
  for (let i=0;i<aroundEls.length;i++){
    const card = around[i];
    const el = aroundEls[i];
    // focus and flip now during reading
    el.classList.add("reading-focus");
    await sleep(120);
    flipCard(el);
    const line = ncpLine(card, card.reversed, labels[i], player);
    transcriptPush(`<div class=\"text-zinc-300\"><strong>${labels[i]}</strong> — ${line}</div>`);
    await sleep(1200);
    el.classList.remove("reading-focus");
  }
  transcriptPush(`<div class=\"text-xs text-zinc-500 mt-2\">…the candles hesitate…</div>`);
  await sleep(1000);
  if (centerCardEl){
    centerCardEl.classList.add("reading-focus");
    await sleep(120);
    flipCard(centerCardEl);
    const fateWords = fateLine(center, center.reversed, player);
    transcriptPush(`<div class=\"text-rose-300/90 font-semibold\">${fateWords}</div>`);
    centerCardEl.classList.remove("reading-focus");
  }
}

async function startReading(){
  if (isReading) return;
  const btn = document.getElementById("btn-start");
  try{
    isReading = true;
    btn.disabled = true;
    btn.textContent = "Reading…";
    await runReading();
  }catch(err){
    console.error(err);
    transcriptPush(`<div class=\"text-xs text-rose-400\">Error: ${String(err)}</div>`);
  }finally{
    isReading = false;
    btn.disabled = false;
    btn.textContent = "Begin Reading";
  }
}

function bindControls(){
  document.getElementById("btn-start").addEventListener("click", (e)=>{ e.preventDefault(); startReading(); });
  document.getElementById("btn-reshuffle").addEventListener("click", async ()=>{
    stackDeckAtCenter();
    await animateNcpShuffle();
  });
  document.getElementById("btn-restart").addEventListener("click", ()=>{
    document.getElementById("in-name").value = "";
    document.getElementById("in-birth").value = "";
    document.getElementById("in-ascendant").value = "";
    document.getElementById("in-gender").value = "";
    setPlayerLabel("");
    stackDeckAtCenter();
    transcriptClear();
  });
}

function init(){
  fillAscendantOptions(ZODIAC);
  mountCards();
  stackDeckAtCenter();
  bindControls();
}
window.addEventListener("load", init);
