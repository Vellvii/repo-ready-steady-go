import { MagneticButton } from "@/components/animations/MagneticButton";

interface LuxReserveCTAProps {
  className?: string;
}

export const LuxReserveCTA = ({ className = "" }: LuxReserveCTAProps) => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MagneticButton
      onClick={scrollToEmailCapture}
      className={`group px-10 py-6 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden ${className}`}
    >
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-black/50 text-sm font-light line-through">$169</span>
          <span className="font-baskerville text-3xl font-bold tracking-tight">$70</span>
        </div>
        <span className="font-bold text-base tracking-wide uppercase">Reserve Your LUX</span>
        <span className="text-xs font-light text-black/70 tracking-widest">Exclusive VIP Pricing</span>
      </div>
      <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </MagneticButton>
  );
};
