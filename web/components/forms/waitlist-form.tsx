import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WaitlistFormProps = {
  className?: string;
  /** Shown under the CTA — keep honest: we are not saving emails yet. */
  note?: string;
};

/**
 * Waitlist UI only — no backend / Resend yet.
 * Email field is disabled so we never pretend to capture addresses.
 */
export function WaitlistForm({
  className,
  note = "Waitlist opens soon. We are not collecting emails yet — check back here.",
}: WaitlistFormProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="waitlist-email">
          Email
        </label>
        <div className="relative min-w-0 flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="waitlist-email"
            type="email"
            name="email"
            disabled
            placeholder="you@email.com"
            autoComplete="email"
            aria-disabled="true"
            className="h-10 w-full border border-border bg-background/50 pl-10 pr-3 font-data text-sm text-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>
        <Button type="button" disabled className="h-10 shrink-0 font-data uppercase tracking-[0.14em]">
          Join waitlist — opening soon
        </Button>
      </div>
      <p className="font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {note}
      </p>
    </div>
  );
}
