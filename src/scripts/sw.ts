import { VAPID_PUBLIC_KEY } from "astro:env/client";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const getSubscription = async (registration: ServiceWorkerRegistration) => {
  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    return existing;
  }

  const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });
};

export const subscribe = async () => {
  await navigator.serviceWorker.register("/service-worker.js");
  const registration = await navigator.serviceWorker.ready;
  const subscription = await getSubscription(registration);

  await fetch("/.netlify/functions/subscribe", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ subscription }),
  });
};
