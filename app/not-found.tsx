import { DemoLabel } from "@/components/DemoLabel";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container notfound">
        <div className="ink-panel">
          <span className="circle circle-big" aria-hidden="true" />
          <div className="big-num">404</div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", marginTop: 12 }}>We could not find that page</h1>
          <p className="ink-muted" style={{ marginTop: 12 }}>
            The link may be old or mistyped. Nothing you made is affected.
          </p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <a className="btn btn-inverse" href="/">Go to the home page</a>
            <a className="btn btn-ghost" href="/#how-it-works"><DemoLabel /></a>
          </div>
        </div>
      </main>
    </>
  );
}
