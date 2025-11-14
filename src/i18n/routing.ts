import { type AvailableLanguageCode, defaultLanguageCode } from "./languages";

export const routes: Record<AvailableLanguageCode, Record<string, string>> = {
  hu: {
    home: "/",
    properties: "/ingatlanjaink",
    "for-sellers": "/kinaloknak",
    about: "/rolunk",
    "for-buyers": "/keresoknek",
    "listing-detail-base": "/i/",
  },
  en: {
    home: "/",
    properties: "/properties",
    "for-sellers": "/for-sellers",
    about: "/about",
    "for-buyers": "/for-buyers",
    "listing-detail-base": "/p/",
  },
  de: {
    home: "/",
    properties: "/immobilien",
    "for-sellers": "/verkaeufer",
    about: "/ueber-uns",
    "for-buyers": "/kaufer",
    "listing-detail-base": "/i/",
  },
} as const;

export type RouteKey = keyof (typeof routes)[typeof defaultLanguageCode];

export function useTranslatedPath(lang: AvailableLanguageCode) {
  return function translatePath(key: RouteKey) {
    const path = routes[lang][key];
    return lang === defaultLanguageCode ? path : `/${lang}${path}`;
  };
}
