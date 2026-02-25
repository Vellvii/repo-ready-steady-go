import { motion } from "framer-motion";

interface KSPPriceStickerProps {
  retailPrice: string;
  kickstarterPrice: string;
  vipPrice: string;
  label?: string;
  className?: string;
  rotation?: number;
  size?: "sm" | "md" | "lg";
}

export const KSPPriceSticker = ({
  retailPrice,
  kickstarterPrice,
  vipPrice,
  label,
  className = "",
  rotation = -3,
  size = "md",
}: KSPPriceStickerProps) => {
  const sizeClasses = {
    sm: "px-4 py-3 min-w-[140px]",
    md: "px-5 py-4 min-w-[170px]",
    lg: "px-7 py-5 min-w-[200px]",
  };

  const textSizes = {
    sm: { label: "text-[9px]", retail: "text-xs", ks: "text-sm", vip: "text-xl", vipLabel: "text-[9px]" },
    md: { label: "text-[10px]", retail: "text-sm", ks: "text-sm", vip: "text-2xl", vipLabel: "text-[10px]" },
    lg: { label: "text-xs", retail: "text-base", ks: "text-base", vip: "text-3xl", vipLabel: "text-xs" },
  };

  const t = textSizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
      className={`relative ${className}`}
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
    >
      {/* Outer pulsing glow — large and dramatic */}
      <motion.div
        className="absolute -inset-6 sm:-inset-8 rounded-[2rem] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse, hsl(40 70% 65% / 0.6), hsl(40 65% 55% / 0.3) 50%, transparent 75%)",
          filter: "blur(12px)",
        }}
        animate={{
          opacity: [0.15, 0.9, 0.15],
          scale: [0.95, 1.15, 0.95],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Inner tight glow ring */}
      <motion.div
        className="absolute -inset-2 rounded-3xl pointer-events-none z-0"
        style={{
          boxShadow: "0 0 30px 8px hsl(40 65% 65% / 0.5), 0 0 60px 20px hsl(40 65% 65% / 0.2)",
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* The sticker body */}
      <div
        className={`${sizeClasses[size]} rounded-2xl text-center relative overflow-hidden`}
        style={{
          background: "linear-gradient(145deg, hsl(40 65% 82%), hsl(40 60% 72%), hsl(35 55% 62%))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Peeled corner effect */}
        <div
          className="absolute top-0 right-0 w-6 h-6"
          style={{
            background: "linear-gradient(225deg, hsl(15 12% 8%) 50%, hsl(40 50% 60%) 50%)",
            borderBottomLeftRadius: "4px",
          }}
        />

        <div className="relative z-10 space-y-1">
          {label && (
            <p className={`${t.label} font-bold uppercase tracking-[0.2em] text-black/60 mb-2`}>
              {label}
            </p>
          )}

          {/* Retail - crossed out */}
          <div className="flex items-center justify-center gap-2">
            <span className={`${t.retail} text-black/40 font-light`}>Retail</span>
            <span className={`${t.retail} text-black/50 line-through decoration-red-600 decoration-2`}>
              {retailPrice}
            </span>
          </div>

          {/* Kickstarter - crossed out */}
          <div className="flex items-center justify-center gap-2">
            <span className={`${t.ks} text-black/40 font-light`}>Kickstarter</span>
            <span className={`${t.ks} text-black/60 line-through decoration-red-600 decoration-2`}>
              {kickstarterPrice}
            </span>
          </div>

          {/* VIP price - the star */}
          <div className="pt-1">
            <span className={`${t.vipLabel} font-bold uppercase tracking-[0.15em] text-black/70`}>
              VIP Early Bird
            </span>
            <p
              className={`${t.vip} font-baskerville font-bold text-black leading-none mt-0.5`}
            >
              {vipPrice}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
