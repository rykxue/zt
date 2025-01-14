const CACHE_NAME = 'ztype-game-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/media/styles.css',
    '/main.js',
    '/media/background/stars.jpg',
    '/media/background/gradient.png',
    '/media/background/grid.png',
    '/media/background/page.png',
    '/media/fonts/avenir-36-white.png',
    '/media/fonts/avenir-36-orange.png',
    '/media/nfn-phoboslab-works.png',
    '/media/ui/personal-best-badge.png',
    '/media/fonts/avenir-36-blue.png',
    '/media/fonts/avenir-18-white.png',
    '/media/ui/bar-blue.png',
    '/media/title/ztype.png',
    '/media/title/phoboslab.png',
    '/media/title/ship.png',
    '/media/title/exhaust.png',
    '/media/title/glitch-stripe.png',
    '/media/title/glitch-code.png',
    '/media/title/glitch-jpeg.png',
    '/media/title/glitch-graph.png',
    '/media/title/glitch-log.png',
    '/media/sprites/explosion.png',
    '/media/sprites/spark.png',
    '/media/sprites/explosion-huge.jpg',
    '/media/sprites/explosion-huge-glitch.jpg',
    '/media/fonts/avenir-22-white-v2.png',
    '/media/fonts/avenir-22-orange-v2.png',
    '/media/sounds/hit.ogg',
    '/media/sounds/target.ogg',
    '/media/ui/reticle.png',
    '/media/sprites/missle.png',
    '/media/sprites/ship.png',
    '/media/sounds/explosion-small.ogg',
    '/media/sprites/mine.png',
    '/media/sounds/explosion.ogg',
    '/media/sprites/destroyer.png',
    '/media/sounds/explosion-large.ogg',
    '/media/sprites/oppressor.png',
    '/media/sprites/bullet.png',
    '/media/sprites/emp.png',
    '/media/sounds/plasma.ogg',
    '/media/sounds/click.ogg',
    '/media/sprites/plasma.png',
    '/media/ui/keyboard-background.png',
    '/media/ui/emp-buttons.png',
    '/media/ui/pause.png',
    '/media/ui/key-edge-left.png',
    '/media/ui/key-edge-right.png',
    '/media/ui/key.png',
    '/media/ui/multi-indicator.png',
    '/media/sounds/multi-2.ogg',
    '/media/sounds/multi-3.ogg',
    '/media/sounds/hit.ogg',
    '/media/sounds/emp.ogg',
    '/media/sounds/endure.ogg',
    '/media/sounds/explosions-player.ogg',
    '/media/sounds/spawn.ogg',
    '/media/sounds/orientation.ogg',
    '/media/sounds/cancel.ogg',
    '/media/sounds/click.ogg'
];

// Install event: Cache necessary files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch event: Serve from cache or fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).then((networkResponse) => {
                    if (event.request.url.includes('/media/')) {
                        // Dynamically cache new media files
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                    return networkResponse.clone();
                })
            );
        })
    );
});

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
