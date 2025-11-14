import { type AvailableLanguageCode, defaultLanguageCode } from "./languages";

export const ui: Record<AvailableLanguageCode, Record<string, string>> = {
  hu: {
    "nav.home": "Kezdőlap",
    "nav.properties": "Ingatlanjaink",
    "nav.for-sellers": "Kínálóknak",
    "nav.for-buyers": "Keresőknek",
    "nav.about": "Rólunk",
    "nav.schedule": "Időpontfoglalás",
    "nav.follow-us": "Kövessen minket",
  },
  en: {
    "nav.home": "Home",
    "nav.for-buyers": "For Buyers",
    "nav.properties": "Properties",
    "nav.for-sellers": "For Sellers",
    "nav.about": "About",
    "nav.schedule": "Schedule",
    "nav.follow-us": "Follow Us",
  },
  de: {
    "nav.home": "Startseite",
    "nav.for-buyers": "Für Käufer",
    "nav.properties": "Immobilien",
    "nav.for-sellers": "Für Verkäufer",
    "nav.about": "Über Uns",
    "nav.schedule": "Terminvereinbarung",
    "nav.follow-us": "Folgen Sie uns",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLanguageCode];

export function useTranslations(lang: AvailableLanguageCode) {
  return function t(key: UiKey) {
    return ui[lang][key] || ui[defaultLanguageCode][key];
  };
}
