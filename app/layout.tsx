import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

// next/font downloads the brand v2 families at build time and serves them from our own
// domain, so no request goes to Google at runtime.
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-geist-mono", display: "swap" });

const SITE_URL = "https://stoga.study";
const DESCRIPTION = "The free study app made for Conestoga High School: your CHS classes, your Schoology calendar and your own notes, in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stoga.study, the study app made for Conestoga",
    template: "%s · Stoga.study",
  },
  description: DESCRIPTION,
  applicationName: "Stoga.study",
  keywords: ["Conestoga High School", "CHS", "study app", "AI tutor", "flashcards", "practice quizzes", "Schoology", "Berwyn", "Tredyffrin/Easttown"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Stoga.study",
    title: "Stoga.study: the study app that already knows Stoga",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoga.study: the study app that already knows Stoga",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0C0D" },
  ],
};

// Runs before first paint so a saved Light or Dark choice never flashes.
const themeScript = `try{var t=localStorage.getItem("stoga-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
