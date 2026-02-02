import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopifyProduct } from "@/lib/shopify";
import { SEO } from "@/components/SEO";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  return (
    <Link to={`/product/${product.node.handle}`} className="group block">
      <div className="card-dark rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Image - Full width on mobile */}
        <div className="product-image-container aspect-[3/4] sm:aspect-[4/5]">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || product.node.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-light-muted">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <h3 className="text-light-primary font-baskerville font-semibold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.node.title}
          </h3>
          <p className="text-primary font-montserrat font-bold text-lg sm:text-xl">
            ${parseFloat(price.amount).toFixed(0)}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ProductSkeleton = () => (
  <div className="card-dark rounded-xl sm:rounded-2xl overflow-hidden">
    <Skeleton className="aspect-[3/4] sm:aspect-[4/5] bg-white/5" />
    <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
      <Skeleton className="h-5 sm:h-6 w-3/4 bg-white/5" />
      <Skeleton className="h-6 sm:h-7 w-1/3 bg-white/5" />
    </div>
  </div>
);

const Shop = () => {
  const { data: products, isLoading, error } = useShopifyProducts(20);

  return (
    <>
      <SEO
        title="Shop | Vellvii"
        description="Explore the Vellvii collection of luxury wellness products designed for privacy, elegance, and modern living."
      />
      <div className="min-h-screen surface-dark-rich">
        {/* Hero Section - Responsive padding and text */}
        <div className="collection-hero py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              Luxury Wellness
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-baskerville font-bold text-light-primary mb-4 sm:mb-6">
              The <span className="gradient-text">Collection</span>
            </h1>
            <p className="text-light-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-montserrat leading-relaxed px-2">
              Refined wellness products designed for privacy, elegance, and
              modern living.
            </p>
          </div>
        </div>

        {/* Products Grid - Responsive spacing and columns */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24 -mt-4 sm:-mt-8">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-20 px-4">
              <p className="text-light-secondary text-base sm:text-lg font-montserrat">
                Failed to load products. Please try again later.
              </p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20 px-4">
              <p className="text-light-secondary text-base sm:text-lg font-montserrat">
                No products found.
              </p>
            </div>
          )}
        </div>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default Shop;
