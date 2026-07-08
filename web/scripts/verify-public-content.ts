import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  findForbiddenContent,
  sanitizeForPublic,
} from "../lib/sanitize";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const LOGS_ROOT = path.join(REPO_ROOT, "logs");

function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectMarkdownFiles(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

const skipPatterns = [/calibration-/, /schema/];

const files = [
  ...collectMarkdownFiles(path.join(LOGS_ROOT, "intelligence")),
  ...collectMarkdownFiles(path.join(LOGS_ROOT, "investor-letters")),
  ...collectMarkdownFiles(path.join(LOGS_ROOT, "theses")),
  ...collectMarkdownFiles(path.join(LOGS_ROOT, "scorecard", "weekly")),
].filter((f) => !skipPatterns.some((p) => p.test(f)));

let failed = false;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf-8");
  const pub = sanitizeForPublic(raw);
  const hits = findForbiddenContent(pub);
  if (hits.length > 0) {
    console.error(`FAIL ${path.relative(REPO_ROOT, file)}: ${hits.join(", ")}`);
    failed = true;
  }
}

const positionsPath = path.join(LOGS_ROOT, "scorecard", "positions.jsonl");
if (fs.existsSync(positionsPath)) {
  for (const line of fs
    .readFileSync(positionsPath, "utf-8")
    .trim()
    .split("\n")
    .filter(Boolean)) {
    const row = JSON.parse(line) as { ticker: string; notes?: string };
    const pub = sanitizeForPublic(row.notes ?? "");
    const hits = findForbiddenContent(pub);
    if (hits.length > 0) {
      console.error(`FAIL positions.jsonl (${row.ticker}): ${hits.join(", ")}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error(
    "\nPublic content verification failed. Fix sanitize rules or source logs.",
  );
  process.exit(1);
}

console.log(
  `Verified ${files.length} markdown sources + positions for public safety.`,
);
