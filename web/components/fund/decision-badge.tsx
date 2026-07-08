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
        "rounded-none border-border font-data text-[10px] uppercase tracking-[0.16em]",
        d === "HOLD" && "border-violet/50 bg-violet/10 text-violet",
        d === "BUY" && "border-signal/60 bg-signal/15 text-signal",
        d === "SELL" && "border-foreground/40 bg-foreground/5 text-foreground",
        className,
      )}
    >
      {d}
    </Badge>
  );
}

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const s = status.toLowerCase();
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-none font-data text-[10px] uppercase tracking-[0.16em]",
        s === "open" && "border-signal/50 bg-signal/10 text-signal",
        s !== "open" && "border-border text-muted-foreground",
      )}
    >
      {status}
    </Badge>
  );
}
