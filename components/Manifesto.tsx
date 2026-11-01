"use client";

import { useCallback, useRef } from "react";
import { clamp, useScrollFrame } from "@/lib/useScrollProgress";

// Words light up one by one as the statement scrolls through the reading line
export default function Manifesto({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const onFrame = useCallback(
    (r: DOMRect, vh: number) => {
      const spans = ref.current?.children;
      if (!spans) return;
      // 0 when the top reaches 85% of the viewport, 1 when the bottom reaches 60%
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.25));
      const lit = p * words.length;
      for (let i = 0; i < spans.length; i++) {
        (spans[i] as HTMLElement).style.opacity = String(0.14 + 0.86 * clamp(lit - i));
      }
    },
    [words.length],
  );
  useScrollFrame(ref, onFrame);

  return (
    <p ref={ref} className="font-display text-[clamp(1.9rem,4.4vw,4.1rem)] font-light leading-[1.14] text-ink" aria-label={text}>
      {words.map((w, i) => {
        const bare = w.replace(/[.,]/g, "");
        return (
          <span
            key={i}
            aria-hidden
            className={`transition-opacity duration-300 ${accent.includes(bare) ? "accent text-[1.06em]" : ""}`}
            style={{ opacity: 0.14 }}
          >
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
}
