"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * A short, silent, looping tour of the app in a phone frame.
 * It plays on its own, has a pause button (anything moving for more than 5 seconds needs one),
 * and stays paused on the first frame for people who ask their device to reduce motion.
 */
export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) v.pause();
      else v.play().catch(() => undefined); // Autoplay can be refused (e.g. Low Power Mode); the poster stays.
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <div className="phone phone-video">
      <div className="phone-screen">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/stoga-app-poster.jpg?v=2"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/hero/stoga-app.webm?v=2" type="video/webm" />
          <source src="/hero/stoga-app.mp4?v=2" type="video/mp4" />
        </video>
      </div>
      <button type="button" className="video-toggle" onClick={toggle} aria-label={playing ? "Pause the app tour video" : "Play the app tour video"}>
        <Icon name={playing ? "pause" : "play"} />
      </button>
    </div>
  );
}
