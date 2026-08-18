"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/site-config";

const jumps = [
  { hash: "performance", label: "Performance" },
  { hash: "strategy", label: "How it works" },
  { hash: "holdings-section", label: "Holdings" },
  { hash: "thinking-section", label: "Decisions" },
  { hash: "trades-section", label: "Trades" },
  { hash: "improvements-section", label: "Improvements" },
];

export function DeskChrome({
  children,
  updated,
}: {
  children: React.ReactNode;
  updated: string;
}) {
  const path = usePathname();
  const home = path === "/" || path === "";

  return (
    <main className="desk-main">
      <header className={home ? "desk-masthead" : "desk-masthead compact"}>
        <div>
          <div className="eyebrow">tapefund.com</div>
          <h1>{BRAND.name}</h1>
          <p className="subtitle">
            {home
              ? "Public auto-trader desk on Robinhood Agentic. The CIO proposes. Automations clerk. The ledger is the receipt."
              : BRAND.tagline}
          </p>
        </div>
        <nav className="nav" aria-label="Site navigation">
          <div className="stamp">Updated {updated}</div>
          <Link href="/methodology/">How the desk works</Link>
        </nav>
      </header>

      <nav className="jump-nav" aria-label="Dashboard sections">
        {jumps.map((j) => (
          <Link key={j.hash} href={home ? `#${j.hash}` : `/#${j.hash}`}>
            {j.label}
          </Link>
        ))}
        <Link href="/journal/">Journal</Link>
        <Link href="/performance/">Scorecards</Link>
      </nav>

      {children}

      <footer className="desk-footer">
        Public experiment log, not investment advice. Account IDs, order IDs,
        credentials, raw prompts, and machine logs stay off this page. Dollar
        figures are the live Agentic ledger and are not scaled.
      </footer>
    </main>
  );
}
