import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-24 pb-8", className)}>{children}</div>;
}

export function MarketingSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  narrow = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-border pt-16 sm:pt-20",
        className,
      )}
    >
      <div className={cn(narrow ? "max-w-2xl" : "max-w-3xl", "space-y-4")}>
        {eyebrow && (
          <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        )}
        {title && (
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        )}
        {description && (
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </div>
        )}
      </div>
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  body,
  actions,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="space-y-8 pb-4 pt-2 sm:pt-6">
      {eyebrow}
      <div className="max-w-3xl space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
            {subtitle}
          </p>
        )}
        {body && (
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {body}
          </div>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </section>
  );
}
