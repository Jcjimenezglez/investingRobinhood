import { LucideIcon } from "lucide-react";
import { HudPanel } from "@/components/ui/hud-panel";
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
    <HudPanel
      accent={accent}
      className={cn("px-4 py-4 transition-colors hover:border-signal/40", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="hud-label">{title}</span>
        <Icon className="size-4 text-signal" strokeWidth={1.5} />
      </div>
      <div className="hud-value mt-3 text-2xl text-foreground sm:text-[1.7rem]">
        {value}
      </div>
      {sub && (
        <p className="mt-2 font-data text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {sub}
        </p>
      )}
    </HudPanel>
  );
}
