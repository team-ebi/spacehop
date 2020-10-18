// create cache name (storage of browser
// if load something once, don't have to reload it every time we go online (faster, more effective)

const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"]; // offline.html page is what will render when offline

// this represents serviceworker
const self = this;

// install SW
self.addEventListener("install", (event) => {
  // open the catch and add urlsToCache
  // will not run again after refresh
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// activate the serviceWorker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  // push all the things you want to keep
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            // if cacheWhitelist doesn't include cache name, we will delete it
            // if it's included in whiteList, we will keep (version 1)
            if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
