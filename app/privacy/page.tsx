import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Stoga.study handles your notes, uploads and data, in a few short sections.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container prose">
          <span className="eyebrow">Privacy</span>
          <h1>Your notes stay yours.</h1>
          <p>
            A short summary of how Stoga.study handles your data. The app has the full version under Settings, then Privacy.
          </p>

          <h2>What stays private</h2>
          <ul>
            <li>Your files, study sets, flashcards, notes, calendar and tutor conversations are kept in your account, private to you, until you delete them.</li>
            <li>Other students see nothing unless you share it. A share link or a study group shows only the study set you chose, with your first name.</li>
            <li>To count your allowance and pay the AI bill, we record how much each feature was used, not what you wrote.</li>
            <li>There are no ads, and your data is never sold.</li>
          </ul>

          <h2>Where the AI runs</h2>
          <p>
            The AI only sees something when you use a feature that needs it. Most features run on Mercury, a model from Inception. Reading photos and
            scanned pages runs on OpenAI, and if Mercury is ever unavailable, your request goes to OpenAI instead. Inception&apos;s setting that lets it
            train on what we send is turned off, and OpenAI&apos;s terms for apps say what&apos;s sent isn&apos;t used to train their models. If you use your
            own key, your requests go to the AI service you chose, under its terms.
          </p>

          <h2>What you control</h2>
          <ul>
            <li>Delete any file, any tutor conversation or your chat with the coach.</li>
            <li>Turn off sharing your study sets with classmates who upload the same file.</li>
            <li>Download everything you made as a zip, any time.</li>
            <li>Delete your account and everything in it.</li>
          </ul>

          <h2>This website</h2>
          <p>
            stoga.study has no accounts, no forms and no advertising trackers. Your colour theme choice is kept in your own browser.
          </p>

          <p style={{ marginTop: 40 }}><a href="/">Back to Stoga.study</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
