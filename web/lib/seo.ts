import type { Metadata } from "next";
import { BRAND, type FaqItem } from "./site-config";

export function absoluteUrl(path = "/"): string {
  const base = BRAND.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${BRAND.name} — ${BRAND.tagline}`,
} as const;

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === BRAND.name ? `${BRAND.name} — ${BRAND.tagline}` : title;

  return {
    title: fullTitle,
    description,
    keywords: [...BRAND.keywords],
    authors: [{ name: BRAND.name, url: BRAND.url }],
    creator: BRAND.name,
    publisher: BRAND.name,
    metadataBase: new URL(BRAND.url),
    alternates: {
      canonical: url,
      types: { "application/rss+xml": absoluteUrl("/rss.xml") },
    },
    openGraph: {
      type,
      locale: BRAND.locale,
      siteName: BRAND.name,
      title: fullTitle,
      description,
      url,
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
      ...(BRAND.social.twitter ? { creator: BRAND.social.twitter } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    description: BRAND.description,
    foundingDate: BRAND.inceptionDate,
    logo: absoluteUrl("/og.png"),
    sameAs: [] as string[],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: BRAND.url,
    description: BRAND.shortDescription,
    inLanguage: BRAND.language,
    publisher: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: BRAND.name, url: BRAND.url },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og.png"),
      },
    },
    inLanguage: BRAND.language,
    isPartOf: { "@type": "WebSite", name: BRAND.name, url: BRAND.url },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", name: BRAND.name, url: BRAND.url },
    inLanguage: BRAND.language,
  };
}
