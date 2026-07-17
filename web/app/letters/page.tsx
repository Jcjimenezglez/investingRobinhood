import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ScrollText } from "lucide-react";
import { DirectAnswer } from "@/components/seo/direct-answer";
import { JsonLd } from "@/components/seo/json-ld";
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
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Investor letters",
  description:
    "Tapefund investor letters: Ackman-style write-ups documenting major capital allocation decisions and portfolio changes.",
  path: "/letters/",
});

export default function LettersPage() {
  const letters = getLetters();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <ScrollText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Investor letters
          </h1>
          <DirectAnswer className="mt-2">
            {BRAND.name} publishes Ackman-style investor letters when major
            allocation decisions are made — explaining the thesis, sizing, and
            portfolio context in long form.
          </DirectAnswer>
        </div>
      </div>

      <Card className="border-border">
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

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund Investor Letters",
          description: "Investor letters from the Tapefund AI fund.",
          path: "/letters/",
        })}
      />
    </div>
  );
}
