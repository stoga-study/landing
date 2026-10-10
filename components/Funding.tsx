"use client";

import { useState } from "react";
import { Icon } from "./Icon";

// Sample ledger. Replace with real monthly figures before launch (Brand Guidelines p. 19).
const COSTS: [string, number][] = [
  ["AI model usage", 312],
  ["Hosting and file storage", 48],
  ["Domain and email", 6],
];
const FUNDING: [string, number][] = [
  ["Unlimited plans (19 students)", 190],
  ["Community donations", 143],
];
const sum = (rows: [string, number][]) => rows.reduce((t, [, v]) => t + v, 0);
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function Funding() {
  const [amount, setAmount] = useState<number | null>(5);
  const costs = sum(COSTS);
  const funded = sum(FUNDING);
  const pct = Math.round((funded / costs) * 100);

  return (
    <div className="funding">
      <div className="ink-panel fund-panel">
        <span className="circle circle-big" aria-hidden="true" />
        <span className="circle circle-hot" aria-hidden="true" />
        <span className="chip chip-dark">October 2026, sample figures</span>
        <div className="big-num" style={{ marginTop: 18 }}>
          {pct}%<small>covered</small>
        </div>
        <div className="bar" role="img" aria-label={`${pct}% of this month's costs covered, sample figure`}>
          <span style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
        <p className="ink-muted" style={{ marginTop: 14, maxWidth: 460 }}>
          {usd(funded)} of {usd(costs)} in monthly costs is covered by Unlimited plans and donations. That is what keeps Essential free for every CHS student.
        </p>

        <h3 style={{ marginTop: 32, fontSize: 24 }}>Help a classmate study for free</h3>
        <p className="ink-muted" style={{ marginTop: 6 }}>Giving is optional and never unlocks features.</p>
        <div className="donate-row" role="group" aria-label="Donation amount">
          {[3, 5, 10, 25].map((v) => (
            <button key={v} type="button" className="donate-amt tabular" aria-pressed={amount === v} onClick={() => setAmount(v)}>
              ${v}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 18 }}>
          <button type="button" className="btn btn-inverse" disabled aria-describedby="donate-note">
            <Icon name="heart" /> Give {amount ? `$${amount}` : ""}
          </button>
          <span id="donate-note" className="label-backend" style={{ background: "transparent", color: "var(--ink-muted)", borderColor: "#5A2431" }}>
            <Icon name="plug" /> Donations open once payments are connected
          </span>
        </div>
      </div>

      <div className="card ledger">
        <h3>The monthly ledger</h3>
        <p className="muted" style={{ fontSize: 15, marginTop: 6 }}>
          We publish costs and funding every month. Figures here are placeholders until real.
        </p>
        <table>
          <caption className="sr-only">Monthly costs and funding, sample figures</caption>
          <thead>
            <tr><th scope="col">Costs</th><th scope="col" className="num">Amount</th></tr>
          </thead>
          <tbody>
            {COSTS.map(([k, v]) => (
              <tr key={k}><td>{k}</td><td className="num">{usd(v)}</td></tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td>Total costs</td><td className="num">{usd(costs)}</td></tr>
          </tfoot>
        </table>
        <table>
          <thead>
            <tr><th scope="col">Funding</th><th scope="col" className="num">Amount</th></tr>
          </thead>
          <tbody>
            {FUNDING.map(([k, v]) => (
              <tr key={k}><td>{k}</td><td className="num">{usd(v)}</td></tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td>Total funding</td><td className="num">{usd(funded)}</td></tr>
          </tfoot>
        </table>
        <div className="callout neutral">
          <Icon name="info" />
          <span>Any surplus stays in the project to cover future months. No ads, and student data is never sold.</span>
        </div>
      </div>
    </div>
  );
}
