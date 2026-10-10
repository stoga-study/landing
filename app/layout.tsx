import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// next/font downloads both families at build time and serves them from our own
// domain, so no request goes to Google at runtime (Brand Guidelines p. 9).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const SITE_URL = "https://stoga.study";
const DESCRIPTION =
  "A free, calm AI study app for Conestoga High School students. Upload your notes and PDFs, then get hint-first tutoring, editable flashcards, practice quizzes and a study plan, all linked back to your own pages.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stoga.study — Free AI study help for Conestoga students",
    template: "%s · Stoga.study",
  },
  description: DESCRIPTION,
  applicationName: "Stoga.study",
  keywords: ["Conestoga High School", "CHS", "study app", "AI tutor", "flashcards", "practice quizzes", "AP Statistics", "Berwyn"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Stoga.study",
    title: "Stoga.study — Study smarter from your own notes",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoga.study — Study smarter from your own notes",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F5" },
    { media: "(prefers-color-scheme: dark)", color: "#140D0F" },
  ],
};

// Runs before first paint so a saved Light or Dark choice never flashes.
const themeScript = `try{var t=localStorage.getItem("stoga-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${atkinson.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
