/* 00550.com — reference data (original compilation).
   Traditional associations vary by region and source; presented for
   cultural education and entertainment. */
window.NUM_DATA = {
  digits: {
    "0": { han: "零", py: "líng", yue: "ling4", w: 1, sound: "良 liáng — good; 你 nǐ — 'you' in number slang",
      meaning: "Wholeness, a fresh start, the circle of heaven. In texting slang 0 stands in for 你 (you), as in 520.",
      tone: "positive" },
    "1": { han: "一", py: "yī", yue: "jat1", w: 1, sound: "要 yào — want; 一生 yīshēng — a lifetime",
      meaning: "Unity, independence, being first. Appears in 1314 (一生一世, one life, one world).",
      tone: "positive" },
    "2": { han: "二", py: "èr", yue: "ji6", w: 2, sound: "易 (Cantonese ji6) — easy; 爱 ài — love in slang",
      meaning: "Pairs and harmony — 'good things come in pairs' (好事成双). In 520, 2 reads as 爱 (love). Note: 二 alone can mean 'silly' in slang.",
      tone: "positive" },
    "3": { han: "三", py: "sān", yue: "saam1", w: 1, sound: "生 shēng (Cantonese saang1) — life, birth; 散 sàn — scatter",
      meaning: "Life and growth in Cantonese; can hint at 'scatter' in Mandarin. In 3344 it reads 生生世世 (lifetime after lifetime).",
      tone: "mixed" },
    "4": { han: "四", py: "sì", yue: "sei3", w: -3, sound: "死 sǐ — death; 世 shì — world (in 1314)",
      meaning: "The most avoided digit across the Chinese-speaking world. Many buildings skip 4th floors; 4 is discounted in phone and plate auctions. In romantic codes it can read 世 (world).",
      tone: "negative" },
    "5": { han: "五", py: "wǔ", yue: "ng5", w: 1, sound: "我 wǒ / 吾 wú — me; 无 wú — without; Cantonese 唔 m4 — not",
      meaning: "The Five Elements (五行), the Five Blessings (五福) and imperial symbolism. In slang 5 = 我 (me). Cantonese speakers may hear 'not', which flips 54 into 'won't die'.",
      tone: "mixed" },
    "6": { han: "六", py: "liù", yue: "luk6", w: 3, sound: "流 liú — flow; 溜 liù — smooth, skilful",
      meaning: "Smooth progress — 六六大顺 (everything goes smoothly). 666 is the online cheer for 'awesome'.",
      tone: "positive" },
    "7": { han: "七", py: "qī", yue: "cat1", w: 0, sound: "起 qǐ — rise; 妻 qī — wife; 气 qì — anger",
      meaning: "Mixed: togetherness (Qixi, the 7th night of the 7th month) but also 气 (anger) and the 7th lunar 'ghost' month.",
      tone: "mixed" },
    "8": { han: "八", py: "bā", yue: "baat3", w: 3, sound: "发 fā — to prosper, get rich",
      meaning: "The prosperity number. The Beijing Olympics opened 08/08/08 at 8:08 pm. 88 also reads 'bye-bye' online.",
      tone: "positive" },
    "9": { han: "九", py: "jiǔ", yue: "gau2", w: 3, sound: "久 jiǔ — long-lasting, eternal",
      meaning: "Longevity and the emperor's number — used in weddings (长长久久) and imperial architecture.",
      tone: "positive" }
  },

  /* Digit -> slang character used for the playful 'reading' */
  slangChar: { "0":"你","1":"一","2":"爱","3":"生","4":"世","5":"我","6":"溜","7":"亲","8":"发","9":"久" },

  pairs: {
    "14": { v: -3, t: "要死 — 'want to die' (avoid)" },
    "24": { v: -2, t: "易死 — 'easy death' (avoid)" },
    "74": { v: -2, t: "气死 — 'furious'" },
    "94": { v: -2, t: "就死 — 'then die'" },
    "54": { v: 1,  t: "Mandarin 我死 vs Cantonese 唔死 'won't die' — regional" },
    "58": { v: 2,  t: "我发 — 'I prosper' (Mandarin)" },
    "18": { v: 2,  t: "要发 — 'going to prosper'" },
    "28": { v: 3,  t: "易发 — 'easy prosperity'" },
    "68": { v: 3,  t: "路发 — 'prosper all the way'" },
    "66": { v: 2,  t: "六六 — smooth and smooth" },
    "88": { v: 2,  t: "发发 — double prosperity" },
    "99": { v: 2,  t: "久久 — forever and ever" },
    "13": { v: 1,  t: "一生 — a lifetime (as in 1314)" },
    "20": { v: 1,  t: "爱你 — 'love you' (as in 520)" },
    "55": { v: -1, t: "呜呜 — crying sound online (neutral in formal numbers)" },
    "00": { v: 1,  t: "圆满 — completeness, a full circle" }
  },

  slang: [
    { n:"520", zh:"我爱你", py:"wǒ ài nǐ", en:"I love you", cat:"love", note:"May 20 (5/20) is China's unofficial online Valentine's Day." },
    { n:"521", zh:"我愿意 / 我爱你", py:"wǒ yuànyì", en:"I do / I love you", cat:"love", note:"Common reply to 520; May 21 is also celebrated." },
    { n:"530", zh:"我想你", py:"wǒ xiǎng nǐ", en:"I miss you", cat:"love", note:"3 (sān) ~ 想 (xiǎng)." },
    { n:"1314", zh:"一生一世", py:"yīshēng yīshì", en:"one life, one world — forever", cat:"love", note:"Wedding registrations spike on dates containing 1314." },
    { n:"5201314", zh:"我爱你一生一世", py:"wǒ ài nǐ yīshēng yīshì", en:"I love you forever", cat:"love", note:"Popular red-envelope gift amount: ¥520.1314." },
    { n:"3344", zh:"生生世世", py:"shēngshēng shìshì", en:"lifetime after lifetime", cat:"love", note:"4 here reads 世 (world/lifetime), not death." },
    { n:"9420", zh:"就是爱你", py:"jiùshì ài nǐ", en:"it's just that I love you", cat:"love", note:"" },
    { n:"8013", zh:"伴你一生", py:"bàn nǐ yīshēng", en:"with you for life", cat:"love", note:"" },
    { n:"1920", zh:"依旧爱你", py:"yījiù ài nǐ", en:"still love you", cat:"love", note:"" },
    { n:"7758258", zh:"亲亲我吧，爱我吧", py:"qīnqīn wǒ ba, ài wǒ ba", en:"kiss me, love me", cat:"love", note:"" },
    { n:"04551", zh:"你是我唯一", py:"nǐ shì wǒ wéiyī", en:"you are my only one", cat:"love", note:"Starts with 0 = 你 (you) — the same logic behind 00550." },
    { n:"555", zh:"呜呜呜", py:"wū wū wū", en:"boo-hoo (crying)", cat:"emotion", note:"Longer strings (5555) mean louder crying." },
    { n:"7456", zh:"气死我了", py:"qì sǐ wǒ le", en:"I'm so angry", cat:"emotion", note:"" },
    { n:"995", zh:"救救我", py:"jiù jiù wǒ", en:"help me / save me", cat:"emotion", note:"" },
    { n:"233", zh:"(大笑)", py:"èr sān sān", en:"LOL", cat:"emotion", note:"From emoticon #233 on the Mop forum, a guffawing face; 2333 = louder." },
    { n:"666", zh:"溜溜溜", py:"liù liù liù", en:"awesome / so skilled", cat:"praise", note:"Gamers spam 666 in live-stream chats." },
    { n:"88", zh:"拜拜", py:"bàibài", en:"bye-bye", cat:"chat", note:"886 = 拜拜了 (bye now); 8866 also used." },
    { n:"886", zh:"拜拜了", py:"bàibài le", en:"bye now", cat:"chat", note:"" },
    { n:"250", zh:"二百五", py:"èr bǎi wǔ", en:"idiot", cat:"insult", note:"Never price a gift at 250." },
    { n:"748", zh:"去死吧", py:"qù sǐ ba", en:"go die (rude)", cat:"insult", note:"" },
    { n:"168", zh:"一路发", py:"yī lù fā", en:"prosper all the way", cat:"money", note:"Loved for shop names, prices and hotlines." },
    { n:"518", zh:"我要发", py:"wǒ yào fā", en:"I'm going to prosper", cat:"money", note:"" },
    { n:"888", zh:"发发发", py:"fā fā fā", en:"wealth, wealth, wealth", cat:"money", note:"" },
    { n:"8888", zh:"发发发发", py:"fā fā fā fā", en:"boundless prosperity", cat:"money", note:"Premium phone numbers ending 8888 sell at large markups." },
    { n:"6688", zh:"顺顺发发", py:"shùn shùn fā fā", en:"smooth sailing and prosperity", cat:"money", note:"" },
    { n:"514", zh:"我要死", py:"wǒ yào sǐ", en:"I'm dying (dramatic)", cat:"emotion", note:"" },
    { n:"00550", zh:"你你我我你", py:"nǐ nǐ wǒ wǒ nǐ", en:"you, you, me, me, you — 'you & me'", cat:"love", note:"The playful slang reading behind this site's name (0 = you, 5 = me). A formal reading is líng líng wǔ wǔ líng." }
  ],

  zodiac: [
    { a:"Rat", zh:"鼠", e:"🐀", lucky:[2,3], colors:"blue, gold, green", traits:"Quick-witted, resourceful, versatile" },
    { a:"Ox", zh:"牛", e:"🐂", lucky:[1,4], colors:"white, yellow, green", traits:"Diligent, dependable, determined" },
    { a:"Tiger", zh:"虎", e:"🐅", lucky:[1,3,4], colors:"blue, grey, orange", traits:"Brave, confident, competitive" },
    { a:"Rabbit", zh:"兔", e:"🐇", lucky:[3,4,6], colors:"red, pink, purple, blue", traits:"Gentle, elegant, responsible" },
    { a:"Dragon", zh:"龙", e:"🐉", lucky:[1,6,7], colors:"gold, silver, grey-white", traits:"Confident, ambitious, energetic" },
    { a:"Snake", zh:"蛇", e:"🐍", lucky:[2,8,9], colors:"black, red, yellow", traits:"Wise, enigmatic, intuitive" },
    { a:"Horse", zh:"马", e:"🐎", lucky:[2,3,7], colors:"yellow, green", traits:"Animated, active, energetic" },
    { a:"Goat", zh:"羊", e:"🐐", lucky:[2,7], colors:"brown, red, purple", traits:"Calm, gentle, sympathetic" },
    { a:"Monkey", zh:"猴", e:"🐒", lucky:[4,9], colors:"white, blue, gold", traits:"Sharp, curious, playful" },
    { a:"Rooster", zh:"鸡", e:"🐓", lucky:[5,7,8], colors:"gold, brown, yellow", traits:"Observant, hardworking, courageous" },
    { a:"Dog", zh:"狗", e:"🐕", lucky:[3,4,9], colors:"red, green, purple", traits:"Loyal, honest, prudent" },
    { a:"Pig", zh:"猪", e:"🐖", lucky:[2,5,8], colors:"yellow, grey, brown, gold", traits:"Compassionate, generous, diligent" }
  ],

  stems: [
    { zh:"甲", el:"Wood", yy:"Yang" }, { zh:"乙", el:"Wood", yy:"Yin" },
    { zh:"丙", el:"Fire", yy:"Yang" }, { zh:"丁", el:"Fire", yy:"Yin" },
    { zh:"戊", el:"Earth", yy:"Yang" }, { zh:"己", el:"Earth", yy:"Yin" },
    { zh:"庚", el:"Metal", yy:"Yang" }, { zh:"辛", el:"Metal", yy:"Yin" },
    { zh:"壬", el:"Water", yy:"Yang" }, { zh:"癸", el:"Water", yy:"Yin" }
  ],
  branches: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],

  elements: {
    Wood:  { color:"#2f9e6b", zh:"木", nums:[3,8], dir:"East", season:"Spring", gen:"Fire", ctrl:"Earth", desc:"Growth, creativity, generosity." },
    Fire:  { color:"#e0452e", zh:"火", nums:[2,7], dir:"South", season:"Summer", gen:"Earth", ctrl:"Metal", desc:"Passion, energy, leadership." },
    Earth: { color:"#c08a2e", zh:"土", nums:[5,0], dir:"Centre", season:"Late summer", gen:"Metal", ctrl:"Water", desc:"Stability, patience, trust." },
    Metal: { color:"#8a94a6", zh:"金", nums:[4,9], dir:"West", season:"Autumn", gen:"Water", ctrl:"Wood", desc:"Discipline, clarity, resolve." },
    Water: { color:"#2d6cdf", zh:"水", nums:[1,6], dir:"North", season:"Winter", gen:"Wood", ctrl:"Fire", desc:"Wisdom, adaptability, flow." }
  },

  /* Zodiac relationships (indexes into zodiac[]) */
  trines: [[0,4,8],[1,5,9],[2,6,10],[3,7,11]],
  harmonies: [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]],
  clashes: [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]],
  harms: [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]],

  specialDates: {
    "01-01": "New Year's Day", "02-14": "Valentine's Day", "05-20": "5·20 — 'I love you' day (我爱你)",
    "05-21": "5·21 — 'I do' day", "06-18": "6·18 — major online shopping festival", "08-08": "8·8 — double prosperity",
    "09-09": "9·9 — double longevity", "11-11": "11·11 — Singles' Day, world's largest shopping festival",
    "12-12": "12·12 — shopping festival", "10-01": "National Day (Golden Week)"
  },
  lunarSpecial: { "1-1": "Spring Festival (Lunar New Year)", "1-15": "Lantern Festival", "5-5": "Dragon Boat Festival",
    "7-7": "Qixi — Chinese Valentine's Day", "7-15": "Ghost Festival (avoid big events)", "8-15": "Mid-Autumn Festival", "9-9": "Double Ninth Festival" },
  lunarMonths: { "正月":1,"二月":2,"三月":3,"四月":4,"五月":5,"六月":6,"七月":7,"八月":8,"九月":9,"十月":10,"冬月":11,"十一月":11,"腊月":12,"十二月":12 }
};
