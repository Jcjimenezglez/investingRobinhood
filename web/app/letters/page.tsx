import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ScrollText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLetters } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investor letters",
  description: "Ackman-style letters documenting capital allocation decisions.",
};

export default function LettersPage() {
  const letters = getLetters();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <ScrollText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Investor letters
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Major allocations explained like a hedge fund letter.
          </p>
        </div>
      </div>

      <Card className="rounded-lg border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Letters</CardTitle>
          <CardDescription>{letters.length} published</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {letters.map((l) => (
                <TableRow key={l.slug}>
                  <TableCell className="font-medium">{l.title}</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {l.date}
                  </TableCell>
                  <TableCell>
                    <Link href={`/letters/${l.slug}/`}>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
