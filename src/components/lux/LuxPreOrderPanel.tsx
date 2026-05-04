import { useEffect, useState } from "react";
import { Gift, Truck, ShieldCheck, Globe2 } from "lucide-react";

interface LuxPreOrderPanelProps {
  quantityAvailable: number | null | undefined;
  totalUnits?: number;
  endDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const calc = (target: string): TimeLeft => {
  const diff = +new Date(target) - +new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
  };
};

export const LuxPreOrderBanner = () => (
  <div className="rounded-xl overflow-hidden border border-primary/40 bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 px-4 py-3 sm:px-5 sm:py-4 text-center shadow-elegant">
    <p className="font-baskerville font-bold tracking-[0.2em] text-light-primary text-base sm:text-lg uppercase">
      Pre-Order Now
    </p>
    <p className="font-montserrat text-xs sm:text-sm text-light-secondary mt-1">
      Ships from the USA — First Week of June
    </p>
  </div>
);

export const LuxFreeGiftBadge = () => (
  <div className="inline-flex items-start gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2">
    <Gift className="w-4 h-4 text-primary mt-0.5 shrink-0" />
    <div className="text-left">
      <p className="font-montserrat text-xs sm:text-sm font-semibold text-light-primary leading-tight">
        Includes Complimentary Vellvii Toy
      </p>
      <p className="font-montserrat text-[10px] sm:text-xs text-light-muted leading-tight">
        Limited to first 1500 orders
      </p>
    </div>
  </div>
);

export const LuxCountdown = ({ endDate = "2026-06-01T00:00:00Z" }: { endDate?: string }) => {
  const [time, setTime] = useState<TimeLeft>(() => calc(endDate));
  useEffect(() => {
    const t = setInterval(() => setTime(calc(endDate)), 1000 * 30);
    return () => clearInterval(t);
  }, [endDate]);
  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
  ];
  return (
    <div>
      <p className="font-montserrat text-xs uppercase tracking-[0.2em] text-light-muted mb-2">
        Pre-orders close in:
      </p>
      <div className="flex gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm py-3 text-center"
          >
            <div className="font-rajdhani font-bold text-2xl sm:text-3xl text-light-primary leading-none">
              {u.value.toString().padStart(2, "0")}
            </div>
            <div className="font-montserrat text-[10px] uppercase tracking-wider text-light-muted mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LuxStockCounter = ({
  quantityAvailable,
  totalUnits = 1500,
}: {
  quantityAvailable: number | null | undefined;
  totalUnits?: number;
}) => {
  const qty = typeof quantityAvailable === "number" ? quantityAvailable : totalUnits;
  const low = qty < 300;
  const pct = Math.max(2, Math.min(100, (qty / totalUnits) * 100));
  return (
    <div className="space-y-2">
      <p
        className={`font-montserrat text-sm font-semibold text-center ${
          low ? "text-red-500" : "text-light-primary"
        }`}
      >
        Only {qty.toLocaleString()} of {totalUnits.toLocaleString()} units remaining
      </p>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full ${low ? "bg-red-500" : "bg-primary"} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {low && (
        <p className="font-montserrat text-xs text-red-500 text-center">
          Selling fast — almost gone
        </p>
      )}
    </div>
  );
};

export const LuxUrgencyBlock = () => (
  <div className="text-center space-y-1">
    <p className="font-montserrat text-sm font-semibold text-light-primary">
      Limited production run. No guaranteed restock.
    </p>
    <p className="font-montserrat text-xs text-light-muted">
      Once sold out, next batch may take months.
    </p>
  </div>
);

export const LuxShippingClarity = () => (
  <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
    {[
      { icon: Truck, label: "Ships from USA" },
      { icon: Globe2, label: "No intl. delays" },
      { icon: ShieldCheck, label: "Secure checkout" },
    ].map(({ icon: Icon, label }) => (
      <div key={label} className="flex flex-col items-center gap-1 text-center">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-montserrat text-[10px] sm:text-xs text-light-secondary leading-tight">
          {label}
        </span>
      </div>
    ))}
  </div>
);
