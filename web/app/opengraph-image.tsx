import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/site-config";

export const dynamic = "force-static";
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 9999,
            backgroundColor: BRAND.color,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {BRAND.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#525252",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {BRAND.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
