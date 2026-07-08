import type { Metadata } from "next";
import {
  BookOpen,
  FileText,
  LineChart,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How investingRobinhood invests: Ackman-style concentration and thesis-driven entries.",
  alternates: { canonical: `${SITE.url}/methodology/` },
};

const pillars = [
  {
    icon: FileText,
    title: "Thesis before capital",
    body: "Every BUY requires a written memo: business quality, mispricing, catalyst, kill criteria.",
  },
  {
    icon: Target,
    title: "Concentration by conviction",
    body: "Up to 50% of the ~$100 fund in one high-conviction idea. Cash minimum 10%.",
  },
  {
    icon: Shield,
    title: "Exit on thesis break",
    body: "Sell when the case fails or fair value is reached — not on a calendar or profit target.",
  },
  {
    icon: BookOpen,
    title: "Daily CIO cycle",
    body: "Automated runbook at premarket, open, and intraday. Each session is published.",
  },
  {
    icon: Zap,
    title: "Ackman confluence",
    body: "13F overlap adds conviction; independent thesis required when Ackman exits a name.",
  },
  {
    icon: LineChart,
    title: "Agentic account only",
    body: "All trades on Robinhood Agentic beta via MCP. Small AUM, full transparency.",
  },
];

const universe = [
  "GOOGL",
  "HOOD",
  "AMZN",
  "META",
  "AAPL",
  "MSFT",
  "NVDA",
  "UBER",
  "QSR",
  "BN",
];

export default function MethodologyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Methodology</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A concentrated, thesis-driven AI fund — not day trading, not passive
          index hold.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => (
          <Card
            key={p.title}
            className="rounded-lg border-border shadow-none"
          >
            <CardHeader className="pb-2">
              <div className="mb-2 flex size-9 items-center justify-center rounded-md border border-border">
                <p.icon className="size-4" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-sm font-semibold">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {p.body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Research universe
        </h2>
        <p className="mt-3 font-mono text-sm">{universe.join(" · ")}</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Published daily
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>Journal — CIO cycles with NAV and HOLD/BUY/SELL decisions</li>
          <li>Trades & theses — entries, sizing, full memos</li>
          <li>Weekly performance — NAV scorecard vs SPY</li>
          <li>Investor letters — major allocation decisions</li>
        </ul>
      </div>
    </div>
  );
}
