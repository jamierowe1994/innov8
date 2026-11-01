"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { contact, nav } from "@/lib/content";

type LenisWindow = Window & { __lenis?: Lenis };

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Light bar once clear of the hero. Hide on the way down, show on the way up.
      setSolid(y > window.innerHeight * 0.85);
      if (y < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the menu; Esc closes it
  useEffect(() => {
    const lenis = (window as LenisWindow).__lenis;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = solid && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-out-soft sm:px-5 sm:pt-4 ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow,backdrop-filter] duration-700 sm:px-6 ${
            light ? "bg-white/85 shadow-[0_8px_30px_-18px_rgba(11,26,40,0.25)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <a href="#top" onClick={() => setOpen(false)} aria-label="Innov8Search home" className="relative block h-7 w-[94px]">
            <img src="/images/innov8-logo-white.svg" alt="" className={`absolute inset-0 h-7 w-auto transition-opacity duration-700 ${light ? "opacity-0" : "opacity-100"}`} />
            <img src="/images/innov8-logo.svg" alt="" className={`absolute inset-0 h-7 w-auto transition-opacity duration-700 ${light ? "opacity-100" : "opacity-0"}`} />
          </a>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={`hidden rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-500 sm:inline-block ${
                light ? "bg-ink text-white hover:bg-navy" : "bg-white text-ink hover:bg-[#dfe7ee]"
              }`}
            >
              Talk to Us
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`group relative grid size-11 place-items-center rounded-full transition-colors duration-500 ${light ? "text-ink" : "text-white"}`}
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-soft ${
                    open ? "top-1/2 rotate-45" : "top-0 group-hover:translate-x-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-current transition-all duration-500 ease-out-soft ${
                    open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3 group-hover:w-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-navy text-white transition-[clip-path] duration-[900ms] ease-in-out-soft ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="matte" />
        <div className="relative mx-auto grid min-h-full max-w-[1440px] px-5 pb-10 pt-28 sm:px-10 lg:grid-cols-12 lg:px-14 lg:pt-32">
          <span aria-hidden className="absolute inset-y-0 left-[calc(33.333%)] hidden w-px bg-white/12 lg:block" />

          <div className="hidden flex-col justify-between lg:col-span-4 lg:flex lg:pr-14">
            <p className="spaced text-white/60">Menu</p>
            <p className="spaced leading-[2.4] text-white/45">
              Sydney
              <br />
              Wellington
              <br />
              London
            </p>
          </div>

          <nav className="flex flex-col justify-center lg:col-span-5 lg:pl-14">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-6 py-2 sm:gap-8"
              >
                <span className="w-8 font-display text-sm font-light tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span
                    className={`block font-display text-[clamp(2.8rem,7vw,5.8rem)] font-extralight leading-[1.05] transition-[transform,opacity] duration-[1000ms] ease-out-soft group-hover:opacity-60 ${
                      open ? "translate-y-0" : "translate-y-[105%]"
                    }`}
                    style={{ transitionDelay: open ? `${300 + i * 80}ms` : "0ms" }}
                  >
                    {item.label}
                  </span>
                </span>
              </a>
            ))}
          </nav>

          <div
            className={`mt-16 flex flex-col justify-end gap-2 text-sm text-white/70 transition-opacity duration-700 lg:col-span-3 lg:mt-0 ${
              open ? "opacity-100 delay-500" : "opacity-0"
            }`}
          >
            <p className="spaced mb-4 text-white/45">Get in touch</p>
            <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1} className="w-fit hover:text-white">
              {contact.email}
            </a>
            {contact.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} tabIndex={open ? 0 : -1} className="w-fit hover:text-white">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
