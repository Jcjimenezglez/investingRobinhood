import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
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
import { getTheses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investment theses",
  description: "Written investment memos before capital deployment.",
};

export default function ThesesPage() {
  const theses = getTheses();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-md border border-border">
          <FileText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Theses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Written before every BUY — quality, mispricing, catalyst, kill
            criteria.
          </p>
        </div>
      </div>

      <Card className="rounded-lg border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Investment memos
          </CardTitle>
          <CardDescription>{theses.length} documents</CardDescription>
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
              {theses.map((t) => (
                <TableRow key={t.slug}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {t.date}
                  </TableCell>
                  <TableCell>
                    <Link href={`/theses/${t.slug}/`}>
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
