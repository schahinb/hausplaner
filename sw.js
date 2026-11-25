// Automatisch erzeugt
const CACHE = 'hausplaner-4c703aa61759';
const KEEP_CACHES = 3;
const FILES = ["./","./assets/index-BfC93jjd.js","./assets/html2canvas-DZEMYtgo.js","./assets/index.es-xjBHuQFx.js","./assets/purify.es-DiYuo5E0.js","./assets/rolldown-runtime-BrVfq_k5.js","./assets/figtree-latin-ext-wght-normal-DCwSJGxG.woff2","./assets/figtree-latin-wght-normal-D_ZTVpCC.woff2","./assets/index-DT9_DIPh.css","./assets/pdf.worker.min-CIqJB0yW.mjs","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./models/arbeiten-schreibtisch.glb","./models/deko-bilderrahmen.glb","./models/deko-buecherreihe.glb","./models/deko-henkelvase.glb","./models/deko-holzschale.glb","./models/deko-vase-bauchig.glb","./models/deko-vase.glb","./models/deko-wanduhr.glb","./models/essen-barhocker.glb","./models/essen-esstisch.glb","./models/essen-holzstuhl.glb","./models/essen-schemel.glb","./models/essen-stuhl.glb","./models/leuchten-deckenventilator.glb","./models/leuchten-industriependel.glb","./models/leuchten-kronleuchter.glb","./models/leuchten-ovalleuchte.glb","./models/leuchten-pendelleuchte.glb","./models/pflanzen-blumentopf-klein.glb","./models/pflanzen-ficus.glb","./models/pflanzen-monstera.glb","./models/stauraum-wuerfelregal.glb","./models/wohnen-beistelltisch-holz.glb","./models/wohnen-couchtisch-eckig.glb","./models/wohnen-couchtisch-quadratisch.glb","./models/wohnen-loungesessel.glb","./models/wohnen-sessel.glb","./models/wohnen-tv-lowboard.glb"];
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
