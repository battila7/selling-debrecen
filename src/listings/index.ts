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

export type ShortListing = Pick<
  Listing,
  | "id"
  | "baseId"
  | "title"
  | "price"
  | "images"
  | "link"
  | "address"
  | "rooms"
  | "shortDescription"
  | "transactionType"
  | "transactionTypeLabel"
  | "propertyType"
  | "propertyTypeLabel"
  | "area"
>;

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

export async function getAllShortListings(lang: AvailableLanguageCode) {
  const entries = await getCollection("listings", (entry) => {
    return isLang(entry, lang);
  });

  const listings = [];
  for (const entry of entries) {
    listings.push(await convertEntryToShortListing(entry, lang));
  }

  return listings;
}

export async function getFeaturedShortListings(lang: AvailableLanguageCode) {
  const entries = await getCollection("listings", (entry) => {
    return isLang(entry, lang) && entry.data.featured;
  });

  const listings = [];
  for (const entry of entries) {
    listings.push(await convertEntryToShortListing(entry, lang));
  }

  return listings;
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

async function convertEntryToShortListing(
  entry: ListingEntry,
  lang: AvailableLanguageCode,
): Promise<ShortListing> {
  const listing = await convertEntryToListing(entry, lang);

  return {
    id: listing.id,
    baseId: listing.baseId,
    title: listing.title,
    price: listing.price,
    images: listing.images,
    link: listing.link,
    address: listing.address,
    rooms: listing.rooms,
    shortDescription: listing.shortDescription,
    transactionType: listing.transactionType,
    transactionTypeLabel: listing.transactionTypeLabel,
    propertyType: listing.propertyType,
    propertyTypeLabel: listing.propertyTypeLabel,
    area: listing.area,
  };
}
