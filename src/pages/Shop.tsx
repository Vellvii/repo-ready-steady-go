import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useShopifyProducts, useShopifyCollections, useShopifyProductsByCollection } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopifyProduct } from "@/lib/shopify";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { cn } from "@/lib/utils";
import { Search, X, ShoppingCart, Loader2, SlidersHorizontal, ChevronDown } from "lucide-react";
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

type SortOption = "featured" | "price-asc" | "price-desc" | "title-asc";

const Shop = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

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

  const baseProducts = searchQuery.trim() ? filteredProducts : products;

  // Apply price / stock filters and sort
  const displayProducts = useMemo(() => {
    if (!baseProducts) return baseProducts;
    const min = priceMin ? parseFloat(priceMin) : null;
    const max = priceMax ? parseFloat(priceMax) : null;

    let list = baseProducts.filter((p) => {
      const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      if (inStockOnly) {
        const available = p.node.variants.edges.some((v) => v.node.availableForSale);
        if (!available) return false;
      }
      return true;
    });

    if (sortBy !== "featured") {
      list = [...list].sort((a, b) => {
        const ap = parseFloat(a.node.priceRange.minVariantPrice.amount);
        const bp = parseFloat(b.node.priceRange.minVariantPrice.amount);
        if (sortBy === "price-asc") return ap - bp;
        if (sortBy === "price-desc") return bp - ap;
        if (sortBy === "title-asc") {
          const stripBrand = (t: string) =>
            t.replace(/^\s*vellvii[\s\-:]*/i, "").trim().toLowerCase();
          return stripBrand(a.node.title).localeCompare(stripBrand(b.node.title));
        }
        return 0;
      });
    }
    return list;
  }, [baseProducts, priceMin, priceMax, inStockOnly, sortBy]);

  const activeFilterCount =
    (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (inStockOnly ? 1 : 0) + (sortBy !== "featured" ? 1 : 0);

  const clearFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setInStockOnly(false);
    setSortBy("featured");
  };

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

        {/* Editorial category cards */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: "Available Now",
                tag: "Shop in-stock",
                href: "/collections/pleasure-collection",
              },
              {
                label: "Vellvii Lux",
                tag: "Limited drop",
                href: "/products/vellvii-lux",
              },
              {
                label: "Storage Solutions",
                tag: "Discreet by design",
                href: "/collections/discreet-storage",
              },
              {
                label: "DOX-Compatible",
                tag: "Built for the system",
                href: "/collections/dox-compatible-products",
              },
            ].map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="group relative card-dark rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-5 min-h-[110px] sm:min-h-[130px] flex flex-col justify-end ring-1 ring-white/5 hover:ring-primary/40 transition-all duration-500"
              >
                <span className="font-montserrat text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.22em] text-primary/70 mb-1.5">
                  {c.tag}
                </span>
                <span className="font-baskerville text-light-primary text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                  {c.label}
                </span>
                <span className="absolute inset-0 bg-gradient-to-tr from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>

        {/* Collection Filter Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-4 sm:mb-5">
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

        {/* Filters: collapsible refinement panel */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/5 text-light-secondary hover:text-light-primary hover:border-white/20 transition-colors font-montserrat text-xs sm:text-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter &amp; sort</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-primary/20 text-primary text-[0.65rem] font-medium">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={cn("w-3.5 h-3.5 transition-transform", filtersOpen && "rotate-180")}
              />
            </button>
            {displayProducts && (
              <span className="font-montserrat text-[0.7rem] sm:text-xs text-light-secondary/60">
                {displayProducts.length} {displayProducts.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>

          {filtersOpen && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
                {/* Sort */}
                <div className="p-5 sm:p-6">
                  <p className="font-baskerville italic text-[0.7rem] uppercase tracking-[0.24em] text-primary/70 mb-3">
                    Sort
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-asc", label: "Price - low to high" },
                      { value: "price-desc", label: "Price - high to low" },
                      { value: "title-asc", label: "Name - A to Z" },
                    ].map((opt) => {
                      const active = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSortBy(opt.value as SortOption)}
                          className={cn(
                            "group flex items-center justify-between gap-2 px-3 py-2 rounded-lg font-montserrat text-sm transition-all duration-200",
                            active
                              ? "bg-primary/10 text-light-primary"
                              : "text-light-secondary/80 hover:bg-white/[0.04] hover:text-light-primary"
                          )}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-all",
                              active ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" : "bg-transparent"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className="p-5 sm:p-6">
                  <p className="font-baskerville italic text-[0.7rem] uppercase tracking-[0.24em] text-primary/70 mb-3">
                    Price (USD)
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-montserrat text-xs text-light-muted">$</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder="Min"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="w-full h-11 pl-7 pr-3 rounded-lg bg-white/[0.04] border border-white/10 text-light-primary placeholder:text-light-muted font-montserrat text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-colors"
                      />
                    </div>
                    <span className="text-light-muted/60 text-xs">to</span>
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-montserrat text-xs text-light-muted">$</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder="Max"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="w-full h-11 pl-7 pr-3 rounded-lg bg-white/[0.04] border border-white/10 text-light-primary placeholder:text-light-muted font-montserrat text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="p-5 sm:p-6">
                  <p className="font-baskerville italic text-[0.7rem] uppercase tracking-[0.24em] text-primary/70 mb-3">
                    Availability
                  </p>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={inStockOnly}
                    onClick={() => setInStockOnly((v) => !v)}
                    className="group flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="font-montserrat text-sm text-light-secondary group-hover:text-light-primary transition-colors">
                      In stock only
                    </span>
                    <span
                      className={cn(
                        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-all duration-300",
                        inStockOnly
                          ? "bg-primary/30 border-primary/60"
                          : "bg-white/[0.04] border-white/15"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-3.5 w-3.5 rounded-full bg-light-primary shadow transition-transform duration-300",
                          inStockOnly ? "translate-x-[1.15rem]" : "translate-x-0.5"
                        )}
                      />
                    </span>
                  </button>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="px-5 sm:px-6 py-3 border-t border-white/[0.06] flex justify-end bg-black/20">
                  <button
                    onClick={clearFilters}
                    className="font-montserrat text-[0.7rem] uppercase tracking-[0.22em] text-light-secondary/70 hover:text-primary transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
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

        {/* Explore by collection - quiet footer-style strip */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="pt-8 sm:pt-10 border-t border-white/10">
            <p className="font-baskerville italic text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-light-secondary/55 mb-4 text-center">
              Explore by collection
            </p>
            <nav
              aria-label="Vellvii collections"
              className="flex items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 flex-wrap"
            >
              {[
                { label: "Pleasure Collection", href: "/collections/pleasure-collection" },
                { label: "DOX-Compatible", href: "/collections/dox-compatible-products" },
                { label: "Discreet Storage", href: "/collections/discreet-storage" },
                { label: "Portable Storage", href: "/collections/portable-storage" },
                { label: "Bedroom Storage", href: "/collections/bedroom-storage" },
                { label: "Products for Couples", href: "/collections/products-for-couples" },
              ].map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="font-montserrat text-[0.72rem] sm:text-xs tracking-wide text-light-secondary/70 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default Shop;
