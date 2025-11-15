import { getCollection, type CollectionEntry } from "astro:content";
import type { AvailableLanguageCode } from "../i18n";
import { useTranslatedPath, useTranslations } from "../i18n";
import Assets from "../util/assets";

type ListingEntry = CollectionEntry<"listings">;
type ListingData = ListingEntry["data"];

export type Listing = Omit<ListingData, "galleryImages"> & {
  images: {
    src: string;
    alt: string;
  }[];
  link: string;
  transactionTypeLabel: string;
  propertyTypeLabel: string;
};

export async function getAllListings(lang: AvailableLanguageCode) {
  const entries = await getCollection("listings", (entry) => {
    return isLang(entry, lang);
  });

  const listings = [];
  for (const entry of entries) {
    listings.push(await convertEntryToListing(entry, lang));
  }

  return listings;
}

export async function getFeaturedListings(lang: AvailableLanguageCode) {
  const entries = await getCollection("listings", (entry) => {
    return isLang(entry, lang) && entry.data.featured;
  });

  const listings = [];
  for (const entry of entries) {
    listings.push(await convertEntryToListing(entry, lang));
  }

  return listings;
}

export async function getListingById(id: string, lang: AvailableLanguageCode) {
  const entries = await getCollection("listings", (entry) => {
    return isLang(entry, lang) && entry.data.baseId === id;
  });

  if (entries.length === 0) {
    return null;
  }

  return await convertEntryToListing(entries[0], lang);
}

function isLang(entry: ListingEntry, lang: AvailableLanguageCode) {
  return entry.data.lang === lang;
}

async function convertEntryToListing(
  entry: ListingEntry,
  lang: AvailableLanguageCode,
) {
  const linkBasePath = useTranslatedPath(lang)("listing-detail-base");

  const images = [];
  for (const image of entry.data.galleryImages) {
    images.push({
      src: (await Assets.getImage(image.image)).default.src,
      alt: image.alt,
    });
  }

  const t = useTranslations(lang);

  return {
    ...entry.data,
    link: `${linkBasePath}${entry.data.baseId}-${entry.data.slug}`,
    images,
    transactionTypeLabel: t(entry.data.transactionType),
    propertyTypeLabel: t(entry.data.propertyType),
  };
}
