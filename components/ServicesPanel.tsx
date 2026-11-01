"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";

// Matte navy editorial panel: thin rules, white type, the image sitting in the centre column
export default function ServicesPanel() {
  const [active, setActive] = useState(0);
  const s = services[active];
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="services" className="relative isolate overflow-clip rounded-[32px] bg-navy text-white shadow-[0_-40px_80px_-40px_rgba(11,26,40,0.5)] sm:rounded-[48px]">
      <div className="matte -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Diagonal hairline crossing the title column */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="6" y1="92" x2="44" y2="30" stroke="white" strokeOpacity="0.14" strokeWidth="0.08" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="mx-auto grid max-w-[1440px] lg:min-h-[min(100svh,900px)] lg:grid-cols-12">
        {/* Left: current service */}
        <div className="relative flex flex-col px-5 pt-20 sm:px-10 sm:pt-24 lg:col-span-4 lg:px-14 lg:pb-16 lg:pt-28">
          <p className="spaced text-white/70">Services</p>
          <div className="mt-16 lg:mt-auto">
            <p key={`n${active}`} className="fade-up font-display text-2xl font-extralight text-white/80">
              {num(active)}
            </p>
            <h2 key={`t${active}`} className="fade-up mt-4 text-[clamp(2.6rem,4.6vw,4.6rem)] font-extralight leading-[1.02]" style={{ "--d": "80ms" } as React.CSSProperties}>
              {s.title}
            </h2>
            <p key={`l${active}`} className="fade-up mt-6 max-w-xs text-[15px] leading-7 text-white/65" style={{ "--d": "160ms" } as React.CSSProperties}>
              {s.line}
            </p>
          </div>
          <p className="spaced mt-14 text-white/45 lg:mt-20">Seven ways to partner</p>
        </div>

        {/* Centre: image anchored to the base, framed by rules */}
        <div className="relative mt-14 aspect-[4/5] sm:aspect-[16/10] lg:col-span-4 lg:mt-0 lg:aspect-auto lg:border-x lg:border-white/12">
          <span aria-hidden className="absolute -left-[7px] top-28 z-10 hidden size-3.5 rounded-full bg-steel lg:block" />
          <span aria-hidden className="absolute -right-[9px] bottom-[18%] z-10 hidden size-[18px] rounded-full bg-white/85 lg:block" />
          <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden lg:top-28">
            {services.map((item, i) => (
              <img
                key={item.title}
                src={item.image}
                alt=""
                className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out-soft ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
            {/* Pull the photo into the panel's tone */}
            <div className="absolute inset-0 bg-navy/25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right: action + index */}
        <div className="relative flex flex-col px-5 pb-20 pt-14 sm:px-10 lg:col-span-4 lg:px-14 lg:pb-16 lg:pt-28">
          <a href="#contact" className="group flex items-center gap-8">
            <span className="grid size-28 shrink-0 place-items-center rounded-full border border-white/30 transition-colors duration-500 group-hover:border-white/70 sm:size-32">
              <ArrowRight size={22} strokeWidth={1.1} className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <span className="spaced leading-[2.4] text-white/80">
              Discuss
              <br />a search
            </span>
          </a>

          <ol className="mt-16 space-y-1 lg:mt-auto">
            {services.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-baseline gap-5 py-2 text-left"
                  >
                    <span className={`w-6 font-display text-xs tabular-nums transition-colors duration-500 ${on ? "text-white" : "text-white/35"}`}>
                      {num(i)}
                    </span>
                    <span className={`text-[15px] transition-colors duration-500 ${on ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto h-px self-center bg-white transition-all duration-700 ease-out-soft ${on ? "w-8 opacity-100" : "w-0 opacity-0"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
