import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-16 pb-8 sm:space-y-20", className)}>
      {children}
    </div>
  );
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
      className={cn("scroll-mt-20 border-t border-border pt-10 sm:pt-14", className)}
    >
      <div
        className={cn(
          narrow ? "max-w-2xl" : "max-w-3xl",
          title || description ? "space-y-2" : "",
        )}
      >
        {eyebrow && (
          <p className="text-label-13 text-muted-foreground">{eyebrow}</p>
        )}
        {title && <h2 className="text-heading-24 text-foreground">{title}</h2>}
        {description && (
          <div className="space-y-3 text-copy-14 text-muted-foreground sm:text-copy-16">
            {description}
          </div>
        )}
      </div>
      {children && (
        <div className={cn((title || description) && "mt-6")}>{children}</div>
      )}
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
    <section className="space-y-6 pb-2 pt-4 sm:pt-8">
      {eyebrow}
      <div className="max-w-2xl space-y-4">
        <h1 className="text-heading-40 text-foreground sm:text-heading-48">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-xl text-copy-16 text-muted-foreground sm:text-[20px] sm:leading-relaxed">
            {subtitle}
          </p>
        )}
        {body && (
          <div className="max-w-xl space-y-3 text-copy-14 text-muted-foreground">
            {body}
          </div>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </section>
  );
}
