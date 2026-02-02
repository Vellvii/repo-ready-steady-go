import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-dark pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-dark pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-playfair text-white mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="luxury">
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
      <div className="min-h-screen bg-gradient-dark pt-24 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link to="/shop" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-black/20">
                {selectedImage ? (
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">
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
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === selectedImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-white/30'
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
                <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                  {product.node.title}
                </h1>
                <p className="text-3xl font-bold gradient-text">
                  ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 leading-relaxed whitespace-pre-line">
                  {product.node.description}
                </p>
              </div>

              <Button 
                variant="luxury" 
                size="lg"
                className="w-full h-14 text-lg"
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
              <div className="glass-luxury p-6 rounded-lg space-y-4">
                <h3 className="text-white font-semibold">Included with your purchase:</h3>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Free shipping on all orders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Discreet packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    1-year warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    30-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
