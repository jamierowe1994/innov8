"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid">
        {testimonials.map((t, k) => (
          <figure
            key={k}
            aria-hidden={k !== i}
            className={`col-start-1 row-start-1 transition-[opacity,transform,filter] duration-[1400ms] ease-out-soft ${
              k === i ? "opacity-100 blur-0" : "pointer-events-none translate-y-3 opacity-0 blur-[3px]"
            }`}
          >
            <blockquote className="accent text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.15] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 text-[11px] uppercase tracking-[0.24em] text-slate">{t.by}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex justify-center gap-2">
        {testimonials.map((_, k) => (
          <button
            key={k}
            type="button"
            aria-label={`Testimonial ${k + 1}`}
            onClick={() => setI(k)}
            className="py-3"
          >
            <span className={`block h-px transition-all duration-700 ease-out-soft ${k === i ? "w-10 bg-ink" : "w-5 bg-ink/20 hover:bg-ink/40"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
