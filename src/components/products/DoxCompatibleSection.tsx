import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

export const DoxCompatibleSection = () => {
  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="card-dark rounded-xl border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-5 h-5 text-primary" strokeWidth={1.4} />
            <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary/80">
              The Vellvii Ecosystem
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-3">
            DOX-Compatible by Design
          </h2>
          <p className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed mb-5 sm:mb-6">
            Compatible with the VDS suction-base mounting station that sits atop the Vellvii DOX,
            this product forms part of the Vellvii Pleasure Collection and integrates cleanly into
            the DOX ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <Link
              to="/products/vellvii-dox"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              View the Vellvii DOX
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/collections/dox-compatible-products"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-light-secondary hover:text-primary transition-colors group"
            >
              Explore DOX-Compatible Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoxCompatibleSection;
