import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationJsonLd,
  pageMetadata,
  webSiteJsonLd,
} from "@/lib/seo";
import { BRAND } from "@/lib/site-config";
import "./globals.css";

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={BRAND.language} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      </head>
      <body className={`${body.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="container-page flex-1 py-10 sm:py-14">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
