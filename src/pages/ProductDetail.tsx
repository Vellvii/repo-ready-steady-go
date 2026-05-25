import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { parseReviewMetafields } from "@/lib/shopify";
import { ProductReviews } from "@/components/products/ProductReviews";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2, ArrowLeft, Expand } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useState, useMemo, useEffect } from "react";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { TrustBadges } from "@/components/TrustBadges";
import { TrustStrip } from "@/components/products/TrustStrip";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { StickyProductBar } from "@/components/StickyProductBar";
import { ImageLightbox } from "@/components/ImageLightbox";
import { DoxVideoSection } from "@/components/DoxVideoSection";
import { RelatedProducts } from "@/components/RelatedProducts";
import { KeyBenefits } from "@/components/products/KeyBenefits";
import { ProductDetailsList } from "@/components/products/ProductDetailsList";
import { CareAndStorage } from "@/components/products/CareAndStorage";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { NotifyMePanel } from "@/components/products/NotifyMePanel";
import { BackToShopCTA } from "@/components/products/BackToShopCTA";
import { WarrantyLink } from "@/components/products/WarrantyLink";
import { DockingSystemSection } from "@/components/products/DockingSystemSection";
import { DoxCompatibleSection } from "@/components/products/DoxCompatibleSection";
import { RelatedStorageNote } from "@/components/products/RelatedStorageNote";
import { RelatedCollections } from "@/components/products/RelatedCollections";
import { getPdpContent, getRelatedCollections, FALLBACK_FAQS, FALLBACK_CARE } from "@/lib/pdpContent";
import {
  LuxPreOrderBanner,
  LuxFreeGiftBadge,
  LuxCountdown,
  LuxStockCounter,
  LuxUrgencyBlock,
  LuxShippingClarity,
} from "@/components/lux/LuxPreOrderPanel";
import { ScrollHeader } from "@/components/ScrollHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getLastCollection } from "@/lib/collectionContext";
import { trackViewItem, trackAddToCart } from "@/lib/analytics";
import { pixelViewContent, pixelAddToCart } from "@/lib/metaPixel";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || "");
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Check if this is the DOX product
  const isDoxProduct = handle?.toLowerCase().includes("dox");
  const isLuxProduct = handle?.toLowerCase().includes("lux");

  // Initialize selected options when product loads
  useEffect(() => {
    if (product?.node?.variants?.edges?.[0]?.node?.selectedOptions) {
      const initialOptions: Record<string, string> = {};
      product.node.variants.edges[0].node.selectedOptions.forEach((opt) => {
        initialOptions[opt.name] = opt.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  // GA4 view_item + Lux-specific PDP view event
  useEffect(() => {
    if (!product) return;
    const variant = product.node.variants?.edges?.[0]?.node;
    if (variant) {
      trackViewItem({
        item_id: variant.id,
        item_name: product.node.title,
        item_brand: "Vellvii",
        price: parseFloat(variant.price.amount),
        quantity: 1,
        currency: variant.price.currencyCode,
      });
      pixelViewContent({
        content_ids: [variant.id],
        content_name: product.node.title,
        value: parseFloat(variant.price.amount),
        currency: variant.price.currencyCode,
      });
    }
    if (isLuxProduct && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lux_pdp_view", {
        product_handle: handle,
        product_title: product.node.title,
      });
    }
  }, [isLuxProduct, product, handle]);

  // Find the selected variant based on selected options
  const selectedVariant = useMemo(() => {
    if (!product?.node?.variants?.edges) return null;
    
    return product.node.variants.edges.find((v) => {
      return v.node.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      );
    })?.node || product.node.variants.edges[0]?.node;
  }, [product, selectedOptions]);

  // Find images that match the selected color (by alt text or URL)
  const filteredImages = useMemo(() => {
    if (!product?.node?.images?.edges) return [];
    
    const allImages = product.node.images.edges;
    const selectedColor = selectedOptions['Color']?.toLowerCase();
    
    // If no color selected or product has no color option, show all images
    if (!selectedColor) return allImages;
    
    // Helper function to check if image matches a color
    const imageMatchesColor = (img: typeof allImages[0], color: string) => {
      const altText = img.node.altText?.toLowerCase() || '';
      const url = img.node.url?.toLowerCase() || '';
      const filename = url.split('/').pop()?.split('?')[0] || '';
      
      const colorVariants = [
        color,
        color.replace(' ', '-'),
        color.replace(' ', '_'),
        color.replace(' ', ''),
      ];
      
      return colorVariants.some((colorVar) => 
        altText.includes(colorVar) || 
        filename.includes(colorVar) ||
        filename.startsWith(colorVar) ||
        altText.includes(`dox-${colorVar}`) ||
        altText.includes(`dox_${colorVar}`)
      );
    };
    
    // Find images matching selected color
    const colorMatchedImages = allImages.filter((img) => imageMatchesColor(img, selectedColor));
    
    // If we found color-matched images, use those
    if (colorMatchedImages.length > 0) {
      return colorMatchedImages;
    }
    
    // Fallback: Find images that DON'T match any OTHER color variant
    // This prevents showing "Red" images when "Beige" is selected
    const otherColors = (product.node.options
      ?.find(opt => opt.name.toLowerCase() === 'color')
      ?.values || [])
      .map(v => v.toLowerCase())
      .filter(c => c !== selectedColor);
    
    const neutralImages = allImages.filter((img) => 
      !otherColors.some(otherColor => imageMatchesColor(img, otherColor))
    );
    
    // Return neutral images if any, otherwise just the first image as placeholder
    return neutralImages.length > 0 ? neutralImages : allImages.slice(0, 1);
  }, [product, selectedOptions]);

  // Reset image index when color changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedOptions['Color']]);

  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen surface-dark-rich pt-20 sm:pt-24 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <Skeleton className="aspect-square rounded-xl sm:rounded-2xl bg-white/5" />
            <div className="space-y-4 sm:space-y-6">
              <Skeleton className="h-8 sm:h-12 w-3/4 bg-white/5" />
              <Skeleton className="h-8 sm:h-10 w-1/4 bg-white/5" />
              <Skeleton className="h-24 sm:h-32 w-full bg-white/5" />
              <Skeleton className="h-12 sm:h-14 w-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen surface-dark-rich pt-20 sm:pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-baskerville text-light-primary mb-4 sm:mb-6">
            Product Not Found
          </h1>
          <Link to="/shop">
            <Button className="btn-premium px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const variant = selectedVariant;
  const images = filteredImages;
  const selectedImage = images[selectedImageIndex]?.node;
  const price = variant ? parseFloat(variant.price.amount) : parseFloat(product.node.priceRange.minVariantPrice.amount);

  const handleAddToCart = async () => {
    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    trackAddToCart({
      item_id: variant.id,
      item_name: product.node.title,
      item_brand: "Vellvii",
      item_variant: variant.title,
      price: parseFloat(variant.price.amount),
      quantity: 1,
      currency: variant.price.currencyCode,
    });

    pixelAddToCart({
      content_ids: [variant.id],
      content_name: product.node.title,
      contents: [{ id: variant.id, quantity: 1, item_price: parseFloat(variant.price.amount) }],
      value: parseFloat(variant.price.amount),
      currency: variant.price.currencyCode,
    });

    if (isLuxProduct && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lux_add_to_cart", {
        currency: variant.price.currencyCode,
        value: parseFloat(variant.price.amount),
        items: [{ item_id: variant.id, item_name: product.node.title, quantity: 1, price: parseFloat(variant.price.amount) }],
      });
    }

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  // Per-PDP enrichment content (key benefits, specs, care, FAQs).
  // Falls back gracefully for any product without a custom entry.
  const pdpContent = getPdpContent(handle);
  const careItems = pdpContent.careStorage ?? FALLBACK_CARE;
  const isAvailable = !!variant?.availableForSale;

  return (
    <>
      {(() => {
        const allImageUrls = (product.node.images?.edges || []).map((e) => e.node.url);
        const heroImage = allImageUrls[0];
        const reviewAggregate = parseReviewMetafields(product);
        const priceAmount = variant ? parseFloat(variant.price.amount) : parseFloat(product.node.priceRange.minVariantPrice.amount);
        const currency = variant?.price.currencyCode || product.node.priceRange.minVariantPrice.currencyCode || "USD";
        const availability: "InStock" | "OutOfStock" | "PreOrder" = isLuxProduct
          ? "PreOrder"
          : variant?.availableForSale
          ? "InStock"
          : "OutOfStock";
        const skuTail = variant?.id ? variant.id.split("/").pop() : undefined;

        const luxTitle = `Vellvii Lux | Portable Biometric Sex Toy Storage Bag`;
        const luxDescription =
          "Vellvii Lux is portable sex toy storage with a fingerprint lock, genuine leather exterior, velvet interior, and internal USB-A charging.";
        const luxKeywords =
          "sex toy bag, portable sex toy storage, sex toy storage case, sex toy lock box, biometric lock box, fingerprint lock box, discreet sex toy storage, vellvii lux";

        const luxFaqs = [
          { question: "Is Vellvii Lux a portable sex toy bag?", answer: "Yes. Vellvii Lux is a portable fingerprint-lock storage case designed for discreet sex toy storage at home and on the move - a refined alternative to a standard sex toy bag." },
          { question: "Does Lux work as a travel-friendly sex toy storage case?", answer: "Yes. Lux is designed as a travel-friendly sex toy storage case, sized like a refined toiletries-style bag and secured with biometric access." },
          { question: "Is Vellvii Lux a portable biometric storage case?", answer: "Yes. Lux is a portable biometric storage case - a compact, fingerprint-lock companion built for everyday personal storage and travel." },
          { question: "How is the Lux different from the Vellvii DOX?", answer: "Vellvii Lux is the more portable storage companion, designed with the feel of a refined toiletries-style case and secured with fingerprint access. Vellvii DOX is the larger, sturdier storage system, designed as a more substantial piece for the bedroom." },
          { question: "How should I care for Vellvii Lux?", answer: "Follow the care instructions included with your product, store the case in a clean, dry place, and avoid extreme heat, direct sunlight, and unnecessary exposure. If you are unsure, contact Vellvii support." },
          { question: "When does the Vellvii Lux ship?", answer: "Pre-orders ship by the end of June 2026. Reserve now to secure your unit from the current first-run offer." },
          { question: "Is the Vellvii Nova included with Lux?", answer: "The complimentary Vellvii Nova is included with the current Lux first-run offer. Future Lux runs are planned, but the Nova gift will not be included after this first run." },
          { question: "What is the Vellvii Lux warranty?", answer: "All Vellvii products are covered by our authorized retailer warranty when registered within 7 days of receipt. Repair or replacement only - no refunds on final sales." },
          { question: "Can I return the Vellvii Lux?", answer: "All sales are final. Warranty covers manufacturing defects with repair or replacement only. Register your warranty within 7 days of delivery." },
          { question: "Is checkout discreet?", answer: "Yes - Vellvii ships in unbranded packaging with discreet billing descriptors. Privacy is core to the product and the experience." },
        ];

        // Per-handle SEO override map for canonical Vellvii products.
        // Falls back to Shopify product data for any future products.
        const PDP_SEO_OVERRIDES: Record<string, { title: string; description: string; keywords?: string }> = {
          "vellvii-dox": {
            title: "Vellvii DOX | Biometric Sex Toy Lock Box & Storage Box",
            description: "Vellvii DOX is a biometric sex toy lock box and bedroom storage box with faux leather exterior, velvet interior, VDS/DDS docking, and USB-A charging.",
            keywords: "sex toy storage, sex toy storage box, sex toy box, sex toy lock box, biometric lock box, adult toy storage, discreet sex toy storage, vellvii dox",
          },
          "vellvii-lux": {
            title: "Vellvii Lux | Portable Biometric Sex Toy Storage Bag",
            description: "Vellvii Lux is portable sex toy storage with a fingerprint lock, genuine leather exterior, velvet interior, and internal USB-A charging.",
            keywords: "sex toy bag, portable sex toy storage, sex toy storage case, sex toy lock box, biometric lock box, fingerprint lock box, discreet sex toy storage, vellvii lux",
          },
          "vellvii-g-vibe": {
            title: "Vellvii G-Vibe | Premium Intimate Wellness Product",
            description: "Explore Vellvii G-Vibe, part of Vellvii's luxury intimate wellness collection designed with discretion, elegance, and modern connection in mind.",
          },
          "vellvii-evolve": {
            title: "Vellvii Evolve | Premium Intimate Wellness Product",
            description: "Discover Vellvii Evolve, a refined intimate wellness product designed as part of the Vellvii luxury collection.",
          },
          "vellvii-pulse": {
            title: "Vellvii Pulse | Premium Intimate Wellness Product",
            description: "Meet Vellvii Pulse, part of the Vellvii luxury intimate wellness ecosystem built around elegant design and discretion.",
          },
        };
        const seoOverride = handle ? PDP_SEO_OVERRIDES[handle] : undefined;
        const seoTitle = seoOverride?.title
          ?? (isLuxProduct ? luxTitle : `${product.node.title} - Luxury Pleasure Collection`);
        const seoDescription = seoOverride?.description
          ?? (isLuxProduct ? luxDescription : product.node.description.slice(0, 160));

        return (
          <SEO
            title={seoTitle}
            description={seoDescription}
            canonical={`/products/${handle}`}
            type="product"
            image={heroImage}
            keywords={seoOverride?.keywords ?? (isLuxProduct ? luxKeywords : undefined)}
            organizationData
            breadcrumbs={[
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: product.node.title, url: `/products/${handle}` },
            ]}
            productData={{
              name: product.node.title,
              description: product.node.description.slice(0, 500),
              price: priceAmount,
              currency,
              availability,
              brand: "Vellvii",
              sku: skuTail,
              images: allImageUrls,
              priceValidUntil: isLuxProduct ? "2026-06-30" : undefined,
              itemCondition: "NewCondition",
              url: `/products/${handle}`,
              aggregateRating: reviewAggregate ?? undefined,
            }}
            faqData={isLuxProduct ? luxFaqs : undefined}
          />
        );
      })()}
      <div className="min-h-screen surface-dark-rich overflow-x-clip pb-24 sm:pb-0">
        {/* Scroll-aware Navigation Header */}
        <ScrollHeader />

        {/* Back Navigation + Breadcrumbs */}
        <div className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2">
            {(() => {
              const last = getLastCollection();
              const backHref = last?.href || "/shop";
              const backLabel = last ? `Back to ${last.label}` : "Back to Collection";
              const crumbs = last
                ? [
                    { name: "Home", url: "/" },
                    { name: "Shop", url: "/shop" },
                    { name: last.label, url: last.href },
                    { name: product.node.title },
                  ]
                : [
                    { name: "Home", url: "/" },
                    { name: "Shop", url: "/shop" },
                    { name: product.node.title },
                  ];
              return (
                <>
                  <Link
                    to={backHref}
                    className="inline-flex items-center text-light-secondary hover:text-primary transition-colors font-montserrat text-xs sm:text-sm"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {backLabel}
                  </Link>
                  <Breadcrumbs items={crumbs} className="hidden sm:block" />
                </>
              );
            })()}
          </div>
        </div>

        {/* Product Hero */}
        <section className="py-6 sm:py-10 lg:py-16 px-3 sm:px-4 lg:px-8 overflow-x-clip">
          <div className="w-full max-w-7xl mx-auto min-w-0">
            <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start lg:items-stretch">
              {/* Image Gallery / 3D Viewer */}
              <div className="min-w-0 w-full lg:h-full">
                <div className="min-w-0 w-full space-y-3 sm:space-y-4 lg:sticky lg:top-20 lg:flex lg:flex-col lg:justify-end lg:min-h-[calc(100vh-12rem)] lg:pb-24">
                {/* Main Image */}
                  <div
                    className="relative flex min-h-[320px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg border border-border/20 bg-card/50 cursor-pointer group sm:aspect-square sm:rounded-2xl"
                    onClick={() => openLightbox(selectedImageIndex)}
                  >
                    {selectedImage ? (
                      <>
                        <img
                          src={selectedImage.url}
                          alt={selectedImage.altText || product.node.title}
                          className="h-auto max-h-[70vh] w-full max-w-full object-contain sm:h-full sm:max-h-none"
                        />
                        <StatusPill
                          status={getProductStatus(handle, !!variant?.availableForSale)}
                          size="md"
                          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
                        />
                        {/* Expand icon overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <Expand className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-light-muted">
                        No Image
                      </div>
                    )}
                  </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex w-full max-w-full min-w-0 gap-2 sm:gap-3 overflow-x-auto overscroll-x-contain pb-2 scrollbar-luxury">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === selectedImageIndex
                            ? "border-primary shadow-glow"
                            : "border-white/10 hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={img.node.url}
                          alt={
                            img.node.altText ||
                            `${product.node.title} ${index + 1}`
                          }
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                </div>
              </div>

              {/* Product Info */}
              <div className={`min-w-0 w-full lg:sticky lg:top-24 ${isLuxProduct ? "space-y-3 sm:space-y-5" : "space-y-5 sm:space-y-6 lg:space-y-8"}`}>
                <div className="min-w-0">
                  <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] mb-2 sm:mb-3 break-words">
                    Vellvii <span className="font-baskerville italic normal-case tracking-normal text-primary/60">- The Art of &lsquo;O&rsquo;</span>
                  </p>
                  <h1 className={`font-baskerville font-bold text-light-primary leading-tight break-words ${isLuxProduct ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"}`}>
                    {product.node.title}
                  </h1>
                  {isLuxProduct && (
                    <div className="mb-3 sm:mb-4">
                      <LuxPreOrderBanner />
                    </div>
                  )}
                  <p className={`font-bold gradient-text font-montserrat ${isLuxProduct ? "text-2xl sm:text-4xl" : "text-3xl sm:text-4xl"}`}>
                    ${price.toFixed(0)}
                  </p>
                  {isLuxProduct && (
                    <div className="mt-2 sm:mt-3">
                      <LuxFreeGiftBadge />
                    </div>
                  )}
                </div>

                {isLuxProduct && <LuxCountdown />}

                {!isLuxProduct && (
                    <div className="prose max-w-none min-w-0 overflow-hidden">
                    <p className="text-light-secondary leading-relaxed whitespace-pre-line break-words font-montserrat text-sm sm:text-base lg:text-lg">
                      {product.node.description}
                    </p>
                  </div>
                )}

                {/* Variant Options (Color, Size, etc.) */}
                {product.node.options && product.node.options.length > 0 && !(product.node.options.length === 1 && product.node.options[0].name === 'Title' && product.node.options[0].values.length === 1 && product.node.options[0].values[0] === 'Default Title') && (
                  <div className="space-y-4">
                    {product.node.options.map((option) => (
                      <div key={option.name} className="space-y-2">
                        <label className="text-light-primary font-montserrat text-sm font-medium">
                          {option.name}: <span className="text-primary">{selectedOptions[option.name]}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => {
                            const isSelected = selectedOptions[option.name] === value;
                            const isColor = option.name.toLowerCase() === 'color';
                            
                            // Color swatch styling
                            if (isColor) {
                              const colorMap: Record<string, string> = {
                                'black': '#1a1a1a',
                                'midnight black': '#1a1a1a',
                                'red': '#8B0000',
                                'deep red': '#8B0000',
                                'cream': '#F5F5DC',
                                'beige': '#D4B896',
                                'white': '#FFFFFF',
                                'rose gold': '#B76E79',
                                'pink': '#FFC0CB',
                              };
                              const bgColor = colorMap[value.toLowerCase()] || '#808080';
                              
                              return (
                                <button
                                  key={value}
                                  onClick={() => handleOptionChange(option.name, value)}
                                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                                    isSelected 
                                      ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' 
                                      : 'border-white/20 hover:border-primary/50'
                                  }`}
                                  style={{ backgroundColor: bgColor }}
                                  title={value}
                                  aria-label={`Select ${value}`}
                                />
                              );
                            }
                            
                            // Default button styling for other options
                            return (
                              <button
                                key={value}
                                onClick={() => handleOptionChange(option.name, value)}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 font-montserrat text-sm ${
                                  isSelected
                                    ? 'border-primary bg-primary/20 text-primary'
                                    : 'border-white/20 text-light-secondary hover:border-primary/50 hover:text-light-primary'
                                }`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                    className={`w-full max-w-full btn-premium whitespace-normal text-center leading-tight ${
                    isLuxProduct
                      ? "h-12 sm:h-16 text-base sm:text-xl font-bold tracking-wide"
                      : "h-12 sm:h-14 text-base sm:text-lg"
                  }`}
                  onClick={handleAddToCart}
                  disabled={cartLoading || !variant?.availableForSale}
                >
                  {cartLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : !variant?.availableForSale ? (
                    "Sold Out"
                  ) : isLuxProduct ? (
                    "Secure My Pre-Order"
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                {/* Trust Strip - hairline icons under add-to-cart */}
                <TrustStrip productHandle={handle} />

                <div className="pt-1">
                  <WarrantyLink variant="inline" />
                </div>

                {isLuxProduct && (
                  <>
                    {/* Live inventory requires `unauthenticated_read_product_inventory` Storefront scope; falls back to total units. */}
                    <LuxStockCounter quantityAvailable={undefined} />
                    <LuxUrgencyBlock />
                    <LuxShippingClarity />
                    <div className="prose max-w-none min-w-0 overflow-hidden pt-2">
                      <p className="text-light-secondary leading-relaxed whitespace-pre-line break-words font-montserrat text-sm sm:text-base lg:text-lg">
                        {product.node.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* DOX Video Section - Only for DOX product */}
        {isDoxProduct && <DoxVideoSection onReserve={handleAddToCart} />}

        {/* Key Benefits */}
        {pdpContent.keyBenefits && (
          <KeyBenefits benefits={pdpContent.keyBenefits} tagline={pdpContent.tagline} />
        )}

        {/* DOX-only: Vellvii Docking System (VDS / DDS) */}
        {pdpContent.docking && <DockingSystemSection info={pdpContent.docking} />}

        {/* G-Vibe / Evolve / Pulse: DOX-Compatible by Design */}
        {pdpContent.doxCompatible && <DoxCompatibleSection />}

        {/* Lux: subtle related-storage note linking to DOX */}
        {pdpContent.relatedStorageNote && (
          <RelatedStorageNote {...pdpContent.relatedStorageNote} />
        )}

        {/* Product Details (only confirmed spec rows) */}
        {pdpContent.productDetails && (
          <ProductDetailsList rows={pdpContent.productDetails} />
        )}

        {/* Care & Storage + Warranty link */}
        <CareAndStorage items={careItems} />

        {/* Notify-me when sold out (Lux uses its own pre-order flow) */}
        {!isAvailable && !isLuxProduct && (
          <NotifyMePanel productTitle={product.node.title} />
        )}

        {/* Reviews - powered by Judge.me; hidden until real reviews exist */}
        <ProductReviews
          productId={product.node.id}
          productTitle={product.node.title}
          reviewData={parseReviewMetafields(product)}
        />

        {/* FAQ - product-specific or refined fallback */}
        <ProductFAQ faqs={pdpContent.faqs ?? FALLBACK_FAQS} />

        {/* Related Vellvii Collections (subtle chip strip) */}
        <RelatedCollections links={getRelatedCollections(handle)} />

        {/* Related Products (canonical Vellvii products only) */}
        <RelatedProducts currentHandle={handle || ""} maxProducts={6} />

        {/* Back to shop */}
        <BackToShopCTA />

        {/* Sticky Product Bar */}
        <StickyProductBar
          productName={product.node.title}
          price={price.toFixed(0)}
          onAddToCart={handleAddToCart}
          isLoading={cartLoading}
          isAvailable={variant?.availableForSale}
          ctaLabel={isLuxProduct ? "Secure My Pre-Order" : undefined}
        />

        {/* Image Lightbox */}
        <ImageLightbox
          images={images.map((img) => ({
            url: img.node.url,
            altText: img.node.altText,
          }))}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          autoPlayInterval={4000}
        />

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default ProductDetail;
