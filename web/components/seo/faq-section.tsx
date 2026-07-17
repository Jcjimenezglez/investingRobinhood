import type { FaqItem } from "@/lib/site-config";

export function FaqSection({
  items,
  title = "Frequently Asked Questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2 id="faq-heading" className="text-label-14 text-foreground">
        {title}
      </h2>
      <dl className="grid gap-2">
        {items.map((item) => (
          <div key={item.question} className="surface-panel px-5 py-4">
            <dt className="text-label-14 text-foreground">{item.question}</dt>
            <dd className="mt-2 text-copy-14 text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
