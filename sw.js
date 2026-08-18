const CACHE_NAME = "treningsplan-v3";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Bare filer som praktisk talt aldri endrer seg serveres fra cache først.
// Alt annet, index.html inkludert, hentes fra nett så lenge nettet svarer.
const CACHE_FIRST = [/icon-\d+\.png$/, /manifest\.json$/];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
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
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (CACHE_FIRST.some((re) => re.test(url.pathname))) {
    event.respondWith(
      caches.match(req).then(
        (cached) => cached || fetch(req).then((res) => cachePut(req, res))
      )
    );
    return;
  }

  // cache: "no-cache" tvinger revalidering mot serveren. Uten den kan
  // nettleserens egen HTTP-cache gi oss en gammel index.html tilbake,
  // slik at en ny versjon av appen ikke slår gjennom.
  event.respondWith(
    fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
      .then((res) => cachePut(req, res))
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match("./index.html"))
      )
  );
});
