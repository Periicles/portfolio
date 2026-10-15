import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { homePath, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, new URL(homePath(locale), site.url).href]),
  );

  return locales.map((locale) => ({
    url: new URL(homePath(locale), site.url).href,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
