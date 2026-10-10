"use client";

import { useState } from "react";
import { DemoLabel } from "./DemoLabel";
import { Icon } from "./Icon";

type Plan = {
  name: string;
  price: string;
  per?: string;
  desc: string;
  allow: [string, string][];
  points: string[];
  cta: { label: string; href: string };
  note?: string;
  ink?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "Free",
    desc: "Normal study usage for a full course load. No card needed, ever.",
    allow: [
      ["Tutor messages", "50 a day"],
      ["Uploads", "10 a month"],
      ["Cards, notes, saved quizzes", "No limit"],
    ],
    points: ["Every feature: tutor, cards, quizzes, guides, planner", "Same answer quality as every plan", "Limits reset at midnight and on the 1st"],
    cta: { label: "Start in the demo", href: "#how-it-works" },
  },
  {
    name: "Independent",
    price: "Free",
    per: "plus provider fees",
    desc: "Bring your own API key. Your provider bills the key holder, so charges may apply. Most providers require an adult account holder, so a parent or guardian usually sets it up.",
    allow: [
      ["Tutor messages", "Your provider's limits"],
      ["Uploads", "Your provider's limits"],
      ["Paid to Stoga", "$0"],
    ],
    points: ["Use a key from a supported AI provider", "Set a monthly spending cap with your provider", "Remove the key any time"],
    cta: { label: "Preview key settings", href: "#byok" },
  },
  {
    name: "Unlimited",
    price: "$10",
    per: "a month",
    desc: "Heavy use with plain-language fair use. Cancel any time and keep your content.",
    allow: [
      ["Tutor messages", "No daily cap"],
      ["Uploads", "No monthly cap"],
      ["Fair use", "Explained below"],
    ],
    points: ["Helps keep Essential free for everyone", "A parent or guardian pays and approves", "We email before limiting anything"],
    cta: { label: "Read fair use", href: "#fair-use" },
    note: "Checkout is not live yet. Payments need backend integration.",
    ink: true,
  },
];

const PROVIDERS = {
  anthropic: { name: "Anthropic (Claude)", prefix: "sk-ant-", placeholder: "sk-ant-…" },
  openai: { name: "OpenAI", prefix: "sk-", placeholder: "sk-…" },
  google: { name: "Google (Gemini)", prefix: "AIza", placeholder: "AIza…" },
} as const;
type Provider = keyof typeof PROVIDERS;

type KeyState = { kind: "idle" } | { kind: "empty" } | { kind: "bad"; prefix: string } | { kind: "ok" };

