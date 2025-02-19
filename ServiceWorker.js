/* eslint-disable no-restricted-globals */
const cachedFiles = ['bst-v1.3'];
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('bst-v1.3').then((cache) => cache.addAll([
			'./index.html',
			'./icon.png',
			'./icon-512.png',
			// './new_run.html',
			// './new_run.js',
			// './settings.html',
			// './settings.js',
			'./index.js',
		])),
	);
});

self.addEventListener('activate', function(event) {
	// Delete all caches that aren't named in CURRENT_CACHES.
	var expectedCacheNamesSet = new Set(cachedFiles);
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
		return Promise.all(
		  cacheNames.map(function(cacheName) {
			if (!expectedCacheNamesSet.has(cacheName)) {
			  // If this cache name isn't present in the set of "expected" cache names, then delete it.
			  console.log('Deleting out of date cache:', cacheName);
			  return caches.delete(cacheName);
			}
		  })
		);
	  })
	);
  });

self.addEventListener('fetch', (event) => {
	event.respondWith(
		// Try cache
		// Fallback to network
		caches.match(event.request).then((response) => response || fetch(event.request)).catch(() => caches.match('./index.html')),
	);
});
