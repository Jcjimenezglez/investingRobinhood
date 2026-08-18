#!/usr/bin/env node
/**
 * Local shim. Prefer `npx -y tapefund-mcp` (Rosetta-style).
 * This runs the SDK server from packages/tapefund-mcp.
 */
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "packages", "tapefund-mcp", "dist", "index.js");
if (!existsSync(dist)) {
  process.stderr.write(
    "tapefund-mcp is not built. From packages/tapefund-mcp run: npm install && npm run build\nOr: npx -y tapefund-mcp\n",
  );
  process.exit(1);
}

const require = createRequire(import.meta.url);
try {
  require.resolve("@modelcontextprotocol/sdk/server/mcp.js", {
    paths: [path.join(root, "packages", "tapefund-mcp")],
  });
} catch {
  process.stderr.write(
    "Install MCP deps: cd packages/tapefund-mcp && npm install\n",
  );
  process.exit(1);
}

await import(dist);
