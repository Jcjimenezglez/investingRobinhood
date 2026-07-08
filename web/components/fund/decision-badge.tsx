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
        "rounded-sm border-foreground/20 font-mono text-[10px] uppercase tracking-wider",
        d === "HOLD" && "bg-muted text-foreground",
        d === "BUY" && "border-foreground bg-foreground text-background",
        d === "SELL" && "border-foreground bg-background text-foreground",
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
  return (
    <Badge
      variant="outline"
      className="rounded-sm font-mono text-[10px] uppercase tracking-wider"
    >
      {status}
    </Badge>
  );
}
