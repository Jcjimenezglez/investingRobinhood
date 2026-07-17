import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DecisionBadge } from "@/components/fund/decision-badge";
import { formatLedgerUsd } from "@/lib/display-money";
import type { JournalDay } from "@/lib/types";

export function JournalTable({ days }: { days: JournalDay[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Date</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead className="text-right">NAV</TableHead>
          <TableHead>Sessions</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {days.map((day) => (
          <TableRow key={day.date}>
            <TableCell className="font-medium tabular-nums">{day.date}</TableCell>
            <TableCell>
              <DecisionBadge decision={day.decision} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {day.nav ? formatLedgerUsd(day.nav, { digits: 2 }) : "—"}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {day.sessions.length}
            </TableCell>
            <TableCell>
              <Link
                href={`/journal/${day.date}/`}
                className="inline-flex text-muted-foreground hover:text-foreground"
                aria-label={`Open journal ${day.date}`}
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
