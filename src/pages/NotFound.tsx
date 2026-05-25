import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | Vellvii"
        description="This page slipped out of reach. Return to Vellvii, explore the collection, or visit warranty support."
        noindex
      />
      <main className="min-h-screen surface-dark-rich flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full text-center">
          {/* Hairline ornament */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <span className="font-baskerville italic text-[0.78rem] tracking-[0.32em] uppercase text-primary/70">
              Out of Reach
            </span>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <h1 className="font-baskerville font-bold text-6xl sm:text-7xl text-light-primary mb-4 tracking-tight">
            404
          </h1>

          <p className="font-baskerville italic text-xl sm:text-2xl text-light-primary/90 leading-[1.45] mb-4">
            This page slipped out of reach.
          </p>
          <p className="font-montserrat font-light text-sm sm:text-base text-light-secondary leading-relaxed mb-10 max-w-md mx-auto">
            Return to Vellvii, explore the collection, or visit warranty support.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-montserrat text-sm font-medium hover:shadow-glow transition-all"
            >
              Return Home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-primary/40 text-primary font-montserrat text-sm font-medium hover:bg-primary/10 transition-all"
            >
              Explore the Collection
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-light-secondary font-montserrat">
            <Link to="/warranty" className="hover:text-primary transition-colors">
              Warranty
            </Link>
            <span className="text-light-muted">•</span>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="flex justify-center mt-10">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
