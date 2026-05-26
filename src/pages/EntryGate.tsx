import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

const EntryGate = () => {
  const handleLeave = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      window.setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 250);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <>
      <SEO
        title="Vellvii - The Art of O | Age-Restricted Entry"
        description="Vellvii - the art of 'O'. Please confirm you are of legal age to enter this intimate wellness experience."
        canonical="/"
        noindex
      />

      <main
        className="relative min-h-[100svh] w-full bg-background text-foreground flex items-center justify-center px-6 sm:px-10 overflow-hidden"
        aria-label="Vellvii entry"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, hsl(var(--primary) / 0.18), transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md flex flex-col items-center text-center"
        >
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_0_24px_rgba(212,175,55,0.18)]"
          />

          <p className="mt-8 font-baskerville italic text-base sm:text-lg text-primary/85 tracking-wide">
            Reshaping the future of intimate wellness.
          </p>

          <span className="block w-10 h-px bg-primary/30 mt-8" aria-hidden />

          <Link
            to="/home"
            className="mt-8 inline-flex items-center justify-center px-10 py-3 rounded-md bg-primary text-primary-foreground font-montserrat text-xs sm:text-sm tracking-[0.32em] uppercase hover:shadow-glow transition-all"
          >
            Enter
          </Link>

          <p className="mt-7 font-montserrat text-[0.7rem] sm:text-xs leading-relaxed text-foreground/55 max-w-sm">
            By entering, you confirm that you are 18+ or of legal age in your
            jurisdiction to view intimate wellness products.
          </p>

          <button
            type="button"
            onClick={handleLeave}
            className="mt-6 font-montserrat text-[0.7rem] sm:text-xs tracking-[0.18em] uppercase text-foreground/40 hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
          >
            Leave site
          </button>
        </motion.div>
      </main>
    </>
  );
};

export default EntryGate;
