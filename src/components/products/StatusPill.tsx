import { cn } from "@/lib/utils";

export type ProductStatus =
  | "available"
  | "available-now"
  | "in-stock"
  | "pre-order"
  | "coming-soon"
  | "new"
  | "dox-compatible"
  | "sold-out";

interface StatusPillProps {
  status: ProductStatus;
  className?: string;
  size?: "sm" | "md";
}

const STATUS_STYLES: Record<ProductStatus, { label: string; classes: string }> = {
  available: {
    label: "Available",
    classes: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "available-now": {
    label: "Available Now",
    classes: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "in-stock": {
    label: "In Stock",
    classes: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "pre-order": {
    label: "Pre-Order",
    classes: "bg-primary/15 border-primary/40 text-primary",
  },
  "coming-soon": {
    label: "Coming Soon",
    classes: "bg-white/5 border-white/15 text-light-secondary",
  },
  new: {
    label: "New",
    classes: "bg-primary/10 border-primary/30 text-primary",
  },
  "dox-compatible": {
    label: "DOX-Compatible",
    classes: "bg-white/5 border-white/15 text-light-secondary",
  },
  "sold-out": {
    label: "Sold Out",
    classes: "bg-black/45 border-primary/30 text-primary/90",
  },
};

/**
 * Pre-order handles. Only mark a handle "Available Now" if fulfillment
 * is genuinely ready - when in doubt, fall back to "Available Now"
 * (per brand guidance, avoid "Ready to Ship" unless certain).
 */
const PRE_ORDER_HANDLES = new Set(["vellvii-lux"]);

export const getProductStatus = (
  handle: string | undefined,
  isAvailable: boolean
): ProductStatus => {
  if (!isAvailable) return "sold-out";
  if (handle && PRE_ORDER_HANDLES.has(handle.toLowerCase())) return "pre-order";
  return "available-now";
};

/**
 * Returns up to two restrained, premium badges to overlay on a product card.
 * Order matters - primary status first, modifier second.
 */
export const getProductBadges = (
  handle: string | undefined,
  isAvailable: boolean
): ProductStatus[] => {
  const badges: ProductStatus[] = [getProductStatus(handle, isAvailable)];
  if (handle?.toLowerCase().includes("dox") && !badges.includes("dox-compatible")) {
    // intentional no-op: the DOX itself shouldn't read as compatible-with-itself
  } else if (
    handle &&
    /(lux|g-vibe|evolve|pulse|vibe)/i.test(handle) &&
    isAvailable
  ) {
    badges.push("dox-compatible");
  }
  return badges;
};

export const StatusPill = ({ status, className, size = "sm" }: StatusPillProps) => {
  const { label, classes } = STATUS_STYLES[status];
  const sizeClasses =
    size === "md"
      ? "px-3.5 py-1.5 text-[11px] sm:text-xs"
      : "px-3 py-1 text-[10px] sm:text-xs";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border backdrop-blur-sm",
        classes,
        sizeClasses,
        className
      )}
    >
      <span className="font-montserrat font-medium uppercase tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
};
