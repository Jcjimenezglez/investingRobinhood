import { cn } from "@/lib/utils";

/** GEO-friendly lead paragraph — self-contained, extractable by AI crawlers. */
export function DirectAnswer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-body max-w-2xl text-sm leading-relaxed tracking-normal text-muted-foreground sm:text-base",
        className,
      )}
      data-geo="direct-answer"
    >
      {children}
    </p>
  );
}
