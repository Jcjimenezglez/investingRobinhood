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
        "group rounded-lg border border-border bg-card/80 p-5 transition-colors duration-200 hover:border-foreground/15",
        accent && "border-violet/30 bg-violet/[0.04]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] text-muted-foreground">{title}</span>
        <Icon
          className={cn(
            "size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground",
            accent && "text-violet",
          )}
          strokeWidth={1.5}
        />
      </div>
      <div className="mt-3 font-data text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
        {value}
      </div>
      {sub && (
        <p className="mt-1.5 text-xs text-muted-foreground">{sub}</p>
      )}
    </div>
  );
}
