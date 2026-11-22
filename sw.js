// Automatisch erzeugt
const CACHE = 'hausplaner-9a7c02b12790';
const FILES = ["./","./assets/index-57y8OwJ-.js","./assets/html2canvas-DZEMYtgo.js","./assets/index.es-BruSf7sv.js","./assets/purify.es-DiYuo5E0.js","./assets/rolldown-runtime-BrVfq_k5.js","./assets/figtree-latin-ext-wght-normal-DCwSJGxG.woff2","./assets/figtree-latin-wght-normal-D_ZTVpCC.woff2","./assets/index-CNJSCIpy.css","./assets/pdf.worker.min-CIqJB0yW.mjs","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('hausplaner-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request).catch(() => caches.match('./')))
  );
});
