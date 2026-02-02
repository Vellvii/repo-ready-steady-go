import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ShopifyProduct } from "@/lib/shopify";
import { SEO } from "@/components/SEO";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    <Link to={`/product/${product.node.handle}`}>
      <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group h-full flex flex-col border-primary/20 bg-card/80 backdrop-blur-sm">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted/30">
          {image ? (
            <img 
              src={image.url} 
              alt={image.altText || product.node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <h3 className="text-lg font-baskerville font-semibold text-foreground mb-2">
          {product.node.title}
        </h3>
        <p className="text-primary font-bold text-xl mb-4 font-montserrat">
          ${parseFloat(price.amount).toFixed(0)}
        </p>
        <div className="mt-auto">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToCart}
            disabled={isLoading || !variant?.availableForSale}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

const ProductSkeleton = () => (
  <Card className="p-4 sm:p-6 bg-card/60 border-border">
    <Skeleton className="aspect-square mb-4 rounded-lg bg-muted/50" />
    <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-muted/50" />
    <Skeleton className="h-8 w-1/3 mx-auto mb-4 bg-muted/50" />
    <Skeleton className="h-10 w-full bg-muted/50" />
  </Card>
);

const Shop = () => {
  const { data: products, isLoading, error } = useShopifyProducts(20);

  return (
    <>
      <SEO 
        title="Shop | Vellvii" 
        description="Explore the Vellvii collection of luxury wellness products designed for privacy, elegance, and modern living."
      />
      <div className="min-h-screen bg-background">
        {/* Decorative gradient overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-50"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        {/* Header */}
        <div className="relative pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-baskerville font-bold text-foreground mb-4">
              The <span className="gradient-text">Collection</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-montserrat">
              Refined wellness products designed for privacy, elegance, and modern living.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative max-w-7xl mx-auto px-4 pb-24">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg font-montserrat">Failed to load products. Please try again later.</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg font-montserrat">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
