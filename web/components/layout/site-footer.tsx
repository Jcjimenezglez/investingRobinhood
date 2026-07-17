import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
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
    <footer className="mt-8 border-t border-border bg-muted/30">
      <div className="container-page space-y-10 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size="sm" />
              <span className="text-sm font-semibold tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              {BRAND.tagline}
            </p>
            <Button asChild>
              <Link href="/newsletter/">Join the waitlist</Link>
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Explore</p>
            <nav
              className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground"
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
        </div>

        <div className="space-y-3 border-t border-border pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Disclaimer.</span>{" "}
            {BRAND.name} publishes a public stock-picking track record versus
            SPY. Nothing on this site is investment advice, a solicitation, or a
            recommendation to buy or sell any security. Past performance does
            not guarantee future results.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
