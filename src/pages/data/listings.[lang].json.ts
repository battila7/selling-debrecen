import { availableLanguageCodes, type AvailableLanguageCode } from "../../i18n";
import { getAllListings } from "../../listings";

export async function GET({
  params,
}: {
  params: { lang: AvailableLanguageCode };
}) {
  const listings = await getAllListings(params.lang);

  return new Response(JSON.stringify(listings));
}

export function getStaticPaths() {
  return availableLanguageCodes.map((lang) => ({
    params: {
      lang,
    },
  }));
}
