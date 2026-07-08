import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  FileText,
  LayoutDashboard,
  LineChart,
  ScrollText,
} from "lucide-react";
import { SITE } from "@/lib/content";
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
          <span className="flex size-8 items-center justify-center rounded-md border border-foreground bg-foreground text-xs font-bold text-background">
            IR
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-none">
              {SITE.name}
            </span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              Thesis-driven AI fund
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 overflow-x-auto">
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
        </nav>
      </div>
    </header>
  );
}
