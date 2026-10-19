import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APP_URL } from "@/components/links";
import { Shot } from "@/components/Shot";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stoga.study",
  url: "https://stoga.study",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "The free study app made for Conestoga High School. It has every CHS core course, syncs with your Schoology calendar, plans your week around your tests and studies from your own class notes.",
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
        <Fits />
        <Screens />
        <NotAChatbot />
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
        <div className="hero-copy">
          <span className="eyebrow">Made at Conestoga, for Conestoga</span>
          <h1 id="hero-title">The study app that already knows <em>Stoga</em>.</h1>
          <p className="hero-lede">
            Your CHS classes, your Schoology due dates, your test next Thursday and your teacher&apos;s own notes, all in one place.
            Open it and today&apos;s plan is already waiting.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg" href={APP_URL}>Get started, it&apos;s free</a>
            <a className="btn btn-secondary btn-lg" href="#how-it-fits">See how it fits</a>
          </div>
          <ul className="hero-meta">
            <li>Free for every Conestoga student</li>
            <li>No credit card</li>
            <li>Set up in about a minute</li>
          </ul>
        </div>
        <div className="hero-shot">
          <div className="wide-only">
            <div className="window">
              <div className="window-bar" aria-hidden="true"><span /><span /><span /><span className="url">beta.stoga.study</span></div>
              <Shot name="desk-home" w={1440} h={900} alt="The Stoga.study home screen: today's plan for an AP Statistics midterm in 3 days, a coach note and 38 flashcards due." priority />
            </div>
          </div>
          <div className="narrow-only">
            <div className="phone">
              <Shot name="phone-home" w={780} h={1688} alt="The Stoga.study home screen on a phone: today's plan for an AP Statistics midterm in 3 days." priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it fits into Stoga ---------------- */

const FITS: [string, string][] = [
  ["Your classes are already in.", "Every core course from the Conestoga Program of Studies is built in, updated each school year. Pick yours and you're set up. No typing in class names, no blank page."],
  ["Schoology, synced.", "Paste your Schoology calendar link once. Tests, quizzes and homework land on your calendar, sorted into the right class, and stay in sync on their own. Google, Outlook and Apple calendars work too."],
  ["Your teacher's material, not the internet.", "Add the slides, the PDF or a photo of the handout. Every flashcard, quiz question and tutor answer comes from what your class actually covered, with the page it came from."],
  ["A plan for this week, not someday.", "It counts down to every test, tells you honestly whether you're Ready, Getting there or need work, and turns that into a short plan for today. Ask the coach to move things around."],
  ["Study with your class.", "Start a group for your period, share study sets and fix them together. First names only, invite only, no chat."],
];

