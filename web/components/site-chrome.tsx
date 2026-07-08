import Link from "next/link";
import { SITE } from "@/lib/content";

const nav = [
  { href: "/journal/", label: "Journal" },
  { href: "/trades/", label: "Trades" },
  { href: "/theses/", label: "Theses" },
  { href: "/letters/", label: "Letters" },
  { href: "/performance/", label: "Performance" },
  { href: "/methodology/", label: "Methodology" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">IR</span>
          <span>
            <strong>{SITE.name}</strong>
            <small>{SITE.tagline}</small>
          </span>
        </Link>
        <nav aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="disclaimer">
          <strong>Disclaimer:</strong> This site documents an experimental AI
          trading agent operating a small Robinhood Agentic account. Nothing
          here is investment, tax, or financial advice. Past performance does
          not guarantee future results. Robinhood Agentic is in beta; you can
          lose your entire investment.
        </p>
        <p className="footer-meta">
          <Link href="/rss.xml" prefetch={false}>
            RSS
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/methodology/">How we invest</Link>
        </p>
      </div>
    </footer>
  );
}
