import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about how Stoga.study works, homework help, plans, privacy and offline access.",
  alternates: { canonical: "/faq" },
};

type Group = { id: string; title: string; items: [string, string[]][] };

const GROUPS: Group[] = [
  {
    id: "how-it-works",
    title: "How it works",
    items: [
      ["How does the site work?", [
        "You pick your classes, add your notes (a PDF, Word file, slides, a photo of handwritten notes or pasted text, up to 25 MB), and Stoga.study turns them into a study set: a study guide, flashcards and a practice quiz. Everything links back to the pages it came from, so you can always check the source.",
        "Right now the site is still being built. The demo on the homepage shows the real flow with sample content. Reading your actual files and live tutor answers are still in development.",
      ]],
      ["How does the AI tutor help me study?", [
        "The tutor gives you a small hint first. If you need more, it names the formula or the page to look at. You only get the full explanation, with a worked example, when you ask for it.",
        "It answers from your own notes and cites the page. If your notes do not cover something, it tells you before using general knowledge, and it says so when it is not sure.",
      ]],
      ["How do I turn messy notes into an organized study guide?", [
        "Upload them as they are. Photos of handwriting, half-finished slides and copy-pasted text all work. The guide splits your material into short sections (about six minutes each) with page links throughout. You can edit the flashcards that come with it.",
      ]],
    ],
  },
  {
    id: "integrity",
    title: "Homework and academic integrity",
    items: [
      ["Can the AI do my homework for me?", [
        "No. The tutor will not write graded work. It can help you outline an essay, give a hint on a problem, or give feedback on a draft you wrote.",
      ]],
      ["How does the tutor help me learn instead of giving me answers?", [
        "It gives you hints, formulas and page references so you can work out the answer yourself. You decide how much help you want, but it always starts small.",
      ]],
      ["Does it follow Conestoga High School's academic integrity expectations?", [
        "It is designed to support them. The tutor is built to help you learn and not to complete assignments. That said, Stoga.study is made by students and is not an official Conestoga High School or Tredyffrin/Easttown School District service, and your teachers' rules always come first.",
      ]],
    ],
  },
  {
    id: "plans",
    title: "Plans and pricing",
    items: [
      ["Is there a free demo?", [
        "Yes. The interactive demo on the homepage runs in your browser with sample content, and there is nothing to sign up for. It opens on a tablet or computer. On a phone you get a short walkthrough instead.",
      ]],
      ["Do I need a credit card?", [
        "Nope. The Essential plan is free, not a trial, and never asks for a card.",
      ]],
      ["What are the limits of each plan?", [
        "Essential (free): 50 tutor messages a day and 10 uploads a month, with no limit on reviewing the cards, notes and quizzes you already have. Independent (free, plus provider fees): you bring your own API key, so your AI provider sets the limits and bills the key holder. Unlimited ($10 a month): no daily or monthly caps, with fair use rules. A parent or guardian pays and approves.",
        "These are planned launch figures and may change once real costs are known. We announce changes before they apply. See the plans page for details.",
      ]],
    ],
  },
  {
    id: "privacy",
    title: "Privacy and security",
    items: [
      ["What happens to my uploaded notes and files?", [
        "The plan is that uploads are private by default and used only to help you study. They are not sold and there are no ads. You can delete any upload, or your whole account, at any time. On this preview site, files you pick in the demo never leave your browser.",
      ]],
      ["How are my personal information and data protected?", [
        "We collect as little as we can. This preview site has no accounts, no forms that send data and no ad trackers. In the app, API keys are planned to be stored encrypted and used only for your own requests. The full policy is still being reviewed (including FERPA and Pennsylvania rules), so treat the privacy page as a draft summary.",
      ]],
      ["Who can access my information?", [
        "Other students cannot see your notes, cards or mistakes. Parents and guardians can review plans, costs and what is included, since they approve paid plans. We are still finalizing exactly how our own team's access works, and we will spell it out in the privacy policy before launch.",
      ]],
    ],
  },
  {
    id: "offline",
    title: "Offline access",
    items: [
      ["Can I access my saved notes without internet?", [
        "That is the plan, but it is not built or tested yet, so please do not count on it. The goal is for saved cards and notes to work offline. The AI tutor will still need a connection.",
      ]],
      ["What happens if my connection drops while studying?", [
        "The goal is that the app tells you clearly when the tutor needs a connection, while anything you have already saved keeps working. We will confirm this once it has been tested.",
      ]],
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h1 style={{ fontSize: "clamp(38px, 7vw, 56px)", marginTop: 14 }}>Questions, answered</h1>
            <p>Stoga.study is still in development, so answers about the app describe what we are building.</p>
          </div>
          <nav className="faq-jump" aria-label="FAQ topics">
            {GROUPS.map((g) => (
              <a key={g.id} className="chip chip-neutral" href={`#${g.id}`}>{g.title}</a>
            ))}
          </nav>
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="faq-group" aria-labelledby={`${g.id}-h`}>
              <h2 id={`${g.id}-h`}>{g.title}</h2>
              <div className="faq">
                {g.items.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <Icon name="plus" />
                    </summary>
                    <div>{a.map((p) => <p key={p}>{p}</p>)}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <p className="muted" style={{ marginTop: 40 }}>
            Still curious? <a href="/privacy">Read the privacy summary</a> or <a href="/plans">compare plans</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
