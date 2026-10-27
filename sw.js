self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  // Não intercepta navegação (deixa passar direto para o Google Apps Script).
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  // Demais recursos: rede primeiro, cache como fallback.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
