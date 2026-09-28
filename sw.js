/* 00550.com service worker — offline support for tools */
const CACHE = "00550-v1";
const CORE = ["./", "index.html", "decoder.html", "zodiac.html", "lucky-dates.html", "dictionary.html", "meanings.html",
  "assets/css/style.css", "assets/js/config.js", "assets/js/data.js", "assets/js/app.js", "assets/js/tools.js", "assets/img/icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
