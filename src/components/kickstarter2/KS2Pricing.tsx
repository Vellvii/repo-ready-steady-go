import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Clock } from "lucide-react";

const tiers = [
  {
    name: "Super Early Bird",
    badge: "First 100 Backers",
    featured: true,
    items: [
      { product: "Dox", ks: "$149", retail: "$299" },
      { product: "Pulse", ks: "$99", retail: "$169" },
      { product: "G-Vibe", ks: "$99", retail: "$169" },
      { product: "Evolve", ks: "$99", retail: "$169" },
    ],
    combo: { label: "Full Ecosystem", ks: "$399", retail: "$806" },
    includes: ["Choice of color", "Biometric lock", "USB-C hub", "Premium packaging"],
  },
  {
    name: "Standard Campaign",
    badge: "Throughout Campaign",
    featured: false,
    items: [
      { product: "Dox", ks: "$199", retail: "$299" },
      { product: "Pulse", ks: "$129", retail: "$169" },
      { product: "G-Vibe", ks: "$129", retail: "$169" },
      { product: "Evolve", ks: "$129", retail: "$169" },
    ],
    combo: { label: "Full Ecosystem", ks: "$549", retail: "$806" },
    includes: ["Choice of color", "Biometric lock", "USB-C hub", "Standard packaging"],
  },
];

export const KS2Pricing = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="relative py-28 sm:py-36 bg-white">
      <div ref={ref} className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="w-10 h-1 bg-amber-700 mx-auto mb-8" />
          <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 font-medium">Kickstarter Pricing</p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
            Secure early <span className="text-amber-700">access.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`relative rounded-3xl p-8 sm:p-10 border ${tier.featured ? "border-amber-300 bg-amber-50/50 shadow-lg shadow-amber-100/50" : "border-stone-200 bg-stone-50"}`}>
              
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-700 text-white">
                  <Clock className="w-3 h-3" />
                  <span className="font-montserrat text-[10px] uppercase tracking-wider font-semibold">Limited</span>
                </div>
              )}

              <h3 className="font-baskerville text-2xl text-stone-900 mb-1">{tier.name}</h3>
              <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-amber-700 mb-8 font-medium">{tier.badge}</p>

              <div className="space-y-3 mb-6">
                {tier.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="font-montserrat text-sm text-stone-600">{item.product}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-montserrat text-xs text-stone-400 line-through">{item.retail}</span>
                      <span className="font-baskerville text-lg text-amber-700">{item.ks}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-4 px-5 rounded-2xl bg-amber-100/50 border border-amber-200/50 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-sm font-semibold text-stone-800">{tier.combo.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-xs text-stone-400 line-through">{tier.combo.retail}</span>
                    <span className="font-baskerville text-2xl text-amber-700">{tier.combo.ks}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-8">
                {tier.includes.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span className="font-montserrat text-sm text-stone-500 font-light">{item}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3.5 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300 ${
                tier.featured
                  ? "bg-amber-700 text-white hover:bg-amber-800 shadow-lg shadow-amber-700/20"
                  : "border border-amber-700 text-amber-700 hover:bg-amber-50"
              }`}>
                {tier.featured ? "Secure Early Access" : "Back This Tier"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
