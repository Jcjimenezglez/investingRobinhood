import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  DollarSign,
  Layers,
  Mail,
  Percent,
} from "lucide-react";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { StatCard } from "@/components/fund/stat-card";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  HudPanel,
  HudPanelBody,
  HudPanelHeader,
} from "@/components/ui/hud-panel";
import { getFundSnapshot } from "@/lib/content";
import { formatLedgerUsd, formatStartingNav } from "@/lib/display-money";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Stock Newsletter with Live Track Record vs S&P 500",
  description:
    "Join the Tapefund stock newsletter waitlist. Free live NAV and track record vs the S&P 500; upcoming Stock Advisor–style picks and full theses. Not investment advice.",
  path: "/newsletter/",
});

const newsletterFaq = SITE_FAQ.filter((item) =>
  [
    "What is the Tapefund newsletter?",
    "What is free vs what is for the waitlist?",
    "How does Tapefund compare to the S&P 500?",
    "Is Tapefund investment advice?",
    "Is Tapefund the same as Motley Fool Stock Advisor?",
  ].includes(item.question),
);

const freeItems = [
  "Live NAV and return since inception",
  "Open tickers on the public book",
  "Daily CIO journal on the site",
  "Weekly performance vs SPY",
];

const waitlistItems = [
  "Full investment theses",
  "Weekly stock picks commentary",
  "Sizing and kill-criteria detail",
  "Investor-letter depth when published",
];

export default function NewsletterPage() {
  const snapshot = getFundSnapshot();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          Waitlist · opening soon
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Stock newsletter
          <span className="mt-3 block text-2xl font-medium text-muted-foreground sm:text-3xl">
            with a live track record vs the S&amp;P 500
          </span>
        </h1>
        <DirectAnswer className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {BRAND.name} publishes a live stock-picking track record and an
          upcoming Stock Advisor–style newsletter. Since {BRAND.inceptionDate}{" "}
          (starting {formatStartingNav()}), current NAV is{" "}
          {formatLedgerUsd(snapshot.nav, { digits: 2 })} ({returnLabel}). Free
          scoreboard on the site; waitlist for full theses and weekly
          recommendations. Not investment advice.
        </DirectAnswer>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Live track record proof"
      >
        <StatCard
          title="NAV"
          value={formatLedgerUsd(snapshot.nav, { digits: 2 })}
          sub={`Updated ${snapshot.lastUpdated}`}
          icon={DollarSign}
          accent
        />
        <StatCard
          title="Return"
          value={returnLabel}
          sub={`Since inception (${formatStartingNav()})`}
          icon={Percent}
        />
        <StatCard
          title="Open book"
          value={String(snapshot.positions)}
          sub="Names in the public book"
          icon={Layers}
        />
        <StatCard
          title="Benchmark"
          value="vs SPY"
          sub="See Performance"
          icon={Mail}
        />
      </section>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="text-sm text-muted-foreground">Waitlist</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Get picks + full theses
            </h2>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="space-y-4">
          <WaitlistForm />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/performance/">
                See vs SPY
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/trades/">Open book</Link>
            </Button>
          </div>
        </HudPanelBody>
      </HudPanel>

      <div className="grid gap-4 md:grid-cols-2">
        <HudPanel>
          <HudPanelHeader>
            <div>
              <p className="text-sm text-muted-foreground">Free</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                On the site
              </h2>
            </div>
          </HudPanelHeader>
          <HudPanelBody>
            <ul className="space-y-3">
              {freeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HudPanelBody>
        </HudPanel>
        <HudPanel>
          <HudPanelHeader>
            <div>
              <p className="text-sm text-muted-foreground">Coming</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                Via newsletter
              </h2>
            </div>
          </HudPanelHeader>
          <HudPanelBody>
            <ul className="space-y-3">
              {waitlistItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HudPanelBody>
        </HudPanel>
      </div>

      <HudPanel>
        <HudPanelHeader>
          <div>
            <p className="text-sm text-muted-foreground">Disclaimer</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Before you join
            </h2>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">
              Not investment advice.
            </span>{" "}
            Nothing here is a solicitation or a recommendation to buy or sell
            any security. Past performance does not guarantee future results.
          </p>
        </HudPanelBody>
      </HudPanel>

      <section className="space-y-4">
        <FaqSection items={newsletterFaq} />
        <Link
          href="/faq/"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </section>

      <JsonLd data={faqPageJsonLd(newsletterFaq)} />
    </div>
  );
}
