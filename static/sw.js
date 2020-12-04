// @ts-nocheck
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)
if (workbox) {
  console.log('Yay! Workbox is loaded !')
  workbox.precaching.precacheAndRoute([])
  /*  cache images in the e.g others folder; edit to other folders you got
   and config in the sw-config.js file
    */

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match('/'))
    )
  })

  workbox.routing.registerRoute(
    /(.*)others(.*)\.(?:png|gif|jpg|webp|jpeg)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  )

  workbox.routing.registerRoute(
    // cache js, css files
    /.*\.(?:css|sccs)/,
    // use cache but update in the background ASAP
    new workbox.strategies.StaleWhileRevalidate({
      // use a custom cache name
      cacheName: 'assets',
    })
  )
  // add offline analytics
  workbox.googleAnalytics.initialize()
  /* Install a new service worker and have it update
and control a web page as soon as possible
*/
  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting()
    }
  })

  workbox.core.clientsClaim()
} else {
  console.log("Oops! Workbox didn't load")
}
