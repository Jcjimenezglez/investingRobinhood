import { cn } from "@/lib/utils";

type HudPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: boolean;
  scanline?: boolean;
};

export function HudPanel({
  className,
  accent = false,
  scanline = false,
  children,
  ...props
}: HudPanelProps) {
  return (
    <div
      className={cn(
        "hud-panel",
        accent && "hud-panel-accent",
        scanline && "hud-scanline",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HudPanelHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-border/80 px-5 pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HudPanelBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-5", className)} {...props}>
      {children}
    </div>
  );
}
