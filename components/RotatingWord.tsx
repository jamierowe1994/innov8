"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span aria-hidden className="relative inline-grid align-baseline">
      {/* Reserve the widest word so nothing around it shifts */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span key={i} className="word-in col-start-1 row-start-1">
        {words[i]}
      </span>
    </span>
  );
}
