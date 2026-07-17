import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Mail,
  ScrollText,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BRAND } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/newsletter/", label: "Newsletter", icon: Mail },
  { href: "/journal/", label: "Journal", icon: BookOpen },
  { href: "/trades/", label: "Trades", icon: BarChart3 },
  { href: "/theses/", label: "Theses", icon: FileText },
  { href: "/letters/", label: "Letters", icon: ScrollText },
  { href: "/performance/", label: "Performance", icon: LineChart },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative">
            <LogoMark size="md" className="ring-1 ring-signal/40" />
            <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" />
          </span>
          <span className="hidden sm:block">
            <span className="hud-title block text-sm leading-none tracking-[0.18em] text-foreground">
              {BRAND.name}
            </span>
            <span className="mt-1 block font-data text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Newsletter // live track record
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
                "flex items-center gap-1.5 whitespace-nowrap border border-transparent px-2.5 py-1.5 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground sm:px-3",
              )}
            >
              <item.icon className="size-3.5 shrink-0 text-signal/80" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/faq/"
            className="flex items-center gap-1.5 whitespace-nowrap border border-transparent px-2.5 py-1.5 font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground sm:px-3"
          >
            <HelpCircle className="size-3.5 shrink-0 text-violet" />
            <span className="hidden lg:inline">FAQ</span>
          </Link>
          <ThemeToggle className="ml-1 border border-border/80 hover:border-signal/50 hover:bg-muted/60" />
        </nav>
      </div>
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-signal/70 to-transparent"
      />
    </header>
  );
}
