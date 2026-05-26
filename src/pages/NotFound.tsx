import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const RECOVERY_TILES = [
  {
    label: "Devices",
    description: "Explore the Vellvii pleasure collection.",
    href: "/shop",
    icon: Sparkles,
  },
  {
    label: "Storage",
    description: "Discreet bedroom & travel cases.",
    href: "/collections/discreet-storage",
    icon: Package,
  },
  {
    label: "Available now",
    description: "Shop pieces ready to ship.",
    href: "/shop?filter=in-stock",
    icon: ShieldCheck,
  },
];

const NotFound = () => {
  const location = useLocation();
  const { data: products, isLoading } = useShopifyProducts(12);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const featured =
    (products || [])
      .filter((p) => p.node.variants.edges.some((v) => v.node.availableForSale))
      .slice(0, 3);

  return (
    <>
      <SEO
        title="Page Not Found | Vellvii"
        description="This page slipped out of reach. Return to Vellvii, explore the collection, or visit warranty support."
        noindex
      />
      <ScrollHeader />
      <main className="min-h-dvh surface-dark-rich pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
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

            <p className="font-baskerville italic text-xl sm:text-2xl text-light-primary/90 leading-[1.45] mb-3">
              This page slipped out of reach.
            </p>
            <p className="font-montserrat font-light text-sm sm:text-base text-light-secondary leading-relaxed mb-10 max-w-md mx-auto">
              The page is gone, but the collection is right here. Continue exploring below.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-md bg-primary text-primary-foreground font-montserrat text-sm font-medium hover:shadow-glow transition-all"
              >
                Return Home
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-md border border-primary/40 text-primary font-montserrat text-sm font-medium hover:bg-primary/10 transition-all"
              >
                Explore the Collection
              </Link>
            </div>
          </div>

          {/* Recovery tiles */}
          <section aria-labelledby="recovery-heading" className="mt-16">
            <h2
              id="recovery-heading"
              className="sr-only"
            >
              Continue exploring
            </h2>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              {RECOVERY_TILES.map((tile) => {
                const Icon = tile.icon;
                return (
                  <Link
                    key={tile.label}
                    to={tile.href}
                    className="card-dark rounded-xl p-5 group hover:ring-1 hover:ring-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-baskerville text-lg text-light-primary group-hover:text-primary transition-colors">
                        {tile.label}
                      </span>
                    </div>
                    <p className="font-montserrat text-xs text-light-secondary leading-relaxed">
                      {tile.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-montserrat text-xs text-primary/80 group-hover:text-primary transition-colors">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured in-stock products */}
          <section aria-labelledby="featured-heading" className="mt-16">
            <div className="flex items-end justify-between mb-5">
              <h2
                id="featured-heading"
                className="font-baskerville text-xl sm:text-2xl text-light-primary"
              >
                Available now
              </h2>
              <Link
                to="/shop?filter=in-stock"
                className="font-montserrat text-xs text-primary/80 hover:text-primary transition-colors"
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="card-dark rounded-xl overflow-hidden">
                      <Skeleton className="aspect-square bg-white/5" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-white/5" />
                        <Skeleton className="h-5 w-1/3 bg-white/5" />
                      </div>
                    </div>
                  ))
                : featured.map((product) => {
                    const image = product.node.images.edges[0]?.node;
                    const price = product.node.priceRange.minVariantPrice;
                    return (
                      <Link
                        key={product.node.id}
                        to={`/products/${product.node.handle}`}
                        className="card-dark rounded-xl overflow-hidden group hover:ring-1 hover:ring-primary/40 transition-all"
                      >
                        <div className="aspect-square bg-white/5 overflow-hidden">
                          {image && (
                            <img
                              src={image.url}
                              alt={image.altText || product.node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-baskerville text-base text-light-primary group-hover:text-primary transition-colors line-clamp-1">
                            {product.node.title}
                          </h3>
                          <p className="font-montserrat text-sm text-primary font-semibold mt-1">
                            ${parseFloat(price.amount).toFixed(0)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </section>

          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-light-secondary font-montserrat">
            <Link to="/warranty" className="hover:text-primary transition-colors">
              Warranty
            </Link>
            <span className="text-light-muted">•</span>
            <Link to="/guides" className="hover:text-primary transition-colors">
              Guides
            </Link>
            <span className="text-light-muted">•</span>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
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
