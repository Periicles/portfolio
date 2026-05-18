import { ImageResponse } from "next/og";

export const alt = "Paul Ragueneau — Développeur Web Fullstack · React/Next.js";
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
          backgroundColor: "#0f172a",
          color: "#f1f5f9",
          padding: "80px 96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#2dd4bf",
            fontSize: 28,
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          paulragueneau.com
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Paul Ragueneau
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#94a3b8",
            }}
          >
            Développeur Web Fullstack
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#cbd5e1",
              fontFamily: "monospace",
              marginTop: 16,
            }}
          >
            TypeScript · React · Next.js · Python · Microservices
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 28px",
            backgroundColor: "#2dd4bf",
            color: "#0f172a",
            fontSize: 30,
            fontWeight: 600,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          Ouvert aux nouvelles missions →
        </div>
      </div>
    ),
    { ...size },
  );
}
