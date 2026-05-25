import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { setLastCollection } from "@/lib/collectionContext";
import type { ShopifyProduct } from "@/lib/shopify";
import type { FaqItem } from "@/lib/pdpContent";

const SITE_URL = "https://vellvii.com";

interface RelatedLink {
  label: string;
  href: string;
}

interface WhyItem {
  title: string;
  copy: string;
}

interface CollectionLayoutProps {
  eyebrow: string;
  h1: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  /** Ordered list of Shopify product handles to include. Only these are shown. */
  productHandles: string[];
  whyHeading?: string;
  whyItems: WhyItem[];
  faqs: FaqItem[];
  relatedLinks: RelatedLink[];
  /** Optional Lux-style callout below the grid */
  callout?: { copy: string; href: string; label: string };
  /** Optional subtle SEO paragraph rendered low on the page (after FAQ). */
  seoParagraph?: string;
}

const CollectionCard = ({
  product,
  collectionHref,
  collectionLabel,
}: {
  product: ShopifyProduct;
  collectionHref: string;
  collectionLabel: string;
}) => {
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
      onClick={() => setLastCollection({ href: collectionHref, label: collectionLabel })}
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
        <h2 className="font-baskerville font-semibold text-base sm:text-lg text-light-primary group-hover:text-primary transition-colors mb-1.5 line-clamp-2">
          {node.title}
        </h2>
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

export const CollectionLayout = ({
  eyebrow,
  h1,
  intro,
  seoTitle,
  seoDescription,
  canonical,
  productHandles,
  whyHeading = "Why this collection",
  whyItems,
  faqs,
  relatedLinks,
  callout,
  seoParagraph,
}: CollectionLayoutProps) => {
  const { data: products, isLoading } = useShopifyProducts(50);

  const collectionProducts = useMemo(() => {
    if (!products) return [];
    return products
      .filter((p) => productHandles.includes(p.node.handle))
      .sort(
        (a, b) =>
          productHandles.indexOf(a.node.handle) - productHandles.indexOf(b.node.handle),
      );
  }, [products, productHandles]);

  // CollectionPage JSON-LD with ItemList of included products
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: h1,
    description: seoDescription,
    url: `${SITE_URL}${canonical}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: productHandles.map((handle, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/products/${handle}`,
      })),
    },
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        organizationData
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: h1, url: canonical },
        ]}
        faqData={faqs}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="min-h-screen surface-dark-rich">
        <ScrollHeader />

        {/* Hero */}
        <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { name: "Home", url: "/" },
                { name: "Shop", url: "/shop" },
                { name: h1 },
              ]}
              className="mb-4 justify-center inline-flex"
            />
            <p className="text-primary font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-baskerville font-bold text-light-primary mb-4">
              {h1}
            </h1>
            <p className="text-light-secondary text-sm sm:text-base max-w-2xl mx-auto font-montserrat leading-relaxed">
              {intro}
            </p>
          </div>
        </section>

        {/* Product grid */}
        <section className="px-3 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: Math.min(productHandles.length, 4) }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-card/50">
                    <Skeleton className="aspect-[4/5] w-full bg-white/5" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4 bg-white/5" />
                      <Skeleton className="h-5 w-1/3 bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : collectionProducts.length > 0 ? (
              <div
                className={
                  collectionProducts.length === 1
                    ? "grid grid-cols-1 max-w-sm mx-auto gap-4 sm:gap-6"
                    : "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                }
              >
                {collectionProducts.map((p) => (
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

        {/* Optional callout */}
        {callout && (
          <section className="py-10 sm:py-12 px-3 sm:px-4 lg:px-8 border-t border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-baskerville italic text-base sm:text-lg text-light-secondary mb-3">
                {callout.copy}
              </p>
              <Link
                to={callout.href}
                className="inline-flex items-center gap-2 font-montserrat text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                {callout.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        )}

        {/* Why this collection */}
        {whyItems.length > 0 && (
          <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 sm:mb-8 text-center">
                <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                  The Vellvii Approach
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-baskerville font-bold text-light-primary">
                  {whyHeading}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {whyItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-card/40 p-5 sm:p-6"
                  >
                    <h3 className="font-baskerville font-semibold text-light-primary text-base sm:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="font-montserrat text-sm text-light-secondary leading-relaxed">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <ProductFAQ faqs={faqs} />

        {/* Subtle lower-page SEO paragraph */}
        {seoParagraph && (
          <section className="py-8 sm:py-10 px-3 sm:px-4 lg:px-8 border-t border-white/10">
            <div className="max-w-3xl mx-auto">
              <p className="font-montserrat text-xs sm:text-sm text-light-muted leading-relaxed text-center">
                {seoParagraph}
              </p>
            </div>
          </section>
        )}

        {/* Related collections */}
        {relatedLinks.length > 0 && (
          <section className="py-10 sm:py-14 px-3 sm:px-4 lg:px-8 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
                Explore More
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-all font-montserrat text-xs sm:text-sm text-light-primary"
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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

export default CollectionLayout;
