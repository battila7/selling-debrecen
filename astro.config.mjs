// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

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
  ],
  compressHTML: false,
  output: "static",
  site: "https://selling-debrecen.hu",
});
