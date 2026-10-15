import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import { buildStructuredData, serializeJsonLd } from "@/lib/structured-data";
import { homePath, isLocale, locales, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

type LayoutParams = { params: Promise<{ lang: string }> };

// Seules les langues connues sont prérendues ; toute autre valeur donne une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.title,
      template: `%s — ${site.name}`,
    },
    description: t.description,
    applicationName: `${site.name} — Portfolio`,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    keywords: [site.name, ...t.keywords],
    alternates: {
      canonical: homePath(lang),
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, homePath(locale)])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[lang],
      alternateLocale: locales.filter((locale) => locale !== lang).map((locale) => ogLocales[locale]),
      url: homePath(lang),
      siteName: site.name,
      title: t.title,
      description: t.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#131512" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<LayoutParams & { children: React.ReactNode }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // Bloc de données (non exécuté) : compatible avec la CSP actuelle.
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildStructuredData()) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
