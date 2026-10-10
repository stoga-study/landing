"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeChoice = "system" | "light" | "dark";
const KEY = "stoga-theme";
const EVENT = "stoga-theme-change";

function read(): ThemeChoice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

// Shared by the header toggle and the footer control so both stay in sync.
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>("system");

  useEffect(() => {
    setChoice(read());
    const sync = () => setChoice(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const set = useCallback((next: ThemeChoice) => {
    const root = document.documentElement;
    if (next === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", next);
    try {
      if (next === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    setChoice(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { choice, set };
}

export const THEME_LABEL: Record<ThemeChoice, string> = {
  system: "Match device",
  light: "Light",
  dark: "Dark",
};
