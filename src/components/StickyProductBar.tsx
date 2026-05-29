import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";

interface StickyProductBarProps {
  productName: string;
  price: string;
  onAddToCart: () => void;
  isLoading?: boolean;
  isAvailable?: boolean;
  ctaLabel?: string;
}

export const StickyProductBar = ({
  productName,
  price,
  onAddToCart,
  isLoading = false,
  isAvailable = true,
  ctaLabel,
}: StickyProductBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px on mobile, 400px on desktop
      const threshold = window.innerWidth < 640 ? 300 : 400;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-product-bar ${isVisible ? "visible" : ""}`}>
      <div className="max-w-6xl mx-auto flex min-w-0 items-center justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-light-primary font-baskerville font-semibold text-sm sm:text-base truncate">
            {productName}
          </h3>
          <p className="text-primary font-montserrat font-bold text-sm sm:text-base">${price}</p>
        </div>
        <Button
          size="default"
          className="btn-premium h-10 sm:h-11 max-w-[52vw] flex-shrink-0 whitespace-normal px-3 sm:px-6 text-center text-xs sm:text-base leading-tight"
          onClick={() => {
            if (!isAvailable) {
              const el = document.getElementById("join-waitlist");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              return;
            }
            onAddToCart();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : !isAvailable ? (
            <span className="text-xs sm:text-base">Join the Waitlist</span>
          ) : ctaLabel ? (
            <span className="font-semibold leading-tight">{ctaLabel}</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StickyProductBar;
