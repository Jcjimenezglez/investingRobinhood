import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/lib/site-config";

const footerLinks = [
  { href: "/newsletter/", label: "Newsletter" },
  { href: "/performance/", label: "Performance" },
  { href: "/trades/", label: "Trades" },
  { href: "/journal/", label: "Journal" },
  { href: "/theses/", label: "Theses" },
  { href: "/methodology/", label: "Methodology" },
  { href: "/faq/", label: "FAQ" },
  { href: "/rss.xml", label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page space-y-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LogoMark size="sm" />
            <span className="text-sm font-semibold tracking-tight">
              {BRAND.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{BRAND.tagline}</p>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Disclaimer.</span>{" "}
          {BRAND.name} publishes a public stock-picking track record vs SPY. Not
          investment advice. Past performance does not guarantee future results.
        </p>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
