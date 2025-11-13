// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  vite: {
    // Minification breaks the container class
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    (await import("@playform/compress")).default({
      CSS: false,
      HTML: false,
      JavaScript: false,
    }),
    alpinejs(),
  ],
  compressHTML: false,
  output: "static",
  site: "https://selling-debrecen.hu",
});
