import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  LineChart,
  Mail,
  Newspaper,
} from "lucide-react";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { StatCard } from "@/components/fund/stat-card";
import {
  Hero,
  MarketingSection,
  PageShell,
} from "@/components/marketing/section";
import { FaqSection } from "@/components/seo/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getFundSnapshot } from "@/lib/content";
import { formatLedgerUsd, formatStartingNav } from "@/lib/display-money";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND, SITE_FAQ } from "@/lib/site-config";
import { DollarSign, Percent } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Stock Newsletter with Live Track Record vs S&P 500",
  description:
    "Most stock newsletters sell tips without a scoreboard. Tapefund publishes a live track record vs the S&P 500 — then a Stock Advisor–style letter for full theses and weekly picks. Join the waitlist.",
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
  "Open positions on the public book",
  "Daily CIO journal entries",
  "Weekly performance versus SPY",
];

const paidItems = [
  "Full investment theses (not just the ticker)",
  "Weekly picks commentary and sizing rationale",
  "Kill criteria and catalyst notes",
  "Deeper investor-letter style writeups",
];

export default function NewsletterPage() {
  const snapshot = getFundSnapshot();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <PageShell>
      <Hero
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            Stock newsletter · waitlist opening soon
          </div>
        }
        title={
          <>
            Tips without a track record are just noise.
            <span className="mt-3 block text-muted-foreground">
              This letter starts with proof.
            </span>
          </>
        }
        subtitle="A Stock Advisor–style newsletter backed by a live public book measured against the S&P 500."
        body={
          <>
            <p>
              The internet is full of stock picks. Almost none of them show you
              a live portfolio, daily decisions, and an honest comparison to
              SPY. That is the gap Tapefund fills.
            </p>
            <p>
              Use the free site to see whether the process is working. Join the
              waitlist for the letter — full theses and weekly commentary when
              email capture opens.
            </p>
          </>
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#waitlist">
                Join the waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#proof">Inspect the live book</Link>
            </Button>
          </>
        }
      />

      <MarketingSection
        id="why"
        eyebrow="Why this exists"
        title="You should not have to trust a stranger’s tip"
        description={
          <>
            <p>
              Traditional stock newsletters ask you to pay for recommendations
              first and believe the marketing chart later. Tapefund flips that:
              the track record is public. The letter adds depth for people who
              want the full thesis — not another anonymous “buy list.”
            </p>
            <p>
              If you already manage money for yourself or want a clearer
              process than scrolling feeds, the scoreboard is the product you
              can evaluate today.
            </p>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: LineChart,
              title: "Measured vs SPY",
              body: "Performance is only interesting next to the market. Weekly scorecards keep that comparison honest.",
            },
            {
              icon: Newspaper,
              title: "Thesis before capital",
              body: "No buy without a written memo: business quality, mispricing, catalyst, and kill criteria.",
            },
            {
              icon: Mail,
              title: "Letter for depth",
              body: "The waitlist is for full writeups and weekly commentary once email capture is live.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <item.icon
                className="size-5 text-muted-foreground"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection
        id="proof"
        eyebrow="Live numbers"
        title="Same book the letter will explain"
        description={
          <p>
            Since {BRAND.inceptionDate}, starting {formatStartingNav()}. Current
            NAV {formatLedgerUsd(snapshot.nav, { digits: 2 })} ({returnLabel}).
            Not investment advice — a public record you can inspect.
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            sub="Concentrated names"
            icon={LineChart}
          />
          <StatCard
            title="Benchmark"
            value="vs SPY"
            sub="See Performance page"
            icon={Mail}
          />
        </div>
      </MarketingSection>

      <MarketingSection
        id="free-vs-letter"
        eyebrow="What you get"
        title="Free scoreboard. Letter for the full why."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold tracking-tight">
              Free on Tapefund.com
            </h3>
            <ul className="mt-4 space-y-3">
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
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-semibold tracking-tight">
              Coming in the newsletter
            </h3>
            <ul className="mt-4 space-y-3">
              {paidItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        id="waitlist"
        eyebrow="Waitlist"
        title="Be first when email capture opens"
        description={
          <p>
            We are not collecting emails yet. Leave this page bookmarked — the
            form below will go live when the waitlist is ready. No spam, no
            fake “you are subscribed” message.
          </p>
        }
      >
        <div className="max-w-xl rounded-xl border border-border bg-card p-6">
          <WaitlistForm />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/performance/">Performance vs SPY</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/trades/">Open positions</Link>
            </Button>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        id="disclaimer"
        eyebrow="Disclaimer"
        title="Read this before you join"
        description={
          <p>
            Nothing on Tapefund is investment advice, a solicitation, or a
            recommendation to buy or sell any security. Past performance does
            not guarantee future results. The public track record documents a
            concentrated experimental book.
          </p>
        }
      />

      <MarketingSection id="faq" eyebrow="FAQ" title="Newsletter questions">
        <FaqSection items={newsletterFaq} title="Common questions" />
        <Link
          href="/faq/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          View all FAQ
          <ArrowRight className="size-3.5" />
        </Link>
      </MarketingSection>

      <JsonLd data={faqPageJsonLd(newsletterFaq)} />
    </PageShell>
  );
}
