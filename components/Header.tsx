"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { APP_URL } from "./links";
import { THEME_LABEL, type ThemeChoice, useTheme } from "./theme";

const LINKS = [
  { href: "/#how-it-fits", label: "How it fits" },
  { href: "/#tutor", label: "The tutor" },
  { href: "/plans", label: "Plans" },
  { href: "/privacy", label: "Privacy" },
  { href: "/faq", label: "FAQ" },
];

const NEXT: Record<ThemeChoice, ThemeChoice> = { system: "light", light: "dark", dark: "system" };
const THEME_ICON = { system: "contrast", light: "sun", dark: "moon" } as const;

export function Brand({ size = 40, descriptor = true }: { size?: number; descriptor?: boolean }) {
  return (
    <>
      <Image className="seal" src="/seal.png" alt="Conestoga High School seal" width={size} height={size} priority />
      <span className="wordmark">
        Stoga.study
        {descriptor && <small>Conestoga High School</small>}
      </span>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { choice, set } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled || open ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <nav className="container nav" aria-label="Main">
        <a className="brand" href="/" aria-label="Stoga.study home">
          <Brand />
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => set(NEXT[choice])}
            aria-label={`Theme: ${THEME_LABEL[choice]}. Switch to ${THEME_LABEL[NEXT[choice]]}`}
            title={`Theme: ${THEME_LABEL[choice]}`}
          >
            <Icon name={THEME_ICON[choice]} />
          </button>
          <a className="btn btn-primary btn-sm nav-cta" href={APP_URL}>
            Get started
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {LINKS.map((l) => (
            <a key={l.href} className="mm-link" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <Icon name="arrowRight" className="icon" />
            </a>
          ))}
          <a className="btn btn-primary btn-block" href={APP_URL}>
            Get started, it&apos;s free
          </a>
        </div>
      )}
    </header>
  );
}
