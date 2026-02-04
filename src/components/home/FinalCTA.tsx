import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 bg-gradient-to-b from-background to-surface-dark relative overflow-hidden"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-6 block font-medium"
          >
            READY?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-baskerville text-4xl md:text-6xl text-white mb-6"
          >
            Experience Luxury
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat text-white/80 text-lg mb-10 max-w-xl mx-auto"
          >
            Join the movement redefining intimate wellness with thoughtful design and uncompromising quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 font-montserrat font-semibold tracking-wide px-10 py-6 text-base shadow-elegant hover:shadow-glow transition-all duration-500 w-full sm:w-auto"
              >
                Shop the Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              disabled
              className="border-primary/30 text-primary/60 font-montserrat tracking-wide px-10 py-6 text-base w-full sm:w-auto cursor-not-allowed"
            >
              Crowdfunding Coming Soon
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
