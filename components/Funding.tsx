// No figures here: the monthly ledger lives in the app (Plans and funding), with real costs once there is a full month.
export function Funding() {
  return (
    <div className="funding">
      <div className="card">
        <h3>Help a classmate study for free</h3>
        <p>
          Essential stays free for every Conestoga student. Unlimited plans and optional donations cover what it costs to run. Giving never unlocks features.
        </p>
        <p className="muted" style={{ fontSize: 14 }}>Donations open soon.</p>
      </div>
      <div className="card">
        <h3>The monthly ledger</h3>
        <p>
          Every month, the app shows what Stoga.study cost to run and how it was paid for: AI usage, hosting and storage, domain and email, and every source of funding.
          Any surplus stays in the project. No ads, and student data is never sold.
        </p>
      </div>
    </div>
  );
}
