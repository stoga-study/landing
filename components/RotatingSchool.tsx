"use client";

import { useEffect, useState } from "react";

// Monogram badges in each school's main colour. Official logos are trademarks, so we do not use them.
const SCHOOLS: [string, string, string][] = [
  ["Princeton", "P", "#E87722"], ["MIT", "M", "#A31F34"], ["Harvard", "H", "#A51C30"], ["Stanford", "S", "#8C1515"],
  ["Yale", "Y", "#00356B"], ["Caltech", "C", "#FF6C0C"], ["UPenn", "P", "#011F5B"], ["Duke", "D", "#012169"],
  ["Brown", "B", "#4E3629"], ["Dartmouth", "D", "#00693E"], ["Columbia", "C", "#4B9CD3"], ["Cornell", "C", "#B31B1B"],
  ["Johns Hopkins", "J", "#002D72"], ["Northwestern", "N", "#4E2A84"], ["UChicago", "U", "#800000"], ["UC Berkeley", "B", "#003262"],
  ["UCLA", "U", "#2774AE"], ["Vanderbilt", "V", "#866D4B"], ["Rice", "R", "#00205B"], ["Notre Dame", "N", "#0C2340"],
];

export function RotatingSchool() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SCHOOLS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const [name, letter, color] = SCHOOLS[i];
  return (
    <>
      <span className="sr-only">a top university</span>
      <span className="school" aria-hidden="true">
        <span key={name} className="school-pop">
          <span className="school-badge" style={{ background: color }}>{letter}</span>
          <span className="school-name">{name}</span>
        </span>
      </span>
    </>
  );
}
