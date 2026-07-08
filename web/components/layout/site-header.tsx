import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  ScrollText,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BRAND } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/journal/", label: "Journal", icon: BookOpen },
  { href: "/trades/", label: "Trades", icon: BarChart3 },
  { href: "/theses/", label: "Theses", icon: FileText },
  { href: "/letters/", label: "Letters", icon: ScrollText },
  { href: "/performance/", label: "Performance", icon: LineChart },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size="md" />
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-none">
              {BRAND.name}
            </span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              Thesis-driven AI fund
            </span>
          </span>
        </Link>
        <nav
          className="flex items-center gap-0.5 overflow-x-auto"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3 sm:text-sm",
              )}
            >
              <item.icon className="size-3.5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/faq/"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3 sm:text-sm"
          >
            <HelpCircle className="size-3.5 shrink-0" />
            <span className="hidden lg:inline">FAQ</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
