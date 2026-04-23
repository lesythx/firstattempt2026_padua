// AdDU Alumni Donation Hub — Service Worker
// Strategies:
//   App Shell (JS/CSS/fonts) → Cache First
//   Images                   → Cache First (stale-while-revalidate)
//   Navigation               → Network First + offline fallback

const SHELL_CACHE  = 'addu-shell-v1';
const ASSETS_CACHE = 'addu-assets-v1';
const IMAGE_CACHE  = 'addu-images-v1';

const APP_SHELL = [
  '/',
  '/manifest.json',
  '/icons/addu-seal.png',
  '/icons/ateneo-knight.png',
  '/icons/addu-wordmark.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ── Install: pre-cache shell ─────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(c => c.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// ── Activate: purge old caches ───────────────────────────────
self.addEventListener('activate', event => {
  const KEEP = [SHELL_CACHE, ASSETS_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch ────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Images → Cache First
  if (request.destination === 'image' || url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // JS / CSS / fonts → Cache First
  if (['script','style','font'].includes(request.destination) || url.pathname.includes('/assets/')) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE));
    return;
  }

  // Navigation → Network First with offline page
  event.respondWith(networkFirst(request));
});

async function cacheFirst(req, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(req) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const cached = await cache.match(req) || await cache.match('/');
    if (cached) return cached;
    return new Response(`
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <title>Offline — AdDU Donation Hub</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{min-height:100vh;display:flex;flex-direction:column;align-items:center;
             justify-content:center;background:#031273;font-family:sans-serif;
             color:#fff;text-align:center;gap:20px;padding:24px}
        img{width:80px;mix-blend-mode:screen}
        h1{font-size:1.5rem;font-weight:700}
        p{color:#4CC9F0;font-size:.95rem}
      </style></head>
      <body>
        <img src="/icons/addu-seal.png" alt="AdDU"/>
        <h1>You're offline</h1>
        <p>Check your connection and try again.</p>
      </body></html>`,
      { status: 503, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
