import { Truck, ShieldCheck, Lock, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, label: "Discreet Shipping" },
  { icon: ShieldCheck, label: "1-Year Warranty" },
  { icon: Lock, label: "Plain Packaging" },
  { icon: Sparkles, label: "Body-Safe Materials" },
];

export const TrustStrip = () => {
  return (
    <div className="border-y border-primary/15 py-5 sm:py-6">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center text-center gap-2 group"
          >
            <Icon
              className="w-5 h-5 text-primary transition-transform duration-500 group-hover:-translate-y-0.5"
              strokeWidth={1.4}
            />
            <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-light-secondary">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
