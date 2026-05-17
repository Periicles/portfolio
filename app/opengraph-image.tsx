import { ImageResponse } from "next/og";

export const alt = "Paul Ragueneau — Développeur Web Fullstack";
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
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "#f1f5f9",
          padding: "96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#2dd4bf",
            fontSize: 28,
            fontFamily: "monospace",
            marginBottom: 32,
            letterSpacing: "0.04em",
          }}
        >
          paulragueneau.com
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Paul Ragueneau
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 48,
            color: "#94a3b8",
            marginBottom: 48,
          }}
        >
          Développeur Web Fullstack
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#cbd5e1",
            fontFamily: "monospace",
          }}
        >
          TypeScript · React · Next.js · Python · Microservices
        </div>
      </div>
    ),
    { ...size },
  );
}
