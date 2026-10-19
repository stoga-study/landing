import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Stoga.study: the study app that already knows Stoga. Free for every Conestoga student.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand v2 (pwa-app/BRAND.md): warm neutral page, Newsreader display, Geist body, Geist Mono labels, burgundy for one accent.
const BG = "#F7F6F5";
const INK = "#1C1718";
const INK_2 = "#3E3739";
const MUTED = "#6B6466";
const BRAND = "#720D19";
const LINE = "#E8E4E3";

export default async function OpengraphImage() {
  const read = (f: string) => readFile(join(process.cwd(), f));
  const [seal, newsreader, geist, mono] = await Promise.all([
    read("public/seal.png"), read("assets/Newsreader-500.woff"), read("assets/Geist-500.woff"), read("assets/GeistMono-400.woff"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: BG, padding: "60px 72px 56px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sealSrc} width={60} height={60} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 36, color: INK, letterSpacing: -0.5 }}>Stoga.study</div>
            <div style={{ display: "flex", fontSize: 20, color: MUTED }}>Conestoga High School</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, letterSpacing: 2, color: MUTED, marginBottom: 22 }}>MADE AT CONESTOGA, FOR CONESTOGA</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Newsreader", fontSize: 92, lineHeight: 1.02, letterSpacing: -3, color: INK }}>
            <div style={{ display: "flex" }}>The study app that</div>
            <div style={{ display: "flex" }}>already knows <span style={{ color: BRAND, marginLeft: 22 }}>Stoga.</span></div>
          </div>
          <div style={{ display: "flex", marginTop: 30, paddingTop: 22, borderTop: `1px solid ${LINE}`, fontSize: 26, color: INK_2 }}>
            Your CHS classes, your Schoology calendar and your own notes. Free.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
