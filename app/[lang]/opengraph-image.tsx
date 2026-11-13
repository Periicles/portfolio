import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const size = { width: 1200, height: 630 };

// Reprise du hero en affiche, sur la palette de `globals.css`. Le moteur de
// rendu ne lit pas les variables CSS : les valeurs sont recopiées ici.
const colors = {
  paper: "#f1ece2",
  ink: "#16130f",
  body: "#3d3a31",
  muted: "#5a5649",
  accent: "#0bb98d",
  sunsetStrong: "#a14a14",
};

const fontsDir = join(process.cwd(), "assets/fonts");

// Sans ces fichiers, l'image retomberait sur la police par défaut du moteur
// et perdrait le titre en affiche. La première police sert au texte courant.
async function loadFonts() {
  const [text, display, mono] = await Promise.all([
    readFile(join(fontsDir, "Inter-Medium.ttf")),
    readFile(join(fontsDir, "SpaceGrotesk-Bold.ttf")),
    readFile(join(fontsDir, "JetBrainsMono-Regular.ttf")),
  ]);
  return [
    { name: "Inter", data: text, weight: 500 as const, style: "normal" as const },
    { name: "Space Grotesk", data: display, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

type ImageParams = { params: Promise<{ lang: string }> };

async function getMeta({ params }: ImageParams) {
  const { lang } = await params;
  return getDictionary(isLocale(lang) ? lang : defaultLocale).meta;
}

// Une image par langue, avec un texte alternatif traduit.
export async function generateImageMetadata(props: ImageParams) {
  const t = await getMeta(props);
  return [{ id: "default", alt: t.title, size, contentType: "image/png" }];
}

export default async function OpengraphImage(props: ImageParams) {
  const [t, fonts] = await Promise.all([getMeta(props), loadFonts()]);
  const [firstName, ...lastNames] = site.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: colors.paper,
          backgroundImage: [
            "radial-gradient(circle at 92% 0%, rgba(217, 113, 47, 0.32) 0%, rgba(217, 113, 47, 0) 45%)",
            "radial-gradient(circle at 0% 100%, rgba(11, 185, 141, 0.22) 0%, rgba(11, 185, 141, 0) 40%)",
          ].join(", "),
          color: colors.ink,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              letterSpacing: 1.5,
              color: colors.muted,
            }}
          >
            {site.domain}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 48,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            <span>pr</span>
            <span style={{ color: colors.accent }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Space Grotesk",
              fontSize: 150,
              lineHeight: 0.84,
              letterSpacing: -7.5,
              textTransform: "uppercase",
            }}
          >
            <span>{firstName}</span>
            <div style={{ display: "flex" }}>
              <span>{lastNames.join(" ")}</span>
              <span style={{ color: colors.sunsetStrong }}>.</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 38, color: colors.body }}>{t.role}</div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            {t.ogTagline}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: 999,
              border: "2px solid rgba(11, 185, 141, 0.55)",
              backgroundColor: "rgba(241, 236, 226, 0.6)",
              boxShadow: "0 0 18px rgba(11, 185, 141, 0.35)",
              fontSize: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                marginRight: 12,
                borderRadius: 999,
                backgroundColor: colors.accent,
                boxShadow: "0 0 10px rgba(11, 185, 141, 0.8)",
              }}
            />
            {t.ogBadge}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
