import { APP_VERSION } from "../app/version";

function waitForControllerChange(timeoutMs = 2500): Promise<void> {
  return new Promise((resolve) => {
    if (!("serviceWorker" in navigator)) {
      resolve();
      return;
    }

    const timeout = window.setTimeout(() => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      resolve();
    }, timeoutMs);

    function onControllerChange() {
      window.clearTimeout(timeout);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      resolve();
    }

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
  });
}

async function clearCacheStorage(): Promise<void> {
  if (!("caches" in window)) return;

  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
}

async function updateServiceWorkers(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  const updatedRegistrations = await Promise.all(
    registrations.map((registration) => registration.update().catch(() => registration))
  );

  const waitingWorkers = updatedRegistrations.map((registration) => registration.waiting).filter(Boolean);
  waitingWorkers.forEach((worker) => worker?.postMessage({ type: "SKIP_WAITING" }));

  if (waitingWorkers.length) {
    await waitForControllerChange();
  }
}

export async function checkForUpdateAndReload(): Promise<void> {
  // Cache Storage only. IndexedDB is not opened or cleared here, so local service/odometer data stays safe.
  await clearCacheStorage();
  await updateServiceWorkers();

  const url = new URL(window.location.href);
  url.searchParams.set("appVersion", APP_VERSION);
  url.searchParams.set("reloadAt", String(Date.now()));
  window.location.replace(url.toString());
}
