// Automatisch erzeugt
const CACHE = 'hausplaner-e95472211779';
const KEEP_CACHES = 3;
const FILES = ["./","./assets/index-WrYfnyfY.js","./assets/html2canvas-DZEMYtgo.js","./assets/index.es-ILrKrnBP.js","./assets/purify.es-DiYuo5E0.js","./assets/rolldown-runtime-BrVfq_k5.js","./assets/figtree-latin-ext-wght-normal-DCwSJGxG.woff2","./assets/figtree-latin-wght-normal-D_ZTVpCC.woff2","./assets/index-C9xJmFz6.css","./assets/pdf.worker.min-CIqJB0yW.mjs","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  // Ältere Stände bleiben eine Weile liegen: eine offene Seite lädt ihre Skripte noch aus ihnen nach.
  // caches.keys() liefert in Anlegereihenfolge; die neuesten bleiben, ältere werden gelöscht.
  event.waitUntil(caches.keys().then((keys) => {
    const ours = keys.filter((k) => k.startsWith('hausplaner-') && k !== CACHE);
    return Promise.all(ours.slice(0, Math.max(0, ours.length - (KEEP_CACHES - 1))).map((k) => caches.delete(k)));
  }).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Die Seite selbst zuerst aus dem Netz, damit sie zu den Skripten auf dem Server passt; offline aus dem Speicher
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request.url, { cache: 'no-cache' }).catch(() => caches.match('./')));
    return;
  }
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request)));
});
