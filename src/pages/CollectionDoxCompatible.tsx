import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { DockingSystemSection } from "@/components/products/DockingSystemSection";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { setLastCollection } from "@/lib/collectionContext";
import { DOCKING_INFO, DOX_COMPATIBLE_HANDLES, type FaqItem } from "@/lib/pdpContent";
import type { ShopifyProduct } from "@/lib/shopify";

const COLLECTION_FAQS: FaqItem[] = [
  {
    question: "What does DOX-compatible mean?",
    answer:
      "DOX-compatible products work with the suction-base mounting stations that sit atop the Vellvii DOX - the VDS for current Vellvii products, and the DDS for compatible suction-base pieces up to 90mm (approximately 3.5 inches) in diameter.",
  },
  {
    question: "What is the VDS?",
    answer:
      "VDS stands for Vellvii Docking Station. It is a suction-base mounting station that sits atop the Vellvii DOX and is designed for current Vellvii products with suction bases.",
  },
  {
    question: "What is the DDS?",
    answer:
      "DDS stands for Dildo Docking Station. It is a round suction-base mounting station that sits atop the Vellvii DOX, supporting compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter.",
  },
  {
    question: "Does Vellvii Lux fit into the DOX?",
    answer:
      "Vellvii Lux is a separate portable fingerprint-lock storage case and is not a DOX-docking product. It is designed for travel-friendly and everyday personal storage.",
  },
  {
    question: "Are Vellvii products app-connected?",
    answer:
      "Vellvii is building toward a connected product ecosystem, but app-connected functionality should only be considered available once officially released.",
  },
];

const CollectionCard = ({ product }: { product: ShopifyProduct }) => {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const inStock = variant?.availableForSale ?? false;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);
  const hasOptions =
    node.options &&
    node.options.some(
      (opt) =>
        !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title") &&
        opt.values.length > 1,
    );

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || !inStock) return;
    setAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      toast.success(`${node.title} added to cart`, { position: "top-center" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/products/${node.handle}`}
      onClick={() =>
        setLastCollection({
          href: "/collections/dox-compatible-products",
          label: "DOX-Compatible Products",
        })
      }
      className="group block rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-card/50 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <StatusPill
          status={getProductStatus(node.handle, inStock)}
          className="absolute top-2 left-2 sm:top-3 sm:left-3"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-baskerville font-semibold text-base sm:text-lg text-light-primary group-hover:text-primary transition-colors mb-1.5 line-clamp-2">
          {node.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <p className="text-primary font-montserrat font-bold text-lg sm:text-xl">
            ${price.toFixed(0)}
          </p>
          {!inStock ? (
            <span className="font-montserrat text-[10px] sm:text-xs text-light-muted uppercase tracking-[0.2em]">—</span>
          ) : hasOptions ? (
            <span className="font-montserrat text-xs text-light-secondary group-hover:text-primary transition-colors">
              Select options →
            </span>
          ) : (
            <button
              onClick={handleQuickAdd}
              disabled={adding || cartLoading}
              aria-label={`Add ${node.title} to cart`}
              className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-full bg-primary text-primary-foreground font-montserrat text-xs font-medium hover:shadow-glow transition-all disabled:opacity-60"
            >
              {adding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><ShoppingCart className="w-3.5 h-3.5" /><span>Add</span></>}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

const CollectionDoxCompatible = () => {
  const { data: products, isLoading } = useShopifyProducts(50);

  const compatibleProducts = useMemo(() => {
    if (!products) return [];
    const order = DOX_COMPATIBLE_HANDLES;
    return products
      .filter((p) => order.includes(p.node.handle as typeof order[number]))
      .sort(
        (a, b) =>
          order.indexOf(a.node.handle as typeof order[number]) -
          order.indexOf(b.node.handle as typeof order[number]),
      );
  }, [products]);

  return (
    <>
      <SEO
        title="DOX-Compatible Products | Vellvii"
        description="DOX-compatible storage system - explore Vellvii products designed to work with the VDS and DDS suction-base mounting stations atop the Vellvii DOX."
        canonical="/collections/dox-compatible-products"
        keywords="DOX-compatible storage system, DOX-compatible products, Vellvii Docking Station, VDS, DDS, biometric sex toy lock box, discreet sex toy storage"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: "DOX-Compatible Products", url: "/collections/dox-compatible-products" },
        ]}
        faqData={COLLECTION_FAQS}
      />

      <div className="min-h-screen surface-dark-rich">
        <ScrollHeader />

        {/* Hero */}
        <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { name: "Home", url: "/" },
                { name: "Shop", url: "/shop" },
                { name: "DOX-Compatible" },
              ]}
              className="mb-4 justify-center inline-flex"
            />
            <p className="text-primary font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2">
              The Vellvii Ecosystem
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-baskerville font-bold text-light-primary mb-4">
              DOX-Compatible Products
            </h1>
            <p className="text-light-secondary text-sm sm:text-base max-w-2xl mx-auto font-montserrat leading-relaxed">
              The Vellvii DOX is designed as the central storage system for the Vellvii Pleasure
              Collection. Explore products built to work with the VDS and DDS - suction-base
              mounting stations that sit atop the DOX, turning the DOX itself into a refined stand.
            </p>
          </div>
        </section>

        {/* Product grid */}
        <section className="px-3 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-card/50">
                    <Skeleton className="aspect-[4/5] w-full bg-white/5" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4 bg-white/5" />
                      <Skeleton className="h-5 w-1/3 bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : compatibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {compatibleProducts.map((p) => (
                  <CollectionCard key={p.node.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-light-secondary font-montserrat text-sm py-12">
                Products coming soon.
              </p>
            )}
          </div>
        </section>

        {/* Docking system explainer (no CTA - already on this page) */}
        <DockingSystemSection info={DOCKING_INFO} showCta={false} />

        {/* Lux callout */}
        <section className="py-10 sm:py-12 px-3 sm:px-4 lg:px-8 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-baskerville italic text-base sm:text-lg text-light-secondary mb-3">
              Need portable storage as well? Explore Vellvii Lux.
            </p>
            <Link
              to="/products/vellvii-lux"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-primary hover:text-primary/80 transition-colors group"
            >
              Explore Vellvii Lux
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <ProductFAQ faqs={COLLECTION_FAQS} />

        {/* CTA back to shop */}
        <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-montserrat text-sm sm:text-base text-primary hover:text-primary/80 transition-colors group"
            >
              Browse the full Pleasure Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default CollectionDoxCompatible;
