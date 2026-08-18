import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { DeskChrome } from "@/components/desk/desk-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { getFundSnapshot } from "@/lib/content";
import {
  organizationJsonLd,
  pageMetadata,
  webSiteJsonLd,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import "./globals.css";
import "./desk.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: BRAND.name,
    description: BRAND.description,
    path: "/",
  }),
  title: {
    default: `${BRAND.name}, public auto-trader desk`,
    template: `%s · ${BRAND.name}`,
  },
  applicationName: BRAND.name,
  category: "finance",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const snap = getFundSnapshot();

  return (
    <html
      lang={BRAND.language}
      className={`dark ${archivo.variable} ${plexMono.variable}`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body className="desk-root">
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <DeskChrome updated={snap.lastUpdated}>{children}</DeskChrome>
      </body>
    </html>
  );
}
