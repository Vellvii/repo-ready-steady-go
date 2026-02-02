import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";

interface StickyProductBarProps {
  productName: string;
  price: string;
  onAddToCart: () => void;
  isLoading?: boolean;
  isAvailable?: boolean;
}

export const StickyProductBar = ({
  productName,
  price,
  onAddToCart,
  isLoading = false,
  isAvailable = true,
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
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-light-primary font-baskerville font-semibold text-sm sm:text-base truncate">
            {productName}
          </h3>
          <p className="text-primary font-montserrat font-bold text-sm sm:text-base">${price}</p>
        </div>
        <Button
          size="default"
          className="btn-premium px-4 sm:px-6 h-10 sm:h-11 flex-shrink-0 text-sm sm:text-base"
          onClick={onAddToCart}
          disabled={isLoading || !isAvailable}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : !isAvailable ? (
            <span className="text-xs sm:text-base">Sold Out</span>
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
