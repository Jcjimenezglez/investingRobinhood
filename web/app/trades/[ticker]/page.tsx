import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PositionsTable } from "@/components/fund/positions-table";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTickerHistory, getTickers } from "@/lib/content";
import { formatLedgerUsd } from "@/lib/display-money";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export function generateStaticParams() {
  return getTickers().map((ticker) => ({ ticker: ticker.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();
  const { position, journalMentions, theses } = getTickerHistory(ticker);
  const status = position
    ? position.status === "open"
      ? `open ${formatLedgerUsd(position.size_usd, { digits: 0 })} position (${position.conviction} conviction)`
      : "closed position history"
    : "journal and thesis mentions";
  return pageMetadata({
    title: `${upper} — Tapefund position & thesis`,
    description: `${BRAND.name} track record for ${upper}: ${status}, investment theses, fair value targets, and ${journalMentions.length} journal mention(s).`,
    path: `/trades/${ticker}/`,
  });
}

export default async function TickerPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();
  const { position, journalMentions, theses } = getTickerHistory(ticker);

  if (!position && journalMentions.length === 0 && theses.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <TrendingUp className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{upper}</h1>
          <DirectAnswer className="mt-2 text-sm text-muted-foreground">
            {BRAND.name} history for {upper}: current position, linked
            investment theses, and every CIO journal mention — updated from live
            Agentic account data.
          </DirectAnswer>
        </div>
      </div>

      {position && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Position</CardTitle>
          </CardHeader>
          <CardContent>
            <PositionsTable positions={[position]} linkTickers={false} />
            <Separator className="my-4" />
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {position.fair_value_low && position.fair_value_high && (
                <div>
                  <dt className="text-muted-foreground">Fair value</dt>
                  <dd className="font-medium tabular-nums">
                    ${position.fair_value_low}–${position.fair_value_high}
                  </dd>
                </div>
              )}
              {position.stop_backup && (
                <div>
                  <dt className="text-muted-foreground">Stop backup</dt>
                  <dd className="font-medium tabular-nums">
                    ${position.stop_backup.toFixed(2)}
                  </dd>
                </div>
              )}
              {position.catalyst_date && (
                <div>
                  <dt className="text-muted-foreground">Catalyst</dt>
                  <dd className="font-medium">{position.catalyst_date}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      )}

      {theses.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Theses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {theses.map((t) => (
              <Link
                key={t.slug}
                href={`/theses/${t.slug}/`}
                className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:bg-muted/50"
              >
                <span>{t.title}</span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {journalMentions.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Journal mentions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalMentions.map((m) => (
                  <TableRow key={`${m.date}-${m.session}`}>
                    <TableCell className="tabular-nums">{m.date}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {m.session}
                    </TableCell>
                    <TableCell>
                      <Link href={`/journal/${m.date}/`}>
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Trades", path: "/trades/" },
          { name: upper, path: `/trades/${ticker}/` },
        ])}
      />
    </div>
  );
}
