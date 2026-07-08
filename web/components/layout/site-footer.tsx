import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/lib/site-config";

const footerLinks = [
  { href: "/journal/", label: "Journal" },
  { href: "/trades/", label: "Trades" },
  { href: "/theses/", label: "Theses" },
  { href: "/performance/", label: "Performance" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/faq/", label: "FAQ" },
  { href: "/rss.xml", label: "RSS" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="container-page space-y-4 py-10">
        <div className="flex items-center gap-2.5">
          <LogoMark size="sm" />
          <span className="text-sm font-semibold">{BRAND.name}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Disclaimer.</span>{" "}
          {BRAND.name} documents an experimental AI trading agent on a small
          Robinhood Agentic account. Not investment advice. Past performance
          does not guarantee future results.
        </p>
        <Separator />
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
