import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowRight } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface QuickViewDialogProps {
  product: ShopifyProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewDialog = ({ product, open, onOpenChange }: QuickViewDialogProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const [isAdding, setIsAdding] = useState(false);

  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const variants = product.node.variants.edges;
  const hasOptions =
    product.node.options &&
    product.node.options.some(
      (opt) =>
        !(opt.name === "Title" && opt.values.length === 1 && opt.values[0] === "Default Title") &&
        opt.values.length > 1,
    );
  const isAvailable = variants.some((v) => v.node.availableForSale);
  const quickAddVariant = variants.find((v) => v.node.availableForSale)?.node;

  const handleAdd = async () => {
    if (!quickAddVariant) return;
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
      openDrawer();
      onOpenChange(false);
      toast.success(`${product.node.title} added to your collection`, { position: "top-center" });
    } catch {
      toast.error("Could not add to cart", { position: "top-center" });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl surface-dark-rich border-white/10 p-0 overflow-hidden">
        <div className="grid sm:grid-cols-2">
          <div className="aspect-square bg-white/5">
            {image && (
              <img
                src={image.url}
                alt={image.altText || product.node.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-5 sm:p-6 flex flex-col">
            <DialogTitle className="font-baskerville text-2xl text-light-primary leading-tight">
              {product.node.title}
            </DialogTitle>
            <DialogDescription className="font-montserrat text-sm text-light-secondary mt-2 line-clamp-4">
              {product.node.description || "Explore the full details on the product page."}
            </DialogDescription>
            <p className="font-montserrat text-2xl font-bold gradient-text mt-4">
              ${parseFloat(price.amount).toFixed(0)}
            </p>
            <div className="flex flex-col gap-2 mt-auto pt-6">
              {!isAvailable ? (
                <Button disabled className="btn-premium min-h-11">
                  Sold Out
                </Button>
              ) : hasOptions ? (
                <Link to={`/products/${product.node.handle}`} onClick={() => onOpenChange(false)}>
                  <Button className="btn-premium w-full min-h-11">Select options</Button>
                </Link>
              ) : (
                <Button onClick={handleAdd} disabled={isAdding} className="btn-premium min-h-11">
                  {isAdding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to cart
                    </>
                  )}
                </Button>
              )}
              <Link
                to={`/products/${product.node.handle}`}
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center justify-center gap-1.5 min-h-11 px-4 rounded-md border border-primary/40 text-primary font-montserrat text-sm hover:bg-primary/10 transition-colors"
              >
                View full details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewDialog;
