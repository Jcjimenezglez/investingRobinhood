import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero, PageShell } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Not a newsletter",
  description: `${BRAND.name} is a public AI trading agent. The live Robinhood Agentic book is on the homepage — not a newsletter.`,
  path: "/newsletter/",
  noIndex: true,
});

export default function NewsletterRetiredPage() {
  return (
    <PageShell>
      <Hero
        title="This is not a newsletter"
        subtitle={`${BRAND.name} is a public AI swing-trading desk. Theses, the trading journal, and the live Agentic book are on the site — there is no waitlist.`}
        actions={
          <Button asChild size="lg">
            <Link href="/">
              Open the live book
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />
    </PageShell>
  );
}
