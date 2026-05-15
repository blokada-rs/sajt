self.addEventListener("push", (event) => {
  const { title, options } = event.data?.json() ?? {};

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  switch (event.action) {
    case "open_url":
      clients.openWindow(event.notification.data.url);
      break;
  }
});
