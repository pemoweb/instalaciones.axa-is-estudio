import { useEffect, useRef, useState } from "react";

interface UseCardRevealOptions {
  /**
   * Percentage of card visible before triggering the reveal (default 0.15 = 15%)
   */
  threshold?: number;
  /**
   * Root margin offset for intersection checking (e.g. triggers slightly before reaching bottom)
   */
  rootMargin?: string;
}

/**
 * Custom React hook that uses IntersectionObserver to reveal cards
 * with a subtle fade-in animation as they scroll into view.
 */
export function useCardReveal(options: UseCardRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-reveal-card]");
    if (!cards.length) return;

    // Immediately reveal cards if IntersectionObserver is unsupported or user prefers reduced motion
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealedIndices(new Set(Array.from({ length: cards.length }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute("data-index");
            if (idxAttr !== null) {
              const idx = parseInt(idxAttr, 10);
              setRevealedIndices((prev) => {
                if (prev.has(idx)) return prev;
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }
            // Once revealed, unobserve this specific card
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { containerRef, revealedIndices };
}
