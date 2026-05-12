import { ShieldCheck, Sparkles, Lock, Heart, Gem, Leaf, Wand2, Package } from "lucide-react";
import type { KeyBenefit } from "@/lib/pdpContent";

const ICONS = { ShieldCheck, Sparkles, Lock, Heart, Gem, Leaf, Wand2, Package };

interface KeyBenefitsProps {
  benefits: KeyBenefit[];
  tagline?: string;
}

export const KeyBenefits = ({ benefits, tagline }: KeyBenefitsProps) => {
  if (!benefits?.length) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
            Designed Around You
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-baskerville font-bold text-light-primary leading-tight">
            Considered in every detail
          </h2>
          {tagline && (
            <p className="mt-3 sm:mt-4 font-montserrat text-light-secondary text-sm sm:text-base leading-relaxed">
              {tagline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {benefits.map((b) => {
            const Icon = ICONS[b.icon] ?? Sparkles;
            return (
              <div
                key={b.label}
                className="card-dark rounded-xl p-5 sm:p-6 border border-white/10 hover:border-primary/30 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.4} />
                <h3 className="font-baskerville text-lg sm:text-xl text-light-primary mb-1.5">
                  {b.label}
                </h3>
                <p className="font-montserrat text-sm text-light-secondary leading-relaxed">
                  {b.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
