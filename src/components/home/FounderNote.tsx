import { motion } from "framer-motion";

export const FounderNote = () => {
  return (
    <section className="px-4 mb-12 sm:mb-16 border-t border-white/5 pt-12 sm:pt-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-10 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <span className="font-baskerville italic text-[0.72rem] sm:text-xs tracking-[0.32em] uppercase text-primary/70">
            From the Founders
          </span>
          <span className="block w-10 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-baskerville text-2xl sm:text-3xl md:text-4xl font-bold text-light-primary mb-6"
        >
          Why we made <span className="gradient-text">Vellvii</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="space-y-5 font-montserrat text-[0.95rem] sm:text-base text-light-secondary leading-[1.85] max-w-2xl mx-auto"
        >
          <p>
            The intimacy space has been overrun with the disposable and the crude - cheap
            plastic, throwaway design, and a culture that confuses noise with desire.
          </p>
          <p>
            We built Vellvii to bring back what was missing - elegance, craft, and quiet
            confidence. Pieces designed for the bedside table, not hidden in a drawer. Made
            for adults who expect the same standard from their wellness as from their watch,
            their fragrance, their home.
          </p>
          <p className="text-light-primary/80">
            This is luxury, refined - and it is long overdue.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="block w-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <span className="font-baskerville italic text-xs tracking-[0.25em] text-primary/80">
            - The Vellvii Founders
          </span>
          <span className="block w-12 h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};