function Fits() {
  return (
    <section className="section rule" id="how-it-fits" aria-labelledby="fits-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it fits</span>
          <h2 id="fits-title">It plugs into the school day you already have.</h2>
          <p>Most study apps start from zero. Stoga starts with your schedule, your classes and your teacher&apos;s notes, so there&apos;s nothing to set up and nothing to keep in sync.</p>
        </div>
        <ol className="fits">
          {FITS.map(([t, d], i) => (
            <li key={t}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Real screens ---------------- */

function Screens() {
  const shots: [string, string, string, string][] = [
    ["phone-home", "Today's plan", "What to do tonight, in minutes.", "Today's plan: review 30 cards and a practice quiz for the AP Statistics midterm."],
    ["phone-calendar", "Your calendar", "Tests and homework from Schoology.", "The calendar: AP Statistics midterm in 3 days, marked Getting there, and homework due tomorrow."],
    ["phone-exam", "Ready for the test?", "A plan for every day until then.", "The midterm page: 3 days to go, a practice test, and a plan for each day before it."],
  ];
  return (
    <section className="section rule" aria-labelledby="screens-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The real app</span>
          <h2 id="screens-title">Open it, and it already knows what&apos;s next.</h2>
        </div>
        <div className="screens">
          {shots.map(([name, t, d, alt]) => (
            <figure key={name}>
              <div className="phone"><Shot name={name} w={780} h={1688} alt={alt} /></div>
              <figcaption><b>{t}</b><span>{d}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why not just a chatbot ---------------- */

const COMPARE: [string, string][] = [
  ["Knows your classes, tests and due dates before you ask.", "Starts from zero every time. You explain your class, again."],
  ["Answers from your teacher's notes, and shows you the page.", "Answers from the internet, which may not match how your class teaches it."],
  ["Gives a hint first and won't write graded work.", "Will write the whole essay, which doesn't help you on the test."],
  ["Brings back what you got wrong, right before you'd forget it.", "You have to remember what to review, and when."],
  ["Free for every Conestoga student, with no ads.", "Free tiers run out, and nothing is set up for Stoga."],
];

function NotAChatbot() {
  return (
    <section className="section rule" aria-labelledby="chatbot-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why not just ask a chatbot?</span>
          <h2 id="chatbot-title">A chatbot knows everything. Stoga knows your classes.</h2>
        </div>
        <div className="compare" role="table" aria-label="Stoga.study compared with a general chatbot">
          <div className="compare-head eyebrow" role="row">
            <div className="us-h" role="columnheader">Stoga.study</div>
            <div role="columnheader">A general chatbot</div>
          </div>
          {COMPARE.map(([us, them]) => (
            <div key={us} className="compare-row" role="row">
              <div className="us" role="cell">{us}</div>
              <div className="them" role="cell">{them}</div>
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
    <section className="section rule" id="tutor" aria-labelledby="tutor-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The tutor</span>
          <h2 id="tutor-title">It helps you get there. It won&apos;t do it for you.</h2>
          <p>The tutor knows which class you&apos;re in and works from your notes. It starts small and only goes further when you ask.</p>
        </div>
        <div className="ladder">
          <div className="card rung">
            <div className="num">01</div>
            <h3>A hint</h3>
            <p>Points you the right way without giving the answer away.</p>
          </div>
          <div className="card rung">
            <div className="num">02</div>
            <h3>A closer hint</h3>
            <p>Names the idea or the page in your notes. You take the next step.</p>
          </div>
          <div className="card rung last">
            <div className="num">03</div>
            <h3>The full explanation</h3>
            <p>When you ask for it, with a worked example and the page it came from.</p>
          </div>
        </div>
        <p className="integrity">
          No essays for English, no code outside CS classes, no graded work. Your teachers&apos; rules always come first. <a href="/faq#integrity">How we handle academic integrity</a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Privacy ---------------- */

function PrivacySection() {
  const points: [string, string][] = [
    ["Private by default", "Your uploads, notes and mistakes are yours. Other students never see them unless you share a set."],
    ["No ads, never sold", "Your material is only used to help you study. The AI providers we use don't train on it."],
    ["Yours to take or delete", "Download everything you made, or delete it and your account, any time."],
  ];
  return (
    <section className="section rule" id="privacy" aria-labelledby="privacy-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Privacy</span>
          <h2 id="privacy-title">Your notes stay yours.</h2>
        </div>
        <div className="points">
          {points.map(([t, d]) => (
            <div key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
        <p style={{ marginTop: 28 }}><a className="btn btn-secondary" href="/privacy">Read the privacy summary</a></p>
      </div>
    </section>
  );
}

/* ---------------- Plans summary ---------------- */

function PlansSection() {
  const plans = [
    ["Essential", "Free", "50 tutor messages a day and 10 new study sets a month. Every feature. Enough for a full course load."],
    ["Independent", "Free + provider fees", "Bring your own key from any OpenAI-compatible provider. A parent or guardian usually sets it up."],
    ["Unlimited", "$10 a month", "No daily caps, and it helps keep Essential free for everyone."],
  ];
  return (
    <section className="section rule" id="plans" aria-labelledby="plans-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Plans</span>
          <h2 id="plans-title">Free for every Stoga student.</h2>
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
        <p style={{ marginTop: 24 }}><a className="btn btn-secondary" href="/plans">Compare plans and limits</a></p>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <section className="container" aria-labelledby="final-title">
      <div className="card final">
        <span className="eyebrow">Free for every Conestoga student</span>
        <h2 id="final-title">Your next test is already on the calendar.</h2>
        <p>Sign in with your email, pick your classes and link Schoology. It takes about a minute.</p>
        <div className="hero-ctas">
          <a className="btn btn-primary btn-lg" href={APP_URL}>Get started, it&apos;s free</a>
          <a className="btn btn-ghost btn-lg" href="/faq">Read the FAQ</a>
        </div>
      </div>
    </section>
  );
}
