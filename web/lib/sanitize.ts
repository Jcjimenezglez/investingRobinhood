/**
 * Redact private / operational data before publishing logs to the public site.
 * Build fails if forbidden patterns survive sanitization (see scripts/verify-public-content.mjs).
 */

const INTERNAL_SECTIONS = [
  "## Pre-flight",
  "## Check loop",
  "## Ejecución",
];

/** Patterns that must never appear on the public site after sanitization. */
export const FORBIDDEN_PATTERNS: { name: string; pattern: RegExp }[] = [
  { name: "robinhood_account_id", pattern: /\b879823029\b/ },
  { name: "masked_account_suffix", pattern: /••••\d{4}/ },
  { name: "order_uuid", pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i },
  { name: "email", pattern: /@[a-z0-9.-]+\.[a-z]{2,}/i },
  { name: "lp_personal_reference", pattern: /your reported/i },
  { name: "lp_you_already", pattern: /\byou already\b/i },
  { name: "kevin_xu_name", pattern: /kevin\s*xu/i },
  { name: "kevinxu_handle", pattern: /@kevinxu/i },
  { name: "bare_xu", pattern: /\bXu\b/ },
  { name: "kevin_xu_slug", pattern: /kevin-xu/i },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripInternalSections(content: string): string {
  let result = content;
  for (const header of INTERNAL_SECTIONS) {
    const regex = new RegExp(
      `${escapeRegex(header)}[\\s\\S]*?(?=\\n---\\n|\\n## |$)`,
      "g",
    );
    result = result.replace(regex, "");
  }
  return result.replace(/\n---\n(\s*\n---\n)+/g, "\n---\n");
}

function redactAttribution(content: string): string {
  return (
    content
      .replace(/@kevinxu/gi, "")
      .replace(/Kevin Xu's/gi, "the all-in")
      .replace(/Kevin Xu/gi, "all-in")
      .replace(/kevin-xu/gi, "all-in")
      .replace(/Xu-style/gi, "all-in")
      .replace(/Xu-filtered/gi, "all-in")
      .replace(/Xu filter/gi, "all-in rules")
      .replace(/Xu swing/gi, "all-in swing")
      .replace(/Xu book/gi, "all-in book")
      .replace(/Xu rules/gi, "all-in rules")
      .replace(/Xu mandate/gi, "all-in mandate")
      .replace(/Xu setup/gi, "all-in setup")
      .replace(/Xu pass/gi, "all-in pass")
      .replace(/Xu already/gi, "the desk already")
      .replace(/Xu would/gi, "the desk would")
      .replace(/Xu does/gi, "the desk does")
      .replace(/Xu is /gi, "the desk is ")
      .replace(/Xu:\s*/g, "")
      .replace(/\bXu\b/g, "all-in")
  );
}

function redactLinePatterns(content: string): string {
  return redactAttribution(
    content
      // Account identifiers
      .replace(/••••\d{4}/g, "[account]")
      .replace(/\b879823029\b/g, "[account]")
      .replace(
        /Agentic\s*(?:••••\d{4}|\[account\]|\d{6,})?/gi,
        "Agentic account",
      )
      .replace(
        /\|\s*Cuenta Agentic[^\n]*/gi,
        "| Cuenta Agentic | ✅ verified |",
      )
      .replace(/get_accounts\s*→[^\n]*/gi, "get_accounts → [redacted]")
      // Order IDs
      .replace(
        /\|\s*\*\*Order ID\*\*\s*\|[^\n]*/gi,
        "| **Order ID** | [redacted] |",
      )
      .replace(
        /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
        "[redacted]",
      )
      // Exact fractional share quantities (identifying + operational)
      .replace(/\b0\.\d{4,}\b/g, "—")
      // Internal repo paths
      .replace(
        /`(?:logs|config|data|workflows|prompt|\.cursor)\/[^`]+`/g,
        "`[internal]`",
      )
      .replace(
        /(?:logs|config|data|workflows|prompt)\/[a-zA-Z0-9_./-]+\.(?:md|json|jsonl)/g,
        "[internal]",
      )
      // LP / personal portfolio language → neutral public copy
      .replace(/\*\*To:\*\*\s*Limited Partner\s*/gi, "")
      .replace(/\*\*From:\*\*[^\n]*\n/gi, "")
      .replace(/Dear Partner,?\s*/gi, "")
      .replace(/your reported \+\d+% winner/gi, "a strong personal holding")
      .replace(/\bLP already[^.\n]*/gi, "Existing holder overlap")
      .replace(/\bYou already own[^.\n]*/gi, "Existing holder overlap")
      .replace(/\byou already have[^.\n]*/gi, "existing holder exposure")
      .replace(/\bLP overlap[^.\n]*/gi, "holder overlap")
      .replace(/where you already have personal conviction[^\n]*/gi, "in the research universe")
      .replace(/not cited as your biggest winner[^\n]*/gi, "selected on variant perception")
      // MCP / tool audit noise
      .replace(/\*Quotes:\s*`get_[^`]+\`[^\n]*\n/gi, "")
      .replace(/MCP refresh:[^\n]*\n/gi, ""),
  );
}

export function sanitizeForPublic(content: string): string {
  return redactLinePatterns(stripInternalSections(content)).trim();
}

export function findForbiddenContent(content: string): string[] {
  const hits: string[] = [];
  for (const { name, pattern } of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) hits.push(name);
    pattern.lastIndex = 0;
  }
  return hits;
}

export function assertPublicSafe(content: string, context: string): void {
  const hits = findForbiddenContent(content);
  if (hits.length > 0) {
    throw new Error(
      `Private data leaked in ${context}: ${hits.join(", ")}`,
    );
  }
}
