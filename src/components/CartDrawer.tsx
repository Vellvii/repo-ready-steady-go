import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

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
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Buy Now/Cart Trigger Button */}
      <Button
        className="fixed top-4 right-4 z-[999] bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury pulse-glow font-montserrat font-semibold"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {totalItems > 0 ? 'Cart' : 'Buy Now'}
        {totalItems > 0 && ` (${totalItems})`}
      </Button>

      {/* Cart Sidebar Overlay */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="bg-card border-l border-border shadow-2xl flex flex-col w-full lg:w-[400px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            overscrollBehavior: isHovering ? 'contain' : 'auto'
          }}
        >
          {/* Header */}
          <div className="border-b border-border p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-foreground text-2xl font-baskerville gradient-text">
                Your Collection
              </h2>
            </div>
            {totalItems > 0 && (
              <p className="text-muted-foreground text-sm mt-2 font-montserrat">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your collection
              </p>
            )}
          </div>
            
          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col gap-4 p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground max-w-xs font-montserrat">Your collection is empty. Browse our products to add items.</p>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-montserrat" 
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
                <ScrollArea className="flex-1">
                  <div className="space-y-4 pr-2">
                    {items.map((item) => (
                      <div key={item.variantId} className="glass-luxury p-4 rounded-xl border border-border">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product.node.images?.edges?.[0]?.node && (
                              <img 
                                src={item.product.node.images.edges[0].node.url} 
                                alt={item.product.node.title} 
                                className="w-full h-full object-cover" 
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate font-baskerville">{item.product.node.title}</h4>
                            {item.variantTitle !== 'Default Title' && (
                              <p className="text-sm text-muted-foreground font-montserrat">{item.variantTitle}</p>
                            )}
                            <p className="text-primary font-bold font-montserrat">
                              ${parseFloat(item.price.amount).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)} 
                              className="h-7 w-7 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
                              disabled={isLoading}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-foreground font-medium font-montserrat">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)} 
                              className="h-7 w-7 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
                              disabled={isLoading}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(item.variantId)} 
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-border pt-4 space-y-4">
                  <div className="glass-luxury p-4 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-2 font-montserrat">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3 font-montserrat">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span className="text-secondary">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-baskerville font-bold text-foreground">Total:</span>
                        <span className="text-2xl font-bold gradient-text font-montserrat">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury font-montserrat" 
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
                      className="w-full font-montserrat" 
                      variant="outline" 
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
