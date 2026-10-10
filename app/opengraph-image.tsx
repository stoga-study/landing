import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Stoga.study: Study like you belong at Harvard, Stanford, MIT and more. Free for every CHS student.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SCHOOLS: [string, string][] = [
  ["Harvard", "#E0364D"], ["Stanford", "#D43B3B"], ["MIT", "#E03A52"], ["Yale", "#4F8FE0"],
  ["Princeton", "#F58025"], ["Duke", "#5A7BE8"], ["Cornell", "#E8434A"], ["Berkeley", "#FDB515"],
];

export default async function OpengraphImage() {
  const seal = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/seal.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1E070B", padding: 72, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: 999, background: "#720D19", right: -200, top: -260, display: "flex" }} />
        <div style={{ position: "absolute", width: 96, height: 96, borderRadius: 999, background: "#BA0846", right: 110, top: 470, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#FFFFFF", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={seal} width={64} height={64} alt="" />
          Stoga.study
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#FFFFFF", color: "#1F1B1C", fontSize: 28, fontWeight: 700, padding: "12px 24px", borderRadius: 999, transform: "rotate(-3deg)", marginBottom: 28 }}>
            Free for every CHS student
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            Study like you belong at
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20, fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>
            {SCHOOLS.map(([n, c], i) => (
              <div key={n} style={{ display: "flex", color: c, marginRight: 22 }}>
                {n}{i < SCHOOLS.length - 1 ? "," : "…"}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
