"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Adds .is-in once the element scrolls into view. Pair with .reveal, .curtain or .mask-line.
export default function Reveal({
  children,
  delay = 0,
  className = "reveal",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span" | "h2" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`${className}${inView ? " is-in" : ""}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

// Heading whose lines rise from behind a mask, staggered
export function MaskHeading({
  lines,
  className = "",
  as = "h2",
  stagger = 110,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h2" | "p" | "div";
  stagger?: number;
}) {
  return (
    <Reveal as={as} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={{ "--d": `${i * stagger}ms` } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </Reveal>
  );
}
