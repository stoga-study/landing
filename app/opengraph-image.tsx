import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Stoga.study: Study like you belong at your dream school. Free for every CHS student.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand Guidelines v1.0: burgundy shades only, Bricolage Grotesque Bold for display, Atkinson Hyperlegible for body.
const INK_PANEL = "#1E070B";
const PRIMARY = "#720D19";
const HOT = "#BA0846";
const BRAND_ON_DARK = "#F2A8BA";
const INK_MUTED = "#C7A9AF";
const LINE = "#C9C9CE";

export default async function OpengraphImage() {
  const read = (f: string) => readFile(join(process.cwd(), f));
  const [seal, bricolage, atkinson] = await Promise.all([read("public/seal.png"), read("assets/Bricolage-Bold.ttf"), read("assets/Atkinson-Bold.ttf")]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: INK_PANEL, position: "relative", overflow: "hidden", fontFamily: "Atkinson" }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, background: PRIMARY, right: -170, top: -230, display: "flex" }} />
        <div style={{ position: "absolute", width: 88, height: 88, borderRadius: 999, background: HOT, right: 72, top: 420, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px 56px", width: "100%", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#FFFFFF", fontFamily: "Bricolage", fontSize: 40, letterSpacing: -1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sealSrc} width={64} height={64} alt="" />
            Stoga.study
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "flex-start", background: "#FFFFFF", color: "#1F1B1C", fontSize: 28, padding: "10px 24px 12px", borderRadius: 999, border: `2px solid ${LINE}`, borderBottom: `6px solid ${LINE}`, transform: "rotate(-3deg)", marginBottom: 28 }}>
              Free for every CHS student
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 86, lineHeight: 1, letterSpacing: -3, color: "#FFFFFF" }}>
              <div style={{ display: "flex" }}>Study like you belong at</div>
              <div style={{ display: "flex", color: BRAND_ON_DARK }}>your dream school.</div>
            </div>
            <div style={{ display: "flex", color: INK_MUTED, fontSize: 26, marginTop: 22, lineHeight: 1.35, maxWidth: 980 }}>
              Turn raw notes into structured study guides, flashcards, or a hint-first personal tutor. Because no two students learn the exact same way.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 700, style: "normal" },
        { name: "Atkinson", data: atkinson, weight: 700, style: "normal" },
      ],
    },
  );
}
