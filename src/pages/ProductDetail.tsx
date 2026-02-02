import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useState } from "react";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg bg-muted/50" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4 bg-muted/50" />
              <Skeleton className="h-8 w-1/4 bg-muted/50" />
              <Skeleton className="h-32 w-full bg-muted/50" />
              <Skeleton className="h-12 w-full bg-muted/50" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-baskerville text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.node.variants.edges[0]?.node;
  const images = product.node.images.edges;
  const selectedImage = images[selectedImageIndex]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success(`${product.node.title} added to cart`, {
      position: "top-center"
    });
  };

  return (
    <>
      <SEO 
        title={`${product.node.title} | Vellvii`}
        description={product.node.description.slice(0, 160)}
      />
      <div className="min-h-screen bg-background">
        {/* Decorative gradient overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-40"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        <div className="relative pt-24 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/shop" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors font-montserrat"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-muted/30 border border-border shadow-elegant">
                  {selectedImage ? (
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'border-primary shadow-glow' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img 
                          src={img.node.url} 
                          alt={img.node.altText || `${product.node.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-baskerville font-bold text-foreground mb-3">
                    {product.node.title}
                  </h1>
                  <p className="text-3xl font-bold gradient-text font-montserrat">
                    ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-montserrat text-base">
                    {product.node.description}
                  </p>
                </div>

                <Button 
                  size="lg"
                  className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury font-montserrat font-semibold"
                  onClick={handleAddToCart}
                  disabled={cartLoading || !variant?.availableForSale}
                >
                  {cartLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : !variant?.availableForSale ? (
                    'Sold Out'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                {/* Product Features */}
                <div className="glass-luxury p-6 rounded-xl border border-primary/20">
                  <h3 className="text-foreground font-baskerville font-semibold text-lg mb-4">
                    Included with your purchase
                  </h3>
                  <ul className="space-y-3 font-montserrat">
                    {[
                      'Free shipping on all orders',
                      'Discreet packaging',
                      '1-year warranty',
                      '30-day return policy'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
