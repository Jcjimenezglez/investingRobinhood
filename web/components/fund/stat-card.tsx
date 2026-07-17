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
        "rounded-xl border border-border bg-card p-5",
        accent && "border-foreground/20",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
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
