self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/',
          '/static/style.css',
          '/static/script.js',
          '/static/manifest.json',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((res) => {
        return res || fetch(event.request);
      })
    );
  });
  