export function Plans() {
  return (
    <>
      <div className="plans">
        {PLANS.map((p) => (
          <article key={p.name} className={`plan ${p.ink ? "ink-panel" : "card"}`} aria-labelledby={`plan-${p.name}`}>
            {p.ink && <span className="circle circle-big" aria-hidden="true" />}
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
              {p.points.map((pt) => (
                <li key={pt}>
                  <Icon name="check" />
                  {pt}
                </li>
              ))}
            </ul>
            {p.note && (
              <span className="label-backend" style={{ background: "transparent", color: "var(--ink-muted)", borderColor: "#5A2431", alignSelf: "flex-start" }}>
                <Icon name="plug" /> {p.note}
              </span>
            )}
            <a className={`btn ${p.ink ? "btn-inverse" : p.name === "Essential" ? "btn-primary" : "btn-secondary"}`} href={p.cta.href}>
              {p.cta.href === "#how-it-works" ? <DemoLabel wide={p.cta.label} /> : p.cta.label}
            </a>
          </article>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
        Allowances are planned launch figures and may be adjusted once real costs are known. Changes are announced before they apply.
      </p>

      <div className="plan-extra">
        <ByokCard />
        <FairUseCard />
      </div>
    </>
  );
}

function ByokCard() {
  const [provider, setProvider] = useState<Provider>("anthropic");
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState<KeyState>({ kind: "idle" });
  const p = PROVIDERS[provider];

  // Format check only. This preview never sends or stores the key.
  const check = () => {
    const k = key.trim();
    if (!k) setState({ kind: "empty" });
    else if (!k.startsWith(p.prefix) || k.length < 20) setState({ kind: "bad", prefix: p.prefix });
    else setState({ kind: "ok" });
    setKey("");
  };

  return (
    <section className="card" id="byok" aria-labelledby="byok-title" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span className="tile t2"><Icon name="key" /></span>
        <div>
          <h3 id="byok-title">Your own key, Independent plan</h3>
          <span className="label-backend" style={{ marginTop: 6 }}><Icon name="plug" /> Settings preview</span>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); check(); }} noValidate>
        <div className="field">
          <label htmlFor="byok-provider">Provider</label>
          <select id="byok-provider" className="select" value={provider} onChange={(e) => { setProvider(e.target.value as Provider); setState({ kind: "idle" }); }}>
            {Object.entries(PROVIDERS).map(([id, v]) => (
              <option key={id} value={id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="byok-key">API key</label>
          <div className="input-row">
            <input
              id="byok-key"
              className="input"
              type={show ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={p.placeholder}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={state.kind === "bad" || state.kind === "empty"}
              aria-describedby="byok-hint byok-result"
            />
            <button type="button" className="icon-btn" style={{ width: 52, height: 52 }} onClick={() => setShow((s) => !s)} aria-label={show ? "Hide key" : "Show key"} aria-pressed={show}>
              <Icon name="eye" />
            </button>
          </div>
          <span className="hint" id="byok-hint">Please do not paste a real key here. This preview only checks the format, then clears the field.</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 16 }}>Check key</button>
      </form>
      <div id="byok-result" aria-live="polite">
        {state.kind === "empty" && (
          <div className="callout"><Icon name="info" /><span><b>Paste a key first.</b> You can find it in your provider&apos;s account settings.</span></div>
        )}
        {state.kind === "bad" && (
          <div className="callout"><Icon name="alert" /><span><b>That key does not look right.</b> {p.name} keys start with <code>{state.prefix}</code>. Nothing was saved and your study material is untouched.</span></div>
        )}
        {state.kind === "ok" && (
          <div className="callout"><Icon name="check" /><span><b>The format looks right.</b> In the app, we would check it with {p.name} and store it encrypted. This preview did not send or save it.</span></div>
        )}
      </div>
      <ul className="fairuse">
        <li><Icon name="info" /><span><b>Charges come from your provider, not from us.</b> Typical study use is usually small, but heavy use adds up. Set a monthly cap in your provider dashboard.</span></li>
        <li><Icon name="users" /><span>Most providers require an adult account holder, so a parent or guardian usually creates the key.</span></li>
        <li><Icon name="lock" /><span>Planned design: the key is encrypted, used only for your requests and never shown again. Needs backend integration.</span></li>
      </ul>
    </section>
  );
}

function FairUseCard() {
  return (
    <section className="card" id="fair-use" aria-labelledby="fair-title" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span className="tile"><Icon name="shield" /></span>
        <h3 id="fair-title">Fair use on Unlimited, in plain words</h3>
      </div>
      <ul className="fairuse">
        <li><Icon name="check" /><span><b>Typical heavy use is fine.</b> Studying every day, long tutor sessions before exams, uploading every handout: that is what Unlimited is for.</span></li>
        <li><Icon name="check" /><span><b>One account, one student.</b> Sharing an account or running automated scripts through it is not fair use.</span></li>
        <li><Icon name="check" /><span><b>We email first.</b> If use is far beyond typical for several days, we email you and explain before limiting anything. Nothing stops without notice.</span></li>
        <li><Icon name="check" /><span><b>Cancel any time.</b> You drop back to Essential and keep every note, card and quiz.</span></li>
      </ul>
      <div className="limit-msg">
        <div className="muted" style={{ fontSize: 14, fontWeight: 700 }}>What a limit looks like on Essential</div>
        <div className="callout neutral" style={{ marginTop: 8 }}>
          <Icon name="info" />
          <span>That was today&apos;s 50 tutor messages. More arrive at midnight. Your cards, notes and quizzes still work.</span>
        </div>
        <p className="muted" style={{ fontSize: 14, marginTop: 10 }}>A limit is a fact, not a sales moment. No countdowns, no pop-ups.</p>
      </div>
    </section>
  );
}
