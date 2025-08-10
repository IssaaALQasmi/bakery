const CACHE_NAME = 'bakery-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/products.html',
    '/contact.html',
    '/css/style.css',
    '/js/script.js',
    '/images/logo.jpeg',
    '/images/1.jpeg',
    '/images/2.jpeg',
    '/images/3.jpeg',
    '/images/4.jpeg',
    '/images/5.jpeg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
