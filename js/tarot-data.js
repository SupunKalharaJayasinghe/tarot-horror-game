// Minimal tarot dataset: names + arcana + upright/reversed keywords (short).
// (You can expand these with full meanings/art later.)
export const ZODIAC = [
    "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];
  
  export const TAROT_78 = [
    // Major Arcana (22)
    { id:"0",   name:"The Fool", arcana:"Major", up:"new journey, naivety", rev:"reckless, oblivion" },
    { id:"1",   name:"The Magician", arcana:"Major", up:"will, creation", rev:"deception, misfire" },
    { id:"2",   name:"The High Priestess", arcana:"Major", up:"secrets, intuition", rev:"withheld truth" },
    { id:"3",   name:"The Empress", arcana:"Major", up:"nurture, growth", rev:"smother, decay" },
    { id:"4",   name:"The Emperor", arcana:"Major", up:"control, order", rev:"tyranny, fracture" },
    { id:"5",   name:"The Hierophant", arcana:"Major", up:"ritual, doctrine", rev:"heresy, hollow rite" },
    { id:"6",   name:"The Lovers", arcana:"Major", up:"union, choice", rev:"bondage, wrong vow" },
    { id:"7",   name:"The Chariot", arcana:"Major", up:"drive, conquest", rev:"collision, loss of reins" },
    { id:"8",   name:"Strength", arcana:"Major", up:"courage, restraint", rev:"predation, surrender" },
    { id:"9",   name:"The Hermit", arcana:"Major", up:"seeking, isolation", rev:"exile, echo" },
    { id:"10",  name:"Wheel of Fortune", arcana:"Major", up:"turning point", rev:"inevitable spiral" },
    { id:"11",  name:"Justice", arcana:"Major", up:"truth, balance", rev:"verdict, imbalance" },
    { id:"12",  name:"The Hanged Man", arcana:"Major", up:"sacrifice, pause", rev:"stagnation, rot" },
    { id:"13",  name:"Death", arcana:"Major", up:"ending, change", rev:"clinging, lingering" },
    { id:"14",  name:"Temperance", arcana:"Major", up:"blend, patience", rev:"spoil, excess" },
    { id:"15",  name:"The Devil", arcana:"Major", up:"temptation, chain", rev:"breaking, shame" },
    { id:"16",  name:"The Tower", arcana:"Major", up:"sudden ruin", rev:"slow collapse" },
    { id:"17",  name:"The Star", arcana:"Major", up:"hope, distant light", rev:"false star" },
    { id:"18",  name:"The Moon", arcana:"Major", up:"fear, illusion", rev:"madness, exposure" },
    { id:"19",  name:"The Sun", arcana:"Major", up:"clarity, success", rev:"scorch, blindness" },
    { id:"20",  name:"Judgement", arcana:"Major", up:"reckoning, awakening", rev:"denial, restless dead" },
    { id:"21",  name:"The World", arcana:"Major", up:"completion", rev:"incomplete circle" },
    // Minor Arcana (Wands, Cups, Swords, Pentacles) — keep keywords short
  ];
  
  // Add the 56 Minor quickly (names only, compact loop build)
  const SUITS = ["Wands","Cups","Swords","Pentacles"];
  const RANKS = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"];
  let idCounter = 22;
  for (const suit of SUITS){
    for (const rank of RANKS){
      TAROT_78.push({ id:String(idCounter++), name:`${rank} of ${suit}`, arcana:"Minor", up:"omen", rev:"ominous" });
    }
  }
  
export const SPREAD_LABELS = [
    "Root","Mind","Fear","Blood","Crossroad","Shadow","Echo","Flame"
  ];
  
