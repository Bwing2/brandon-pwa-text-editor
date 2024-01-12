const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

// registerRoute is part of Workbox library, registers route that service worker will manage.
registerRoute(
  // Checks if destination of request is style, script, or worker to handle request.
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Instance with cacheName of 'asset-cache'.
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // Plugin is used to see which responses are allowed to be cached, here it is status codes 0 and 200.
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
