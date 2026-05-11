import { useEffect } from "react";
import { Star } from "lucide-react";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

interface ProductReviewsProps {
  /** Shopify product GID, e.g. gid://shopify/Product/1234567890 */
  productId: string;
  /** Product title - passed to Judge.me widget for analytics & review form */
  productTitle: string;
  reviewData: {
    ratingValue: number;
    reviewCount: number;
  } | null;
}

/**
 * Product reviews section, powered by Judge.me.
 *
 * Always rendered so the PDP doesn't feel empty. When zero approved reviews
 * exist, shows an honest "Be the first" invitation and Judge.me's own
 * write-a-review widget. Real `aggregateRating` JSON-LD remains gated on real
 * review counts (in ProductDetail.tsx) so we never emit fake structured data.
 */
export const ProductReviews = ({ productId, productTitle, reviewData }: ProductReviewsProps) => {
  // Always inject the Judge.me preloader so the write-a-review widget works.
  useEffect(() => {
    const SCRIPT_ID = "judgeme-widget-preloader";
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://cdn.judge.me/widget_preloader.js";
    script.setAttribute("data-shop-domain", SHOPIFY_STORE_PERMANENT_DOMAIN);
    document.body.appendChild(script);
  }, []);

  const numericId = productId.split("/").pop() || "";
  const hasReviews = reviewData !== null;
  const rounded = hasReviews ? Math.round(reviewData.ratingValue * 10) / 10 : 0;

  return (
    <section className="px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-primary/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-primary font-montserrat text-xs uppercase tracking-[0.2em] mb-3">
            Reviews
          </p>
          <h2 className="font-baskerville text-2xl sm:text-3xl lg:text-4xl text-light-primary mb-4">
            {hasReviews ? "What guests are saying" : "Be the first to review"}
          </h2>

          {hasReviews ? (
            <div className="inline-flex items-center gap-3">
              <div className="flex items-center gap-0.5" aria-label={`${rounded} out of 5 stars`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.round(reviewData.ratingValue)
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
                {reviewData.reviewCount}{" "}
                {reviewData.reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>
          ) : (
            <p className="font-montserrat text-sm sm:text-base text-light-secondary max-w-md mx-auto leading-relaxed">
              Share your experience with the Vellvii collection and help others
              discover the art of intentional pleasure.
            </p>
          )}
        </div>

        {/* Judge.me product review widget - renders its own "Write a review" CTA */}
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
