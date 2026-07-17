import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WaitlistFormProps = {
  className?: string;
  note?: string;
};

/** Waitlist UI only — no backend yet. */
export function WaitlistForm({
  className,
  note = "Waitlist opens soon. We are not collecting emails yet.",
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
            className="h-10 w-full rounded-lg border border-border bg-background/80 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        <Button type="button" disabled className="h-10 shrink-0 rounded-full">
          Join waitlist — opening soon
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
