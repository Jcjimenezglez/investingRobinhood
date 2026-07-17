import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import {
  LandingHero,
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

export const metadata: Metadata = pageMetadata({
  title: "Stock Newsletter with Live Track Record vs S&P 500",
  description:
    "Tapefund newsletter waitlist — Stock Advisor–style picks backed by a live public track record vs the S&P 500.",
  path: "/newsletter/",
});

const newsletterFaq = SITE_FAQ.filter((item) =>
  [
    "What is the Tapefund newsletter?",
    "What is free vs what is for the waitlist?",
    "Is Tapefund investment advice?",
  ].includes(item.question),
);

const freeItems = [
  "Live NAV and return since inception",
  "Open positions and trade history",
  "Daily CIO journal",
  "Weekly performance vs SPY",
];

const letterItems = [
  "Full investment theses",
  "Weekly picks commentary",
  "Sizing rationale",
  "Kill criteria and updates",
];

export default function NewsletterPage() {
  const snapshot = getFundSnapshot();
  const returnLabel = `${snapshot.returnPct >= 0 ? "+" : ""}${snapshot.returnPct.toFixed(2)}%`;

  return (
    <PageShell fullBleed>
      <LandingHero
        brand={BRAND.name}
        title="The stock newsletter behind the public book."
        subtitle="Join the waitlist for full theses and weekly picks — while the free scoreboard keeps NAV, positions, and vs-SPY performance open to everyone."
        imageSrc="/images/newsletter-desk.jpg"
        imageAlt="Research desk with laptop and notebook"
        actions={
          <>
            <Button asChild size="lg">
              <Link href="#waitlist">
                Join Waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#proof">View Scoreboard</Link>
            </Button>
          </>
        }
      />

      <MarketingSection
        title="Why a letter on top of a live book"
        description={
          <>
            <p>
              Anyone can browse Tapefund&apos;s scoreboard. The newsletter is for
              readers who want the memo — the same concentrated process, written
              out before the trade and revisited when the thesis changes.
            </p>
            <p>
              Right now the public book shows{" "}
              <span className="font-data text-foreground">
                {formatLedgerUsd(snapshot.nav, { digits: 2 })}
              </span>{" "}
              NAV and{" "}
              <span className="font-data text-foreground">{returnLabel}</span>{" "}
              since {formatStartingNav()}, with {snapshot.positions} open names
              versus SPY.
            </p>
          </>
        }
      />

      <MarketingSection
        eyebrow="What you get"
        title="Free on the site. Deeper in the letter."
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-heading-20 text-foreground">On the site</h3>
            <p className="mt-2 text-copy-14 text-muted-foreground">
              Always free. The public track record.
            </p>
            <ul className="mt-6 space-y-3">
              {freeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-copy-16 text-muted-foreground"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-foreground"
                    strokeWidth={1.75}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-heading-20 text-foreground">In the newsletter</h3>
            <p className="mt-2 text-copy-14 text-muted-foreground">
              Coming via waitlist. The full memo.
            </p>
            <ul className="mt-6 space-y-3">
              {letterItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-copy-16 text-muted-foreground"
                >
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        id="waitlist"
        eyebrow="Waitlist"
        title="Get on the list"
        description={
          <p>
            We are not collecting emails yet. Leave this page bookmarked — the
            form unlocks when the letter is ready to ship.
          </p>
        }
      >
        <div className="max-w-lg">
          <WaitlistForm />
        </div>
      </MarketingSection>

      <MarketingSection title="FAQ">
        <FaqSection items={newsletterFaq} title="Questions" />
      </MarketingSection>

      <div className="container-page pb-8">
        <p className="text-[12px] text-muted-foreground">
          Not investment advice. Past performance does not guarantee future
          results.
        </p>
      </div>

      <JsonLd data={faqPageJsonLd(newsletterFaq)} />
    </PageShell>
  );
}
