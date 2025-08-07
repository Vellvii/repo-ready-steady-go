import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Lock, Zap, Shield, ShoppingCart } from "lucide-react";
import { ImageSlider } from "@/components/ImageSlider";
import SimilarProducts from "@/components/SimilarProducts";
import ConciergeChat from "@/components/ConciergeChat";
import UserMenu from "@/components/UserMenu";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { getProductById } from "@/lib/productData";

const DOX = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, items: cartItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

  const handleAddToCart = () => {
    const product = getProductById("dox");
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      
      toast({
        title: "Added to Collection",
        description: "Vellvii DOX has been added to your collection.",
      });
    }
  };

  const getConciergeRecommendation = () => {
    if (concierge === "luke") {
      return "The DOX represents the ultimate in sophisticated storage solutions. Its handcrafted leather exterior and velvet interior create a museum-quality environment for your collection. The embedded charging dock and fingerprint lock ensure both convenience and absolute privacy.";
    } else if (concierge === "vivian") {
      return "I'm so excited about the DOX! It's like having a beautiful jewelry box, but for your most treasured intimate items. The soft velvet cradles each piece perfectly, and I love how everything charges while it's stored. It makes caring for your collection feel so luxurious!";
    }
    return "The DOX offers elegant, discreet storage with integrated charging for your luxury collection.";
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6 min-h-[80px]">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:bg-white/10 text-xs sm:text-sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Cart </span>({cartItems.length})
          </Button>
          <UserMenu />
        </div>
      </nav>

      {/* Product Hero */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Product Images */}
            <div className="glass-luxury rounded-lg p-8 sm:p-12 text-center">
              <ImageSlider
                images={["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg", "/uploads/Dox4.jpg", "/uploads/Dox5.jpg"]}
                name="DOX"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-6"
              />
              <Badge variant="secondary" className="mb-4">Luxury Storage</Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
                Vellvii DOX
              </h1>
              <p className="text-white/80 text-base sm:text-lg">
                Luxury Storage Box
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div>
                <Badge variant="outline" className="mb-4">Handcrafted Excellence</Badge>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4">
                  Museum-Quality Storage
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  A beautifully handcrafted leather-wrapped storage box with a velvet interior, 
                  designed to discreetly hold Vellvii intimacy products. Built with native in-box 
                  charging compatibility and form-fitting saddles for each product.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="glass-dark p-3 sm:p-4">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Vegan Leather</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Premium exterior</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">USB-C Charging</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Embedded dock</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Fingerprint Lock</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Biometric security</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Travel Lock</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Secure transport</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" variant="luxury" className="flex-1 text-sm sm:text-base" onClick={handleAddToCart}>
                  Add to Collection - ${getProductById("dox")?.price || 899}
                </Button>
                <a href="#specifications" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Recommendation */}
      {concierge && (
        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-luxury p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-foreground font-semibold">
                    {concierge === "luke" ? "L" : "V"}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    {concierge === "luke" ? "Luke's" : "Vivian's"} Recommendation
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {getConciergeRecommendation()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Product Specifications */}
      <section id="specifications" className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Technical Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-3 text-white/80">
                <li>• Vegan leather exterior</li>
                <li>• Velvet interior lining</li>
                <li>• Magnetic enclosure</li>
                <li>• Embedded charging dock (USB-C)</li>
                <li>• Cradle slots for Pulse, Vibe, and G-Vibe</li>
                <li>• Travel lock system</li>
                <li>• Fingerprint lock</li>
              </ul>
            </Card>
            
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-3 text-white/80">
                <li>• Vellvii DOX storage box</li>
                <li>• USB-C charging cable</li>
                <li>• Setup guide for fingerprint lock</li>
                <li>• Velvet cleaning cloth</li>
                <li>• Travel case</li>
                <li>• 2-year premium warranty</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <SimilarProducts currentProduct="dox" />
      
      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Carefully crafted with attention to detail by{" "}
            <a
              href="https://lumarostudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-300 font-medium hover:underline"
            >
              Lumaro Studios
            </a>
          </p>
        </div>
      </footer>
      
      <ConciergeChat />
    </div>
  );
};

export default DOX;