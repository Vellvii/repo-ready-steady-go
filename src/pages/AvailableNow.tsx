import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { StatusPill } from "@/components/products/StatusPill";
import { isProductAvailableNow, PRE_ORDER_HANDLES } from "@/lib/productAvailability";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);

  const variants = product.node.variants.edges;
  const hasOptions =
    product.node.options &&
    product.node.options.some(
      (opt) =>
        !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title") &&
        opt.values.length > 1
    );
  const quickAddVariant = variants.find((v) => v.node.availableForSale)?.node;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!quickAddVariant) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: quickAddVariant.id,
        variantTitle: quickAddVariant.title,
        price: quickAddVariant.price,
        quantity: 1,
        selectedOptions: quickAddVariant.selectedOptions || [],
      });
      openDrawer();
      toast.success(`${product.node.title} added to your collection`, { position: "top-center" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group relative">
      <div className="card-dark rounded-xl sm:rounded-2xl overflow-hidden relative ring-1 ring-primary/0 group-hover:ring-primary/30 transition-all duration-500">
        <div className="product-image-container aspect-[3/4] sm:aspect-[4/5] relative">
          {image ? (
            <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-light-muted">No Image</div>
          )}
          <StatusPill status="available-now" className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20" />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-light-primary font-baskerville font-semibold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.node.title}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-primary font-montserrat font-bold text-lg sm:text-xl">
              ${parseFloat(price.amount).toFixed(0)}
            </p>
            {hasOptions ? (
              <span className="font-montserrat text-xs text-light-secondary group-hover:text-primary transition-colors">
                Select options →
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                disabled={adding || cartLoading}
                aria-label={`Add ${product.node.title} to cart`}
                className="relative z-20 flex-shrink-0 inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-full bg-primary text-primary-foreground font-montserrat text-xs font-medium hover:shadow-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {adding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><ShoppingCart className="w-3.5 h-3.5" /><span>Add</span></>}
              </button>
            )}
          </div>
        </div>
      </div>
      <Link
        to={`/products/${product.node.handle}`}
        aria-label={`View ${product.node.title}`}
        className="absolute inset-0 z-10 rounded-xl sm:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
    </article>
  );
};

const AvailableNow = () => {
  const { data: products, isLoading } = useShopifyProducts(50);

  const inStock = useMemo(() => (products ?? []).filter(isProductAvailableNow), [products]);
  const preOrder = useMemo(
    () => (products ?? []).filter((p) => PRE_ORDER_HANDLES.has(p.node.handle.toLowerCase())),
    [products]
  );

  return (
    <>
      <SEO
        title="Available Now | Vellvii Pleasure Collection"
        description="Vellvii pieces ready to ship from our atelier. Browse in-stock storage and pleasure products, free of pre-order waits."
        canonical="/available-now"
      />
      <div className="min-h-screen surface-dark-rich">
        <ScrollHeader />

        <section className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2">
              Available Now
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-baskerville font-bold text-light-primary mb-3">
              Ships from our <span className="gradient-text">atelier</span>
            </h1>
            <p className="font-baskerville italic text-sm sm:text-base text-primary/70 tracking-wide mb-3">
              The Art of &lsquo;O&rsquo;
            </p>
            <p className="text-light-secondary text-sm sm:text-base font-montserrat leading-relaxed">
              Pieces that are in stock today - no pre-order, no waitlist. Quietly luxurious, packed
              with discretion and on the way to you.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-dark rounded-xl sm:rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[3/4] sm:aspect-[4/5] bg-white/5" />
                  <div className="p-4 sm:p-5 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-white/5" />
                    <Skeleton className="h-6 w-1/3 bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : inStock.length > 0 ? (
            <>
              <p className="font-montserrat text-[0.7rem] sm:text-xs text-light-secondary/60 mb-4">
                {inStock.length} {inStock.length === 1 ? "piece" : "pieces"} available now
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {inStock.map((p) => <ProductCard key={p.node.id} product={p} />)}
              </div>
            </>
          ) : (
            <div className="text-center py-12 sm:py-20 max-w-xl mx-auto">
              <p className="font-baskerville italic text-lg sm:text-xl text-light-primary mb-2">
                Our atelier is between drops.
              </p>
              <p className="text-light-secondary text-sm sm:text-base font-montserrat leading-relaxed mb-6">
                Nothing is ready to ship at this exact moment. Reserve a piece from our pre-order
                collection or explore our guides while you wait.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-montserrat text-sm hover:shadow-glow transition-all"
                >
                  Browse the collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/guides"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-light-primary font-montserrat text-sm hover:border-primary/40 transition-all"
                >
                  Read our guides
                </Link>
              </div>
            </div>
          )}

          {inStock.length > 0 && inStock.length < 3 && preOrder.length > 0 && (
            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="font-baskerville italic text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-light-secondary/55 mb-4 text-center">
                Reserve next
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {preOrder.map((p) => (
                  <Link
                    key={p.node.id}
                    to={`/products/${p.node.handle}`}
                    className="font-montserrat text-xs sm:text-sm text-light-secondary/80 hover:text-primary transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-primary/40"
                  >
                    {p.node.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default AvailableNow;
