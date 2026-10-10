"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "../Icon";
import { CARDS, LOCKED_FILE, PLAN_DAYS, PREP_STEPS, QUIZ, SAMPLE_FILE, SUBJECTS, TUTOR, WEAK, type Card } from "./data";

type Screen =
  | "welcome" | "onboarding" | "setup" | "loading" | "home"
  | "upload" | "processing" | "error" | "ready"
  | "tutor" | "cards" | "quiz" | "progress";

type FileInfo = { name: string; meta: string };
type UploadError = { file: string; reason: string };

const STEPS: { id: string; label: string; desc: string; screen: Screen; match: Screen[] }[] = [
  { id: "start", label: "Get set up", desc: "Pick your classes in under a minute.", screen: "welcome", match: ["welcome", "onboarding", "setup", "loading"] },
  { id: "upload", label: "Add your notes", desc: "PDF, Word, a photo or pasted text.", screen: "upload", match: ["upload", "error"] },
  { id: "prepare", label: "Get a study set", desc: "Notes, cards, a quiz and a guide.", screen: "processing", match: ["processing", "ready"] },
  { id: "tutor", label: "Ask the tutor", desc: "Hints first, linked to your pages.", screen: "tutor", match: ["tutor"] },
  { id: "cards", label: "Review flashcards", desc: "Editable, spaced over the week.", screen: "cards", match: ["cards"] },
  { id: "quiz", label: "Practice quiz", desc: "Feedback after every answer.", screen: "quiz", match: ["quiz"] },
  { id: "progress", label: "Plan and track", desc: "Exam prep, mistakes, your week.", screen: "progress", match: ["progress", "home"] },
];

const ASIDE: Record<string, { title: string; body: string; backend: string }> = {
  start: {
    title: "Onboarding that respects your time",
    body: "Choose your classes and you are ready. No card, no trial clock. Essential is free and stays free.",
    backend: "Accounts and sign-in need backend integration.",
  },
  upload: {
    title: "Your material, kept private",
    body: "Add class notes, slides, a PDF or a photo of handwritten notes, up to 25 MB. When a file cannot be read, you are told why and it does not count against your uploads.",
    backend: "In this preview your file never leaves your device. Real reading needs backend integration.",
  },
  prepare: {
    title: "One upload, a full study set",
    body: "Stoga reads your pages, finds key ideas, then writes notes, flashcards, a practice quiz and a study guide that all point back to page numbers.",
    backend: "Steps and timings are sample. Generation needs backend integration.",
  },
  tutor: {
    title: "Hints before answers",
    body: "The tutor nudges first, then names the formula or page, and only explains in full when you ask. Every answer links to the page it came from.",
    backend: "Sample chat. Live answers need backend integration.",
  },
  cards: {
    title: "Cards you can fix",
    body: "Every card is editable. Rate how it felt and it comes back just before you would forget. The review pace is up to you.",
    backend: "Scheduling across devices needs backend integration.",
  },
  quiz: {
    title: "Wrong answers are information",
    body: "Check each answer and see why, with the source page. Misses go to your mistake review automatically, with no scolding.",
    backend: "Questions here are sample. Generated quizzes need backend integration.",
  },
  progress: {
    title: "A plan built around your exam date",
    body: "See days left, an honest readiness estimate, weak spots and a day-by-day plan you can change.",
    backend: "Readiness is an estimate and needs backend scoring.",
  },
};

const TITLES: Record<Screen, string> = {
  welcome: "Welcome", onboarding: "Choose your classes", setup: "You are set up", loading: "Loading your subjects",
  home: "Today", upload: "Add notes", processing: "Preparing your study set", error: "Upload problem",
  ready: "Study set ready", tutor: "AI tutor", cards: "Flashcards", quiz: "Practice quiz", progress: "Progress and exam prep",
};

const TABS: { screen: Screen; label: string; icon: IconName }[] = [
  { screen: "home", label: "Home", icon: "home" },
  { screen: "upload", label: "Upload", icon: "upload" },
  { screen: "tutor", label: "Tutor", icon: "chat" },
  { screen: "cards", label: "Review", icon: "cards" },
  { screen: "progress", label: "Progress", icon: "chart" },
];
const TAB_SCREENS: Screen[] = ["home", "upload", "progress", "ready", "error"];
const MAX_BYTES = 25 * 1024 * 1024;

function fmtSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function Demo() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [hasMaterial, setHasMaterial] = useState(false);
  const [subjects, setSubjects] = useState<string[]>(["stats", "anat", "eng"]);
  const [file, setFile] = useState<FileInfo>(SAMPLE_FILE);
  const [error, setError] = useState<UploadError | null>(null);
  const [cards, setCards] = useState<Card[]>(CARDS);
  const [mistakes, setMistakes] = useState(7);
  const bodyRef = useRef<HTMLDivElement>(null);

  const go = (s: Screen) => {
    if (["tutor", "cards", "quiz", "progress", "ready"].includes(s)) setHasMaterial(true);
    setScreen(s);
  };

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [screen]);

  // The setup screen hands off to a short loading state, then the empty dashboard.
  useEffect(() => {
    if (screen !== "loading") return;
    const t = setTimeout(() => setScreen("home"), 1400);
    return () => clearTimeout(t);
  }, [screen]);

  const activeStep = STEPS.find((s) => s.match.includes(screen)) ?? STEPS[0];
  const aside = ASIDE[activeStep.id];
  const showTabs = TAB_SCREENS.includes(screen);

  return (
    <div className="demo-wrap">
      <div>
        <ol className="demo-steps" aria-label="Workflow steps">
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="demo-step"
                aria-current={s.id === activeStep.id ? "step" : undefined}
                onClick={() => {
                  if (s.id === "prepare") setFile(SAMPLE_FILE);
                  go(s.screen);
                }}
              >
                <span className="n" aria-hidden="true">{i + 1}</span>
                <span className="txt">
                  {s.label}
                  <span className="desc">{s.desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="demo-mobile-note callout neutral">
          <Icon name="info" />
          <span><b>{aside.title}.</b> {aside.backend}</span>
        </div>
      </div>

      <div className="demo-stage">
        <div className="phone">
          <div className="phone-screen" role="region" aria-label="Interactive preview of the Stoga.study app, with sample content" aria-roledescription="app preview">
            <div className="phone-notch" aria-hidden="true" />
            <div className="phone-status" aria-hidden="true">
              <span className="tabular">9:41</span>
              <span>Preview</span>
            </div>
            <p className="sr-only" aria-live="polite">Preview screen: {TITLES[screen]}</p>
            <div className="phone-body" ref={bodyRef}>
              {screen === "welcome" && <Welcome onStart={() => go("onboarding")} onSignIn={() => { setHasMaterial(true); go("home"); }} />}
              {screen === "onboarding" && <Onboarding selected={subjects} setSelected={setSubjects} onBack={() => go("welcome")} onNext={() => go("setup")} />}
              {screen === "setup" && <Setup subjects={subjects} onAdd={() => go("upload")} onLater={() => { setHasMaterial(false); go("loading"); }} />}
              {screen === "loading" && <Loading />}
              {screen === "home" && (hasMaterial
                ? <Home go={go} mistakes={mistakes} />
                : <EmptyHome onAdd={() => go("upload")} />)}
              {screen === "upload" && (
                <Upload
                  subject={SUBJECTS.find((s) => s.id === subjects[0])?.name ?? "AP Statistics"}
                  onFile={(f) => { setFile(f); go("processing"); }}
                  onError={(e) => { setError(e); go("error"); }}
                />
              )}
              {screen === "error" && error && <UploadErrorScreen error={error} onRetry={() => go("upload")} onSample={() => { setFile(SAMPLE_FILE); go("processing"); }} />}
              {screen === "processing" && <Processing file={file} onCancel={() => go("upload")} onDone={() => { setHasMaterial(true); go("ready"); }} />}
              {screen === "ready" && <Ready file={file} go={go} />}
              {screen === "tutor" && <Tutor onBack={() => go("home")} onCard={(c) => setCards((cs) => [...cs, c])} />}
              {screen === "cards" && <Cards cards={cards} setCards={setCards} onBack={() => go("home")} />}
              {screen === "quiz" && <Quiz onClose={() => go("home")} onMistakes={(n) => setMistakes((m) => m + n)} onReview={() => go("progress")} />}
              {screen === "progress" && <Progress mistakes={mistakes} go={go} />}
            </div>
            {showTabs && (
              <nav className="phone-tabs" aria-label="Preview app tabs">
                {TABS.map((t) => (
                  <button key={t.screen} type="button" aria-current={screen === t.screen ? "page" : undefined} onClick={() => go(t.screen)}>
                    <Icon name={t.icon} />
                    {t.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>

      <aside className="demo-aside" aria-label="About this step">
        <div className="card">
          <h3>{aside.title}</h3>
          <p>{aside.body}</p>
        </div>
        <div className="note-dashed">
          <span className="label-backend"><Icon name="plug" /> Not live yet</span>
          <p style={{ marginTop: 8 }}>{aside.backend}</p>
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Screens ---------------- */

function Header({ title, sub, onBack, end }: { title: string; sub?: string; onBack?: () => void; end?: ReactNode }) {
  return (
    <div className="p-top" style={{ marginBottom: 14 }}>
      <div className="p-row" style={{ gap: 6 }}>
        {onBack && (
          <button type="button" className="p-back" onClick={onBack} aria-label="Back">
            <Icon name="arrowLeft" />
          </button>
        )}
        <div>
          <div className="p-h">{title}</div>
          {sub && <div className="p-sub">{sub}</div>}
        </div>
      </div>
      {end}
    </div>
  );
}

function Welcome({ onStart, onSignIn }: { onStart: () => void; onSignIn: () => void }) {
  const rows: { icon: IconName; t: string; d: string; cls: string }[] = [
    { icon: "upload", t: "Add your notes", d: "PDF, Word, or a photo of handwritten notes", cls: "" },
    { icon: "bulb", t: "Hints before answers", d: "The tutor helps you get there yourself", cls: "t2" },
    { icon: "cards", t: "Review at the right time", d: "Cards return just before you would forget", cls: "t3" },
  ];
  return (
    <div className="p-stack" style={{ gap: 16 }}>
      <div className="p-hero ink" style={{ padding: "18px 16px 20px" }}>
        <span className="circle circle-big" aria-hidden="true" />
        <span className="circle circle-hot" aria-hidden="true" style={{ top: 70, right: 44, bottom: "auto" }} />
        <div className="p-brand" style={{ color: "#fff" }}>
          <Image className="seal" src="/seal.png" alt="" width={30} height={30} />
          Stoga.study
        </div>
        <span className="sticker" style={{ fontSize: 13, padding: "6px 12px", marginTop: 14 }}>Free for every CHS student</span>
        <div className="p-title" style={{ fontSize: 30, marginTop: 12 }}>Study smarter from your own notes.</div>
        <p style={{ color: "#C7A9AF", fontSize: 14, marginTop: 8 }}>
          Upload a PDF or class notes. Get hints first, then cards, quizzes and a plan, all linked back to your pages.
        </p>
      </div>
      {rows.map((r) => (
        <div key={r.t} className="p-row" style={{ alignItems: "flex-start" }}>
          <span className={`tile ${r.cls}`} style={{ width: 42, height: 42, borderRadius: 13 }}><Icon name={r.icon} /></span>
          <div>
            <div style={{ fontWeight: 700 }}>{r.t}</div>
            <div className="p-sub">{r.d}</div>
          </div>
        </div>
      ))}
      <button type="button" className="p-btn block" onClick={onStart} style={{ marginTop: 6 }}>Get started</button>
      <button type="button" className="p-btn sec block" onClick={onSignIn}>I already have an account</button>
    </div>
  );
}

function Onboarding({ selected, setSelected, onBack, onNext }: { selected: string[]; setSelected: (s: string[]) => void; onBack: () => void; onNext: () => void }) {
  const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  return (
    <div className="p-stack">
      <div className="p-row">
        <button type="button" className="p-back" onClick={onBack} aria-label="Back"><Icon name="arrowLeft" /></button>
        <div className="segments" style={{ flex: 1 }} role="img" aria-label="Step 1 of 2">
          <span className="now" /><span />
        </div>
      </div>
      <div className="p-title" style={{ fontSize: 26 }}>Which classes are you taking?</div>
      <p className="p-sub">Pick a few to start. You can add more any time.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SUBJECTS.map((s) => {
          const on = selected.includes(s.id);
          return (
            <button key={s.id} type="button" className="p-pill-opt" aria-pressed={on} onClick={() => toggle(s.id)}>
              {on && <Icon name="check" />}
              {s.name}
            </button>
          );
        })}
      </div>
      <div className="p-card" style={{ background: "var(--soft)", boxShadow: "none" }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Tutor style</div>
        <div className="p-sub" style={{ fontSize: 13 }}>Hints first, full answers when you ask. Change it in Settings.</div>
      </div>
      <button type="button" className="p-btn block" disabled={selected.length === 0} onClick={onNext}>
        {selected.length === 0 ? "Pick at least one class" : `Continue with ${selected.length}`}
      </button>
    </div>
  );
}

function Setup({ subjects, onAdd, onLater }: { subjects: string[]; onAdd: () => void; onLater: () => void }) {
  const names = SUBJECTS.filter((s) => subjects.includes(s.id));
  return (
    <div className="p-stack">
      <div className="segments" role="img" aria-label="Step 2 of 2"><span className="done" /><span className="now" /></div>
      <span className="chip" style={{ justifySelf: "start" }}>Essential plan, free</span>
      <div className="p-title pop" style={{ fontSize: 26 }}>Aarav, you are set up with {names.length} {names.length === 1 ? "subject" : "subjects"}</div>
      <div className="p-card p-list" style={{ padding: "4px 14px" }}>
        {names.map((s) => (
          <div key={s.id} className="p-li">
            <span className="p-check done"><Icon name="check" /></span>
            {s.name}
            <span className="end">{s.area}</span>
          </div>
        ))}
      </div>
      <div className="p-card dashed">
        <div style={{ fontWeight: 700 }}>Next: add this week&apos;s notes</div>
        <div className="p-sub">Takes about a minute. Your first cards appear right after.</div>
      </div>
      <button type="button" className="p-btn block" onClick={onAdd}><Icon name="upload" /> Add notes</button>
      <button type="button" className="p-btn sec block" onClick={onLater}>I will do it later</button>
    </div>
  );
}

function Loading() {
  return (
    <div className="p-stack" aria-busy="true">
      <div className="p-row between">
        <div className="skeleton" style={{ width: 120, height: 22 }} />
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: "50%" }} />
      </div>
      <div className="skeleton" style={{ width: 170, height: 32 }} />
      <div className="skeleton" style={{ height: 150, borderRadius: 22 }} />
      <div className="skeleton" style={{ height: 90, borderRadius: 20 }} />
      <p className="p-sub" style={{ textAlign: "center" }}>Getting your subjects ready. This usually takes a moment.</p>
    </div>
  );
}

function Today({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="p-top">
        <div className="p-brand">
          <Image className="seal" src="/seal.png" alt="" width={30} height={30} />
          Stoga.study
        </div>
        {children}
      </div>
      <div className="p-date">Friday, October 9</div>
      <div className="p-title" style={{ marginBottom: 14 }}>Today, Aarav</div>
    </>
  );
}

function EmptyHome({ onAdd }: { onAdd: () => void }) {
  return (
    <div>
      <Today />
      <div className="p-stack">
        <div className="p-hero burg">
          <span className="circle circle-big" aria-hidden="true" />
          <div style={{ fontSize: 14, color: "#F7EAEC" }}>Flashcards due today</div>
          <div className="p-big">0</div>
          <p style={{ fontSize: 14, color: "#F7EAEC", marginTop: 6 }}>Add notes and your first cards will appear here.</p>
        </div>
        <button type="button" className="p-btn block" onClick={onAdd}><Icon name="upload" /> Add your first notes</button>
        <p className="p-sub" style={{ textAlign: "center", fontSize: 13 }}>PDF, Word, a photo or pasted text. Up to 25 MB.</p>
      </div>
    </div>
  );
}

function Home({ go, mistakes }: { go: (s: Screen) => void; mistakes: number }) {
  return (
    <div>
      <Today />
      <div className="p-stack">
        <div className="p-hero burg">
          <span className="circle circle-big" aria-hidden="true" />
          <div style={{ fontSize: 14, color: "#F7EAEC" }}>Flashcards due today</div>
          <div className="p-row" style={{ alignItems: "flex-end", gap: 10 }}>
            <div className="p-big">38</div>
            <p style={{ fontSize: 13, color: "#F7EAEC", paddingBottom: 6 }}>About 15 minutes across AP Statistics and Honors Anatomy.</p>
          </div>
          <button type="button" className="p-btn inv block" style={{ marginTop: 12 }} onClick={() => go("cards")}>Start review</button>
        </div>
        <div className="p-card">
          <div className="p-row">
            <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="chat" /></span>
            <div>
              <div className="p-sub" style={{ fontSize: 13 }}>AP Statistics</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>Sampling distributions</div>
            </div>
          </div>
          <div className="segments" style={{ margin: "12px 0" }} role="img" aria-label="Step 3 of 5">
            <span className="done" /><span className="done" /><span className="done" /><span /><span />
          </div>
          <div className="p-row between">
            <span className="p-sub" style={{ fontSize: 13 }}>Step 3 of 5, about 18 min left</span>
            <button type="button" className="p-btn" style={{ minHeight: 40 }} onClick={() => go("quiz")}>Resume</button>
          </div>
        </div>
        <button type="button" className="p-card dashed p-row" style={{ textAlign: "left", width: "100%" }} onClick={() => go("upload")}>
          <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="upload" /></span>
          <span>
            <span style={{ fontWeight: 700, display: "block" }}>Add notes or a PDF</span>
            <span className="p-sub" style={{ fontSize: 13 }}>We turn it into cards and a quiz</span>
          </span>
        </button>
        <div style={{ fontSize: 14 }}><b>Mon, Oct 12</b> <span className="p-sub">Mistake review, {mistakes} questions</span></div>
        <div className="p-card" style={{ boxShadow: "none", background: "var(--soft)" }}>
          <div className="p-row between" style={{ fontSize: 13 }}>
            <b>Essential, free</b>
            <span className="tabular">31 of 50 tutor messages</span>
          </div>
          <div className="bar" style={{ marginTop: 8, height: 8 }} role="img" aria-label="31 of 50 tutor messages used today">
            <span style={{ width: "62%" }} />
          </div>
          <div className="p-sub" style={{ fontSize: 13, marginTop: 6 }}>Resets at midnight. Cards and notes never count.</div>
        </div>
      </div>
    </div>
  );
}

function Upload({ subject, onFile, onError }: { subject: string; onFile: (f: FileInfo) => void; onError: (e: UploadError) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  // The preview only reads the file's name and size. Nothing is uploaded.
  const handle = (f: File | undefined) => {
    if (!f) return;
    if (f.size > MAX_BYTES) {
      onError({ file: f.name, reason: `It is ${fmtSize(f.size)}, and the limit is 25 MB. Try splitting it into smaller parts.` });
      return;
    }
    if (f.size === 0) {
      onError({ file: f.name, reason: "The file is empty, so there is nothing to read." });
      return;
    }
    onFile({ name: f.name, meta: fmtSize(f.size) });
  };

  return (
    <div>
      <Header title={`Add to ${subject}`} sub="Uses 1 of 10 uploads this month" />
      <div className="p-stack">
        <button
          type="button"
          className={`p-drop${over ? " over" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files?.[0]); }}
        >
          <Icon name="upload" />
          <span style={{ fontWeight: 700, fontSize: 17 }}>Choose or drop a file</span>
          <span className="p-sub" style={{ fontSize: 13 }}>PDF, Word or a photo. Up to 25 MB.</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          tabIndex={-1}
          accept=".pdf,.doc,.docx,.txt,.md,.ppt,.pptx,image/*"
          onChange={(e) => { handle(e.target.files?.[0]); e.target.value = ""; }}
        />
        <div className="p-row" style={{ gap: 6, flexWrap: "wrap" }}>
          {([["file", "PDF"], ["text", "Word"], ["camera", "Photo of notes"], ["edit", "Paste text"]] as [IconName, string][]).map(([i, l]) => (
            <span key={l} className="chip chip-neutral" style={{ fontSize: 13 }}><Icon name={i} />{l}</span>
          ))}
        </div>
        <div className="p-sub" style={{ fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>Or try a sample</div>
        <button type="button" className="p-card p-row" style={{ textAlign: "left", width: "100%" }} onClick={() => onFile(SAMPLE_FILE)}>
          <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="file" /></span>
          <span style={{ flex: 1 }}>
            <b style={{ display: "block" }}>{SAMPLE_FILE.name}</b>
            <span className="p-sub" style={{ fontSize: 13 }}>{SAMPLE_FILE.meta}</span>
          </span>
          <Icon name="arrowRight" className="icon" />
        </button>
        <button
          type="button"
          className="p-card p-row"
          style={{ textAlign: "left", width: "100%" }}
          onClick={() => onError({ file: LOCKED_FILE.name, reason: "The file is password protected, so we cannot open it." })}
        >
          <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="lock" /></span>
          <span style={{ flex: 1 }}>
            <b style={{ display: "block" }}>{LOCKED_FILE.name}</b>
            <span className="p-sub" style={{ fontSize: 13 }}>See what happens when a file fails</span>
          </span>
          <Icon name="arrowRight" className="icon" />
        </button>
        <p className="p-sub" style={{ fontSize: 13, textAlign: "center" }}>
          <Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Preview only: your file stays on this device.
        </p>
      </div>
    </div>
  );
}

function UploadErrorScreen({ error, onRetry, onSample }: { error: UploadError; onRetry: () => void; onSample: () => void }) {
  return (
    <div className="p-stack">
      <Header title="Upload" onBack={onRetry} />
      <span className="tile t4" style={{ width: 56, height: 56 }}><Icon name="alert" /></span>
      <div className="p-title" style={{ fontSize: 24, wordBreak: "break-word" }}>We could not read {error.file}</div>
      <p>{error.reason} Nothing was counted against your 10 uploads.</p>
      <div className="p-card">
        <div style={{ fontWeight: 700 }}>What usually works</div>
        <ul style={{ paddingLeft: 18, marginTop: 6, fontSize: 14 }} className="p-sub">
          <li>Open it and save a copy without a password</li>
          <li>Print to PDF, then upload the new file</li>
          <li>Take photos of the pages instead</li>
        </ul>
      </div>
      <button type="button" className="p-btn block" onClick={onRetry}>Try another file</button>
      <button type="button" className="p-btn sec block" onClick={onSample}>Use the sample file</button>
    </div>
  );
}

function Processing({ file, onCancel, onDone }: { file: FileInfo; onCancel: () => void; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (step >= PREP_STEPS.length) {
      const t = setTimeout(() => doneRef.current(), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 950);
    return () => clearTimeout(t);
  }, [step]);

  const pct = Math.round((step / PREP_STEPS.length) * 100);
  return (
    <div className="p-stack">
      <Header
        title="Preparing your study set"
        end={<button type="button" className="p-close" onClick={onCancel} aria-label="Cancel"><Icon name="x" /></button>}
      />
      <div className="p-card p-row">
        <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="file" /></span>
        <div style={{ minWidth: 0 }}>
          <b style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</b>
          <span className="p-sub" style={{ fontSize: 13 }}>{file.meta}, for AP Statistics</span>
        </div>
      </div>
      <div>
        <div className="p-row between" style={{ alignItems: "baseline" }}>
          <span className="p-big tabular" style={{ fontSize: 44, color: "var(--ink)" }}>{pct}%</span>
          <span className="p-sub" style={{ fontSize: 13 }}>{step >= PREP_STEPS.length ? "Done" : "About a minute left"}</span>
        </div>
        <div
          className="bar"
          style={{ marginTop: 8 }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Study set progress"
        >
          <span style={{ width: `${pct}%`, transition: "width 400ms ease-out" }} />
        </div>
      </div>
      <div className="p-card p-list" style={{ padding: "2px 14px" }}>
        {PREP_STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "working" : "waiting";
          return (
            <div key={s.label} className="p-li" style={{ fontWeight: state === "working" ? 700 : 400, color: state === "waiting" ? "var(--muted)" : undefined }}>
              <span className={`p-check ${state === "done" ? "done" : state === "working" ? "working" : ""}`}>
                {state === "done" && <Icon name="check" />}
              </span>
              {s.label}
              <span className="end">{state === "done" ? s.done : state === "working" ? "Working" : "Waiting"}</span>
            </div>
          );
        })}
      </div>
      <div className="note-dashed" style={{ fontSize: 13 }}>
        Preview only. Reading and generating from real files needs backend integration. Steps and timings here are sample.
      </div>
    </div>
  );
}

function Ready({ file, go }: { file: FileInfo; go: (s: Screen) => void }) {
  const made: { icon: IconName; n: string; l: string }[] = [
    { icon: "text", n: "12", l: "note sections" },
    { icon: "cards", n: "64", l: "flashcards" },
    { icon: "list", n: "10", l: "quiz questions" },
    { icon: "book", n: "8", l: "study guide sections" },
  ];
  return (
    <div className="p-stack">
      <div className="p-sub" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
      <div className="p-hero ink pop">
        <span className="circle circle-big" aria-hidden="true" />
        <span className="circle circle-hot" aria-hidden="true" />
        <div style={{ fontSize: 14, color: "#C7A9AF" }}>Study set ready. We made</div>
        <div className="p-big">64<small>cards</small></div>
        <p style={{ fontSize: 13, color: "#C7A9AF", marginTop: 8, maxWidth: 190 }}>Sample result. Generation needs backend.</p>
      </div>
      <div className="p-card p-list" style={{ padding: "2px 14px" }}>
        {made.map((m) => (
          <div key={m.l} className="p-li">
            <Icon name={m.icon} className="icon" style={{ color: "var(--brand)" }} />
            <span><b className="tabular">{m.n}</b> {m.l}</span>
          </div>
        ))}
      </div>
      <button type="button" className="p-btn block" onClick={() => go("tutor")}><Icon name="chat" /> Ask the tutor</button>
      <div className="p-row" style={{ gap: 8 }}>
        <button type="button" className="p-btn sec" style={{ flex: 1 }} onClick={() => go("cards")}>Review cards</button>
        <button type="button" className="p-btn sec" style={{ flex: 1 }} onClick={() => go("quiz")}>Take quiz</button>
      </div>
    </div>
  );
}

type Msg = { from: "user" | "ai"; label?: string; text: string; sources?: string[]; full?: boolean; note?: boolean };

function Tutor({ onBack, onCard }: { onBack: () => void; onCard: (c: Card) => void }) {
  const [level, setLevel] = useState(1);
  const [extra, setExtra] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [used, setUsed] = useState(31);
  const [toast, setToast] = useState("");
  const [carded, setCarded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [level, extra.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setUsed((u) => Math.min(50, u + 1));
    setExtra((m) => [
      ...m,
      { from: "user", text },
      {
        from: "ai",
        note: true,
        label: "Sample reply",
        text: "This preview cannot answer new questions yet. In the app, the tutor answers from your uploads with page links, and says so when your sources do not cover something.",
      },
    ]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <Header title="AI tutor" sub="AP Statistics, using 2 sources" onBack={onBack} end={<span className="chip" style={{ fontSize: 13 }}>Hints first</span>} />
      <div className="p-chat">
        <div className="p-msg-user">{TUTOR.question}</div>
        {TUTOR.hints.slice(0, level).map((h, i) => (
          <div key={h.label} className={`p-msg-ai${i === 2 ? " full" : ""} pop`}>
            <div className="lbl">{h.label}</div>
            <div>{h.text}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {h.sources.map((s) => (
                <span key={s} className="p-src"><Icon name="file" />{s}</span>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {level < 3 && (
            <button type="button" className="p-btn" onClick={() => setLevel((l) => l + 1)}>
              {level === 1 ? "Show hint 2" : "Show full explanation"}
            </button>
          )}
          <button type="button" className="p-btn sec" onClick={() => inputRef.current?.focus()}>Let me try</button>
          <button
            type="button"
            className="p-btn sec"
            disabled={carded}
            onClick={() => {
              onCard({ q: "Why does the standard error shrink as n grows?", a: "Averages soften extreme values, so larger samples give means that cluster more tightly. SE = σ / √n.", src: "Week 5 Sampling, p. 12" });
              setCarded(true);
              setToast("Card added to AP Statistics. You can edit it in Review.");
            }}
          >
            {carded ? "Card added" : "Make a flashcard"}
          </button>
        </div>
        {extra.map((m, i) =>
          m.from === "user" ? (
            <div key={i} className="p-msg-user">{m.text}</div>
          ) : (
            <div key={i} className="p-msg-ai" style={{ background: "var(--soft)" }}>
              <div className="lbl" style={{ color: "var(--muted)" }}>{m.label}</div>
              <div style={{ fontSize: 14 }}>{m.text}</div>
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>
      <div style={{ flex: 1 }} />
      {toast && (
        <div role="status" className="p-card pop" style={{ position: "sticky", bottom: 8, fontSize: 14, display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
          <Icon name="check" className="icon" style={{ color: "var(--brand)" }} /> {toast}
        </div>
      )}
      <div style={{ position: "sticky", bottom: -16, background: "var(--bg)", margin: "12px -16px -16px", padding: "10px 16px 14px", borderTop: "1px solid var(--line)" }}>
        <p className="p-sub" style={{ fontSize: 13, textAlign: "center", marginBottom: 8 }}>
          Sample chat. Live answers need backend. Check key facts against your sources. <span className="tabular">{used} of 50</span> today.
        </p>
        <form className="p-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <label htmlFor="tutor-input" className="sr-only">Ask about your sources</label>
          <input id="tutor-input" ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask about your sources" autoComplete="off" />
          <button type="submit" className="p-send" aria-label="Send" disabled={!draft.trim()}><Icon name="arrowUp" /></button>
        </form>
      </div>
    </div>
  );
}

function Cards({ cards, setCards, onBack }: { cards: Card[]; setCards: (c: Card[]) => void; onBack: () => void }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [editing, setEditing] = useState(false);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [felt, setFelt] = useState<string[]>([]);

  const card = cards[i];

  if (!card) {
    const good = felt.filter((f) => f === "Good" || f === "Easy").length;
    return (
      <div className="p-stack">
        <Header title="Session complete" sub="Friday, October 9" onBack={onBack} />
        <div className="p-hero ink pop">
          <span className="circle circle-big" aria-hidden="true" />
          <span className="circle circle-hot" aria-hidden="true" />
          <div className="p-big">{cards.length}<small>cards reviewed</small></div>
          <p style={{ fontSize: 14, color: "#C7A9AF", marginTop: 8 }}>{good} of {cards.length} felt good or easy.</p>
        </div>
        <div className="p-card">
          <div style={{ fontWeight: 700 }}>All caught up</div>
          <div className="p-sub">Next cards due 9:00 AM tomorrow. Nothing is overdue.</div>
        </div>
        <button type="button" className="p-btn block" onClick={() => { setI(0); setFelt([]); setFlipped(false); }}>Review again</button>
        <button type="button" className="p-btn sec block" onClick={onBack}>Back to today</button>
      </div>
    );
  }

  const rate = (r: string) => {
    setFelt((f) => [...f, r]);
    setFlipped(false);
    setI((n) => n + 1);
  };

  const startEdit = () => { setQ(card.q); setA(card.a); setEditing(true); };
  const save = () => {
    const next = cards.slice();
    next[i] = { ...card, q: q.trim() || card.q, a: a.trim() || card.a };
    setCards(next);
    setEditing(false);
  };

  return (
    <div className="p-stack">
      <Header title="Statistics flashcards" sub={`Card ${i + 1} of ${cards.length}. Review pace is up to you.`} onBack={onBack} />
      <div className="segments" role="img" aria-label={`Card ${i + 1} of ${cards.length}`}>
        {cards.map((_, n) => <span key={n} className={n < i ? "done" : n === i ? "now" : ""} />)}
      </div>
      {editing ? (
        <div className="p-flash">
          <span className="chip" style={{ alignSelf: "flex-start", fontSize: 13 }}><Icon name="edit" /> Editing card</span>
          <label htmlFor="card-q" style={{ fontWeight: 700, fontSize: 14 }}>Question</label>
          <textarea id="card-q" value={q} onChange={(e) => setQ(e.target.value)} />
          <label htmlFor="card-a" style={{ fontWeight: 700, fontSize: 14 }}>Answer</label>
          <textarea id="card-a" value={a} onChange={(e) => setA(e.target.value)} />
          <div className="p-row" style={{ gap: 8 }}>
            <button type="button" className="p-btn" style={{ flex: 1 }} onClick={save}>Save card</button>
            <button type="button" className="p-btn sec" style={{ flex: 1 }} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={`p-flash${flipped ? " back" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? `Answer: ${card.a}. Tap to see the question.` : `Question: ${card.q}. Tap to see the answer.`}
        >
          <span className="p-row between" style={{ width: "100%" }}>
            <span className="chip" style={{ fontSize: 13 }}>{flipped ? "Answer" : "Question"}</span>
          </span>
          <span className="q" style={flipped ? { fontSize: 18, fontFamily: "var(--font-body)", fontWeight: 400 } : undefined}>
            {flipped ? card.a : card.q}
          </span>
          <span className="p-sub" style={{ fontSize: 13, marginTop: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="file" style={{ width: 14, height: 14 }} /> From {card.src}
          </span>
        </button>
      )}
      {!editing && (
        <button type="button" className="p-btn sec" style={{ justifySelf: "start" }} onClick={startEdit}><Icon name="edit" /> Edit card</button>
      )}
      {!editing && (flipped ? (
        <div>
          <div className="p-sub" style={{ fontSize: 13, marginBottom: 6 }}>How did that feel?</div>
          <div className="p-rate">
            {[["Again", "<1 min"], ["Hard", "1 day"], ["Good", "3 days"], ["Easy", "7 days"]].map(([l, t]) => (
              <button key={l} type="button" onClick={() => rate(l)}>{l}<small>{t}</small></button>
            ))}
          </div>
        </div>
      ) : (
        <button type="button" className="p-btn block" onClick={() => setFlipped(true)}>Show answer</button>
      ))}
    </div>
  );
}

function Quiz({ onClose, onMistakes, onReview }: { onClose: () => void; onMistakes: (n: number) => void; onReview: () => void }) {
  const [qi, setQi] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const [right, setRight] = useState(0);
  const [reported, setReported] = useState(false);

  const done = qi >= QUIZ.length;
  const wrongCount = QUIZ.length - right;

  useEffect(() => {
    if (done && !reported) {
      onMistakes(wrongCount);
      setReported(true);
    }
  }, [done, reported, wrongCount, onMistakes]);

  if (done) {
    const pct = Math.round((right / QUIZ.length) * 100);
    return (
      <div className="p-stack">
        <Header title="Quiz results" sub="Friday, October 9" end={<button type="button" className="p-close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>} />
        <div className="p-hero ink pop">
          <span className="circle circle-big" aria-hidden="true" />
          <span className="circle circle-hot" aria-hidden="true" />
          <div style={{ fontSize: 14, color: "#C7A9AF" }}>AP Statistics, Sampling distributions</div>
          <div className="p-big">{pct}%<small className="tabular">{right} of {QUIZ.length}</small></div>
          <p style={{ fontSize: 14, color: "#C7A9AF", marginTop: 8 }}>
            {wrongCount === 0 ? "Every answer landed. Nothing new to revisit." : `${wrongCount} ${wrongCount === 1 ? "question went" : "questions went"} to your mistake review, to revisit later.`}
          </p>
        </div>
        {wrongCount > 0 && <button type="button" className="p-btn block" onClick={onReview}><Icon name="refresh" /> See mistake review</button>}
        <button type="button" className="p-btn sec block" onClick={() => { setQi(0); setRight(0); setPick(null); setChecked(false); setReported(false); }}>Try again</button>
      </div>
    );
  }

  const item = QUIZ[qi];
  const correct = pick === item.answer;

  const check = () => {
    setChecked(true);
    if (correct) setRight((r) => r + 1);
  };
  const next = () => { setQi((n) => n + 1); setPick(null); setChecked(false); setHint(false); };

  return (
    <div className="p-stack">
      <div className="p-row">
        <button type="button" className="p-close" onClick={onClose} aria-label="Close quiz"><Icon name="x" /></button>
        <div className="segments" style={{ flex: 1 }} role="img" aria-label={`Question ${qi + 1} of ${QUIZ.length}`}>
          {QUIZ.map((_, n) => <span key={n} className={n < qi ? "done" : n === qi ? "now" : ""} />)}
        </div>
        <b className="tabular" style={{ fontSize: 14 }}>{qi + 1} of {QUIZ.length}</b>
      </div>
      <div className="p-card">
        <span className="chip" style={{ fontSize: 13 }}>AP Statistics, practice</span>
        <div className="p-h" style={{ fontSize: 20, marginTop: 10 }} id={`quiz-q-${qi}`}>{item.q}</div>
      </div>
      <div className="p-stack" style={{ gap: 8 }} role="radiogroup" aria-labelledby={`quiz-q-${qi}`}>
        {item.options.map((o, n) => {
          const isAns = checked && n === item.answer;
          const isWrongPick = checked && n === pick && !correct;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={pick === n}
              disabled={checked}
              className={`p-opt${isAns ? " correct" : ""}${isWrongPick ? " wrong" : ""}`}
              onClick={() => setPick(n)}
            >
              <span className="key">{"ABCD"[n]}</span>
              {o}
              {isAns && <span className="tag"><Icon name="check" />Correct</span>}
              {isWrongPick && <span className="tag"><Icon name="x" />Your answer</span>}
            </button>
          );
        })}
      </div>
      {hint && !checked && (
        <div className="p-sheet" role="status">
          <h4><Icon name="bulb" /> Hint</h4>
          <p>{item.hint}</p>
        </div>
      )}
      {checked && (
        <div className="p-sheet" role="status">
          <h4><Icon name={correct ? "check" : "info"} />{correct ? "Correct" : "Not quite, and that is useful to know"}</h4>
          <p>{correct ? item.right : item.wrong}</p>
          <span className="p-src" style={{ marginTop: 10 }}><Icon name="file" />{item.src}</span>
        </div>
      )}
      <div className="p-row" style={{ gap: 8 }}>
        {!checked ? (
          <>
            <button type="button" className="p-btn sec" onClick={() => setHint(true)} disabled={hint}>Hint</button>
            <button type="button" className="p-btn" style={{ flex: 1 }} disabled={pick === null} onClick={check}>Check answer</button>
          </>
        ) : (
          <button type="button" className="p-btn block" onClick={next}>{qi + 1 === QUIZ.length ? "See results" : "Continue"}</button>
        )}
      </div>
    </div>
  );
}

function Progress({ mistakes, go }: { mistakes: number; go: (s: Screen) => void }) {
  return (
    <div className="p-stack">
      <Header title="Progress" sub="Exam prep and your week" />
      <div className="p-hero burg">
        <span className="circle circle-big" aria-hidden="true" />
        <div style={{ fontSize: 13, color: "#F7EAEC" }}>AP Statistics midterm, Monday, October 19</div>
        <div className="p-big">10<small>days</small></div>
        <p style={{ fontSize: 13, color: "#F7EAEC", marginTop: 8 }}>
          About 64% ready. Adding 35 minutes a day gets you to roughly 85%. Estimate, needs backend scoring.
        </p>
      </div>
      <div className="p-card">
        <div className="p-row between">
          <b>Mistake review</b>
          <span className="chip chip-solid tabular" style={{ fontSize: 13 }}>{mistakes} to revisit</span>
        </div>
        <div className="p-sub" style={{ fontSize: 13, marginTop: 4 }}>Standard error, z-scores and heart valves.</div>
        <button type="button" className="p-btn sec block" style={{ marginTop: 10 }} onClick={() => go("quiz")}><Icon name="refresh" /> Practice these</button>
      </div>
      <div className="p-card">
        <b>Weak spots</b>
        <div className="p-stack" style={{ gap: 10, marginTop: 10 }}>
          {WEAK.map((w) => (
            <div key={w.topic}>
              <div className="p-row between" style={{ fontSize: 13 }}><span>{w.topic}</span><b className="tabular">{w.pct}%</b></div>
              <div className="bar accent" style={{ height: 8, marginTop: 4 }} role="img" aria-label={`${w.topic}: ${w.pct}% of recent answers right`}>
                <span style={{ width: `${w.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-card">
        <div className="p-row between"><b>Your plan</b><span className="p-sub" style={{ fontSize: 13 }}>Change any day</span></div>
        <div className="p-list" style={{ marginTop: 4 }}>
          {PLAN_DAYS.map((d) => (
            <div key={d.n} className="p-li" style={{ fontSize: 14 }}>
              <span style={{ width: 36, textAlign: "center", lineHeight: 1.1 }}>
                <span style={{ fontSize: 13, color: "var(--muted)", display: "block" }}>{d.d}</span>
                <b className="tabular" style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{d.n}</b>
              </span>
              <span style={{ flex: 1 }}>{d.task}{d.today && <span className="chip" style={{ fontSize: 13, marginLeft: 6, minHeight: 22, padding: "0 8px" }}>Today</span>}</span>
              <span className="end tabular">{d.min} min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
