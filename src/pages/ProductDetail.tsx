import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2, ArrowLeft, Expand, Images, Box } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useState, useMemo, useEffect } from "react";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { TrustBadges } from "@/components/TrustBadges";
import { StickyProductBar } from "@/components/StickyProductBar";
import { ImageLightbox } from "@/components/ImageLightbox";
import { DoxVideoSection } from "@/components/DoxVideoSection";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Model3DViewer } from "@/components/Model3DViewer";
import { ShopifyMediaModel3d } from "@/lib/shopify";
import {
  LuxPreOrderBanner,
  LuxFreeGiftBadge,
  LuxCountdown,
  LuxStockCounter,
  LuxUrgencyBlock,
  LuxShippingClarity,
} from "@/components/lux/LuxPreOrderPanel";
import { ScrollHeader } from "@/components/ScrollHeader";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || "");
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'images' | '3d'>('images');
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

  // Extract 3D model from media if available
  const model3d = useMemo(() => {
    if (!product?.node?.media?.edges) return null;
    
    const model3dMedia = product.node.media.edges.find(
      (edge) => edge.node.mediaContentType === 'MODEL_3D'
    );
    
    if (!model3dMedia) return null;
    
    const model = model3dMedia.node as ShopifyMediaModel3d;
    // Find GLB format (preferred for web)
    const glbSource = model.sources.find(
      (s) => s.format === 'glb' || s.mimeType === 'model/gltf-binary'
    );
    
    return glbSource?.url || model.sources[0]?.url || null;
  }, [product]);

  const has3DModel = !!model3d;

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

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title={`${product.node.title} | Vellvii`}
        description={product.node.description.slice(0, 160)}
      />
      <div className="min-h-screen surface-dark-rich">
        {/* Scroll-aware Navigation Header */}
        <ScrollHeader />

        {/* Back Navigation */}
        <div className="pt-20 sm:pt-24 px-3 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/shop"
              className="inline-flex items-center text-light-secondary hover:text-primary transition-colors font-montserrat text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Collection
            </Link>
          </div>
        </div>

        {/* Product Hero */}
        <section className="py-6 sm:py-10 lg:py-16 px-3 sm:px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start lg:items-stretch">
              {/* Image Gallery / 3D Viewer */}
              <div className="lg:h-full">
                <div className="space-y-3 sm:space-y-4 lg:sticky lg:top-20 lg:flex lg:flex-col lg:justify-end lg:min-h-[calc(100vh-12rem)] lg:pb-24">
                {/* View Mode Toggle - Only show if 3D model exists */}
                {has3DModel && (
                  <div className="flex gap-2 mb-2">
                    <Button
                      variant={viewMode === 'images' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('images')}
                      className="flex items-center gap-2"
                    >
                      <Images size={16} />
                      Images
                    </Button>
                    <Button
                      variant={viewMode === '3d' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('3d')}
                      className="flex items-center gap-2"
                    >
                      <Box size={16} />
                      3D View
                    </Button>
                  </div>
                )}

                {/* Main Image or 3D Viewer */}
                {viewMode === '3d' && model3d ? (
                  <div className="aspect-square rounded-xl sm:rounded-2xl -mx-3 sm:mx-0 overflow-hidden bg-card/50">
                    <Model3DViewer 
                      modelPath={model3d} 
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className="product-image-container aspect-square rounded-xl sm:rounded-2xl -mx-3 sm:mx-0 cursor-pointer group relative"
                    onClick={() => openLightbox(selectedImageIndex)}
                  >
                    {selectedImage ? (
                      <>
                        <img
                          src={selectedImage.url}
                          alt={selectedImage.altText || product.node.title}
                          className="w-full h-full object-cover"
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
                )}

                {/* Thumbnails - Only show in images mode */}
                {viewMode === 'images' && images.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-luxury">
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
              <div className={`lg:sticky lg:top-24 ${isLuxProduct ? "space-y-3 sm:space-y-5" : "space-y-5 sm:space-y-6 lg:space-y-8"}`}>
                <div>
                  <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">
                    Vellvii
                  </p>
                  <h1 className={`font-baskerville font-bold text-light-primary leading-tight ${isLuxProduct ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"}`}>
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
                  <div className="prose max-w-none">
                    <p className="text-light-secondary leading-relaxed whitespace-pre-line font-montserrat text-sm sm:text-base lg:text-lg">
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
                  className={`w-full btn-premium ${
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

                {isLuxProduct && (
                  <>
                    {/* Live inventory requires `unauthenticated_read_product_inventory` Storefront scope; falls back to total units. */}
                    <LuxStockCounter quantityAvailable={undefined} />
                    <LuxUrgencyBlock />
                    <LuxShippingClarity />
                    <div className="prose max-w-none pt-2">
                      <p className="text-light-secondary leading-relaxed whitespace-pre-line font-montserrat text-sm sm:text-base lg:text-lg">
                        {product.node.description}
                      </p>
                    </div>
                  </>
                )}

                {/* Trust Badges */}
                <TrustBadges />
              </div>
            </div>
          </div>
        </section>

        {/* DOX Video Section - Only for DOX product */}
        {isDoxProduct && <DoxVideoSection onReserve={handleAddToCart} />}

        {/* Related Products */}
        <RelatedProducts currentHandle={handle || ""} maxProducts={6} />

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
