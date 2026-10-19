"use client";

import { Brand } from "./Header";
import { APP_URL } from "./links";
import { THEME_LABEL, type ThemeChoice, useTheme } from "./theme";

const COLS = [
  { h: "Product", links: [["Open the app", APP_URL], ["How it fits", "/#how-it-fits"], ["The tutor", "/#tutor"], ["Plans", "/plans"]] },
  { h: "Community", links: [["Funding", "/plans#funding"], ["Your own API key", "/plans#byok"], ["Fair use", "/plans#fair-use"], ["FAQ", "/faq"]] },
  { h: "Trust", links: [["Privacy", "/privacy"], ["Academic integrity", "/faq#integrity"], ["Offline", "/faq#offline"]] },
];

export function Footer() {
  const { choice, set } = useTheme();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="brand" href="/" aria-label="Stoga.study home">
              <Brand size={44} />
            </a>
            <p className="muted" style={{ marginTop: 14, fontSize: 15, maxWidth: 320 }}>
              The study app made for Conestoga High School in Berwyn, Pennsylvania. Your classes, your Schoology calendar and your own notes, in one place.
            </p>
            <div className="theme-seg" role="group" aria-label="Colour theme">
              {(["system", "light", "dark"] as ThemeChoice[]).map((t) => (
                <button key={t} type="button" aria-pressed={choice === t} onClick={() => set(t)}>
                  {THEME_LABEL[t]}
                </button>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h4>{c.h}</h4>
              <ul>
                {c.links.map(([l, h]) => (
                  <li key={l}><a href={h}>{l}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-legal">
          <p>Stoga.study is built by students, for students. It is not an official service of Conestoga High School or the Tredyffrin/Easttown School District.</p>
          <p>Stoga.study is in beta. Screenshots on this site show an example student.</p>
          <p>© 2026 Stoga.study</p>
        </div>
      </div>
    </footer>
  );
}
