import { useMemo } from "react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import type { ShopifyProduct } from "@/lib/shopify";

/** Handles that are launch / pre-order regardless of variant availability. */
export const PRE_ORDER_HANDLES = new Set<string>();

/** Optional ETA copy shown next to a Pre-Order badge. */
export const ETA_LABELS: Record<string, string> = {};

export type AvailabilityStatus = "in-stock" | "pre-order" | "sold-out";

export const isProductAvailableNow = (p: ShopifyProduct): boolean => {
  if (PRE_ORDER_HANDLES.has(p.node.handle.toLowerCase())) return false;
  return p.node.variants.edges.some((v) => v.node.availableForSale);
};

export const getAvailabilityStatus = (p: ShopifyProduct): AvailabilityStatus => {
  const handle = p.node.handle.toLowerCase();
  const variantAvailable = p.node.variants.edges.some((v) => v.node.availableForSale);
  if (PRE_ORDER_HANDLES.has(handle)) return "pre-order";
  return variantAvailable ? "in-stock" : "sold-out";
};

/**
 * Returns availability info for a product handle, plus up to N in-stock
 * alternatives drawn from the cached catalog. Safe to call before data loads.
 */
export const useProductAvailability = (handle: string | undefined, altCount = 3) => {
  const { data: products } = useShopifyProducts(50);

  return useMemo(() => {
    const all = products ?? [];
    const target = all.find((p) => p.node.handle === handle);

    const status: AvailabilityStatus | null = target ? getAvailabilityStatus(target) : null;
    const etaLabel = handle ? ETA_LABELS[handle.toLowerCase()] : undefined;

    const alternatives = all
      .filter((p) => p.node.handle !== handle && isProductAvailableNow(p))
      .slice(0, altCount);

    return { target, status, etaLabel, alternatives };
  }, [products, handle, altCount]);
};
