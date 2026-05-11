import { useEffect } from "react";
import { Star } from "lucide-react";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

interface ProductReviewsProps {
  /** Shopify product GID, e.g. gid://shopify/Product/1234567890 */
  productId: string;
  reviewData: {
    ratingValue: number;
    reviewCount: number;
  } | null;
}

/**
 * Product reviews section, powered by Judge.me.
 *
 * Renders nothing when there are zero approved reviews — keeps the page clean,
 * avoids "Be the first to review" prompts on a luxury PDP, and ensures Product
 * JSON-LD never emits empty/fake aggregateRating data (Google policy).
 *
 * Judge.me must be installed in the Shopify admin (free plan is sufficient).
 * It auto-publishes `reviews.rating` and `reviews.rating_count` metafields,
 * and exposes the public widget script used below.
 */
export const ProductReviews = ({ productId, reviewData }: ProductReviewsProps) => {
  // Inject Judge.me widget loader only when real reviews exist.
  useEffect(() => {
    if (!reviewData) return;

    const SCRIPT_ID = "judgeme-widget-preloader";
    if (document.getElementById(SCRIPT_ID)) {
      // Already loaded; ask Judge.me to (re)render any new widgets.
      // @ts-expect-error - jdgm is added by the Judge.me preloader script
      window.jdgm?.SHOP_DOMAIN || (window as unknown as Record<string, unknown>).jdgm;
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://cdn.judge.me/widget_preloader.js";
    script.setAttribute("data-shop-domain", SHOPIFY_STORE_PERMANENT_DOMAIN);
    document.body.appendChild(script);
  }, [reviewData]);

  if (!reviewData) return null;

  const { ratingValue, reviewCount } = reviewData;
  const numericId = productId.split("/").pop() || "";
  const rounded = Math.round(ratingValue * 10) / 10;

  return (
    <section className="px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-primary/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-primary font-montserrat text-xs uppercase tracking-[0.2em] mb-3">
            Reviews
          </p>
          <h2 className="font-baskerville text-2xl sm:text-3xl lg:text-4xl text-light-primary mb-4">
            What guests are saying
          </h2>

          <div className="inline-flex items-center gap-3">
            <div className="flex items-center gap-0.5" aria-label={`${rounded} out of 5 stars`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < Math.round(ratingValue)
                      ? "fill-primary text-primary"
                      : "text-primary/30"
                  }`}
                  strokeWidth={1.4}
                />
              ))}
            </div>
            <span className="font-montserrat text-sm text-light-secondary">
              <span className="text-light-primary font-medium">{rounded.toFixed(1)}</span>
              <span className="mx-1.5 text-light-muted">-</span>
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {/* Judge.me product review widget */}
        <div
          className="jdgm-widget jdgm-review-widget"
          data-id={numericId}
          data-product-title=""
          data-product-handle=""
        />
      </div>
    </section>
  );
};

export default ProductReviews;
