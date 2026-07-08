import type { Metadata } from "next";
import Link from "next/link";
import { getTheses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investment theses",
  description:
    "Written investment memos before capital deployment — Ackman-style thesis documents from investingRobinhood.",
};

export default function ThesesPage() {
  const theses = getTheses();

  return (
    <>
      <header className="page-header">
        <h1>Investment theses</h1>
        <p>
          Every BUY is preceded by a written memo: business quality, mispricing,
          catalyst, and kill criteria.
        </p>
      </header>

      <ul className="card-list">
        {theses.map((t) => (
          <li key={t.slug}>
            <Link href={`/theses/${t.slug}/`}>
              <strong>{t.title}</strong>
              <span className="meta">{t.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
