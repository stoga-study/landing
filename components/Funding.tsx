import { Icon } from "./Icon";

// No figures until there are real ones: the first monthly ledger is published once the beta has a full month of costs.
export function Funding() {
  return (
    <div className="funding">
      <div className="ink-panel fund-panel">
        <span className="circle circle-big" aria-hidden="true" />
        <span className="circle circle-hot" aria-hidden="true" />
        <span className="chip chip-dark">Private beta</span>
        <h3 style={{ marginTop: 18, fontSize: 28 }}>Help a classmate study for free</h3>
        <p className="ink-muted" style={{ marginTop: 10, maxWidth: 460 }}>
          Essential stays free for every CHS student. Optional donations and Unlimited plans will cover what it costs to run. Giving never unlocks features.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 24 }}>
          <button type="button" className="btn btn-inverse" disabled aria-describedby="donate-note">
            <Icon name="heart" /> Donate
          </button>
          <span id="donate-note" className="label-backend" style={{ background: "transparent", color: "var(--ink-muted)", borderColor: "#5A2431" }}>
            <Icon name="plug" /> Donations open soon
          </span>
        </div>
      </div>

      <div className="card ledger">
        <h3>The monthly ledger</h3>
        <p className="muted" style={{ fontSize: 15, marginTop: 6 }}>
          Every month we will publish what Stoga.study cost to run and how it was paid for: AI usage, hosting and storage, domain and email, and every source of funding. The first one goes up after the beta&apos;s first full month.
        </p>
        <div className="callout neutral" style={{ marginTop: 16 }}>
          <Icon name="info" />
          <span>Any surplus stays in the project to cover future months. No ads, and student data is never sold.</span>
        </div>
      </div>
    </div>
  );
}
