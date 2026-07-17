import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  DollarSign,
  Layers,
  Mail,
  Percent,
  X,
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
  "Full investment theses (depth beyond the teaser)",
  "Weekly stock picks commentary",
  "Sizing and kill-criteria detail",
  "Investor-letter depth when published",
];

export default function NewsletterPage() {
  const snapshot = getFundSnapshot();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <div className="space-y-8">
      <section className="hud-panel hud-panel-accent hud-scanline relative overflow-hidden px-5 py-7 sm:px-7 sm:py-9">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hud-live">
              <span className="hud-live-dot" />
              Stock newsletter
            </span>
            <span className="font-data text-[10px] uppercase tracking-[0.2em] text-violet">
              Waitlist // opening soon
            </span>
          </div>
          <h1 className="hud-title max-w-3xl text-3xl text-foreground sm:text-5xl">
            <span className="text-signal">Stock newsletter</span>
            <span className="mt-2 block text-xl font-semibold tracking-[0.08em] text-foreground/90 sm:text-3xl">
              with a live track record vs the S&amp;P 500
            </span>
          </h1>
          <DirectAnswer className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {BRAND.name} publishes a live stock-picking track record and an
            upcoming Stock Advisor–style newsletter. Since {BRAND.inceptionDate}{" "}
            (starting NAV ${BRAND.startingNav}), current NAV is $
            {snapshot.nav.toFixed(2)} ({returnLabel}). The public site is the
            free scoreboard; join the waitlist for full theses and weekly
            recommendations. This is not investment advice.
          </DirectAnswer>
        </div>
      </section>

      <section
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Live track record proof"
      >
        <StatCard
          title="NAV"
          value={`$${snapshot.nav.toFixed(2)}`}
          sub={`Updated ${snapshot.lastUpdated}`}
          icon={DollarSign}
          accent
        />
        <StatCard
          title="Return"
          value={returnLabel}
          sub={`Since inception ($${BRAND.startingNav})`}
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
          sub="Weekly scorecards on Performance"
          icon={Mail}
        />
      </section>

      <HudPanel accent>
        <HudPanelHeader>
          <div>
            <p className="hud-label">Waitlist</p>
            <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
              Get picks + full theses
            </h2>
            <p className="mt-1 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Stock Advisor–style newsletter — email capture not live yet
            </p>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="space-y-4">
          <WaitlistForm />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild className="font-data uppercase tracking-[0.14em]">
              <Link href="/performance/">
                See vs SPY
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="font-data uppercase tracking-[0.14em]">
              <Link href="/trades/">
                Open book
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </HudPanelBody>
      </HudPanel>

      <div className="grid gap-4 md:grid-cols-2">
        <HudPanel>
          <HudPanelHeader>
            <div>
              <p className="hud-label">Free on the site</p>
              <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
                Scoreboard
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
                  <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HudPanelBody>
        </HudPanel>
        <HudPanel>
          <HudPanelHeader>
            <div>
              <p className="hud-label">Coming via newsletter</p>
              <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
                Depth
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
                  <Mail className="mt-0.5 size-4 shrink-0 text-violet" />
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
            <p className="hud-label">Disclaimer</p>
            <h2 className="hud-title mt-1 text-base tracking-[0.12em]">
              Read before you join
            </h2>
          </div>
        </HudPanelHeader>
        <HudPanelBody className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-signal">Not investment advice.</span>{" "}
            {BRAND.name} documents an experimental concentrated book. Nothing
            here is a solicitation or a recommendation to buy or sell any
            security.
          </p>
          <p className="flex items-start gap-2">
            <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              Past performance does not guarantee future results. The track
              record is small and young — judge it against SPY on the{" "}
              <Link href="/performance/" className="hud-link">
                Performance
              </Link>{" "}
              page.
            </span>
          </p>
        </HudPanelBody>
      </HudPanel>

      <FaqSection items={newsletterFaq} />
      <p className="font-data text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link href="/faq/" className="hud-link">
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </p>

      <JsonLd data={faqPageJsonLd(newsletterFaq)} />
    </div>
  );
}
