// Aegis Financial Platform - Service Worker (v2 Cache Invalidation)

const CACHE_NAME = 'aegis-intel-cache-v2';

// Install Event
self.addEventListener('install', (event) => {
  console.log('SW: Installing Service Worker v2');
  self.skipWaiting();
});

// Activate Event - Instantly purge all old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          console.log('SW: Purging old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Pure Network First (Never cache HTML or API data)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Skip caching for HTML documents and Workers API requests
  if (event.request.mode === 'navigate' || event.request.url.includes('.workers.dev')) {
    return; // Pass through to live network
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Push Notification Listener
self.addEventListener('push', (event) => {
  console.log('SW: Push notification received');
  let data = { title: 'Aegis Intel Alert', body: 'Market movement detected.' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'Aegis Intel Alert', body: event.data.text() };
    }
  }

  const options = {
    body: data.body,
    icon: 'logo.svg',
    badge: 'logo.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      { action: 'explore', title: 'Open Aegis Terminal' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
