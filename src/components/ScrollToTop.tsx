import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on every route change.
 * Honors hash links (#section) by leaving scroll position alone.
 * Works alongside Lenis smooth scroll by calling its instance when present.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let in-page anchor links handle their own scroll

    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    // Always also call native as a fallback (covers cases where Lenis is mid-init or destroyed)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
