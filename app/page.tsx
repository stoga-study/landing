import Image from "next/image";
import { Demo } from "@/components/demo/Demo";
import { DemoLabel } from "@/components/DemoLabel";
import { Footer } from "@/components/Footer";
import { RotatingSchool } from "@/components/RotatingSchool";
import { Header } from "@/components/Header";
import { Icon, type IconName } from "@/components/Icon";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stoga.study",
  url: "https://stoga.study",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "A free AI study app in development for Conestoga High School students: turn messy notes into organized study guides, with hint-first tutoring, flashcards and quizzes. Currently a demo.",
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
        <PrivacySection />
        <PlansSection />
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
            <h1 id="hero-title">Study like you belong at <RotatingSchool /></h1>
            <p className="hero-lede">
              Add your own notes and learn them your way: a study guide, flashcards, or a tutor that gives hints before answers. More ways to study are on the way.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-inverse" href="#how-it-works">
                <DemoLabel /> <Icon name="arrowRight" />
              </a>
              <a className="btn btn-ghost" href="/plans">See plans</a>
            </div>
            <ul className="hero-meta">
              <li><Icon name="check" /> No credit card needed (you wouldn&apos;t want to spend money on studying, would you?)</li>
              <li><Icon name="check" /> Still being built, so what you can try today is a demo</li>
            </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <HeroPhone />
          </div>
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
          <h2 id="hiw-title">From upload to study set in one sitting</h2>
          <p className="wide-only">
            This is a demo with sample content. Add a file, watch it become a study set, then poke at the tutor, cards and a quiz.
          </p>
          <p className="narrow-only">
            Seven short steps from a file to a full study set.
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
          Sample content throughout. Reading your files, building real study sets and live tutor answers are still in development.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

const FEATURES: [IconName, string, string, string, "demo" | "planned"][] = [
  ["text", "", "Messy notes in, study guide out", "Drop in a PDF, slides or a photo of your notes. We sort them into short sections with links back to your pages.", "demo"],
  ["chat", "t2", "A tutor that teaches", "It nudges you with hints, formulas and page citations instead of finishing the assignment for you.", "demo"],
  ["cards", "t3", "Flashcards and quizzes", "Cards come from your own notes, and you can edit any of them. Quizzes tell you what you missed and where to look.", "demo"],
  ["calendar", "t4", "A study plan", "Add an exam date and get a day-by-day plan you can move around.", "demo"],
  ["wifiOff", "", "Offline access", "The plan is for saved cards and notes to work offline. The AI tutor will still need a connection.", "planned"],
  ["users", "t2", "Built for families", "Parents and guardians can look over the plans, what they cost and what each one includes.", "planned"],
];

function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What it does</span>
          <h2 id="features-title">Built around how CHS students actually study</h2>
          <p>
            Items marked <span className="chip chip-solid status">In the demo</span> work in the sample above.
            Items marked <span className="chip chip-neutral status">Planned</span> are not built yet.
          </p>
        </div>
        <div className="trust">
          {FEATURES.map(([i, cls, t, d, status]) => (
            <div key={t} className="card">
              <span className={`tile ${cls}`}><Icon name={i} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className={`chip status ${status === "demo" ? "chip-solid" : "chip-neutral"}`}>
                {status === "demo" ? "In the demo" : "Planned"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tutor ---------------- */

function TutorSection() {
  return (
    <section className="section" id="tutor" aria-labelledby="tutor-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The tutor</span>
          <h2 id="tutor-title">Hints first. You choose how far to go.</h2>
          <p>The tutor gives you the smallest nudge that gets you moving, and it shows its work with page citations.</p>
        </div>
        <div className="ladder">
          <div className="rung">
            <div className="num">1</div>
            <h3>Hint</h3>
            <p>Points to the idea without giving it away, with one guiding question.</p>
          </div>
          <div className="rung">
            <div className="num">2</div>
            <h3>Closer hint</h3>
            <p>Names the formula or the page and lets you take the step yourself.</p>
          </div>
          <div className="rung ink-panel">
            <div className="num">3</div>
            <h3>Full explanation</h3>
            <p>Only when you ask, with a worked example and the source page.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Privacy widget ---------------- */

function PrivacySection() {
  const points: [IconName, string, string][] = [
    ["lock", "Your notes stay yours", "Uploads, notes and mistakes are private by default. Other students never see them."],
    ["shield", "No selling, no ads", "Your material is only used to help you study. You can delete it, or your whole account, any time."],
    ["users", "Parents can look too", "Guardians can review plans and costs. Paid plans need a parent or guardian to approve."],
  ];
  return (
    <section className="section" id="privacy" aria-labelledby="privacy-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="card privacy-widget">
          <div>
            <span className="eyebrow">Privacy</span>
            <h2 id="privacy-title">Your data, handled carefully</h2>
            <p>This is how we are designing the app. The full policy is still in review.</p>
            <a className="btn btn-secondary" href="/privacy">Read the privacy summary</a>
          </div>
          <ul>
            {points.map(([i, t, d]) => (
              <li key={t}>
                <span className="tile soft"><Icon name={i} /></span>
                <span><b>{t}</b><br /><span className="muted">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Plans summary ---------------- */

function PlansSection() {
  const plans = [
    ["Essential", "Free", "Everything you need for a full course load. No credit card."],
    ["Independent", "Free + provider fees", "Bring your own API key. A parent or guardian usually sets it up."],
    ["Unlimited", "$10 a month", "No daily caps, and it helps keep Essential free for everyone."],
  ];
  return (
    <section className="section" id="plans" aria-labelledby="plans-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Plans</span>
          <h2 id="plans-title">Free to start, simple to upgrade</h2>
          <p>Every plan gets the same features and the same quality of answers.</p>
        </div>
        <div className="plans-lite">
          {plans.map(([n, p, d]) => (
            <div key={n} className="card">
              <h3>{n}</h3>
              <div className="price-lite">{p}</div>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 20 }}><a className="btn btn-secondary" href="/plans">Compare plans and limits</a></p>
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
        <h2 id="final-title">Your notes are already enough. We just help you use them.</h2>
        <p>The demo takes about two minutes, and there is nothing to sign up for.</p>
        <div className="hero-ctas">
          <a className="btn btn-inverse" href="#how-it-works"><DemoLabel /> <Icon name="arrowRight" /></a>
          <a className="btn btn-ghost" href="/faq">Read the FAQ</a>
        </div>
      </div>
    </section>
  );
}
