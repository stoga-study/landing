import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Stoga.study plans to handle student notes, uploads and data, in plain language.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container prose">
          <span className="eyebrow">Privacy</span>
          <h1>Your notes are yours</h1>
          <div className="note-dashed" style={{ marginTop: 20 }}>
            <span className="label-backend">Draft</span>
            <p style={{ marginTop: 8 }}>
              This is a plain-language summary of how Stoga.study is being designed. It is not yet a legal policy and needs legal
              review, including for FERPA, Pennsylvania privacy rules and parental consent, before the app launches.
            </p>
          </div>

          <h2>What this website collects today</h2>
          <p>
            This site is a static preview. It has no accounts, no forms that send data and no advertising trackers. The demo runs entirely in
            your browser: files you pick are never uploaded, and API keys typed into the settings preview are never sent or saved.
            Your colour theme choice is kept in your own browser.
          </p>

          <h2>How the app is designed to handle data</h2>
          <ul>
            <li>Uploads, notes, cards and mistakes are private by default. No other student sees them.</li>
            <li>Your material is used to help you study. It is not sold, and there are no ads.</li>
            <li>You can delete any upload, or your whole account and its content, at any time.</li>
            <li>On the Independent plan, your API key is encrypted and used only for your own requests.</li>
            <li>Paid plans need a parent or guardian to pay and approve.</li>
          </ul>

          <h2>Questions</h2>
          <p>
            Before launch, this page will list a contact for privacy questions and data requests.
          </p>
          <p style={{ marginTop: 32 }}><a href="/">Back to Stoga.study</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
