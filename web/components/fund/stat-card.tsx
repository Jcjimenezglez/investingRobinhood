import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  className,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Card className={cn("rounded-lg border-border shadow-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </div>
        {sub && (
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">{sub}</p>
        )}
      </CardContent>
    </Card>
  );
}
