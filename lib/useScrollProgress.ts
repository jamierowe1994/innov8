"use client";

import { useEffect, type RefObject } from "react";

// Calls back on every frame the element's scroll position changes.
// rect is the element's box; vh the viewport height. No React re-renders.
export function useScrollFrame(
  ref: RefObject<HTMLElement | null>,
  onFrame: (rect: DOMRect, vh: number) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = NaN;
    const tick = () => {
      const r = el.getBoundingClientRect();
      if (r.top !== last) {
        last = r.top;
        onFrame(r, window.innerHeight);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onResize = () => (last = NaN);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, onFrame]);
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
