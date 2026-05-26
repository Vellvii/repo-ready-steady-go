import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { useProductAvailability, ETA_LABELS } from "@/lib/productAvailability";

interface CrossLinkCardProps {
  /** Handle of the product being cross-linked to (e.g. "vellvii-dox"). */
  handle: string;
  /** Editorial copy above the linked product. */
  copy: string;
  /** CTA label, e.g. "Discover Vellvii DOX". */
  label: string;
}

/**
 * Inventory-aware promo block. Renders editorial copy, the target product's
 * live status pill, an optional ETA, and - if the target is unavailable -
 * surfaces a row of in-stock alternatives so users never hit a dead end.
 */
export const CrossLinkCard = ({ handle, copy, label }: CrossLinkCardProps) => {
  const { target, status, etaLabel, alternatives } = useProductAvailability(handle, 3);
  const href = `/products/${handle}`;

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-baskerville italic text-base sm:text-lg text-light-secondary mb-3">
          {copy}
        </p>

        <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
          {status && (
            <StatusPill
              status={
                status === "in-stock"
                  ? "available-now"
                  : status === "pre-order"
                    ? "pre-order"
                    : "sold-out"
              }
            />
          )}
          {etaLabel && (
            <span className="font-montserrat text-[0.7rem] uppercase tracking-[0.22em] text-light-secondary/70">
              {etaLabel}
            </span>
          )}
        </div>

        <Link
          to={href}
          className="inline-flex items-center gap-2 font-montserrat text-sm text-primary hover:text-primary/80 transition-colors group"
        >
          {label}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {(status === "sold-out" || status === "pre-order") && alternatives.length > 0 && (
          <div className="mt-7 pt-6 border-t border-white/[0.06]">
            <p className="font-baskerville italic text-[0.7rem] uppercase tracking-[0.24em] text-primary/70 mb-4">
              Also available now
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {alternatives.map((alt) => {
                const img = alt.node.images.edges[0]?.node;
                return (
                  <Link
                    key={alt.node.id}
                    to={`/products/${alt.node.handle}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-card/40 hover:border-primary/40 hover:bg-card/60 transition-all px-3 py-2"
                  >
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText || alt.node.title}
                        className="w-10 h-10 rounded-md object-cover"
                        loading="lazy"
                      />
                    )}
                    <span className="font-montserrat text-xs sm:text-sm text-light-primary group-hover:text-primary transition-colors">
                      {alt.node.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CrossLinkCard;
