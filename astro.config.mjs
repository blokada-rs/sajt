// @ts-check
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";
import { astroFont } from "astro-font/integration";

// https://astro.build/config
export default defineConfig({
  site: "https://studenti.org.rs",
  integrations: [astroFont(), sitemap(), icon(), mdx()],
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
});
