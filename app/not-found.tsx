import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APP_URL } from "@/components/links";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container">
          <div className="card final">
            <span className="eyebrow">404</span>
            <h1 className="page-title" style={{ marginTop: 14 }}>We couldn&apos;t find that page.</h1>
            <p>The link may be old or mistyped. Nothing you made is affected.</p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="/">Go to the home page</a>
              <a className="btn btn-ghost" href={APP_URL}>Open the app</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
