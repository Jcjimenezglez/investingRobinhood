import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
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
import { getTheses } from "@/lib/content";
import { collectionPageJsonLd, pageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Investment theses",
  description:
    "Tapefund investment memos: written theses before every BUY covering business quality, mispricing, catalyst, and kill criteria.",
  path: "/theses/",
});

export default function ThesesPage() {
  const theses = getTheses();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center border border-border bg-card text-signal">
          <FileText className="size-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Theses</h1>
          <DirectAnswer className="mt-2">
            Every {BRAND.name} BUY starts with a full written memo — business
            quality, mispricing, catalyst, and kill criteria — published here
            before capital is deployed.
          </DirectAnswer>
        </div>
      </div>

      <Card className="border-border">
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

      <JsonLd
        data={collectionPageJsonLd({
          name: "Tapefund Investment Theses",
          description: "Written investment memos from the Tapefund AI fund.",
          path: "/theses/",
        })}
      />
    </div>
  );
}
