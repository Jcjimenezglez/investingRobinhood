import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/newsletter/", label: "Newsletter" },
  { href: "/performance/", label: "Performance" },
  { href: "/trades/", label: "Trades" },
  { href: "/journal/", label: "Journal" },
  { href: "/theses/", label: "Theses" },
  { href: "/faq/", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-12 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size="sm" />
          <span className="text-label-14 text-foreground">{BRAND.name}</span>
        </Link>
        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-[6px] px-2.5 py-1.5 text-label-13 text-muted-foreground",
                "transition-colors hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/newsletter/">Join Waitlist</Link>
          </Button>
        </div>
      </div>
      <nav
        className="container-page flex gap-1 overflow-x-auto pb-2 md:hidden"
        aria-label="Mobile navigation"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-[6px] px-2 py-1 text-label-13 text-muted-foreground hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
