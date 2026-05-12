import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useShopifyProducts, useShopifyCollections, useShopifyProductsByCollection } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopifyProduct } from "@/lib/shopify";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { cn } from "@/lib/utils";
import { Search, X, ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";

// Simple fuzzy match - checks if query letters appear in order within the target
const fuzzyMatch = (query: string, target: string): { match: boolean; score: number } => {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  
  // Direct include is best match
  if (t.includes(q)) {
    return { match: true, score: 100 - t.indexOf(q) };
  }
  
  // Check if letters appear in sequence
  let qIdx = 0;
  let consecutiveBonus = 0;
  let lastMatchIdx = -1;
  
  for (let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++) {
    if (t[tIdx] === q[qIdx]) {
      if (lastMatchIdx === tIdx - 1) consecutiveBonus += 5;
      lastMatchIdx = tIdx;
      qIdx++;
    }
  }
  
  if (qIdx === q.length) {
    return { match: true, score: 50 + consecutiveBonus - (t.length - q.length) };
  }
  
  return { match: false, score: 0 };
};

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [isAdding, setIsAdding] = useState(false);

  const variants = product.node.variants.edges;
  // Detect if product has meaningful variant choices (e.g. Color, Size)
  const hasOptions =
    product.node.options &&
    product.node.options.some(
      (opt) =>
        !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title") &&
        opt.values.length > 1
    );
  // If any variant is available, product is purchasable.
  // Shopify's availableForSale already respects "continue selling when out of stock".
  const isAvailable = variants.some((v) => v.node.availableForSale);
  // Pick the first available variant for quick-add
  const quickAddVariant = variants.find((v) => v.node.availableForSale)?.node;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!quickAddVariant || !isAvailable) return;
    setIsAdding(true);
    try {
      await addItem({
        product,
        variantId: quickAddVariant.id,
        variantTitle: quickAddVariant.title,
        price: quickAddVariant.price,
        quantity: 1,
        selectedOptions: quickAddVariant.selectedOptions || [],
      });
      toast.success(`${product.node.title} added to cart`, { position: "top-center" });
    } catch (err) {
      toast.error("Could not add to cart", { position: "top-center" });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/products/${product.node.handle}`} className="group block">
      <div className="card-dark rounded-xl sm:rounded-2xl overflow-hidden relative ring-1 ring-primary/0 group-hover:ring-primary/30 transition-all duration-500">
        <div className="product-image-container aspect-[3/4] sm:aspect-[4/5] relative">
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
          <StatusPill
            status={getProductStatus(product.node.handle, isAvailable)}
            className="absolute top-2 left-2 sm:top-3 sm:left-3"
          />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-light-primary font-baskerville font-semibold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.node.title}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-primary font-montserrat font-bold text-lg sm:text-xl">
              ${parseFloat(price.amount).toFixed(0)}
            </p>
            {!isAvailable ? (
              <span className="font-montserrat text-[10px] sm:text-xs text-light-muted uppercase tracking-[0.2em]">
                —
              </span>
            ) : hasOptions ? (
              <span className="font-montserrat text-xs text-light-secondary group-hover:text-primary transition-colors">
                Select options →
              </span>
            ) : (
              <button
                onClick={handleQuickAdd}
                disabled={isAdding || cartLoading}
                aria-label={`Add ${product.node.title} to cart`}
                className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-full bg-primary text-primary-foreground font-montserrat text-xs font-medium hover:shadow-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            )}
          </div>
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

const SearchBar = ({
  value,
  onChange,
  suggestions,
  onSuggestionClick,
  showSuggestions,
  onFocus,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  suggestions: ShopifyProduct[];
  onSuggestionClick: (product: ShopifyProduct) => void;
  showSuggestions: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search products..."
          className="w-full h-11 sm:h-12 pl-11 pr-10 rounded-full bg-white/5 border border-white/10 text-light-primary placeholder:text-light-muted font-montserrat text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-light-muted hover:text-light-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {suggestions.slice(0, 5).map((product) => (
            <button
              key={product.node.id}
              onMouseDown={() => onSuggestionClick(product)}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left"
            >
              {product.node.images.edges[0]?.node && (
                <img
                  src={product.node.images.edges[0].node.url}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-light-primary font-montserrat text-sm truncate">
                  {product.node.title}
                </p>
                <p className="text-primary text-xs font-medium">
                  ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CollectionFilterBar = ({
  collections,
  selectedCollection,
  onSelect,
  isLoading,
}: {
  collections: { node: { id: string; title: string; handle: string } }[];
  selectedCollection: string | null;
  onSelect: (handle: string | null) => void;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-luxury">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-9 sm:h-10 w-20 sm:w-24 rounded-full bg-white/5 flex-shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-luxury -mx-3 px-3 sm:mx-0 sm:px-0">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-montserrat text-xs sm:text-sm font-medium transition-all duration-300",
          selectedCollection === null
            ? "bg-primary text-primary-foreground shadow-glow"
            : "bg-white/5 text-light-secondary hover:bg-white/10 hover:text-light-primary border border-white/10"
        )}
      >
        All Products
      </button>
      
      {collections.map((collection) => (
        <button
          key={collection.node.id}
          onClick={() => onSelect(collection.node.handle)}
          className={cn(
            "flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-montserrat text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
            selectedCollection === collection.node.handle
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-white/5 text-light-secondary hover:bg-white/10 hover:text-light-primary border border-white/10"
          )}
        >
          {collection.node.title}
        </button>
      ))}
    </div>
  );
};

const Shop = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { data: allProducts } = useShopifyProducts(50);
  const { data: collections, isLoading: collectionsLoading } = useShopifyCollections(20);
  const { data: products, isLoading: productsLoading, error } = useShopifyProductsByCollection(
    selectedCollection,
    20
  );

  // Filter products by search query with fuzzy matching
  const filteredProducts = useMemo(() => {
    if (!products || !searchQuery.trim()) return products;
    
    return products
      .map((product) => ({
        product,
        ...fuzzyMatch(searchQuery, product.node.title),
      }))
      .filter((item) => item.match)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [products, searchQuery]);

  // Suggestions from all products
  const suggestions = useMemo(() => {
    if (!allProducts || !searchQuery.trim() || searchQuery.length < 2) return [];
    
    return allProducts
      .map((product) => ({
        product,
        ...fuzzyMatch(searchQuery, product.node.title),
      }))
      .filter((item) => item.match)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [allProducts, searchQuery]);

  const handleSuggestionClick = (product: ShopifyProduct) => {
    setSearchQuery(product.node.title);
    setShowSuggestions(false);
  };

  const displayProducts = searchQuery.trim() ? filteredProducts : products;

  return (
    <>
      <SEO
        title="Shop Vellvii | Luxury Intimate Wellness Collection"
        description="Explore the Vellvii collection, including DOX, Lux, G-Vibe, Evolve, and Pulse. Premium intimate wellness products designed with elegance and discretion."
        canonical="/shop"
      />
      <div className="min-h-screen surface-dark-rich">
        {/* Scroll-aware Navigation Header */}
        <ScrollHeader />
        
        {/* Hero Section - Compact */}
        <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-primary font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2">
              Luxury Wellness
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-baskerville font-bold text-light-primary mb-2 sm:mb-3">
              The <span className="gradient-text">Collection</span>
            </h1>
            <p className="font-baskerville italic text-sm sm:text-base text-primary/70 tracking-wide mb-3">
              The Art of &lsquo;O&rsquo;
            </p>
            <p className="text-light-secondary text-sm sm:text-base max-w-xl mx-auto font-montserrat leading-relaxed mb-5 sm:mb-6">
              Refined wellness products designed for privacy, elegance, and modern living.
            </p>
            
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              showSuggestions={showSuggestions}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
          </div>
        </div>

        {/* Collection Filter Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-10">
          <CollectionFilterBar
            collections={collections || []}
            selectedCollection={selectedCollection}
            onSelect={(handle) => {
              setSelectedCollection(handle);
              setSearchQuery("");
            }}
            isLoading={collectionsLoading}
          />
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          {productsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
          ) : displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20 px-4">
              <p className="text-light-secondary text-base sm:text-lg font-montserrat">
                {searchQuery 
                  ? `No products found for "${searchQuery}"`
                  : selectedCollection 
                    ? "No products found in this collection."
                    : "No products found."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-primary hover:underline font-montserrat text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default Shop;
