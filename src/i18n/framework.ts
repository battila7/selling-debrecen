import type { AstroGlobal } from "astro";
import { getLangFromUrl } from "./detect";
import { useTranslatedPath } from "./routing";
import { useTranslations } from "./ui";

export function useI18n(astro: AstroGlobal) {
  const currentLanguageCode = getLangFromUrl(astro.url);
  const p = useTranslatedPath(currentLanguageCode);
  const t = useTranslations(currentLanguageCode);

  return {
    p,
    t,
    lang: currentLanguageCode,
  };
}
