/* =========================================================
   00550.com — Site configuration
   Edit this file to switch on AdSense, donation links,
   YouTube videos and analytics. No build step required.
   ========================================================= */
window.SITE_CONFIG = {
  siteName: "00550",
  siteUrl: "https://00550.com",

  /* Top-of-page banner link (required on every page) */
  bannerUrl: "https://web.works/contact",

  /* ---------- Google AdSense ----------
     Replace with your publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
     and per-slot IDs. While left as placeholders, ad boxes
     show a "Advertise here" house ad instead.            */
  adsense: {
    client: "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      header: "0000000000",
      inContent: "0000000000",
      sidebar: "0000000000",
      footer: "0000000000"
    }
  },

  /* ---------- Analytics (optional) ---------- */
  gaMeasurementId: "", // e.g. "G-XXXXXXX"

  /* ---------- Donations / support ----------
     Paste your public payment links. Empty values fall back
     to a pledge form that is delivered to the site owner.  */
  donate: {
    paypal: "",        // e.g. https://paypal.me/yourname
    buymeacoffee: "",  // e.g. https://buymeacoffee.com/yourname
    kofi: "",          // e.g. https://ko-fi.com/yourname
    stripe: "",        // e.g. https://buy.stripe.com/xxxx
    patreon: "",       // e.g. https://patreon.com/yourname
    githubSponsors: "" // e.g. https://github.com/sponsors/yourname
  },

  /* ---------- YouTube ----------
     channel: your channel URL. videos: add real video IDs
     (the 11-char code after v=). Items without an id link
     to a YouTube search for that topic.                    */
  youtube: {
    channel: "",
    videos: [
      { id: "", title: "What does 520 mean? China's numeric 'I love you'", q: "520 meaning chinese i love you" },
      { id: "", title: "Why 8 is the luckiest number in China", q: "why is 8 lucky in china" },
      { id: "", title: "Why Chinese buildings skip the 4th floor", q: "tetraphobia china number 4 floor" },
      { id: "", title: "Chinese number hand gestures 1–10", q: "chinese number hand gestures" },
      { id: "", title: "The Five Elements (Wu Xing) explained", q: "wu xing five elements explained" },
      { id: "", title: "The 12 Chinese zodiac animals & the Great Race", q: "chinese zodiac great race story" },
      { id: "", title: "Chinese internet number slang: 666, 88, 555", q: "chinese internet number slang 666 88 555" },
      { id: "", title: "How to count in Mandarin & Cantonese", q: "count 1 to 10 mandarin cantonese" },
      { id: "", title: "Lucky phone numbers & license plates in China", q: "lucky license plate auction china" }
    ]
  },

  /* ---------- Forms ----------
     Delivery endpoint. The owner address is never written in
     plain text; it is assembled at runtime from _k.          */
  forms: { endpointBase: "https://formsubmit.co/ajax/" },
  _k: [116,118,106,53,115,112,104,116,110,71,56,104,122,114,121,118,126,105,108,126]
};
