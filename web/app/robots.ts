import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site-config";

export const dynamic = "force-static";

/** Allow search engines and AI crawlers — required for GEO visibility. */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  const aiRules = AI_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: "/" as const,
  }));

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiRules,
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  };
}
