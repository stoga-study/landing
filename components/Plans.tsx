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
    cta: { label: "Try it out", href: "/#how-it-works" },
  },
  {
    name: "Independent",
    price: "Free",
    per: "plus provider fees",
    desc: "Bring your own API key from any OpenAI-compatible provider. That provider bills the key holder, so charges may apply. Most providers require an adult account holder, so a parent or guardian usually sets it up.",
    allow: [
      ["Tutor messages", "Your provider's limits"],
      ["Uploads", "Your provider's limits"],
      ["Paid to Stoga", "$0"],
    ],
    points: ["Any OpenAI-compatible API: OpenAI, OpenRouter, Groq, DeepInfra, Together and more", "Set a monthly spending cap with your provider", "Remove the key any time"],
    cta: { label: "Preview key settings", href: "#byok" },
  },
  {
    name: "Unlimited",
    price: "$10",
    per: "a month",
    desc: "For heavy use, with simple fair-use rules. Cancel any time and keep your content.",
    allow: [
      ["Tutor messages", "No daily cap"],
      ["Uploads", "No monthly cap"],
      ["Fair use", "See below"],
    ],
    points: ["Helps keep Essential free for everyone", "A parent or guardian pays and approves", "We email before limiting anything"],
    cta: { label: "Read fair use", href: "#fair-use" },
    note: "Checkout is not live yet. Payments need backend integration.",
    ink: true,
  },
];

// Any OpenAI-compatible API works. These presets only fill in the address; "Other" takes any https URL.
const PRESETS: [string, string][] = [
  ["OpenAI", "https://api.openai.com/v1"],
  ["OpenRouter", "https://openrouter.ai/api/v1"],
  ["Groq", "https://api.groq.com/openai/v1"],
  ["DeepInfra", "https://api.deepinfra.com/v1/openai"],
  ["Together", "https://api.together.xyz/v1"],
  ["Other (OpenAI-compatible)", ""],
];

type KeyState = { kind: "idle" } | { kind: "empty" } | { kind: "bad"; what: "url" | "key" } | { kind: "ok"; host: string };

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
              {p.cta.href === "/#how-it-works" ? <DemoLabel wide={p.cta.label} /> : p.cta.label}
            </a>
          </article>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
        Allowances are planned launch figures and may be adjusted once real costs are known. Changes are announced before they apply.
      </p>

    </>
  );
}

export function PlanExtras() {
  return (
    <div className="plan-extra">
      <ByokCard />
      <FairUseCard />
    </div>
  );
}

function ByokCard() {
  const [preset, setPreset] = useState(PRESETS[0][0]);
  const [baseUrl, setBaseUrl] = useState(PRESETS[0][1]);
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState<KeyState>({ kind: "idle" });

  // Format check only. This preview never sends or stores anything.
  const check = () => {
    const k = key.trim();
    let url: URL | null = null;
    try { url = new URL(baseUrl.trim()); } catch { url = null; }
    if (!k) setState({ kind: "empty" });
    else if (!url || url.protocol !== "https:") setState({ kind: "bad", what: "url" });
    else if (k.length < 16 || /\s/.test(k)) setState({ kind: "bad", what: "key" });
    else setState({ kind: "ok", host: url.host });
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
      <p className="muted" style={{ fontSize: 15, marginTop: 14 }}>Any API that speaks the OpenAI format works: pick a provider or paste its address.</p>
      <form onSubmit={(e) => { e.preventDefault(); check(); }} noValidate>
        <div className="field">
          <label htmlFor="byok-provider">Provider</label>
          <select
            id="byok-provider"
            className="select"
            value={preset}
            onChange={(e) => {
              const found = PRESETS.find(([n]) => n === e.target.value)!;
              setPreset(found[0]);
              setBaseUrl(found[1]);
              setState({ kind: "idle" });
            }}
          >
            {PRESETS.map(([n]) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="byok-url">API address (base URL)</label>
          <input
            id="byok-url"
            className="input"
            type="url"
            inputMode="url"
            value={baseUrl}
            onChange={(e) => { setBaseUrl(e.target.value); setPreset(PRESETS[PRESETS.length - 1][0]); setState({ kind: "idle" }); }}
            placeholder="https://api.example.com/v1"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={state.kind === "bad" && state.what === "url"}
          />
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
              placeholder="Paste your key"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={state.kind === "empty" || (state.kind === "bad" && state.what === "key")}
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
        {state.kind === "bad" && state.what === "url" && (
          <div className="callout"><Icon name="alert" /><span><b>That address does not look right.</b> It should be a full https address, like <code>https://api.openai.com/v1</code>. Nothing was saved.</span></div>
        )}
        {state.kind === "bad" && state.what === "key" && (
          <div className="callout"><Icon name="alert" /><span><b>That key does not look right.</b> Copy the whole key from your provider, with no spaces. Nothing was saved and your study material is untouched.</span></div>
        )}
        {state.kind === "ok" && (
          <div className="callout"><Icon name="check" /><span><b>The format looks right.</b> In the app, we would check it with {state.host} and store it encrypted. This preview did not send or save it.</span></div>
        )}
      </div>
      <ul className="fairuse">
        <li><Icon name="info" /><span><b>Charges come from your provider, not from us.</b> Typical study use is usually small, but heavy use adds up. Set a monthly cap in your provider dashboard.</span></li>
        <li><Icon name="users" /><span>Most providers require an adult account holder, so a parent or guardian usually creates the key.</span></li>
        <li><Icon name="lock" /><span>The key is encrypted, used only for your own requests and never shown again.</span></li>
      </ul>
    </section>
  );
}

function FairUseCard() {
  return (
    <section className="card" id="fair-use" aria-labelledby="fair-title" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span className="tile"><Icon name="shield" /></span>
        <h3 id="fair-title">Fair use on Unlimited</h3>
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
