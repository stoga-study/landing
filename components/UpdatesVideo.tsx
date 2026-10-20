"use client";

import { useEffect, useRef, useState } from "react";

// The updates video: landscape or vertical, light or dark devices, with chapters that jump to each version.
const CHAPTERS: [string, string, string][] = [
  ["1.1", "Study your way", "Choose what gets made from each file, units, your own notes"],
  ["1.2", "A tutor that hints first", "Answers cite the page; explain any mistake"],
  ["1.3", "Bring every kind of note", "PDFs, slides, photos and search across all of it"],
  ["1.4", "Plans around real test dates", "Calendar, Schoology import, readiness, the coach"],
  ["1.5", "Watch it add up", "Study history, goals, optional streaks"],
  ["1.6", "Works like an app", "Offline, installable, fully accessible"],
  ["1.7", "Study together", "Shared sets and invite-only groups"],
  ["1.8", "Yours, and private", "Export, restore, privacy controls, a parent view"],
  ["1.9", "Built with students", "Feedback anywhere, an ideas board, public updates"],
];
const START = (i: number) => 4 + i * 5.4;
const OUTRO = START(9);
type Format = "16x9" | "9x16";
type Look = "light" | "dark";

export function UpdatesVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [format, setFormat] = useState<Format>("16x9");
  const [look, setLook] = useState<Look>("light");
  const [chapter, setChapter] = useState(-1);
  const [muted, setMuted] = useState(true);
  const name = `/video/stoga-updates-${format}${look === "dark" ? "-dark" : ""}`;

  // Start with the devices that match the site's theme.
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setLook((t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");
  }, []);

  // React doesn't render the muted attribute on the server, so set it here: browsers only autoplay muted video.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  // Keep the place (and play state) when switching between cuts.
  const switchTo = (next: { format?: Format; look?: Look }) => {
    const v = video.current;
    if (v) {
      const at = v.currentTime, playing = !v.paused;
      v.addEventListener("loadedmetadata", () => { v.currentTime = at; if (playing) v.play().catch(() => {}); }, { once: true });
    }
    if (next.format) setFormat(next.format);
    if (next.look) setLook(next.look);
  };

  const jump = (i: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = START(i) + 0.05;
    v.play().catch(() => {});
  };

  const withSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  return (
    <div className={`uv uv-${format === "16x9" ? "landscape" : "vertical"}`}>
      <div className="uv-controls">
        <div className="uv-group">
          <span className="eyebrow" id="uv-format">Format</span>
          <div className="uv-seg" role="group" aria-labelledby="uv-format">
            <button type="button" aria-pressed={format === "16x9"} onClick={() => switchTo({ format: "16x9" })}>Landscape 16:9</button>
            <button type="button" aria-pressed={format === "9x16"} onClick={() => switchTo({ format: "9x16" })}>Vertical 9:16</button>
          </div>
        </div>
        <div className="uv-group">
          <span className="eyebrow" id="uv-look">Look</span>
          <div className="uv-seg" role="group" aria-labelledby="uv-look">
            <button type="button" aria-pressed={look === "light"} onClick={() => switchTo({ look: "light" })}>Light</button>
            <button type="button" aria-pressed={look === "dark"} onClick={() => switchTo({ look: "dark" })}>Dark</button>
          </div>
        </div>
      </div>

      <div className="uv-stage">
        <div className="uv-film">
          <video
            ref={video}
            src={`${name}.mp4`}
            poster={`${name}.jpg`}
            autoPlay
            loop
            playsInline
            controls
            preload="auto"
            aria-label="Stoga.study updates, versions 1.1 to 1.9"
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime;
              setChapter(t >= START(0) && t < OUTRO ? Math.floor((t - START(0)) / 5.4) : -1);
            }}
          />
          {muted && <button type="button" className="btn btn-primary btn-sm uv-sound" onClick={withSound}>Play with sound</button>}
        </div>
        <ol className="uv-chapters">
          {CHAPTERS.map(([v, t, what], i) => (
            <li key={v}>
              <button type="button" className={chapter === i ? "on" : undefined} onClick={() => jump(i)} aria-current={chapter === i ? "true" : undefined}>
                <span className="v">{v}</span>
                <span className="t">{t}</span>
                <span className="at">0:{String(Math.floor(START(i))).padStart(2, "0")}</span>
                <span className="what">{what}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
