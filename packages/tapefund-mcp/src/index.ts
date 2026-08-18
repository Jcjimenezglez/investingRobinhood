#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const VERSION = "0.1.0";
const DEFAULT_API_URL = "https://tapefund.com";
const API_BASE = (
  process.env.TAPEFUND_API_URL || DEFAULT_API_URL
).replace(/\/$/, "");
const API_KEY =
  process.env.TAPEFUND_API_KEY || process.env.TAPEFUND_MCP_KEY || "";

function toolResult(data: unknown, isError = false) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    isError,
  };
}

async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    const data = JSON.parse(text) as unknown;
    if (!res.ok) {
      const message =
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        "error" in data
          ? String((data as { error: unknown }).error)
          : `HTTP ${res.status}`;
      return { data: { error: message, status: res.status }, isError: true };
    }
    return { data, isError: false };
  } catch {
    return {
      data: {
        error: `HTTP ${res.status}: ${text.slice(0, 300) || "non-JSON response"}`,
      },
      isError: true,
    };
  }
}

async function apiGet(path: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
    headers.Authorization = `Bearer ${API_KEY}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { headers });
  return parseResponse(res);
}

const server = new McpServer({ name: "tapefund-mcp", version: VERSION });

server.tool(
  "get_book_snapshot",
  "Live Tapefund Robinhood Agentic book: NAV, cash, return vs $100 start. Public ledger — not a brokerage.",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/snapshot.json");
    return toolResult(data, isError);
  },
);

server.tool(
  "get_closed_trades",
  "Closed equity trades from the public Tapefund ledger (size, return, exit reason).",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/closed-trades.json");
    return toolResult(data, isError);
  },
);

server.tool(
  "get_holdings",
  "Open stock holdings. Empty array when the book is cash.",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/holdings.json");
    return toolResult(data, isError);
  },
);

server.tool(
  "get_latest_thinking",
  "Most recent published CIO trading-journal session (sanitized markdown).",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/thinking.json");
    return toolResult(data, isError);
  },
);

server.tool(
  "get_all_in_rules",
  "All-in swing-trading hard rules this desk cannot waive.",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/rules.json");
    return toolResult(data, isError);
  },
);

server.tool(
  "get_journal_day",
  "Published trading-journal markdown for a YYYY-MM-DD date.",
  {
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Session date, e.g. 2026-08-17"),
  },
  async ({ date }) => {
    const { data, isError } = await apiGet(`/api/v1/journal/${date}.json`);
    return toolResult(data, isError);
  },
);

server.tool(
  "get_credit_usage",
  "Credit / access status for this MCP client.",
  {},
  async () => {
    const { data, isError } = await apiGet("/api/v1/credit-usage.json");
    return toolResult(data, isError);
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
