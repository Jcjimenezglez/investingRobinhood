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
      <div>
        <p className="hud-label">Protocol</p>
        <h2
          id="faq-heading"
          className="hud-title mt-1 text-lg tracking-[0.12em]"
        >
          {title}
        </h2>
      </div>
      <dl className="grid gap-3">
        {items.map((item, index) => (
          <HudPanel key={item.question} className="px-4 py-4">
            <dt className="flex items-start gap-3">
              <span className="font-data text-[10px] text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {item.question}
              </span>
            </dt>
            <dd className="mt-2 pl-8 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </HudPanel>
        ))}
      </dl>
    </section>
  );
}
