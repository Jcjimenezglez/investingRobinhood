import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { BRAND } from "@/lib/site-config";

const footerLinks = [
  { href: "/newsletter/", label: "Newsletter" },
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
    <footer className="mt-16 border-t border-border/80">
      <div className="container-page space-y-5 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LogoMark size="sm" />
            <div>
              <span className="hud-title block text-xs tracking-[0.2em]">
                {BRAND.name}
              </span>
              <span className="font-data text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                SYS // PUBLIC TRACK RECORD
              </span>
            </div>
          </div>
          <span className="hud-live">
            <span className="hud-live-dot" />
            Live feed
          </span>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-signal">Disclaimer.</span>{" "}
          {BRAND.name} documents an experimental concentrated stock-picking book
          with a public track record vs SPY. Not investment advice. Past
          performance does not guarantee future results.
        </p>
        <div className="h-px w-full bg-gradient-to-r from-signal/50 via-border to-violet/40" />
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 font-data text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
