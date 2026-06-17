import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface LuxStickyOfferBarProps {
  href: string;
}

/**
 * Mobile/tablet sticky bar that keeps the "Lux + free Nova" offer
 * visible all the way to the CTA tap. Hidden on desktop.
 */
export const LuxStickyOfferBar = ({ href }: LuxStickyOfferBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-[900] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-primary/20 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Gift className="w-3 h-3 text-primary flex-shrink-0" />
              <p className="font-montserrat text-light-secondary/80 text-[10px] sm:text-xs uppercase tracking-[0.15em] truncate">
                Lux + free Nova
              </p>
            </div>
            <p className="font-baskerville text-primary font-bold text-lg sm:text-xl leading-tight">
              $199{" "}
              <span className="text-light-secondary/50 line-through font-normal text-sm">
                $248
              </span>
            </p>
          </div>
          <a href={href} rel="noopener noreferrer" className="flex-shrink-0">
            <Button
              size="default"
              className="btn-premium h-11 px-4 sm:px-6 text-xs sm:text-sm font-semibold whitespace-nowrap"
            >
              Buy Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LuxStickyOfferBar;
