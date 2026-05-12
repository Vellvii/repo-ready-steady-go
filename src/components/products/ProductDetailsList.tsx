import type { SpecRow } from "@/lib/pdpContent";

interface ProductDetailsListProps {
  rows: SpecRow[];
}

/**
 * Renders confirmed product spec rows only. Returns null if no rows -
 * never shows placeholder/speculative values.
 */
export const ProductDetailsList = ({ rows }: ProductDetailsListProps) => {
  if (!rows?.length) return null;

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
            The Details
          </p>
          <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary">
            Product Details
          </h2>
        </div>

        <dl className="card-dark rounded-xl border border-white/10 divide-y divide-white/10">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 px-5 sm:px-6 py-4 sm:py-5"
            >
              <dt className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.15em] text-primary/80">
                {row.label}
              </dt>
              <dd className="sm:col-span-2 font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ProductDetailsList;
