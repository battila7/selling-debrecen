export type Language = {
  code: string;
  label: string;
};

export const availableLanguages: Language[] = [
  { code: "hu", label: "HU" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export const availableLanguageCodes = availableLanguages.map(
  (lang) => lang.code,
);
