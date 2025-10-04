import { rand, degToRad } from "./utils.js";

export function fillAscendantOptions(ZODIAC){
  const sel = document.getElementById("in-ascendant");
  ZODIAC.forEach(z => {
    const opt = document.createElement("option");
    opt.value = z; opt.textContent = z;
    sel.appendChild(opt);
  });
}

export function makeCardEl(card, faceUp=false){
  const el = document.createElement("div");
  el.className = "tarot-card absolute w-[10vmin] h-[16vmin]" + (faceUp ? " tarot-face-up card-flip" : " tarot-face-down");
  el.dataset.cardId = card.id;

  // inner faces
  const back = document.createElement("div");
  back.className = "card-back";
  back.innerHTML = `
    <div class="card-back-3d">
      <div class="ritual-corners">
        <div class="corner-rune top-left"></div>
        <div class="corner-rune top-right"></div>
        <div class="corner-rune bottom-left"></div>
        <div class="corner-rune bottom-right"></div>
      </div>
      <div class="energy-lines">
        <div class="line horizontal"></div>
        <div class="line vertical"></div>
      </div>
    </div>
  `;

  const front = document.createElement("div");
  front.className = "card-front";
  front.innerHTML = `
    <div>
      <div class="card-title text-xs md:text-sm">${card.name}</div>
      <div class="mt-1 text-[10px] text-zinc-400">${card.arcana}</div>
    </div>
  `;

  el.appendChild(back);
  el.appendChild(front);
  return el;
}

export function scatterCards(container, count, tableRect, center, npcAngleDeg=270){
  const radiusMin = tableRect.width * 0.26;
  const radiusMax = tableRect.width * 0.42;

  const positions = [];
  for (let i=0;i<count;i++){
    const r = rand(radiusMin, radiusMax);
    const a = rand(0, Math.PI*2);
    const x = center.x + r * Math.cos(a);
    const y = center.y + r * Math.sin(a);
    const rotZ = rand(-12, 12);

    positions.push({ x, y, angle: a, rotZ });
  }

  // Draw
  positions.forEach(pos=>{
    const el = container.children[pos.index] || null; // not used
  });

  return positions;
}

export function placeCards(container, cards, positions){
  // If positions shorter, reuse
  for (let i=0;i<cards.length;i++){
    const el = cards[i];
    const p = positions[i % positions.length];

    el.style.left = `${p.x - (el.offsetWidth/2)}px`;
    el.style.top  = `${p.y - (el.offsetHeight/2)}px`;
    el.style.setProperty("--zrot", `${p.rotZ}deg`);
    el.dataset.angle = String(p.angle);
  }
}

export function flipCard(el){
  el.classList.remove("tarot-face-down");
  el.classList.add("tarot-face-up");
  el.classList.add("card-flip");
}

export function resetCardFace(el){
  el.classList.add("tarot-face-down");
  el.classList.remove("tarot-face-up","card-flip");
}

export function transcriptPush(html){
  const t = document.getElementById("transcript");
  if (!t) return;
  const line = document.createElement("div");
  line.className = "text-sm leading-snug";
  line.innerHTML = html;
  t.appendChild(line);
  t.scrollTop = t.scrollHeight;
}

export function transcriptClear(){
  const t = document.getElementById("transcript");
  if (!t) return;
  t.innerHTML = `<div class="text-xs text-zinc-500">Awaiting the ritual…</div>`;
}

export function setPlayerLabel(name){
  const el = document.getElementById("player-label");
  if (el) el.textContent = name || "You";
}
