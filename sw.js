// sw.js
const CACHE_NAME = 'hgt-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'New Update from HGT!';
    const options = {
        body: data,
        icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233077.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3233/3233077.png'
    };
    event.waitUntil(self.registration.showNotification('HGT URL Shortener', options));
});
