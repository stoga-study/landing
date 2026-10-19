import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How Stoga.study works with your CHS classes and Schoology, plus homework help, plans, privacy and offline access.",
  alternates: { canonical: "/faq" },
};

type Group = { id: string; title: string; items: [string, string[]][] };

const GROUPS: Group[] = [
  {
    id: "how-it-works",
    title: "How it works",
    items: [
      ["What makes this different from other study apps?", [
        "It's made for Conestoga. Every CHS core course from the Program of Studies is already in, your Schoology calendar syncs in, and your plan is built around your real test dates. Cards, quizzes and tutor answers come from your own class material, not the internet.",
      ]],
      ["How do I get started?", [
        "Open beta.stoga.study, sign in with your email (you get a link or a 6-digit code), pick your grade and classes, and you're in. It takes about a minute. Then link your Schoology calendar and add your first notes.",
      ]],
      ["How do I connect Schoology?", [
        "In Schoology, open Calendar and copy the iCal export link. In Stoga, open Calendar, then Import, and paste it. Tests, quizzes and homework are sorted into the right class and stay in sync. Google Calendar, Outlook and Apple Calendar links work too, or you can upload an .ics file.",
      ]],
      ["What can I upload?", [
        "PDFs, Word files, slides (.pptx, with speaker notes), photos of handwritten notes or a whiteboard, screenshots, or pasted text. You choose what gets made: notes, flashcards, a practice quiz, a study guide, a summary or key terms, all linked back to your pages.",
      ]],
      ["How does the AI tutor help me study?", [
        "It gives you a small hint first. If you need more, it names the idea or the page to look at. You only get the full explanation, with a worked example, when you ask for it. It answers from your notes and shows you the page, and it tells you when your notes don't cover something.",
      ]],
      ["What does the coach do?", [
        "The coach looks at your calendar, your progress and your mistakes and helps you decide what to do next. It can add or move things on your calendar, make flashcards or write a note for you, and every change it makes has an Undo.",
      ]],
    ],
  },
  {
    id: "integrity",
    title: "Homework and academic integrity",
    items: [
      ["Can the AI do my homework for me?", [
        "No. The tutor won't write graded work, won't write essays for English and won't write code outside CS classes. It can help you outline, give a hint on a problem, or give feedback on a draft you wrote.",
      ]],
      ["Does it follow Conestoga's academic integrity expectations?", [
        "It is designed to support them: it helps you learn, not finish assignments. Stoga.study is made by students and is not an official Conestoga High School or Tredyffrin/Easttown School District service, and your teachers' rules always come first.",
      ]],
    ],
  },
  {
    id: "plans",
    title: "Plans and pricing",
    items: [
      ["Is it really free?", [
        "Yes. Essential is free, not a trial, and never asks for a card. It includes every feature: 50 tutor messages a day and 10 new study sets a month, with no limit on saving files or reviewing what you already have.",
      ]],
      ["What are the other plans?", [
        "Independent is free too: you bring your own key from any OpenAI-compatible provider, which sets the limits and bills the key holder. Unlimited ($10 a month, paid by a parent or guardian) has no daily or monthly caps, with fair use rules. Checkout for Unlimited opens soon. See the plans page for details.",
      ]],
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    items: [
      ["Who can see my notes and files?", [
        "Only you. Other students see nothing unless you share a study set by link or in a study group, and then only that set, with your first name.",
      ]],
      ["Is my data used to train AI?", [
        "No. Inception's training setting is turned off, and OpenAI's terms for apps say what's sent isn't used to train their models. There are no ads and your data is never sold. You can download everything or delete your account any time.",
      ]],
    ],
  },
  {
    id: "offline",
    title: "Offline and devices",
    items: [
      ["Does it work on my phone and laptop?", [
        "Yes. It runs in any browser, and you can install it to your home screen like an app. Your progress and your coach conversation follow you between devices.",
      ]],
      ["Can I study without internet?", [
        "Yes for saved flashcards, notes and recent quizzes: they work offline, and quiz answers sync when you're back online. The AI tutor, coach and making new study sets need a connection.",
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
            <h1 className="page-title">Questions, answered</h1>
            <p>Can&apos;t find yours? Use Send feedback in the app.</p>
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
