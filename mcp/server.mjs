#!/usr/bin/env node
/**
 * Tapefund Desk MCP — stdio or HTTP.
 * Prepaid credits: TAPEFUND_API_KEY + optional TAPEFUND_CREDITS (integer).
 * Does not trade. Does not expose brokerage credentials.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, "..");
const COST = 1;

function read(rel) {
  const p = path.join(REPO, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function jsonl(rel) {
  return read(rel)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

function latestJournal() {
  const dir = path.join(REPO, "logs", "intelligence");
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
  const last = files[files.length - 1];
  if (!last) return null;
  return { file: last, content: read(path.join("logs", "intelligence", last)) };
}

function navFrom(md) {
  const m = md.match(/NAV total\*\*\s*\|\s*\*\*\$([\d.]+)/i);
  return m ? Number(m[1]) : null;
}

function publicize(text) {
  return String(text ?? "")
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
    .replace(/\bXu\b/g, "all-in");
}

function allInRules() {
  return {
    strategy: "All-in one listed stock",
    rules: [
      "One equity at a time. Flatten before a new name.",
      "Cash only. No margin, options, crypto, or pennies.",
      "Retail attention plus support plus a near-term catalyst.",
      "Never chase a name that already ran.",
      "Sell around +20–30% or when the rumor is fully news.",
      "No GTC stop-loss. Watch and exit when the setup dies.",
      "Memes are allowed if early.",
    ],
  };
}

const TOOLS = [
  {
    name: "get_book_snapshot",
    description: "Live Tapefund Agentic book: NAV, cash, return vs $100 start.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_closed_trades",
    description: "Closed equity trades from the public ledger.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_holdings",
    description: "Open positions. Empty array if the book is cash.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_latest_thinking",
    description: "Most recent published CIO session markdown (sanitized source).",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_all_in_rules",
    description: "All-in hard rules this desk cannot waive.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_journal_day",
    description: "Published journal markdown for a YYYY-MM-DD date.",
    inputSchema: {
      type: "object",
      properties: { date: { type: "string" } },
      required: ["date"],
    },
  },
];

function callTool(name, args = {}) {
  const positions = jsonl("logs/scorecard/positions.jsonl");
  const open = positions.filter((p) => p.status === "open");
  const closed = positions.filter((p) => p.status === "closed");
  const j = latestJournal();
  const nav = j ? navFrom(j.content) : 100;
  const start = 100;

  switch (name) {
    case "get_book_snapshot":
      return {
        nav,
        startingNav: start,
        returnPct: nav == null ? null : ((nav - start) / start) * 100,
        pnlUsd: nav == null ? null : nav - start,
        openNames: open.length,
        closedTrades: closed.length,
        cash: open.length === 0,
        asOf: j?.file ?? null,
      };
    case "get_closed_trades":
      return closed.map((p) => ({
        ticker: p.ticker,
        entry_date: p.entry_date,
        exit_date: p.exit_date,
        size_usd: p.size_usd,
        entry_price: p.entry_price,
        return_pct: p.return_pct,
        exit_reason: p.exit_reason,
      }));
    case "get_holdings":
      return open.map((p) => ({
        ticker: p.ticker,
        size_usd: p.size_usd,
        entry_price: p.entry_price,
        entry_date: p.entry_date,
        conviction: p.conviction,
        return_pct: p.return_pct,
      }));
    case "get_latest_thinking":
      return j ? { file: j.file, content: publicize(j.content) } : null;
    case "get_all_in_rules":
    case "get_xu_filter":
      return allInRules();
    case "get_journal_day": {
      const date = String(args.date || "");
      const dir = path.join(REPO, "logs", "intelligence");
      const files = fs.existsSync(dir)
        ? fs.readdirSync(dir).filter((f) => f.startsWith(date) && f.endsWith(".md"))
        : [];
      return files.map((f) => ({
        file: f,
        content: publicize(read(path.join("logs", "intelligence", f))),
      }));
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

let credits = Number(process.env.TAPEFUND_CREDITS ?? "Infinity");
const requiredKey = process.env.TAPEFUND_API_KEY || "";

function authorize(key) {
  if (!requiredKey) return true;
  return Boolean(key) && key === requiredKey;
}

function handleRpc(msg, apiKey) {
  if (msg.method === "initialize") {
    return {
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "tapefund-desk", version: "0.1.0" },
      },
    };
  }
  if (msg.method === "notifications/initialized") return null;
  if (msg.method === "tools/list") {
    return { jsonrpc: "2.0", id: msg.id, result: { tools: TOOLS } };
  }
  if (msg.method === "tools/call") {
    if (!authorize(apiKey)) {
      return {
        jsonrpc: "2.0",
        id: msg.id,
        error: { code: -32001, message: "Invalid or missing TAPEFUND_API_KEY" },
      };
    }
    if (Number.isFinite(credits) && credits < COST) {
      return {
        jsonrpc: "2.0",
        id: msg.id,
        error: { code: -32002, message: "Insufficient credits" },
      };
    }
    try {
      const result = callTool(msg.params?.name, msg.params?.arguments || {});
      if (Number.isFinite(credits)) credits -= COST;
      return {
        jsonrpc: "2.0",
        id: msg.id,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          creditsRemaining: Number.isFinite(credits) ? credits : null,
        },
      };
    } catch (err) {
      return {
        jsonrpc: "2.0",
        id: msg.id,
        error: { code: -32000, message: String(err.message || err) },
      };
    }
  }
  return {
    jsonrpc: "2.0",
    id: msg.id,
    error: { code: -32601, message: `Unknown method ${msg.method}` },
  };
}

function runStdio() {
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    if (!line.trim()) return;
    const msg = JSON.parse(line);
    const out = handleRpc(msg, process.env.TAPEFUND_API_KEY);
    if (out) process.stdout.write(JSON.stringify(out) + "\n");
  });
}

function runHttp(port) {
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, service: "tapefund-desk" }));
      return;
    }
    if (req.method !== "POST") {
      res.writeHead(404);
      res.end();
      return;
    }
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const key = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
      const msg = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      const out = handleRpc(msg, key || process.env.TAPEFUND_API_KEY);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(out ?? { jsonrpc: "2.0", result: {} }));
    });
  });
  server.listen(port, "127.0.0.1", () => {
    process.stderr.write(`tapefund-desk MCP http://127.0.0.1:${port}\n`);
  });
}

const httpFlag = process.argv.includes("--http");
const portArg = process.argv.indexOf("--port");
const port = portArg >= 0 ? Number(process.argv[portArg + 1]) : 8787;
if (httpFlag) runHttp(port);
else runStdio();
