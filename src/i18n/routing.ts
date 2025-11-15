import { type AvailableLanguageCode, defaultLanguageCode } from "./languages";

export const routes: Record<AvailableLanguageCode, Record<string, string>> = {
  hu: {
    home: "/",
    properties: "/ingatlanjaink",
    "for-sellers": "/kinaloknak",
    about: "/rolunk",
    "for-buyers": "/keresoknek",
    "listing-detail-base": "/i/",
    "listings-data": "/data/listings.hu.json",
    "privacy-policy": "/adatkezelesi-tajekoztato",
    "terms-of-service": "/altalanos-szerzodesi-feltetelek",
  },
  en: {
    home: "/",
    properties: "/properties",
    "for-sellers": "/for-sellers",
    about: "/about",
    "for-buyers": "/for-buyers",
    "listing-detail-base": "/p/",
    "listings-data": "/data/listings.en.json",
    "privacy-policy": "/privacy-policy",
    "terms-of-service": "/terms-of-service",
  },
  de: {
    home: "/",
    properties: "/immobilien",
    "for-sellers": "/verkaeufer",
    about: "/ueber-uns",
    "for-buyers": "/kaufer",
    "listing-detail-base": "/i/",
    "listings-data": "/data/listings.de.json",
    "privacy-policy": "/datenschutzerklaerung",
    "terms-of-service": "/allgemeine-geschaeftsbedingungen",
  },
} as const;

export type RouteKey = keyof (typeof routes)[typeof defaultLanguageCode];

const nonPrefixedRoutes: RouteKey[] = ["listings-data"];

export function useTranslatedPath(lang: AvailableLanguageCode) {
  return function translatePath(key: RouteKey) {
    const path = routes[lang][key];

    if (nonPrefixedRoutes.includes(key)) {
      return path;
    }

    return lang === defaultLanguageCode ? path : `/${lang}${path}`;
  };
}
