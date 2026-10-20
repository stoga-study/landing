import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Stoga.study: every update since launch, in one minute. A 60-second video of versions 1.1 to 1.9.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The /video share card: the same brand v2 card as the home page, with the iPhone and MacBook from the video.
const BG = "#F7F6F5";
const INK = "#1C1718";
const INK_2 = "#3E3739";
const MUTED = "#6B6466";
const BRAND = "#720D19";
const LINE = "#E8E4E3";

export default async function OpengraphImage() {
  const read = (f: string) => readFile(join(process.cwd(), f));
  const [seal, devices, newsreader, geist, mono] = await Promise.all([
    read("public/seal.png"), read("assets/video-og-devices.jpg"), read("assets/Newsreader-500.woff"), read("assets/Geist-500.woff"), read("assets/GeistMono-400.woff"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;
  const devicesSrc = `data:image/jpeg;base64,${devices.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, fontFamily: "Geist", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={devicesSrc} width={760} height={628} alt="" style={{ position: "absolute", right: -150, top: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, height: "100%", padding: "60px 0 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sealSrc} width={60} height={60} alt="" />
            <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 36, color: INK, letterSpacing: -0.5 }}>Stoga.study</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 20, letterSpacing: 2, color: BRAND, marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 20, background: BRAND }}>
                <svg width="16" height="18" viewBox="0 0 16 18" style={{ marginLeft: 4 }}><path d="M0 0 L16 9 L0 18 Z" fill={BG} /></svg>
              </div>
              1 MIN · VERSIONS 1.1 TO 1.9
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Newsreader", fontSize: 76, lineHeight: 1.03, letterSpacing: -2.5, color: INK }}>
              <div style={{ display: "flex" }}>Every update</div>
              <div style={{ display: "flex" }}>since launch,</div>
              <div style={{ display: "flex" }}>in one minute.</div>
            </div>
            <div style={{ display: "flex", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${LINE}`, fontSize: 24, color: INK_2, width: 520 }}>
              Nine updates in one month. Free for every Conestoga student.
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 18, letterSpacing: 1.5, color: MUTED }}>STOGA.STUDY/VIDEO</div>
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
