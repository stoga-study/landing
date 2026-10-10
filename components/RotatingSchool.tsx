"use client";

import { useEffect, useState } from "react";

// Logos live in /public/logos. Schools without an icon-style logo have no file and use their brand colour on the name instead.
const SCHOOLS: [string, string | null, string?][] = [
  ["Princeton", null, "#F58025"], ["MIT", "mit.svg"], ["Harvard", "harvard.svg"], ["Stanford", null, "#D43B3B"],
  ["Yale", "yale.svg"], ["Caltech", null, "#FF6C0C"], ["UPenn", "upenn.svg"], ["Duke", "duke.svg"],
  ["Brown", "brown.svg"], ["Dartmouth", "dartmouth.svg"], ["Columbia", "columbia.svg"], ["Cornell", "cornell.jpg"],
  ["Johns Hopkins", null, "#68ACE5"], ["Northwestern", "northwestern.png"], ["UChicago", null, "#D8505F"], ["UC Berkeley", "berkeley.svg"],
  ["UCLA", "ucla.svg"], ["Vanderbilt", "vanderbilt.svg"], ["Rice", null, "#5B8DEF"], ["Notre Dame", "notre-dame.svg"],
];

export function RotatingSchool() {
  const [i, setI] = useState(0);

  useEffect(() => {
    SCHOOLS.forEach(([, f]) => { if (f) new Image().src = `/logos/${f}`; });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SCHOOLS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const [name, file, color] = SCHOOLS[i];
  return (
    <>
      <span className="sr-only">a top university</span>
      <span className="school" aria-hidden="true">
        <span key={name} className="school-pop">
          {file && (
            <span className="school-badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${file}`} alt="" />
            </span>
          )}
          <span className="school-name" style={color ? { color } : undefined}>{name}</span>
        </span>
      </span>
    </>
  );
}
