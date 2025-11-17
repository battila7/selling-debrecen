import { getAllShortListings, type ShortListing } from "./listings";
import { useTranslatedPath, availableLanguageCodes } from "./i18n";
import Home from "./content/fixed-pages/home.json";
import About from "./content/fixed-pages/about.json";
import Properties from "./content/fixed-pages/properties.json";
import ForSellers from "./content/fixed-pages/for-sellers.json";
import ForBuyers from "./content/fixed-pages/for-buyers.json";

export type OpenGraphPageKind = "website" | "article";

type OpenGraphPageData = {
  url: string;
  slug: string;
  title: string;
  description: string;
  kind: OpenGraphPageKind;
};

export class OpenGraphPage {
  constructor(private data: OpenGraphPageData) {}

  absoluteImageUrl(site: URL): string {
    return new URL(`/open-graph/${this.data.slug}.png`, site).href;
  }

  absoluteUrl(site: URL): string {
    return new URL(this.data.url, site).href;
  }

  get url(): string {
    return this.data.url;
  }

  get slug(): string {
    return this.data.slug;
  }

  get title(): string {
    return this.data.title;
  }

  get description(): string {
    return this.data.description;
  }

  get kind(): OpenGraphPageKind {
    return this.data.kind;
  }
}

const listings: ShortListing[] = [
  ...(await getAllShortListings("hu")),
  ...(await getAllShortListings("en")),
  ...(await getAllShortListings("de")),
];

const listingPages: OpenGraphPageData[] = listings.map((listing) => ({
  url: listing.link,
  slug: listing.id,
  title: listing.title,
  description: listing.address,
  kind: "article",
}));

const staticPages: OpenGraphPageData[][] = availableLanguageCodes.map(
  (lang) => {
    const l = lang as keyof typeof Home;

    const p = useTranslatedPath(lang);

    return [
      {
        url: p("home"),
        slug: `${lang}-home`,
        title: Home[l].pageTitle,
        description: Home[l].pageDescription,
        kind: "website",
      },
      {
        url: p("about"),
        slug: `${lang}-about`,
        title: About[l].pageTitle,
        description: About[l].pageDescription,
        kind: "website",
      },
      {
        url: p("properties"),
        slug: `${lang}-properties`,
        title: Properties[l].pageTitle,
        description: Properties[l].pageDescription,
        kind: "website",
      },
      {
        url: p("for-sellers"),
        slug: `${lang}-for-sellers`,
        title: ForSellers[l].pageTitle,
        description: ForSellers[l].pageDescription,
        kind: "website",
      },
      {
        url: p("for-buyers"),
        slug: `${lang}-for-buyers`,
        title: ForBuyers[l].pageTitle,
        description: ForBuyers[l].pageDescription,
        kind: "website",
      },
    ];
  },
);

const pages: OpenGraphPage[] = [...staticPages.flat(), ...listingPages].map(
  (page) => new OpenGraphPage(page),
);

export const pagesByUrl = Object.fromEntries(
  pages.map((page) => [page.url, page]),
);

export const pagesBySlug = Object.fromEntries(
  pages.map((page) => [page.slug, page]),
);

export function getPageByUrl(url: string): OpenGraphPage | undefined {
  return pagesByUrl[url];
}
