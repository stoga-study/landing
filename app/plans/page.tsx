import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Funding } from "@/components/Funding";
import { Header } from "@/components/Header";
import { PlanExtras, Plans } from "@/components/Plans";

export const metadata: Metadata = {
  title: "Plans",
  description: "Compare Stoga.study plans, limits, API key setup, fair use and how the project is funded.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Plans</span>
            <h1 style={{ fontSize: "clamp(38px, 7vw, 56px)", marginTop: 14 }}>Free to start, simple to upgrade</h1>
            <p>
              Every plan gets the same features and the same quality of answers. You can switch any time and keep everything you made.
              Stoga.study is still in development, so nothing here is live yet.
            </p>
          </div>
          <Plans />

          <div className="section-head" style={{ marginTop: 72 }}>
            <span className="eyebrow">For the technical side</span>
            <h2>API keys and fair use</h2>
            <p>Only needed if you pick the Independent plan or want the details on Unlimited.</p>
          </div>
          <PlanExtras />

          <div className="section-head" id="funding" style={{ marginTop: 72 }}>
            <span className="eyebrow">Funding, in the open</span>
            <h2>Kept going by the Stoga community</h2>
            <p>Unlimited plans and optional donations will cover the costs, and we will show where every dollar goes.</p>
          </div>
          <Funding />
        </div>
      </main>
      <Footer />
    </>
  );
}
