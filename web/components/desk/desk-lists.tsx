"use client";

import Link from "next/link";
import { useState } from "react";
import { money2, signedMoney2, signedPct, toneClass } from "@/lib/display-money";
import type { ImprovementItem, Position, TradeReason } from "@/lib/types";

function Actions({
  showing,
  total,
  remaining,
  batch,
  noun,
  onMore,
}: {
  showing: number;
  total: number;
  remaining: number;
  batch: number;
  noun: string;
  onMore: () => void;
}) {
  return (
    <div className="closed-actions">
      <div className="muted">
        Showing {showing} of {total} {noun}.
      </div>
      {remaining > 0 && (
        <button className="show-more" type="button" onClick={onMore}>
          Show {Math.min(batch, remaining)} more
        </button>
      )}
    </div>
  );
}

export function ReasonList({ items }: { items: TradeReason[] }) {
  const batch = 3;
  const [visible, setVisible] = useState(batch);
  const showing = items.slice(0, visible);
  if (!items.length) return <div className="muted">No executed trade reasoning yet.</div>;
  return (
    <>
      {showing.map((t) => (
        <article className="reason-card" key={t.ticker + t.date}>
          <div className="reason-top">
            <div>
              <h3>{t.title}</h3>
              <div className="muted">
                {t.date} · {t.side} · {money2(t.amountUsd)}
              </div>
            </div>
            <span className="pill">{t.ticker}</span>
          </div>
          <div className="reason-simple">{t.simple}</div>
          <ul>
            {t.technical.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="risk-line">{t.risk}</div>
        </article>
      ))}
      <Actions
        showing={showing.length}
        total={items.length}
        remaining={items.length - showing.length}
        batch={batch}
        noun="trade decisions"
        onMore={() => setVisible((n) => n + batch)}
      />
    </>
  );
}

export function ClosedList({ items }: { items: Position[] }) {
  const batch = 10;
  const [visible, setVisible] = useState(batch);
  const showing = items.slice(0, visible);
  if (!items.length) return <div className="muted">No closed trades yet.</div>;
  return (
    <>
      {showing.map((p) => {
        const pnl = p.size_usd * ((p.return_pct ?? 0) / 100);
        return (
          <div className="closed-row" key={p.ticker + (p.exit_date ?? "")}>
            <div>
              <strong>{p.ticker}</strong>
              <div className="muted">Closed {p.exit_date ?? "n/a"}</div>
            </div>
            <div className={toneClass(pnl)}>{signedMoney2(pnl)}</div>
            <div className={toneClass(p.return_pct)}>
              {p.return_pct == null ? "n/a" : signedPct(p.return_pct)}
            </div>
          </div>
        );
      })}
      <Actions
        showing={showing.length}
        total={items.length}
        remaining={items.length - showing.length}
        batch={batch}
        noun="closed results, newest first"
        onMore={() => setVisible((n) => n + batch)}
      />
    </>
  );
}

export function ImprovementList({ items }: { items: ImprovementItem[] }) {
  const batch = 6;
  const [visible, setVisible] = useState(batch);
  const showing = items.slice(0, visible);
  if (!items.length) return <div className="muted">No public improvement log entries yet.</div>;
  return (
    <>
      {showing.map((item) => (
        <article className="improvement-card" key={item.slug}>
          <div>
            <div className="improvement-date">{item.date}</div>
            <span className={`improvement-status ${item.status}`}>
              {item.status}
            </span>
          </div>
          <div>
            <h3>
              <Link href={`/letters/${item.slug}/`}>{item.title}</Link>
            </h3>
            <p>{item.summary}</p>
            {item.why ? <p className="why">Why it matters: {item.why}</p> : null}
          </div>
        </article>
      ))}
      <Actions
        showing={showing.length}
        total={items.length}
        remaining={items.length - showing.length}
        batch={batch}
        noun="logged improvements"
        onMore={() => setVisible((n) => n + batch)}
      />
    </>
  );
}
