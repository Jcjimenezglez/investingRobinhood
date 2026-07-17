import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  className,
  accent = false,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[6px] border border-border bg-card p-5 shadow-[var(--ds-shadow-card)]",
        accent && "border-foreground/25",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-label-13 text-muted-foreground">{title}</span>
        <Icon
          className={cn(
            "size-4 text-muted-foreground",
            accent && "text-foreground",
          )}
          strokeWidth={1.5}
        />
      </div>
      <div className="mt-3 font-data text-[28px] font-semibold tracking-tight text-foreground">
        {value}
      </div>
      {sub && <p className="mt-1.5 text-[12px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
