import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DecisionBadge({
  decision,
  className,
}: {
  decision: string | null | undefined;
  className?: string;
}) {
  if (!decision) return null;
  const d = decision.toUpperCase();
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border-border text-xs font-medium",
        d === "HOLD" && "bg-muted text-muted-foreground",
        d === "BUY" && "border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
        d === "SELL" && "border-foreground/20 bg-foreground/5 text-foreground",
        className,
      )}
    >
      {d}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md text-xs font-medium capitalize",
        s === "open" &&
          "border-emerald-600/30 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
        s !== "open" && "border-border text-muted-foreground",
      )}
    >
      {status}
    </Badge>
  );
}
