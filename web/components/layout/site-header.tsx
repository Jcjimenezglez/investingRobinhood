import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size="sm" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {BRAND.name}
          </span>
        </Link>
        <nav
          className="flex items-center gap-1 overflow-x-auto"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-1" />
        </nav>
      </div>
    </header>
  );
}
