import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Minus, Plus, Trash2, Lock, Loader2, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { trackBeginCheckout, appendCheckoutAttribution } from "@/lib/analytics";
import { pixelInitiateCheckout } from "@/lib/metaPixel";
import { CheckoutTransition } from "@/components/checkout/CheckoutTransition";


export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { 
    items, 
    isLoading, 
    isSyncing, 
    updateQuantity, 
    removeItem, 
    getCheckoutUrl, 
    syncCart,
    getTotalItems,
    getTotalPrice,
    clearCart
  } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => { 
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      const currency = items[0]?.price.currencyCode || "USD";
      trackBeginCheckout(
        items.map((i) => ({
          item_id: i.variantId,
          item_name: i.product.node.title,
          item_brand: "Vellvii",
          item_variant: i.variantTitle,
          price: parseFloat(i.price.amount),
          quantity: i.quantity,
          currency: i.price.currencyCode,
        })),
        totalPrice,
        currency
      );
      pixelInitiateCheckout({
        content_ids: items.map((i) => i.variantId),
        contents: items.map((i) => ({
          id: i.variantId,
          quantity: i.quantity,
          item_price: parseFloat(i.price.amount),
        })),
        num_items: totalItems,
        value: totalPrice,
        currency,
      });
      window.open(appendCheckoutAttribution(checkoutUrl), "_blank");
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Buy Now/Cart Trigger Button - Show Shop when empty, Cart when items exist */}
      {!isOpen && (
        <Button
          className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[1001] bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury pulse-glow font-montserrat font-semibold text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10"
          onClick={() => totalItems > 0 ? setIsOpen(true) : window.location.href = '/shop'}
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          {totalItems > 0 ? `Cart (${totalItems})` : 'Shop Now'}
        </Button>
      )}

      {/* Cart Sidebar Overlay */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="surface-dark-rich border-l border-white/10 shadow-2xl flex flex-col w-full sm:w-[380px] lg:w-[420px] p-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            overscrollBehavior: isHovering ? 'contain' : 'auto'
          }}
          aria-describedby={undefined}
        >
          <span className="sr-only">
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>Your shopping cart with items</SheetDescription>
          </span>
          
          {/* Header */}
          <div className="border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-light-primary text-xl sm:text-2xl font-baskerville gradient-text">
                Your Collection
              </h2>
            </div>
            {totalItems > 0 && (
              <p className="text-light-secondary text-xs sm:text-sm mt-1.5 font-montserrat">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your collection
              </p>
            )}
          </div>
            
          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col px-4 py-4 sm:px-6 sm:py-5">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <p className="text-light-secondary text-sm sm:text-base max-w-[240px] font-montserrat leading-relaxed">
                  Your collection is empty. Browse our products to add items.
                </p>
                <Button 
                  className="btn-premium px-5 py-2 text-sm sm:text-base font-montserrat" 
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/shop';
                  }}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <div className="space-y-3 pb-4">
                    {items.map((item) => (
                      <div key={item.variantId} className="card-dark p-3 sm:p-4 rounded-xl">
                        <div className="flex gap-3">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img 
                                src={item.product.node.images.edges[0].node.url} 
                                alt={item.product.node.title} 
                                className="w-full h-full object-cover" 
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-light-primary text-sm sm:text-base leading-tight font-baskerville line-clamp-2">
                              {item.product.node.title}
                            </h4>
                            {item.variantTitle !== 'Default Title' && (
                              <p className="text-xs sm:text-sm text-light-muted font-montserrat mt-0.5">{item.variantTitle}</p>
                            )}
                            <p className="text-primary font-bold text-sm sm:text-base font-montserrat mt-1">
                              ${parseFloat(item.price.amount).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)} 
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-transparent hover:bg-primary/20 text-primary hover:text-primary border-0"
                              disabled={isLoading}
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <span className="w-7 sm:w-8 text-center text-light-primary text-sm sm:text-base font-medium font-montserrat">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)} 
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-transparent hover:bg-primary/20 text-primary hover:text-primary border-0"
                              disabled={isLoading}
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(item.variantId)} 
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-transparent hover:bg-red-500/20 text-red-400 hover:text-red-300 border-0"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-white/10 pt-4 mt-auto flex-shrink-0 space-y-3 sm:space-y-4">
                  <div className="card-dark p-3 sm:p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2 font-montserrat text-sm sm:text-base">
                      <span className="text-light-secondary">Subtotal:</span>
                      <span className="text-light-primary font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 sm:mb-3 font-montserrat text-sm sm:text-base">
                      <span className="text-light-secondary">Shipping:</span>
                      <span className="text-primary text-xs sm:text-sm">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 sm:pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-baskerville font-bold text-light-primary">Total:</span>
                        <span className="text-xl sm:text-2xl font-bold gradient-text font-montserrat">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Button 
                      className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold btn-premium" 
                      onClick={handleCheckout} 
                      disabled={items.length === 0 || isLoading || isSyncing}
                    >
                      {isLoading || isSyncing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Checkout
                        </>
                      )}
                    </Button>
                    <Button 
                      className="w-full h-9 sm:h-10 text-sm font-montserrat bg-transparent border border-white/20 text-light-secondary hover:bg-white/10 hover:text-light-primary hover:border-white/30" 
                      variant="ghost" 
                      onClick={clearCart} 
                      disabled={items.length === 0 || isLoading}
                    >
                      Clear Collection
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartDrawer;
