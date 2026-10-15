import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f5f4ef",
          color: "#12140f",
          padding: "72px 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#5f635a",
              fontSize: 24,
              fontFamily: "monospace",
              letterSpacing: "0.06em",
            }}
          >
            {site.domain}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              border: "3px solid #12140f",
              borderRadius: 18,
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ display: "flex" }}>pr</span>
            <span style={{ display: "flex", color: "#0bb98d" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 42, color: "#5f635a", marginTop: 12 }}>
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#067a5e",
              fontFamily: "monospace",
              marginTop: 24,
              letterSpacing: "0.02em",
            }}
          >
            TypeScript · React · Next.js · Python · IA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 28px",
            backgroundColor: "#0bb98d",
            color: "#12140f",
            fontSize: 28,
            fontWeight: 700,
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        >
          En alternance chez Ceva Santé Animale
        </div>
      </div>
    ),
    { ...size },
  );
}
