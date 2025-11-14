export type Language = {
  code: string;
  label: string;
};

export const availableLanguages: Language[] = [
  { code: "hu", label: "HU" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export type AvailableLanguageCode = (typeof availableLanguages)[number]["code"];

export const defaultLanguageCode: AvailableLanguageCode = "hu";

export const availableLanguageCodes: AvailableLanguageCode[] =
  availableLanguages.map((lang) => lang.code);
