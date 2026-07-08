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
      className={
        className ??
        "max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      }
      data-geo="direct-answer"
    >
      {children}
    </p>
  );
}
