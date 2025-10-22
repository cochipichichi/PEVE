const CACHE = 'peve-v2';
const PRECACHE = ['./','./index.html','./manifest.webmanifest','./assets/style.css','./assets/app.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(match => {
      if (match) return match;
      return fetch(req).then(resp => {
        const copy = resp.clone();
        try {
          const scope = self.registration ? new URL(self.registration.scope) : null;
          if (scope && req.url.startsWith(scope.href) && ['basic','cors'].includes(resp.type)) {
            caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
          }
        } catch(e){}
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
