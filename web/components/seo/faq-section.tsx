import type { FaqItem } from "@/lib/site-config";
import { HudPanel } from "@/components/ui/hud-panel";

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
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        {title}
      </h2>
      <dl className="grid gap-3">
        {items.map((item) => (
          <HudPanel key={item.question} className="px-5 py-4">
            <dt className="text-sm font-semibold tracking-tight">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </HudPanel>
        ))}
      </dl>
    </section>
  );
}
