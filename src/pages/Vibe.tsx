import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Zap, Droplets, RotateCcw, ShoppingCart } from "lucide-react";
import SimilarProducts from "@/components/SimilarProducts";
import ConciergeChat from "@/components/ConciergeChat";
import UserMenu from "@/components/UserMenu";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Vibe = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, items: cartItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: 'vibe',
      name: 'Vellvii Vibe',
      price: 199.99,
    });
    
    toast({
      title: "Added to Collection",
      description: "Vellvii Vibe has been added to your collection.",
    });
  };

  const getConciergeRecommendation = () => {
    if (concierge === "luke") {
      return "The Vibe exemplifies versatile luxury with its dual-stimulation zones and ergonomic design. Its sophisticated vibration patterns can be customized for both external massage and internal pleasure. The smart memory function ensures your preferred settings are always accessible.";
    } else if (concierge === "vivian") {
      return "I absolutely love the Vibe's versatility! Whether you want a relaxing massage or intimate pleasure, it adapts beautifully to your needs. The curved design feels so natural, and the different vibration modes let you explore at your own pace.";
    }
    return "The Vibe offers versatile dual-stimulation with premium design and smart features.";
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
            {/* Product Image Placeholder */}
            <div className="glass-luxury rounded-lg p-8 sm:p-12 text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-6">
                <Star className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-foreground" />
              </div>
              <Badge variant="secondary" className="mb-4">Premium Collection</Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
                Vellvii Vibe
              </h1>
              <p className="text-white/80 text-base sm:text-lg">
                Internal & External Vibrator
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div>
                <Badge variant="outline" className="mb-4">Versatile Luxury</Badge>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4">
                  Dual-Zone Pleasure Design
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  Crafted for elegance and power, the Vibe features dual-stimulation zones with 
                  customizable vibration patterns. Perfect for external massage or internal intimacy, 
                  this versatile piece adapts to your desires with sophisticated precision.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="glass-dark p-3 sm:p-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">8 Vibration Modes</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Customizable patterns</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Ergonomic Design</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Curved for comfort</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Submersible</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Fully waterproof</p>
                </Card>
                
                <Card className="glass-dark p-3 sm:p-4">
                  <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Smart Memory</h3>
                  <p className="text-white/70 text-xs sm:text-sm">Remembers preferences</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" variant="luxury" className="flex-1 text-sm sm:text-base" onClick={handleAddToCart}>
                  Add to Collection - $199.99
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
                <li>• 8 vibration modes</li>
                <li>• Ergonomic curved design</li>
                <li>• Waterproof and submersible</li>
                <li>• USB-C charging</li>
                <li>• Body-safe materials</li>
                <li>• Smart memory function</li>
              </ul>
            </Card>
            
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-3 text-white/80">
                <li>• Vellvii Vibe device</li>
                <li>• USB-C charging cable</li>
                <li>• Premium storage pouch</li>
                <li>• User manual and care guide</li>
                <li>• 1-year luxury warranty</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <SimilarProducts currentProduct="vibe" />
      
      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Developed with precision and artistry by{" "}
            <a 
              href="https://www.lumarostudios.com" 
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

export default Vibe;