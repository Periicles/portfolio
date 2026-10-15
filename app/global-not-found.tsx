import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 — Paul Ragueneau",
  robots: { index: false },
};

// Page 404 globale : le layout racine dépend de la langue de l'URL, il ne
// peut donc pas habiller les adresses inconnues. Message bilingue.
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-paper text-ink">
          <p className="font-mono text-sm tracking-[0.15em] text-accent-strong">404</p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Page introuvable
            <span className="block text-muted text-xl md:text-2xl font-semibold mt-2" lang="en">
              Page not found
            </span>
          </h1>
          <nav className="flex gap-6 text-accent-strong">
            <Link href="/" className="hover:underline">Retour à l&apos;accueil</Link>
            <Link href="/en" lang="en" className="hover:underline">Back to home</Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
