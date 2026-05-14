import { Truck, ShieldCheck, Lock, Sparkles } from "lucide-react";

interface TrustStripProps {
  /** Product handle - used to determine warranty coverage */
  productHandle?: string;
}

export const TrustStrip = ({ productHandle }: TrustStripProps) => {
  const handle = productHandle?.toLowerCase() || "";
  // DOX and LUX get lifetime warranty; all other products (Pulse, Vibe, G-Vibe) get 1-year
  const isLifetime = handle.includes("dox") || handle.includes("lux");
  const warrantyLabel = isLifetime ? "Lifetime Warranty" : "1-Year Warranty";

  const items = [
    { icon: Truck, label: "Discreet Shipping" },
    { icon: ShieldCheck, label: warrantyLabel },
    { icon: Lock, label: "Plain Packaging" },
    { icon: Sparkles, label: "Considered Materials" },
  ];

  return (
    <div className="w-full max-w-full border-y border-primary/15 py-5 sm:py-6 overflow-hidden">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="min-w-0 flex flex-col items-center text-center gap-2 group"
          >
            <Icon
              className="w-5 h-5 text-primary transition-transform duration-500 group-hover:-translate-y-0.5"
              strokeWidth={1.4}
            />
            <span className="font-montserrat text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-light-secondary leading-snug break-words">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
