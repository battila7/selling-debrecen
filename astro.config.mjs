// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import playformCompress from "@playform/compress";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), playformCompress()],
  compressHTML: true,
  output: "static",
  site: "https://selling-debrecen.hu",
});
