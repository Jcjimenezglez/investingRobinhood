import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: boolean;
  scanline?: boolean;
};

/** Blocks-style surface (kept HudPanel name for existing imports). */
export function HudPanel({
  className,
  accent = false,
  scanline: _scanline = false,
  children,
  ...props
}: SectionProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground",
        accent && "border-foreground/15",
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
        "flex flex-col gap-1 border-b border-border px-5 pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between",
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
