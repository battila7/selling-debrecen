import {
  type AvailableLanguageCode,
  availableLanguageCodes,
  defaultLanguageCode,
} from "./languages";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");

  if (availableLanguageCodes.includes(lang as AvailableLanguageCode)) {
    return lang as AvailableLanguageCode;
  }

  return defaultLanguageCode as AvailableLanguageCode;
}
