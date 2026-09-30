// ===== SwipeTune - Service Worker (PWA) =====

const CACHE_NAME = 'swipetune-v1';
const URLS_PARA_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

// Instalação do service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                return cache.addAll(URLS_PARA_CACHE);
            })
    );
    self.skipWaiting();
});

// Ativação do service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    // Não interceptar requisições de áudio externas
    if (event.request.url.includes('soundhelix.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna do cache se existir
                if (response) {
                    return response;
                }

                // Busca na rede e salva no cache
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Verifica se a resposta é válida
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clona a resposta para salvar no cache
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(() => {
                        // Se falhar, retorna a página principal
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});