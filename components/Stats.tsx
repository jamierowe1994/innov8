"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "@/lib/useScrollProgress";
import { stats } from "@/lib/content";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 2200;
        const tick = (t: number) => {
          const k = clamp((t - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <dl className="grid gap-12 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-[clamp(3.5rem,7vw,6rem)] font-extralight leading-none text-ink">
            <CountUp to={s.value} suffix={s.suffix} />
          </dd>
          <dd className="mt-4 text-[11px] uppercase tracking-[0.24em] text-slate">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
