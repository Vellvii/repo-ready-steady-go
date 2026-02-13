import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Super Early Bird",
    badge: "Limited - First 100 Backers",
    featured: true,
    items: [
      { product: "Dox", ks: "$149", retail: "$299" },
      { product: "Pulse", ks: "$99", retail: "$169" },
      { product: "G-Vibe", ks: "$99", retail: "$169" },
      { product: "Evolve", ks: "$99", retail: "$169" },
    ],
    combo: { label: "Full Ecosystem", ks: "$399", retail: "$806" },
    includes: [
      "Choice of color",
      "Biometric fingerprint lock",
      "USB-C charging hub",
      "Premium packaging",
    ],
  },
  {
    name: "Standard Campaign",
    badge: "Available Throughout Campaign",
    featured: false,
    items: [
      { product: "Dox", ks: "$199", retail: "$299" },
      { product: "Pulse", ks: "$129", retail: "$169" },
      { product: "G-Vibe", ks: "$129", retail: "$169" },
      { product: "Evolve", ks: "$129", retail: "$169" },
    ],
    combo: { label: "Full Ecosystem", ks: "$549", retail: "$806" },
    includes: [
      "Choice of color",
      "Biometric fingerprint lock",
      "USB-C charging hub",
      "Standard packaging",
    ],
  },
];

export const KickstarterPricing = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary/70 mb-5">
            Kickstarter Pricing
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-4">
            Secure early <span className="gradient-text">access.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-md mx-auto">
            Exclusive pricing for early supporters. These tiers won't be available at retail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className={cn(
                "relative rounded-2xl p-8 sm:p-10",
                tier.featured
                  ? "glass-accent border-primary/20"
                  : "glass-dark border-white/[0.04]"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary/90 text-primary-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="font-montserrat text-[10px] uppercase tracking-wider font-semibold">
                    Limited Availability
                  </span>
                </div>
              )}

              <h3 className="font-baskerville text-2xl text-light-primary mb-1">{tier.name}</h3>
              <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-8">
                {tier.badge}
              </p>

              {/* Product pricing */}
              <div className="space-y-3 mb-6">
                {tier.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="font-montserrat text-sm text-light-secondary">{item.product}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-montserrat text-xs text-light-muted line-through">{item.retail}</span>
                      <span className="font-baskerville text-lg text-primary">{item.ks}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Combo */}
              <div className="py-4 px-5 rounded-xl bg-primary/[0.06] border border-primary/10 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-sm font-medium text-light-primary">{tier.combo.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-xs text-light-muted line-through">{tier.combo.retail}</span>
                    <span className="font-baskerville text-2xl text-primary">{tier.combo.ks}</span>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <ul className="space-y-2 mb-8">
                {tier.includes.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                    <span className="font-montserrat text-sm text-light-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3.5 rounded-xl font-montserrat text-sm font-medium transition-all duration-300",
                  tier.featured
                    ? "btn-premium"
                    : "border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                )}
              >
                {tier.featured ? "Secure Early Access" : "Back This Tier"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
