import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeHero = () => {
  const scrollToFeatures = () => {
    document.getElementById("dox-features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/uploads/Dox1.jpg"
        >
          <source src="/uploads/HEROPAGE.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="/uploads/Vellvii-full-logo-transparent.png"
          alt="Vellvii"
          className="h-12 sm:h-16 md:h-24 mx-auto mb-6 sm:mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-baskerville text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-3 sm:mb-4"
        >
          The Art of 'O'
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-montserrat text-base sm:text-lg md:text-xl text-light-secondary mb-8 sm:mb-12 tracking-wide"
        >
          Luxury Wellness, Refined
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Button
            onClick={scrollToFeatures}
            size="lg"
            className="bg-primary text-black hover:bg-primary/90 font-montserrat font-semibold tracking-wide px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-elegant hover:shadow-glow transition-all duration-500"
          >
            Explore DOX
          </Button>
          <Link to="/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white bg-white/10 hover:bg-white/20 font-montserrat tracking-wide px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm"
            >
              Shop Collection
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="cursor-pointer"
          onClick={scrollToFeatures}
        >
          <ChevronDown className="w-8 h-8 text-white/60 hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
