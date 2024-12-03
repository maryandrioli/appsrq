const CACHE_NAME = 'sons-sr-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './sons/1.wav',
  './sons/2.wav',
  './sons/3.wav',
  './sons/4.wav',
  './sons/5.wav',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});