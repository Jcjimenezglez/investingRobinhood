import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PositionsTable } from "@/components/fund/positions-table";
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
import { getTickerHistory, getTickers, SITE } from "@/lib/content";

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
  return {
    title: `${upper} — position history`,
    alternates: { canonical: `${SITE.url}/trades/${ticker}/` },
  };
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
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <TrendingUp className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{upper}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Position, theses, and journal mentions
          </p>
        </div>
      </div>

      {position && (
        <Card className="rounded-lg border-border shadow-none">
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
        <Card className="rounded-lg border-border shadow-none">
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
        <Card className="rounded-lg border-border shadow-none">
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
    </div>
  );
}
