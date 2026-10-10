import type { SVGProps } from "react";

// Outline icons: 1.8px stroke, round caps and joins, inherit text colour.
// Icons are decorative (aria-hidden) and never carry meaning alone.
const paths = {
  home: <><path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></>,
  book: <><path d="M5 4.5h9.5A3.5 3.5 0 0 1 18 8v11.5H8.5A3.5 3.5 0 0 1 5 16z" /><path d="M5 16a3 3 0 0 1 3-3h10" /></>,
  upload: <><path d="M12 15V4" /><path d="m7.5 8.5 4.5-4.5 4.5 4.5" /><path d="M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15" /></>,
  chat: <><path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4.5 19.5l1.3-4.1A7.5 7.5 0 1 1 20 11.5z" /></>,
  cards: <><rect x="3.5" y="7" width="13" height="12" rx="2" /><path d="M7.5 7V5.5a1.5 1.5 0 0 1 1.5-1.5h10a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.5 1.5h-2.5" /></>,
  chart: <><path d="M5 20V12" /><path d="M10 20V6" /><path d="M15 20v-9" /><path d="M20 20V4" /></>,
  bulb: <><path d="M9 17.5h6" /><path d="M10 20.5h4" /><path d="M8.5 14.5a6 6 0 1 1 7 0c-.6.5-1 1.2-1 2v1h-5v-1c0-.8-.4-1.5-1-2z" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,
  x: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
  file: <><path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14 3.5V8h4.5" /></>,
  heart: <><path d="M12 19.5s-7.5-4.4-7.5-9.7A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6c0 5.3-7.5 9.7-7.5 9.7z" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8.5-8.5" /><path d="m16 7 2.5 2.5" /><path d="m14 9 2 2" /></>,
  calendar: <><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M4 10h16" /><path d="M8.5 3.5v4" /><path d="M15.5 3.5v4" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></>,
  refresh: <><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /><path d="M19.5 4.5v4h-4" /></>,
  contrast: <><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>,
  moon: <><path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  shield: <><path d="M12 3.5 19 6v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  list: <><path d="M9 7h11" /><path d="M9 12h11" /><path d="M9 17h11" /><path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" /></>,
  edit: <><path d="M4.5 19.5h4l10-10a2.8 2.8 0 0 0-4-4l-10 10z" /><path d="m13.5 6.5 4 4" /></>,
  camera: <><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" /><circle cx="12" cy="12.5" r="3.5" /></>,
  text: <><path d="M5 6.5h14" /><path d="M5 11h14" /><path d="M5 15.5h9" /></>,
  alert: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5" /><path d="M12 16.5h.01" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5" /><path d="M12 7.5h.01" /></>,
  plug: <><path d="M9 3.5v5" /><path d="M15 3.5v5" /><path d="M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0z" /><path d="M12 17v3.5" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" /><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" /><path d="M18 14a6.5 6.5 0 0 1 3.5 5.5" /></>,
  wifiOff: <><path d="M3 3l18 18" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M5 12.5a10 10 0 0 1 4-2.3" /><path d="M14.5 10.2a10 10 0 0 1 4.5 2.3" /><path d="M12 20h.01" /></>,
  access: <><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5 12 10l7-1.5" /><path d="M12 10v4.5l-3 6" /><path d="m12 14.5 3 6" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
