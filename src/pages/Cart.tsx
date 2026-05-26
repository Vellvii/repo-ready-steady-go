import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Lock, Loader2, ShoppingBag, ShieldCheck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { trackBeginCheckout, appendCheckoutAttribution } from "@/lib/analytics";
import { pixelInitiateCheckout } from "@/lib/metaPixel";
import { CheckoutTransition } from "@/components/checkout/CheckoutTransition";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

const CartPage = () => {
  const {
    items,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [checkoutTarget, setCheckoutTarget] = useState<string | null>(null);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (!checkoutUrl) return;
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
    setCheckoutTarget(appendCheckoutAttribution(checkoutUrl));
  };

  return (
    <>
      <SEO
        title="Your Cart - Vellvii"
        description="Review your Vellvii collection before secure checkout."
        canonical="/cart"
        noindex
      />
      <ScrollHeader />

      <main className="min-h-screen surface-dark-rich pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: "Cart" },
            ]}
            className="mb-4"
          />
          <header className="mb-8 sm:mb-12">
            <h1 className="font-baskerville text-3xl sm:text-4xl text-light-primary gradient-text">
              Your Collection
            </h1>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary mt-2">
              {totalItems === 0
                ? "Your cart is empty."
                : `${totalItems} ${totalItems === 1 ? "item" : "items"} ready for checkout.`}
            </p>
          </header>

          {items.length === 0 ? (
            <div className="card-dark rounded-2xl p-12 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/15 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-primary" />
              </div>
              <p className="font-montserrat text-light-secondary max-w-sm mx-auto">
                Discover the Vellvii Pleasure Collection and add something to your cart.
              </p>
              <p className="font-montserrat text-xs text-light-muted max-w-sm mx-auto">
                Add an item from the collection to enable checkout.
              </p>
              <Link to="/shop">
                <Button className="btn-premium px-8 h-11 font-montserrat">Browse the Collection</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              <section className="space-y-3">
                {items.map((item) => (
                  <article
                    key={item.variantId}
                    className="card-dark rounded-xl p-4 sm:p-5 flex gap-4"
                  >
                    <Link
                      to={`/products/${item.product.node.handle}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link
                        to={`/products/${item.product.node.handle}`}
                        className="font-baskerville text-light-primary text-base sm:text-lg leading-tight hover:text-primary transition-colors"
                      >
                        {item.product.node.title}
                      </Link>
                      {item.variantTitle !== "Default Title" && (
                        <p className="font-montserrat text-xs sm:text-sm text-light-muted mt-1">
                          {item.variantTitle}
                        </p>
                      )}
                      <p className="font-montserrat text-primary font-semibold mt-1">
                        ${parseFloat(item.price.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
                            disabled={isLoading}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </Button>
                          <span className="w-8 text-center text-light-primary font-montserrat text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="h-8 w-8 p-0 hover:bg-primary/20 text-primary"
                            disabled={isLoading}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.variantId)}
                          className="h-8 w-8 p-0 text-light-muted hover:text-red-300 hover:bg-red-500/10"
                          disabled={isLoading}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}

                <div className="flex justify-between pt-2">
                  <Link
                    to="/shop"
                    className="font-montserrat text-sm text-light-secondary hover:text-primary transition-colors"
                  >
                    ← Continue shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    disabled={isLoading}
                    className="font-montserrat text-sm text-light-muted hover:text-light-secondary transition-colors"
                  >
                    Clear collection
                  </button>
                </div>
              </section>

              <aside className="lg:sticky lg:top-24 self-start space-y-4">
                <div className="card-dark rounded-xl p-5 sm:p-6 space-y-4">
                  <h2 className="font-baskerville text-xl text-light-primary">Order Summary</h2>
                  <div className="space-y-2 font-montserrat text-sm">
                    <div className="flex justify-between text-light-secondary">
                      <span>Subtotal</span>
                      <span className="text-light-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-light-secondary">
                      <span>Shipping</span>
                      <span className="text-primary text-xs">Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                    <span className="font-baskerville text-light-primary text-lg">Total</span>
                    <span className="font-montserrat text-2xl font-bold gradient-text">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full h-12 btn-premium text-base font-semibold"
                    onClick={handleCheckout}
                    disabled={items.length === 0 || isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Checkout
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs font-montserrat text-light-muted leading-relaxed">
                    Secure Shopify checkout. Discreet packaging.
                  </p>
                </div>

                <div className="card-dark rounded-xl p-5 space-y-3">
                  <div className="flex items-start gap-3 text-light-secondary font-montserrat text-xs">
                    <Package className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Discreet, unbranded packaging on every order.</span>
                  </div>
                  <div className="flex items-start gap-3 text-light-secondary font-montserrat text-xs">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Secure payments handled by Shopify.</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <CheckoutTransition
        open={checkoutTarget !== null}
        url={checkoutTarget}
        onDone={() => setCheckoutTarget(null)}
      />
    </>
  );
};

export default CartPage;
