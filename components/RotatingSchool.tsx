"use client";

import { useEffect, useState } from "react";

// Logos live in /public/logos. Some are wordmarks, so the tile sizes itself to the image.
const SCHOOLS: [string, string][] = [
  ["Princeton", "princeton.svg"], ["MIT", "mit.svg"], ["Harvard", "harvard.svg"], ["Stanford", "stanford.svg"],
  ["Yale", "yale.svg"], ["Caltech", "caltech.svg"], ["UPenn", "upenn.svg"], ["Duke", "duke.svg"],
  ["Brown", "brown.svg"], ["Dartmouth", "dartmouth.svg"], ["Columbia", "columbia.svg"], ["Cornell", "cornell.jpg"],
  ["Johns Hopkins", "johns-hopkins.png"], ["Northwestern", "northwestern.png"], ["UChicago", "uchicago.svg"], ["UC Berkeley", "berkeley.svg"],
  ["UCLA", "ucla.svg"], ["Vanderbilt", "vanderbilt.svg"], ["Rice", "rice.png"], ["Notre Dame", "notre-dame.svg"],
];

export function RotatingSchool() {
  const [i, setI] = useState(0);

  useEffect(() => {
    SCHOOLS.forEach(([, f]) => { new Image().src = `/logos/${f}`; });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SCHOOLS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const [name, file] = SCHOOLS[i];
  return (
    <>
      <span className="sr-only">a top university</span>
      <span className="school" aria-hidden="true">
        <span key={name} className="school-pop">
          <span className="school-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${file}`} alt="" />
          </span>
          <span className="school-name">{name}</span>
        </span>
      </span>
    </>
  );
}
