import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Stoga.study — Study smarter from your own notes. Free for every CHS student.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1E070B", padding: 72, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: 999, background: "#720D19", right: -200, top: -260, display: "flex" }} />
        <div style={{ position: "absolute", width: 96, height: 96, borderRadius: 999, background: "#BA0846", right: 330, top: 250, display: "flex" }} />
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Stoga.study</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#FFFFFF", color: "#1F1B1C", fontSize: 28, fontWeight: 700, padding: "12px 24px", borderRadius: 999, transform: "rotate(-3deg)", marginBottom: 28 }}>
            Free for every CHS student
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>
            Study smarter from your own notes.
          </div>
          <div style={{ display: "flex", color: "#C7A9AF", fontSize: 30, marginTop: 24 }}>
            Hint-first tutoring, flashcards, quizzes and a plan, linked to your pages.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
