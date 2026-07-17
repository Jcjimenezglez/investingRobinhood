import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-16 pb-8 sm:space-y-24", className)}>
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
      className={cn("scroll-mt-24 pt-2 sm:pt-4", className)}
    >
      <div
        className={cn(
          narrow ? "max-w-2xl" : "max-w-3xl",
          title || description ? "space-y-2" : "",
        )}
      >
        {eyebrow && (
          <p className="text-[13px] font-medium text-violet">{eyebrow}</p>
        )}
        {title && (
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
            {title}
          </h2>
        )}
        {description && (
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {description}
          </div>
        )}
      </div>
      {children && (
        <div className={cn((title || description) && "mt-8")}>{children}</div>
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
    <section className="space-y-7 pb-4 pt-6 sm:pt-10">
      <div className="animate-fade-up">{eyebrow}</div>
      <div className="animate-fade-up-delay max-w-2xl space-y-4">
        <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        )}
        {body && (
          <div className="max-w-xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {body}
          </div>
        )}
      </div>
      {actions && (
        <div className="animate-fade-up-delay flex flex-wrap gap-3">
          {actions}
        </div>
      )}
    </section>
  );
}
