import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Minus, Plus, Trash2, X, Heart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    toast({
      title: "Checkout Coming Soon",
      description: "Payment integration will be added in the next phase.",
    });
  };

  return (
    <>
      {/* Cart Trigger Button */}
      <Button 
        variant="ghost" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-5 h-5" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 min-w-[1.2rem] h-5 flex items-center justify-center text-xs bg-primary">
            {getTotalItems()}
          </Badge>
        )}
      </Button>

      {/* Cart Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={cn(
            "fixed right-0 top-0 h-full w-[400px] sm:w-[480px]",
            "bg-gradient-dark border-l border-white/20 shadow-2xl",
            "transform transition-transform duration-300 ease-in-out",
            "translate-x-0 z-50 flex flex-col"
          )}>
            {/* Header */}
            <div className="border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary" />
                  <h2 className="text-white text-2xl font-playfair gradient-text">
                    Your Collection
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {getTotalItems() > 0 && (
                <p className="text-white/70 text-sm mt-2">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your luxury collection
                </p>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col p-6">
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-luxury rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-playfair text-white">Your collection awaits</h3>
                    <p className="text-white/60 max-w-xs">
                      Discover our curated luxury intimacy collection and add items to your personal sanctuary.
                    </p>
                    <Button 
                      variant="luxury" 
                      onClick={() => setIsOpen(false)}
                      className="mt-4"
                    >
                      Explore Collection
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <Card key={item.id} className="glass-luxury p-4 hover-glow transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg mb-1">{item.name}</h3>
                            <p className="text-primary font-bold text-lg">${item.price}</p>
                            <p className="text-white/60 text-sm">Luxury Intimacy Collection</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-7 w-7 p-0 hover:bg-white/10 text-white/60 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              
                              <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-7 w-7 p-0 hover:bg-white/10 text-white/60 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t border-white/20 pt-6 mt-6 space-y-6">
                    <div className="glass-dark p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Subtotal:</span>
                        <span className="text-white font-medium">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white/80">Shipping:</span>
                        <span className="text-secondary">Free</span>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-playfair font-bold text-white">Total:</span>
                          <span className="text-2xl font-bold gradient-text">${getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full h-12 text-lg font-semibold" 
                        variant="luxury" 
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                      >
                        Proceed to Secure Checkout
                      </Button>
                      
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        onClick={clearCart}
                        disabled={items.length === 0}
                      >
                        Clear Collection
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;