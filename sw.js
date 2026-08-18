const CACHE_NAME = "treningsplan-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function cachePut(request, response) {
  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  return response;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const isHtml =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  // HTML hentes fra nett først, slik at en ny versjon av appen slår gjennom
  // uten at CACHE_NAME må bumpes. Cache brukes bare når nettet er nede.
  if (isHtml) {
    event.respondWith(
      fetch(req)
        .then((res) => cachePut(req, res))
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match("./index.html"))
        )
    );
    return;
  }

  // Ikoner og manifest endrer seg sjelden: cache først, nett som reserve.
  event.respondWith(
    caches.match(req).then(
      (cached) => cached || fetch(req).then((res) => cachePut(req, res))
    )
  );
});
