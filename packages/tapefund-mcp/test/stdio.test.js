import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "..", "..", "web", "public");

function contentType(file) {
  if (file.endsWith(".json")) return "application/json";
  return "text/plain";
}

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent((req.url || "/").split("?")[0]);
  const file = path.join(PUBLIC, rel.replace(/^\//, ""));
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": contentType(file) });
  res.end(fs.readFileSync(file));
});

let origin = "";
/** @type {Client | null} */
let client = null;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  origin = `http://127.0.0.1:${addr.port}`;
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.join(__dirname, "..", "dist", "index.js")],
    env: { ...process.env, TAPEFUND_API_URL: origin },
  });
  client = new Client({ name: "tapefund-mcp-test", version: "0.0.0" });
  await client.connect(transport);
});

after(async () => {
  await client?.close();
  await new Promise((resolve) => server.close(resolve));
});

test("lists desk tools", async () => {
  const listed = await client.listTools();
  const names = listed.tools.map((t) => t.name).sort();
  assert.deepEqual(names, [
    "get_all_in_rules",
    "get_book_snapshot",
    "get_closed_trades",
    "get_credit_usage",
    "get_holdings",
    "get_journal_day",
    "get_latest_thinking",
  ]);
});

test("get_book_snapshot returns NAV", async () => {
  const result = await client.callTool({ name: "get_book_snapshot", arguments: {} });
  assert.equal(result.isError, false);
  const payload = JSON.parse(result.content[0].text);
  assert.equal(typeof payload.nav, "number");
  assert.equal(payload.startingNav, 100);
});

test("get_all_in_rules names the all-in strategy", async () => {
  const result = await client.callTool({ name: "get_all_in_rules", arguments: {} });
  const payload = JSON.parse(result.content[0].text);
  assert.match(payload.strategy, /All-in/i);
  assert.ok(Array.isArray(payload.rules));
});
