import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Minus, Plus, Trash2, X, Heart } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { items, addToCart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const products = [
    { id: 'pulse', name: 'Vellvii Pulse', price: 299.99, image: '/uploads/Pulse1.jpg' },
    { id: 'vibe', name: 'Vellvii Vibe', price: 249.99, image: '/uploads/Vibe1.jpg' },
    { id: 'g-vibe', name: 'Vellvii G-Vibe', price: 199.99, image: '/uploads/G-Vibe1.jpg' },
    { id: 'dox', name: 'Vellvii DOX', price: 499.99, image: '/uploads/Dox1.jpg' },
  ];

  const availableProducts = products.filter(
    (p) => !items.some((item) => item.id === p.id)
  );

  const handleCheckout = () => {
    toast({
      title: "Checkout Coming Soon",
      description: "Payment integration will be added in the next phase.",
    });
  };

  return (
    <>
      {/* Sticky Buy Now/Cart Trigger Button */}
      <Button
        variant="luxury"
        className={cn(
          'fixed top-4 right-4 z-40 pulse-glow',
          buttonVariants({ variant: 'luxury' })
        )}
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {getTotalItems() > 0 ? 'Cart' : 'Buy Now'}
        {getTotalItems() > 0 && ` (${getTotalItems()})`}
      </Button>

      {/* Cart Sidebar Overlay */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className={cn(
            'bg-gradient-dark border border-white/20 shadow-2xl flex flex-col w-full lg:w-[400px]'
          )}
        >
            {/* Header */}
            <div className="border-b border-white/10 p-4 sm:p-6">
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
          <div className="flex-1 overflow-hidden flex flex-col gap-8 p-4 sm:p-6">
            <div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-4">Add something to your cart</h3>
              {availableProducts.length === 0 ? (
                <p className="text-white/60">All products are in your collection.</p>
              ) : (
                <div className="space-y-4 overflow-y-auto pr-2">
                  {availableProducts.map((p) => (
                    <Card key={p.id} className="glass-luxury p-4 flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{p.name}</h4>
                      </div>
                      <Button size="sm" variant="luxury" onClick={() => addToCart(p)}>
                        Add
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-playfair font-semibold text-white mb-4">Your Collection</h3>
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-luxury rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white/60 max-w-xs">Add items from above to start your collection.</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <Card key={item.id} className="glass-luxury p-4 hover-glow transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg mb-1">{item.name}</h3>
                            <p className="text-primary font-bold text-lg">${item.price}</p>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                              <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 p-0 hover:bg-white/10 text-white/60 hover:text-white">
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                              <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 p-0 hover:bg-white/10 text-white/60 hover:text-white">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

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
                      <Button className="w-full h-12 text-lg font-semibold" variant="luxury" onClick={handleCheckout} disabled={items.length === 0}>
                        Proceed to Secure Checkout
                      </Button>
                      <Button className="w-full" variant="outline" onClick={clearCart} disabled={items.length === 0}>
                        Clear Collection
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          </SheetContent>
          </Sheet>
      </>
  );
};

export default Cart;