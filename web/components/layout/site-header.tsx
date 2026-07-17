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
    <header className="sticky top-0 z-50 animate-fade-in">
      <div className="container-page pt-3 sm:pt-4">
        <div
          className={cn(
            "flex h-12 items-center justify-between gap-3 rounded-full border border-border/80",
            "bg-background/70 px-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl",
            "supports-[backdrop-filter]:bg-background/55",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1">
            <LogoMark size="sm" />
            <span className="text-sm font-medium tracking-tight text-foreground">
              {BRAND.name}
            </span>
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
                  "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] text-muted-foreground",
                  "transition-colors duration-200 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden h-8 rounded-full px-3.5 text-[13px] sm:inline-flex"
            >
              <Link href="/newsletter/">Waitlist</Link>
            </Button>
          </div>
        </div>
        <nav
          className="mt-2 flex gap-1 overflow-x-auto pb-1 md:hidden"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
