import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="container-page space-y-4 py-10">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Disclaimer.</span> This
          site documents an experimental AI trading agent on a small Robinhood
          Agentic account. Not investment advice. Past performance does not
          guarantee future results.
        </p>
        <Separator />
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <Link href="/methodology/" className="hover:text-foreground">
            Methodology
          </Link>
        </div>
      </div>
    </footer>
  );
}
