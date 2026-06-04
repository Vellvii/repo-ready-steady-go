import { Gift } from "lucide-react";

/**
 * Receipt-style value stack panel. Shows the math behind the offer so
 * customers see the $49 saving before they reach the cart.
 */
export const ValueStackCard = () => {
  const rows: { label: string; value: string; muted?: boolean }[] = [
    { label: "Vellvii Lux", value: "$199" },
    { label: "Vellvii Nova", value: "$49" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
      <div className="max-w-md mx-auto">
        <div className="rounded-2xl border border-primary/20 bg-card/40 px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Gift className="w-4 h-4 text-primary" />
            <p className="font-montserrat text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs">
              Your Order, Itemised
            </p>
          </div>

          <div className="font-montserrat text-sm sm:text-base tabular-nums">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-2 py-1.5 text-light-secondary"
              >
                <span>{r.label}</span>
                <span className="flex-1 mx-2 border-b border-dotted border-light-secondary/25 translate-y-[-3px]" />
                <span className="text-light-primary">{r.value}</span>
              </div>
            ))}

            <div className="h-px bg-light-secondary/20 my-3" />

            <div className="flex items-baseline justify-between gap-2 py-1.5 text-light-secondary">
              <span>Total value</span>
              <span className="flex-1 mx-2 border-b border-dotted border-light-secondary/25 translate-y-[-3px]" />
              <span className="text-light-primary">$248</span>
            </div>
            <div className="flex items-baseline justify-between gap-2 py-1.5 text-primary">
              <span>This page only</span>
              <span className="flex-1 mx-2 border-b border-dotted border-primary/30 translate-y-[-3px]" />
              <span>-$49</span>
            </div>

            <div className="h-px bg-primary/30 my-3" />

            <div className="flex items-baseline justify-between gap-2 pt-1">
              <span className="font-baskerville text-light-primary text-lg sm:text-xl">
                You pay
              </span>
              <span className="font-baskerville text-primary font-bold text-2xl sm:text-3xl tracking-wide">
                $199
              </span>
            </div>
          </div>

          <p className="font-montserrat text-light-secondary/60 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-center mt-5">
            + $14.20 shipping · Ships end of June
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueStackCard;
