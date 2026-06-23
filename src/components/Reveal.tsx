import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Tag to render. Defaults to `div`. */
  as?: ElementType;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  /** IntersectionObserver rootMargin. */
  rootMargin?: string;
  /** Reveal threshold (0-1). */
  threshold?: number;
  /** Vertical offset of the hidden state, in px. */
  offset?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper. Fades + rises into place on first intersection.
 * Respects `prefers-reduced-motion` — renders immediately with no transition.
 * Pure CSS, no animation library.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
  offset = 16,
  className,
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin, threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin, threshold, reduced]);

  const style = visible
    ? { transform: "translate3d(0,0,0)", opacity: 1, transitionDelay: `${delay}ms` }
    : { transform: `translate3d(0,${offset}px,0)`, opacity: 0 };

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
