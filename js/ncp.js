// NCP “voice” — generates creepy, coherent lines from card + player data.
import { ageFromBirth } from "./utils.js";

export function ncpLine(card, isReversed, slotLabel, player){
    const dir = isReversed ? card.rev : card.up;
    const who = player.name || "wanderer";
    const asc = player.ascendant ? `, ${player.ascendant}` : "";
    const age = ageFromBirth(player.birth);
    const ageTag = age!=null ? `At ${age}, ` : "";
    const g = (player.gender||"").toLowerCase();
    const pronoun = g.startsWith("f") ? "she" : g.startsWith("m") ? "he" : "they";
    const hook = [
      `Listen, ${who}${asc}.`,
      `Lean closer, ${who}.`,
      `Don't breathe.`,
      `It already started.`,
      `Do you hear the scratching?`,
    ];
  
    const stitch = [
      `${slotLabel}: ${card.name}${isReversed ? " (reversed)" : ""}.`,
      `${ageTag}${dir}.`,
      `${pronoun.charAt(0).toUpperCase()+pronoun.slice(1)} knows this already.`,
      `This stain was left for you.`,
      `When you sleep, it will stand where the light fails.`,
    ];
  
    return `${pick(hook)} ${pick(stitch)}`;
  }
  
  export function fateLine(card, isReversed, player){
    const t = [
      `Your end is scheduled.`,
      `You vanish between ticks.`,
      `The door opens from your side.`,
      `Something will answer when you call.`,
      `A name will be carved into your window from inside.`,
    ];
    const tag = isReversed ? "Not avoided — only delayed." : "It was always this.";
    const who = player.name || "you";
    const asc = player.ascendant ? `, ${player.ascendant}` : "";
    const g = (player.gender||"").toLowerCase();
    const honor = g.startsWith("f") ? "maiden" : g.startsWith("m") ? "wanderer" : "traveler";
    return `Fate: ${card.name}${isReversed ? " (reversed)" : ""}. ${pick(t)} ${tag} Sleep carefully, ${who}${asc}, ${honor}.`;
  }
  
  const pick = (arr) => arr[Math.floor(Math.random()*arr.length)];
  
