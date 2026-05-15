// @ts-check
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://blokade.org",
  integrations: [sitemap(), icon()],
  cacheDir: "cache",
  redirects: {
    "/sub": "/linkovi/studenti_u_blokadi",
    "/izbori": "/ukljuci-se",
  },
  i18n: {
    locales: ["sr", "sr-lat", "en"],
    defaultLocale: "sr",
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  env: {
    schema: {
      VAPID_PUBLIC_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  vite: {
    server: {
      proxy: {
        "/register": "http://localhost:8888/.netlify/functions/register",
      },
    },
  },
});
