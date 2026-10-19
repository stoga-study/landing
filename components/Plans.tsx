import { APP_URL } from "./links";

type Plan = {
  name: string;
  price: string;
  per?: string;
  desc: string;
  allow: [string, string][];
  points: string[];
  cta: { label: string; href: string };
  note?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "Free",
    desc: "Normal study use for a full Conestoga course load. No card needed, ever.",
    allow: [
      ["Tutor messages", "50 a day"],
      ["New study sets", "10 a month"],
      ["Saving files, cards, notes, quizzes", "No limit"],
    ],
    points: ["Every feature: tutor, coach, cards, quizzes, calendar, groups", "Same answer quality as every plan", "Limits reset at midnight and on the 1st"],
    cta: { label: "Get started", href: APP_URL },
    featured: true,
  },
  {
    name: "Independent",
    price: "Free",
    per: "plus provider fees",
    desc: "Bring your own key for any OpenAI-compatible API. That provider bills the key holder, so a parent or guardian usually sets it up.",
    allow: [
      ["Tutor messages", "Your provider's limits"],
      ["New study sets", "Your provider's limits"],
      ["Paid to Stoga", "$0"],
    ],
    points: ["OpenAI, OpenRouter, Groq, DeepInfra, Together and more", "Set a monthly spending cap with your provider", "Remove the key any time"],
    cta: { label: "How keys work", href: "#byok" },
  },
  {
    name: "Unlimited",
    price: "$10",
    per: "a month",
    desc: "For heavy use, with plain-language fair use. Cancel any time and keep everything you made.",
    allow: [
      ["Tutor messages", "No daily cap"],
      ["New study sets", "No monthly cap"],
      ["Fair use", "See below"],
    ],
    points: ["Helps keep Essential free for everyone", "A parent or guardian pays and approves", "We tell you before limiting anything"],
    cta: { label: "Read fair use", href: "#fair-use" },
    note: "Checkout opens soon.",
  },
];

export function Plans() {
  return (
    <>
      <div className="plans">
        {PLANS.map((p) => (
          <article key={p.name} className={`card plan${p.featured ? " featured" : ""}`} aria-labelledby={`plan-${p.name}`}>
            <div>
              <h3 id={`plan-${p.name}`}>{p.name}</h3>
              <div className="price" style={{ marginTop: 10 }}>
                {p.price} {p.per && <small>{p.per}</small>}
              </div>
            </div>
            <p className="plan-desc">{p.desc}</p>
            <div className="allow" aria-label={`${p.name} allowances`}>
              {p.allow.map(([k, v]) => (
                <div key={k} className="allow-row">
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
            <ul>
              {p.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            {p.note && <p className="plan-note">{p.note}</p>}
            <a className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`} href={p.cta.href}>{p.cta.label}</a>
          </article>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
        Allowances may change once real costs are known. Changes are announced in the app before they apply.
      </p>
    </>
  );
}

export function PlanExtras() {
  return (
    <div className="plan-extra">
      <section className="card" id="byok" aria-labelledby="byok-title">
        <h3 id="byok-title">Your own key, on Independent</h3>
        <p className="muted" style={{ fontSize: 15, marginTop: 10 }}>
          In the app, open Settings, then Your own key. Any API that speaks the OpenAI format works: pick a provider or paste its address and model.
        </p>
        <ul className="plain-list">
          <li><b>Charges come from your provider, not from us.</b> Typical study use is small, but heavy use adds up, so set a monthly cap in your provider&apos;s dashboard.</li>
          <li>Most providers need an adult account holder, so a parent or guardian usually creates the key.</li>
          <li>We check the key before saving it, store it encrypted, use it only for your own requests and never show it again.</li>
        </ul>
      </section>
      <section className="card" id="fair-use" aria-labelledby="fair-title">
        <h3 id="fair-title">Fair use on Unlimited</h3>
        <ul className="plain-list">
          <li><b>Typical heavy use is fine.</b> Studying every day, long tutor sessions before finals, uploading every handout: that is what Unlimited is for.</li>
          <li><b>One account, one student.</b> Sharing an account or running scripts through it is not fair use.</li>
          <li><b>We tell you first.</b> If use is far beyond typical for several days, we explain before limiting anything. Nothing stops without notice.</li>
          <li><b>Cancel any time.</b> You drop back to Essential and keep every note, card and quiz.</li>
        </ul>
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
          On Essential, a limit looks like this: &ldquo;That was today&apos;s 50 tutor messages. More arrive at midnight. Your cards, notes and quizzes still work.&rdquo; No countdowns, no pop-ups.
        </p>
      </section>
    </div>
  );
}
