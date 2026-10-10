"use client";

import { useEffect, useState } from "react";

// Each name is set in its school's main brand colour, lightened where needed to stay readable on the dark hero.
const SCHOOLS: [string, string][] = [
  ["Princeton", "#F58025"], ["MIT", "#E03A52"], ["Harvard", "#E0364D"], ["Stanford", "#D43B3B"],
  ["Yale", "#4F8FE0"], ["Caltech", "#FF6C0C"], ["UPenn", "#4C74D9"], ["Duke", "#5A7BE8"],
  ["Brown", "#B5835F"], ["Dartmouth", "#2FA36B"], ["Columbia", "#6DB5E8"], ["Cornell", "#E8434A"],
  ["Johns Hopkins", "#68ACE5"], ["Northwestern", "#9A6BD6"], ["UChicago", "#D8505F"], ["UC Berkeley", "#FDB515"],
  ["UCLA", "#4FA3E0"], ["Vanderbilt", "#C9A961"], ["Rice", "#5B8DEF"], ["Notre Dame", "#D4A73A"],
];

export function RotatingSchool() {
  const [i, setI] = useState(0);
  const [order, setOrder] = useState(SCHOOLS);

  // Shuffle after mount (Fisher-Yates) so the server and first client render match, but every visit gets a new order.
  useEffect(() => {
    const a = [...SCHOOLS];
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    setOrder(a);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % order.length), 2000);
    return () => clearInterval(t);
  }, []);

  const [name, color] = order[i];
  return (
    <>
      <span className="sr-only">a top university</span>
      {/* All names share one grid cell, so the slot is always as wide as the longest one and the layout never shifts. */}
      <span className="school" aria-hidden="true">
        {order.map(([n, c], idx) => (
          <span key={n} className={idx === i ? "school-pop" : "school-hide"} style={{ color: c }}>{n}</span>
        ))}
      </span>
    </>
  );
}
