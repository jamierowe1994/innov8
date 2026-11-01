"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { clamp, useScrollFrame } from "@/lib/useScrollProgress";

// Content inside drifts slower than the page, so the frame appears to slide over it
export default function Parallax({ children, amount = 14, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const onFrame = useCallback(
    (r: DOMRect, vh: number) => {
      const p = clamp((vh - r.top) / (r.height + vh));
      if (inner.current) inner.current.style.transform = `translate3d(0, ${(p - 0.5) * amount * 2}%, 0) scale(${1 + amount / 50})`;
    },
    [amount],
  );
  useScrollFrame(ref, onFrame);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
