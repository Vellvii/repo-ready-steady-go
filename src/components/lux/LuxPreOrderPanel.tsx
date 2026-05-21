import { useEffect, useState } from "react";
import { Gift, Truck, ShieldCheck, PackageCheck } from "lucide-react";

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
  <div className="w-full max-w-full rounded-xl overflow-hidden border border-primary/40 bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 px-3 py-3 sm:px-5 sm:py-4 text-center shadow-elegant">
    <p className="font-baskerville font-bold tracking-[0.12em] sm:tracking-[0.2em] text-light-primary text-sm sm:text-lg uppercase break-words">
      Pre-Order Now
    </p>
    <p className="font-montserrat text-[11px] sm:text-sm text-light-secondary mt-1 leading-snug">
      Ships end of June
    </p>
  </div>
);

export const LuxFreeGiftBadge = () => (
  <div className="inline-flex max-w-full items-start gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 sm:px-4">
    <Gift className="w-4 h-4 text-primary mt-0.5 shrink-0" />
    <div className="min-w-0 text-left">
      <p className="font-montserrat text-xs sm:text-sm font-semibold text-light-primary leading-tight">
        First-Run Nova Gift
      </p>
      <p className="font-montserrat text-[10px] sm:text-xs text-light-muted leading-tight">
        Includes a complimentary Vellvii Nova handheld suction piece with this first run
      </p>
    </div>
  </div>
);

// Midnight Pacific Time (Los Angeles) — June 30, 2026 is during PDT (UTC-7)
export const LuxCountdown = ({ endDate = "2026-06-30T00:00:00-07:00" }: { endDate?: string }) => {
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
    <div className="w-full max-w-full min-w-0">
      <p className="font-montserrat text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] text-light-muted mb-2">
        Pre-orders close in:
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="min-w-0 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-1 py-3 text-center"
          >
            <div className="font-rajdhani font-bold text-xl sm:text-3xl text-light-primary leading-none">
              {u.value.toString().padStart(2, "0")}
            </div>
            <div className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-wide text-light-muted mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Soft first-run availability note. No hard unit caps, no "limited forever".
export const LuxStockCounter = (_props: {
  quantityAvailable?: number | null;
  totalUnits?: number;
}) => (
  <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-3 text-center">
    <p className="font-montserrat text-xs sm:text-sm font-semibold text-light-primary leading-snug">
      First-run availability
    </p>
    <p className="font-montserrat text-[11px] sm:text-xs text-light-muted leading-snug mt-1">
      Reserve now to secure your place in the current Lux first run.
    </p>
  </div>
);

export const LuxUrgencyBlock = () => (
  <div className="text-center space-y-1">
    <p className="font-montserrat text-sm font-semibold text-light-primary leading-snug">
      The Nova gift is the first-run bonus, not Lux itself.
    </p>
    <p className="font-montserrat text-xs text-light-muted leading-snug">
      Future Lux runs are planned, but the complimentary Nova will not be included after this first run.
    </p>
  </div>
);

export const LuxShippingClarity = () => (
  <div className="grid w-full max-w-full grid-cols-1 min-[360px]:grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
    {[
      { icon: Truck, label: "Tracked shipping" },
      { icon: PackageCheck, label: "Discreet packaging" },
      { icon: ShieldCheck, label: "Secure checkout" },
    ].map(({ icon: Icon, label }) => (
      <div key={label} className="min-w-0 flex flex-col items-center gap-1 text-center">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-montserrat text-[10px] sm:text-xs text-light-secondary leading-tight break-words">
          {label}
        </span>
      </div>
    ))}
  </div>
);
