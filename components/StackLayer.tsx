"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { clamp, useScrollFrame } from "@/lib/useScrollProgress";

// One sheet in a stack. It pins once its bottom reaches the bottom of the screen,
// so the next sheet slides up over it. While covered it eases back and dims slightly.
export default function StackLayer({
  children,
  z,
  className = "",
  rounded = "",
}: {
  children: ReactNode;
  z: number;
  className?: string;
  rounded?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  // Taller-than-screen sheets pin by their bottom edge, so all their content is seen first
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => (el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  const onFrame = useCallback((_: DOMRect, vh: number) => {
    const next = ref.current?.nextElementSibling as HTMLElement | null;
    if (!next || !innerRef.current) return;
    const p = clamp(1 - next.getBoundingClientRect().top / vh); // 0 untouched, 1 fully covered
    innerRef.current.style.transform = p > 0 ? `scale(${1 - p * 0.05})` : "";
    if (shadeRef.current) shadeRef.current.style.opacity = String(p * 0.22);
  }, []);
  useScrollFrame(ref, onFrame);

  return (
    <div ref={ref} className={`sticky ${className}`} style={{ zIndex: z }}>
      <div ref={innerRef} className="relative origin-[50%_100%] will-change-transform">
        {children}
        <div ref={shadeRef} aria-hidden className={`pointer-events-none absolute inset-0 bg-ink opacity-0 ${rounded}`} />
      </div>
    </div>
  );
}
