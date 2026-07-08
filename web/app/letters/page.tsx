import type { Metadata } from "next";
import Link from "next/link";
import { getLetters } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investor letters",
  description:
    "Ackman-style letters to the limited partner documenting capital allocation decisions.",
};

export default function LettersPage() {
  const letters = getLetters();

  return (
    <>
      <header className="page-header">
        <h1>Investor letters</h1>
        <p>
          Major allocation decisions explained like a hedge fund letter — thesis,
          catalyst, and risk.
        </p>
      </header>

      <ul className="card-list">
        {letters.map((l) => (
          <li key={l.slug}>
            <Link href={`/letters/${l.slug}/`}>
              <strong>{l.title}</strong>
              <span className="meta">{l.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
