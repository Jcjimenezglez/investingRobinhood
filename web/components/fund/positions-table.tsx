import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/fund/decision-badge";
import { formatLedgerUsd } from "@/lib/display-money";
import type { Position } from "@/lib/types";

export function PositionsTable({
  positions,
  linkTickers = true,
}: {
  positions: Position[];
  linkTickers?: boolean;
}) {
  if (positions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No open positions.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Ticker</TableHead>
          <TableHead>Entry</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Conviction</TableHead>
          <TableHead className="text-right">Return</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((p) => (
          <TableRow key={p.ticker}>
            <TableCell className="font-medium">
              {linkTickers ? (
                <Link
                  href={`/trades/${p.ticker.toLowerCase()}/`}
                  className="hover:underline"
                >
                  {p.ticker}
                </Link>
              ) : (
                p.ticker
              )}
            </TableCell>
            <TableCell className="tabular-nums text-muted-foreground">
              ${p.entry_price.toFixed(2)}
              <span className="block text-xs">{p.entry_date}</span>
            </TableCell>
            <TableCell className="tabular-nums">
              {formatLedgerUsd(p.size_usd, { digits: 0 })}
            </TableCell>
            <TableCell>{p.conviction}</TableCell>
            <TableCell className="text-right font-medium tabular-nums">
              {p.return_pct !== null
                ? `${p.return_pct >= 0 ? "+" : ""}${p.return_pct.toFixed(2)}%`
                : "—"}
            </TableCell>
            <TableCell>
              <StatusBadge status={p.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
