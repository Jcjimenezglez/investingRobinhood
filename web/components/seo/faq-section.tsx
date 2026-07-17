import type { FaqItem } from "@/lib/site-config";

export function FaqSection({
  items,
  title = "Frequently asked questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2
        id="faq-heading"
        className="text-[15px] font-medium tracking-tight text-foreground"
      >
        {title}
      </h2>
      <dl className="grid gap-2">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-lg border border-border bg-card/80 px-5 py-4 transition-colors duration-200 hover:border-foreground/15"
          >
            <dt className="text-sm font-medium tracking-tight">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
