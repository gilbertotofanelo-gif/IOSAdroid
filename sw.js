self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  // Se a requisição for para fora do site (como o Google Apps Script), 
  // o Service Worker NÃO deve interceptar. Deixa o navegador agir.
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Se for navegação da própria página, deixa passar.
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  // Recursos locais (imagens, etc): rede primeiro.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
