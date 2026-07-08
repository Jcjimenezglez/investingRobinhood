import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationJsonLd,
  pageMetadata,
  webSiteJsonLd,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: BRAND.name,
    description: BRAND.description,
    path: "/",
  }),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  applicationName: BRAND.name,
  category: "finance",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  other: {
    "msapplication-TileColor": BRAND.color,
  },
};

export const viewport = {
  themeColor: BRAND.color,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={BRAND.language}>
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <SiteHeader />
        <main className="container-page py-8 sm:py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
