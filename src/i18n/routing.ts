import { type AvailableLanguageCode, defaultLanguageCode } from "./languages";

export const routes: Record<AvailableLanguageCode, Record<string, string>> = {
  hu: {
    home: "/",
    properties: "/ingatlanjaink",
    "for-sellers": "/kinaloknak",
    about: "/rolunk",
    "for-buyers": "/keresoknek",
  },
  en: {
    home: "/",
    properties: "/properties",
    "for-sellers": "/for-sellers",
    about: "/about",
    "for-buyers": "/for-buyers",
  },
  de: {
    home: "/",
    properties: "/immobilien",
    "for-sellers": "/verkaeufer",
    about: "/ueber-uns",
    "for-buyers": "/kaufer",
  },
} as const;

export type RouteKey = keyof (typeof routes)[typeof defaultLanguageCode];

export function useTranslatedPath(lang: AvailableLanguageCode) {
  return function translatePath(key: RouteKey) {
    const path = routes[lang][key];
    return lang === defaultLanguageCode ? path : `/${lang}${path}`;
  };
}
