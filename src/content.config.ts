import { defineCollection, z } from "astro:content";
import { readdir, readFile } from "node:fs/promises";

const listingsCollection = defineCollection({
  async loader() {
    const filesInDir = await readdir(`./src/content/listings`);

    const entries = [];
    for (const file of filesInDir) {
      const filePath = `./src/content/listings/${file}`;
      const fileContent = await readFile(filePath, "utf-8");
      const entry = JSON.parse(fileContent);
      const lang = file.split(".")[1];
      entries.push({
        ...entry,
        lang,
        baseId: entry.id,
        id: `${entry.id}-${lang}`,
      });
    }

    console.log(entries);

    return entries;
  },
  schema: () =>
    z.object({
      lang: z.string(),
      baseId: z.string(),
      id: z.string(),
      slug: z.string(),
      featured: z.boolean(),
      title: z.string(),
      address: z.string(),
      price: z.number(),
      galleryImages: z.array(
        z.object({
          image: z.string(),
          alt: z.string(),
        }),
      ),
      rooms: z.number(),
      area: z.number(),
      terraceArea: z.number().nullish(),
      gardenArea: z.number().nullish(),
      floor: z.number().nullish(),
      propertyType: z.string(),
      transactionType: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      extra: z.string(),
      checklist: z.array(
        z.object({
          item: z.string(),
        }),
      ),
      nearby: z.array(
        z.object({
          item: z.string(),
        }),
      ),
      publicTransport: z.array(
        z.object({
          type: z.string(),
          name: z.string(),
        }),
      ),
      floorPlan: z.string().nullish(),
    }),
});

export const collections = {
  listings: listingsCollection,
};
