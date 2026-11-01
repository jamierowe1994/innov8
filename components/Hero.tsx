"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import RotatingWord from "@/components/RotatingWord";
import { clamp, useScrollFrame } from "@/lib/useScrollProgress";
import { cities, hero } from "@/lib/content";

const SLIDE = 9000; // how long each city holds before the next begins
const FADE = 3200; // dissolve length

export default function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [still, setStill] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const onScreen = useRef(true);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((next: number) => {
    setActive((a) => {
      if (a === next) return a;
      setPrev(a);
      return next;
    });
    setCycle((c) => c + 1);
  }, []);

  // Advance through the cities
  useEffect(() => {
    if (still) return;
    const t = setTimeout(() => go((active + 1) % cities.length), SLIDE);
    return () => clearTimeout(t);
  }, [active, cycle, still, go]);

  // Incoming clip restarts with its own slow camera move; outgoing rests once it has dissolved
  useEffect(() => {
    if (still) return;
    const v = videos.current[active];
    if (v) {
      v.currentTime = 0;
      if (onScreen.current) v.play().catch(() => {});
    }
    const [x, y] = cities[active].pan;
    layers.current[active]?.animate(
      [
        { transform: "scale(1.05) translate3d(0,0,0)" },
        { transform: `scale(1.17) translate3d(${x}%, ${y}%, 0)` },
      ],
      { duration: SLIDE + FADE + 400, easing: "cubic-bezier(0.33, 0, 0.67, 1)", fill: "forwards" },
    );
    const t = setTimeout(() => {
      videos.current.forEach((o, i) => i !== active && o?.pause());
      setPrev(null);
    }, FADE + 300);
    return () => clearTimeout(t);
  }, [active, cycle, still]);

  // Pause decoding when the hero is off screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || still) return;
    const io = new IntersectionObserver(([e]) => {
      onScreen.current = e.isIntersecting;
      const v = videos.current[active];
      if (!v) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [active, still]);

  // Scroll away: footage sinks and slows, type lifts and fades
  const onFrame = useCallback((r: DOMRect) => {
    const p = clamp(-r.top / r.height);
    if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0, ${p * 22}%, 0) scale(${1 + p * 0.06})`;
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${p * -90}px, 0)`;
      contentRef.current.style.opacity = String(1 - p * 1.6);
    }
  }, []);
  useScrollFrame(sectionRef, onFrame);

  const current = cities[active];

  return (
    <section ref={sectionRef} id="top" className="relative isolate h-[100svh] min-h-[620px] overflow-clip bg-film text-white">
      {/* Footage */}
      <div ref={mediaRef} className="absolute inset-0 -z-10 will-change-transform" aria-hidden>
        {cities.map((c, i) => {
          const state = i === active ? "on" : i === prev ? "leaving" : "idle";
          return (
            <div
              key={c.name}
              className="absolute inset-0"
              style={{
                opacity: state === "on" ? 1 : 0,
                filter: state === "idle" ? "brightness(1.35) saturate(1.1) blur(6px)" : "none",
                transition: `opacity ${FADE}ms cubic-bezier(0.45, 0, 0.25, 1), filter ${FADE + 600}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                zIndex: state === "on" ? 2 : state === "leaving" ? 1 : 0,
              }}
            >
              <div
                ref={(el) => {
                  layers.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ transform: "scale(1.05)" }}
              >
                {still ? (
                  <img src={c.poster} alt="" className="size-full object-cover" />
                ) : (
                  <video
                    ref={(el) => {
                      videos.current[i] = el;
                    }}
                    className="size-full object-cover"
                    poster={c.poster}
                    muted
                    playsInline
                    loop
                    preload="auto"
                    autoPlay={i === 0}
                  >
                    <source src={`${c.video}-720.mp4`} type="video/mp4" media="(max-width: 900px)" />
                    <source src={`${c.video}-1080.mp4`} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          );
        })}
        {/* Warm shadows for legibility, kept off the light in the middle of frame */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-film/80 via-film/15 to-film/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-film/55 via-film/10 to-transparent" />
        <div className="grain z-10" />
      </div>

      {/* Type */}
      <div ref={contentRef} className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-10 lg:px-14">
        <h1 className="max-w-[1100px] text-[clamp(2.9rem,7.6vw,7.6rem)] font-extralight leading-[0.98]">
          <span className="sr-only">{hero.full}</span>
          <span aria-hidden className="mask-line rise">
            <span style={{ "--d": "300ms" } as React.CSSProperties}>{hero.lead}</span>
          </span>
          <span aria-hidden className="mask-line rise">
            <span style={{ "--d": "420ms" } as React.CSSProperties} className="accent text-[1.08em] leading-[0.95] text-[#d9e3ec]">
              <RotatingWord words={hero.rotating} />
            </span>
          </span>
          <span aria-hidden className="mask-line rise">
            <span style={{ "--d": "540ms" } as React.CSSProperties}>{hero.tail}</span>
          </span>
        </h1>

        <div className="fade mt-10 sm:mt-12" style={{ "--d": "1100ms" } as React.CSSProperties}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 rounded-full bg-white/10 py-3 pl-6 pr-3 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur-md transition duration-500 hover:bg-white hover:text-ink"
          >
            Start a Confidential Conversation
            <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition duration-500 group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-white">
              <ArrowRight size={15} strokeWidth={1.6} />
            </span>
          </a>
        </div>

        <div className="fade mt-16 flex items-end justify-between gap-8 sm:mt-20" style={{ "--d": "1400ms" } as React.CSSProperties}>
          <div className="grid flex-1 grid-cols-3 gap-4 sm:flex sm:flex-none sm:gap-10" role="tablist" aria-label="Cities we cover">
            {cities.map((c, i) => {
              const on = i === active;
              return (
                <button key={c.name} type="button" role="tab" aria-selected={on} onClick={() => go(i)} className="group text-left">
                  <span
                    className={`block text-[10px] uppercase tracking-[0.16em] transition-colors duration-700 sm:text-[11px] sm:tracking-[0.24em] ${
                      on ? "text-white" : "text-white/45 group-hover:text-white/80"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="mt-3 block h-px w-full overflow-hidden bg-white/20 sm:w-24">
                    {on && !still && (
                      <span key={cycle} className="city-progress block h-full bg-white" style={{ animationDuration: `${SLIDE}ms` }} />
                    )}
                    {on && still && <span className="block h-full w-full bg-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex" aria-hidden>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue absolute inset-0 bg-white/80" />
            </span>
          </div>

          <div key={active} className="hidden text-right md:block">
            <p className="city-caption accent text-4xl leading-none text-white lg:text-5xl">{current.name}</p>
            <p className="city-caption mt-2 text-[10px] uppercase tracking-[0.26em] text-white/55" style={{ animationDelay: "150ms" }}>
              {current.country} &middot; {current.coords}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
