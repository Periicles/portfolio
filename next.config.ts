import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// `unsafe-inline` sur script-src/style-src est un résidu assumé : le retirer
// impose une CSP à nonce via middleware, ce qui forcerait le rendu dynamique
// et ferait perdre le prérendu statique du site. La surface XSS est nulle
// (aucun paramètre réfléchi, aucun contenu utilisateur rendu ; le seul
// dangerouslySetInnerHTML sert le JSON-LD, construit depuis le contenu
// statique et échappé), donc le gain réel serait marginal.
// `unsafe-eval` reste limité au dev : Turbopack en a besoin pour le HMR.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "worker-src 'self'",
  "media-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "usb=()",
  "xr-spatial-tracking=()",
].join(", ");

const nextConfig: NextConfig = {
  experimental: {
    // Le layout racine vit sous app/[lang] : une 404 globale est nécessaire
    // pour habiller les URL qui ne correspondent à aucune langue.
    globalNotFound: true,
  },
  // Le français est la langue par défaut et reste servi à la racine : « / »
  // affiche la page prérendue /fr, et /fr redirige vers « / » pour ne pas
  // exposer deux URL pour le même contenu.
  async rewrites() {
    return [{ source: "/", destination: "/fr" }];
  },
  async redirects() {
    return [{ source: "/fr", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: permissionsPolicy,
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
