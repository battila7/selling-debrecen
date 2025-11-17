import { OGImageRoute } from "astro-og-canvas";
import { pagesBySlug } from "../../open-graph";

type RgbColorTuple = [number, number, number];

const navy: RgbColorTuple = [14, 28, 79];
const cream: RgbColorTuple = [243, 239, 232];

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: pagesBySlug,

  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    padding: 60,
    logo: {
      path: "./public/selling-debrecen-logo.png",
      size: [200],
    },
    bgGradient: [cream],
    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/open-sans:vf@latest/latin-wght-normal.woff2",
    ],
    font: {
      title: {
        color: navy,
        weight: "SemiBold",
        size: 75,
        families: ["Open Sans"],
      },
      description: {
        color: navy,
        weight: "ExtraLight",
        size: 40,
        families: ["Open Sans"],
      },
    },
  }),
});
