import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
  fullBleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Landing pages that own their own width / full-bleed hero. */
  fullBleed?: boolean;
}) {
  if (fullBleed) {
    return <div className={cn("pb-16 sm:pb-24", className)}>{children}</div>;
  }
  return (
    <div
      className={cn("container-page space-y-10 py-10 sm:py-16", className)}
    >
      {children}
    </div>
  );
}

export function ContentWidth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
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
        "scroll-mt-20 border-t border-border py-16 sm:py-24",
        className,
      )}
    >
      <ContentWidth>
        <div
          className={cn(
            narrow ? "max-w-2xl" : "max-w-3xl",
            title || description ? "space-y-3" : "",
          )}
        >
          {eyebrow && (
            <p className="text-label-13 text-muted-foreground">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-heading-24 text-foreground sm:text-heading-32">
              {title}
            </h2>
          )}
          {description && (
            <div className="max-w-2xl space-y-4 text-copy-16 text-muted-foreground">
              {description}
            </div>
          )}
        </div>
        {children && (
          <div className={cn((title || description) && "mt-10")}>
            {children}
          </div>
        )}
      </ContentWidth>
    </section>
  );
}

export function LandingHero({
  brand,
  title,
  subtitle,
  actions,
  imageSrc,
  imageAlt,
}: {
  brand: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate min-h-[min(92vh,860px)] overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
      </div>

      <ContentWidth className="flex min-h-[min(92vh,860px)] flex-col justify-end pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="max-w-2xl space-y-6">
          <p className="animate-fade-up text-[13px] font-medium tracking-tight text-muted-foreground">
            Live public track record
          </p>
          <h1 className="animate-fade-up font-display text-[3.25rem] font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
            {brand}
          </h1>
          <div className="animate-fade-up max-w-lg space-y-3">
            <p className="text-[1.25rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.35rem]">
              {title}
            </p>
            <p className="text-copy-16 text-muted-foreground sm:text-[1.05rem] sm:leading-relaxed">
              {subtitle}
            </p>
          </div>
          {actions && (
            <div className="animate-fade-up flex flex-wrap gap-3 pt-2">
              {actions}
            </div>
          )}
        </div>
      </ContentWidth>
    </section>
  );
}

/** Compact page hero for interior routes. */
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
    <section className="space-y-6 pb-2 pt-2 sm:pt-4">
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
