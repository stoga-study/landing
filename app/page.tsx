import Image from "next/image";
import { Demo } from "@/components/demo/Demo";
import { DemoLabel } from "@/components/DemoLabel";
import { Footer } from "@/components/Footer";
import { Funding } from "@/components/Funding";
import { Header } from "@/components/Header";
import { Icon, type IconName } from "@/components/Icon";
import { Plans } from "@/components/Plans";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stoga.study",
  url: "https://stoga.study",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "A free, calm AI study app for Conestoga High School students: upload notes and PDFs, then get hint-first tutoring, editable flashcards, practice quizzes and a study plan.",
  offers: [
    { "@type": "Offer", name: "Essential", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Independent", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Unlimited", price: "10", priceCurrency: "USD" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Features />
        <TutorSection />
        <PlansSection />
        <FundingSection />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="ink-panel hero-panel">
          <span className="circle circle-big" aria-hidden="true" />
          <span className="circle circle-hot" aria-hidden="true" />
          <span className="circle circle-accent" aria-hidden="true" />
          <div className="hero-copy">
            <span className="sticker">Free for every CHS student</span>
            <h1 id="hero-title">Study smarter from your own notes.</h1>
            <p className="hero-lede">
              Upload a PDF or class notes. Get hints first, then flashcards, practice quizzes and a study plan, all linked back to your pages.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-inverse" href="#how-it-works">
                <DemoLabel /> <Icon name="arrowRight" />
              </a>
              <a className="btn btn-ghost" href="#plans">See plans</a>
            </div>
            <ul className="hero-meta">
              <li><Icon name="check" /> Essential is free, not a trial</li>
              <li><Icon name="check" /> No card needed</li>
              <li><Icon name="check" /> Every answer cites your pages</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <HeroPhone />
          </div>
        </div>
        <div className="proof">
          {(
            [
              ["upload", "", "Upload to study in a minute", "Drop in a PDF, slides or a photo of notes. Get cards, a quiz and a guide."],
              ["bulb", "t2", "Help before answers", "Hints come first. The full answer comes last, only when you ask."],
              ["file", "t3", "Your pages, your sources", "Answers point to the exact page they came from, so you can check."],
            ] as [IconName, string, string, string][]
          ).map(([icon, cls, t, d]) => (
            <div key={t} className="card">
              <span className={`tile ${cls}`}><Icon name={icon} /></span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// A static, decorative dashboard. The interactive version lives in the demo.
function HeroPhone() {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="phone-status"><span>9:41</span><span /></div>
        <div className="phone-body" style={{ overflow: "hidden" }}>
          <div className="p-top">
            <div className="p-brand">
              <Image className="seal" src="/seal.png" alt="" width={30} height={30} />
              Stoga.study
            </div>
          </div>
          <div className="p-date">Friday, October 9</div>
          <div className="p-title" style={{ marginBottom: 14 }}>Today, Aarav</div>
          <div className="p-stack">
            <div className="p-hero burg">
              <span className="circle circle-big" />
              <div style={{ fontSize: 14, color: "#F7EAEC" }}>Flashcards due today</div>
              <div className="p-row" style={{ alignItems: "flex-end", gap: 10 }}>
                <div className="p-big">38</div>
                <p style={{ fontSize: 13, color: "#F7EAEC", paddingBottom: 6 }}>About 15 minutes across AP Statistics and Honors Anatomy.</p>
              </div>
              <span className="p-btn inv block" style={{ marginTop: 12 }}>Start review</span>
            </div>
            <div className="p-card">
              <div className="p-row">
                <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="chat" /></span>
                <div>
                  <div className="p-sub" style={{ fontSize: 13 }}>AP Statistics</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>Sampling distributions</div>
                </div>
              </div>
              <div className="segments" style={{ margin: "12px 0" }}>
                <span className="done" /><span className="done" /><span className="done" /><span /><span />
              </div>
              <div className="p-row between">
                <span className="p-sub" style={{ fontSize: 13 }}>Step 3 of 5</span>
                <span className="p-btn" style={{ minHeight: 40 }}>Resume</span>
              </div>
            </div>
            <div className="p-card dashed p-row">
              <span className="tile soft" style={{ width: 40, height: 40 }}><Icon name="upload" /></span>
              <span>
                <b style={{ display: "block" }}>Add notes or a PDF</b>
                <span className="p-sub" style={{ fontSize: 13 }}>We turn it into cards and a quiz</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- How it works (interactive demo) ---------------- */

const WORKFLOW: [IconName, string, string, string][] = [
  ["users", "", "Get set up", "Pick your classes in under a minute. No card, no trial clock."],
  ["upload", "t2", "Add your notes", "A PDF, Word file, slides, a photo of handwritten notes or pasted text, up to 25 MB."],
  ["list", "t3", "Get a study set", "Notes, flashcards, a practice quiz and a study guide, all linked to your page numbers."],
  ["chat", "t4", "Ask the tutor", "Hints first, then a closer hint, and the full explanation only when you ask."],
  ["cards", "", "Review flashcards", "Edit any card, rate how it felt, and it comes back just before you would forget."],
  ["check", "t2", "Practice quiz", "Feedback after every answer, with the source page. Misses go to your mistake review."],
  ["chart", "t3", "Plan and track", "Days to your exam, an honest readiness estimate, weak spots and a plan for the week."],
];

function HowItWorks() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="hiw-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 id="hiw-title">From upload to study set, in one sitting</h2>
          <p className="wide-only">
            Tap through the real flow. Add a file, watch it become a study set, then try the tutor, cards and a quiz. Everything here runs in your browser with sample content.
          </p>
          <p className="narrow-only">
            Seven short steps take you from a file to a full study set, then into the tutor, cards and quizzes.
          </p>
        </div>
        {/* The interactive preview needs room, so phones get a static walkthrough instead. */}
        <div className="wide-only">
          <Demo />
        </div>
        <ol className="narrow-only steps-static">
          {WORKFLOW.map(([icon, cls, t, d], i) => (
            <li key={t} className="card">
              <span className={`tile ${cls}`}><Icon name={icon} /></span>
              <div>
                <div className="step-n">Step {i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="narrow-only callout neutral" style={{ marginTop: 16 }}>
          <Icon name="info" />
          <span><b>Want to try it?</b> The interactive demo opens on a tablet or computer. Visit stoga.study on a bigger screen to tap through it.</span>
        </div>
        <p className="demo-note wide-only">
          <span className="label-backend"><Icon name="plug" /> Preview</span>{" "}
          Sample content throughout. Reading files, generating study sets and live tutor answers need backend integration.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Everything in one place</span>
          <h2 id="features-title">Built around how CHS students actually study</h2>
          <p>Every feature is in every plan, including the free one.</p>
        </div>
        <div className="bento">
          <article className="ink-panel feature b-2 b-wide-md">
            <span className="circle circle-big" aria-hidden="true" />
            <span className="circle circle-hot" aria-hidden="true" />
            <span className="chip chip-dark" style={{ alignSelf: "flex-start" }}>Study dashboard</span>
            <div>
              <div className="ink-muted" style={{ fontSize: 15 }}>Flashcards due today</div>
              <div className="big-num">38<small>cards</small></div>
            </div>
            <p>One number that answers the question you opened the app with. About 15 minutes across AP Statistics and Honors Anatomy.</p>
          </article>

          <article className="card feature b-4">
            <span className="tile"><Icon name="book" /></span>
            <h3>Subject workspaces</h3>
            <p>Each class keeps its own sources, notes, cards, quizzes and study guide, so AP Statistics never mixes with English 10.</p>
            <ul className="mini-list demo-bit">
              {[["AP Statistics", "4 sources", "12 due"], ["Honors Anatomy", "6 sources", "18 due"], ["English 10", "3 sources", "8 due"]].map(([n, s, d]) => (
                <li key={n}><Icon name="book" /><span><b>{n}</b> <span className="muted">· {s}</span></span><span className="end">{d}</span></li>
              ))}
            </ul>
          </article>

          <article className="card feature b-3">
            <span className="tile t2"><Icon name="upload" /></span>
            <h3>Notes and PDF uploads</h3>
            <p>PDF, Word, slides, a photo of handwritten notes or pasted text, up to 25 MB. If a file cannot be read, you are told why, and it does not count.</p>
            <ul className="mini-list demo-bit">
              <li><Icon name="file" />Week 5 Sampling.pdf<span className="end muted" style={{ fontWeight: 400, fontFamily: "var(--font-body)", fontSize: 14 }}>24 pages</span></li>
              <li><Icon name="camera" />Ch. 7 notes (photo)<span className="end muted" style={{ fontWeight: 400, fontFamily: "var(--font-body)", fontSize: 14 }}>6 pages</span></li>
            </ul>
          </article>

          <article className="card feature b-3">
            <span className="tile t3"><Icon name="cards" /></span>
            <h3>Editable flashcards</h3>
            <p>Cards are written from your pages and every one can be edited. Spaced review brings each card back just before you would forget it.</p>
            <div className="demo-bit" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className="chip">standard error</span>
              <span className="chip">sample mean</span>
              <span className="chip chip-solid">12 due</span>
              <span className="chip chip-neutral"><Icon name="edit" />Edit any card</span>
            </div>
          </article>

          <article className="card feature b-2">
            <span className="tile t4"><Icon name="list" /></span>
            <h3>Practice quizzes</h3>
            <p>Short steps, big targets and feedback after every answer, with the source page. No timers, no sounds.</p>
            <div className="demo-bit">
              <div className="segments" role="img" aria-label="Question 4 of 10">
                <span className="done" /><span className="done" /><span className="done" /><span className="now" /><span /><span /><span /><span /><span /><span />
              </div>
            </div>
          </article>

          <article className="card feature b-2">
            <span className="tile"><Icon name="text" /></span>
            <h3>Study guides</h3>
            <p>Short sections, about 6 minutes each, written from your uploads in plain language, with page links throughout.</p>
            <p className="demo-bit" style={{ fontSize: 14 }}><b style={{ color: "var(--ink)" }}>Section 2 of 8:</b> Why the standard error shrinks</p>
          </article>

          <article className="ink-panel burgundy feature b-2">
            <span className="circle circle-big" aria-hidden="true" />
            <span className="chip chip-dark" style={{ alignSelf: "flex-start" }}>Exam prep</span>
            <div>
              <div className="ink-muted" style={{ fontSize: 15, color: "#F7EAEC" }}>AP Statistics midterm, Monday, October 19</div>
              <div className="big-num">10<small>days</small></div>
            </div>
            <p style={{ color: "#F7EAEC" }}>About 64% ready. Readiness is an estimate, never a grade.</p>
          </article>

          <article className="card feature b-3">
            <span className="tile t2"><Icon name="refresh" /></span>
            <h3>Mistake review</h3>
            <p>Questions you miss are saved to revisit, grouped by topic. Framed as things to revisit, never as failure.</p>
            <ul className="mini-list demo-bit">
              {[["Standard error", 3], ["Z-scores", 2], ["Heart valves", 2]].map(([t, n]) => (
                <li key={t}><Icon name="refresh" />{t}<span className="end">{n}</span></li>
              ))}
            </ul>
          </article>

          <article className="card feature b-3">
            <span className="tile t3"><Icon name="calendar" /></span>
            <h3>Study planner</h3>
            <p>Add an exam date and get a day-by-day plan that fits around practice and clubs. Move anything, any time.</p>
            <div className="week demo-bit" role="img" aria-label="Plan: Friday sampling practice 40 minutes, Saturday cards, Sunday study guide, Monday mistake review, Tuesday confidence intervals">
              <div className="day today">Fri<b>9</b>40m</div>
              <div className="day">Sat<b>10</b>15m</div>
              <div className="day">Sun<b>11</b>25m</div>
              <div className="day">Mon<b>12</b>20m</div>
              <div className="day exam">Mon<b>19</b>Exam</div>
            </div>
          </article>

          <article className="card feature b-6">
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span className="tile t4"><Icon name="chart" /></span>
              <h3>Progress tracking</h3>
            </div>
            <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              <p>See quiz results and card history by subject, find weak spots, and watch them improve. Scores come with context, and estimates are labelled as estimates.</p>
              <div className="weak">
                {[["Confidence intervals", 42], ["Sampling error", 51], ["Standard error", 58]].map(([t, p]) => (
                  <div key={t} className="weak-row">
                    <span>{t}</span>
                    <div className="bar accent" role="img" aria-label={`${t}: ${p}% right recently`}><span style={{ width: `${p}%` }} /></div>
                    <b>{p}%</b>
                  </div>
                ))}
              </div>
              <div>
                <div className="muted" style={{ fontSize: 15 }}>AP Statistics, Sampling distributions</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em", color: "var(--brand)" }}>
                  80% <span style={{ fontSize: 20, letterSpacing: 0 }}>8 of 10</span>
                </div>
                <p style={{ fontSize: 14, marginTop: 6 }}>Two questions went to your mistake review.</p>
              </div>
            </div>
          </article>
        </div>
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>Numbers shown are sample content.</p>
      </div>
    </section>
  );
}

/* ---------------- Tutor ---------------- */

function TutorSection() {
  const rules: [IconName, string, string][] = [
    ["file", "Answers from your sources", "Every answer cites the page. If your sources do not cover it, the tutor says so before using general knowledge."],
    ["info", "Admits uncertainty", "It says “I am not sure” and suggests where to check. It never invents a citation."],
    ["shield", "Learning, not shortcuts", "It will not write graded work. It offers an outline, a hint or feedback on your draft, following CHS academic integrity policy."],
    ["lock", "Private by default", "Your uploads and mistakes are yours. Nobody else sees them."],
  ];
  return (
    <section className="section" id="tutor" aria-labelledby="tutor-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The Stoga.study tutor</span>
          <h2 id="tutor-title">Help before answers. You choose how far to go.</h2>
          <p>Learning beats finishing. The hint ladder gives you the smallest push that gets you moving.</p>
        </div>
        <div className="ladder">
          <div className="rung">
            <div className="num">1</div>
            <h3>Hint</h3>
            <p>Points to the idea without giving the answer, with one guiding question.</p>
          </div>
          <div className="rung">
            <div className="num">2</div>
            <h3>Closer hint</h3>
            <p>Names the formula or the page, and lets you take the step yourself.</p>
          </div>
          <div className="rung ink-panel">
            <div className="num">3</div>
            <h3>Full explanation</h3>
            <p>Only when you ask: plain words, a worked example and the source page.</p>
          </div>
        </div>
        <div className="rules">
          {rules.map(([i, t, d]) => (
            <div key={t}>
              <h4><Icon name={i} />{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Plans / Funding ---------------- */

function PlansSection() {
  return (
    <section className="section" id="plans" aria-labelledby="plans-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Plans</span>
          <h2 id="plans-title">Studying is free here. Pick what fits.</h2>
          <p>Every plan gets the same features and the same quality of answers. Change plans any time and keep everything you made.</p>
        </div>
        <Plans />
      </div>
    </section>
  );
}

function FundingSection() {
  return (
    <section className="section" id="funding" aria-labelledby="funding-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Funding, in the open</span>
          <h2 id="funding-title">Free for every CHS student, kept going by the Stoga community</h2>
          <p>Studying should not depend on what you can pay. Unlimited plans and optional donations cover the costs, and we show exactly where the money goes.</p>
        </div>
        <Funding />
      </div>
    </section>
  );
}

/* ---------------- Trust ---------------- */

function Trust() {
  const items: [IconName, string, string, string][] = [
    ["lock", "", "Private by default", "Uploads, notes and mistakes belong to you. You can delete your material and your account at any time."],
    ["shield", "t2", "Academic integrity", "Built to support learning, not to finish assignments for you. The tutor follows CHS academic integrity policy."],
    ["access", "t3", "Accessible by design", "Targeting WCAG 2.1 AA, with Atkinson Hyperlegible type, light and dark mode, three text sizes and full keyboard support. Audit pending."],
    ["eye", "t4", "Calm, not hype", "No streak guilt, no countdowns, no confetti. Wrong answers are information. Right and wrong never rely on colour alone."],
    ["wifiOff", "", "Works on a slow connection", "Saved cards and notes are planned to work offline. The app tells you plainly when the tutor needs a connection."],
    ["users", "t2", "Clear for families", "Parents and guardians can see the plan, the costs and what each plan includes, in plain language."],
  ];
  return (
    <section className="section" id="trust" aria-labelledby="trust-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our promises</span>
          <h2 id="trust-title">A steady classmate, not a sales pitch</h2>
        </div>
        <div className="trust">
          {items.map(([i, cls, t, d]) => (
            <div key={t} className="card">
              <span className={`tile ${cls}`}><Icon name={i} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS: [string, string[]][] = [
  ["Is it really free?", [
    "Yes. Essential is free, with no card and no trial clock. It is built for a full course load: 50 tutor messages a day and 10 uploads a month, with unlimited review of the cards, notes and quizzes you already have.",
  ]],
  ["Can I use it right now?", [
    "Not yet. The app is in development. The demo on this page shows the real flow with sample content. Reading your files, generating study sets and live tutor answers need backend work that is still in progress.",
  ]],
  ["Will it do my homework for me?", [
    "No. The tutor gives hints first and the full explanation only when you ask. It will not write graded work. It can help with an outline, a hint or feedback on your own draft.",
  ]],
  ["What happens when I reach a limit?", [
    "You see a plain message, such as: “That was today’s 50 tutor messages. More arrive at midnight.” Your cards, notes and quizzes keep working. Nothing is locked away.",
  ]],
  ["What is the Independent plan?", [
    "You connect your own API key from an AI provider. Stoga charges nothing, and the provider bills the key holder, so charges may apply. Most providers require an adult account holder, so a parent or guardian usually sets it up.",
  ]],
  ["What does fair use on Unlimited mean?", [
    "Studying a lot is exactly what Unlimited is for. Fair use only rules out sharing one account or running automated scripts. If use is far beyond typical for several days, we email first and explain before limiting anything.",
  ]],
  ["Does donating unlock anything?", [
    "No. Donations help a classmate study for free. Every plan gets the same quality of answers, whether you give or not.",
  ]],
  ["Is this an official Conestoga High School app?", [
    "No. Stoga.study is built by students for CHS students. It is not run by Conestoga High School or the Tredyffrin/Easttown School District.",
  ]],
];

function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Questions</span>
          <h2 id="faq-title">Straight answers</h2>
        </div>
        <div className="faq">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Icon name="plus" />
              </summary>
              <div>{a.map((p) => <p key={p}>{p}</p>)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <section className="container" aria-labelledby="final-title">
      <div className="ink-panel final">
        <span className="circle circle-big" aria-hidden="true" />
        <span className="circle circle-hot" aria-hidden="true" />
        <span className="sticker">Free for every CHS student</span>
        <h2 id="final-title">Your notes are already enough. Let us help you use them.</h2>
        <p>Try the full upload-to-study flow now. It takes about two minutes.</p>
        <div className="hero-ctas">
          <a className="btn btn-inverse" href="#how-it-works"><DemoLabel /> <Icon name="arrowRight" /></a>
          <a className="btn btn-ghost" href="#faq">Read the FAQ</a>
        </div>
      </div>
    </section>
  );
}
