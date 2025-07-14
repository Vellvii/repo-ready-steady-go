import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Zap, Droplets, Volume2, ShoppingCart } from "lucide-react";
import SimilarProducts from "@/components/SimilarProducts";
import ConciergeChat from "@/components/ConciergeChat";
import UserMenu from "@/components/UserMenu";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { N8nService } from "@/services/n8nService";

const Pulse = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const { addToCart, items: cartItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
    
    if (selectedConcierge === "vivian") {
      N8nService.getProductRecommendation(window.location.pathname).then(response => {
        setRecommendation(response);
      }).catch(() => {
        setRecommendation("The Pulse is such a gentle yet powerful companion! Its soft silicone feels wonderful, and the different rhythmic patterns let you discover exactly what brings you joy. Perfect for both beginners and those seeking new experiences.");
      });
    }
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: 'pulse',
      name: 'Vellvii Pulse',
      price: 299.99,
    });
    
    toast({
      title: "Added to Collection",
      description: "Vellvii Pulse has been added to your collection.",
    });
  };


  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6">
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
            className="text-white hover:bg-white/10 px-2 sm:px-3"
          >
            <ShoppingCart className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Cart ({cartItems.length})</span>
            <span className="sm:hidden">({cartItems.length})</span>
          </Button>
          <UserMenu />
        </div>
      </nav>

      {/* Product Hero */}
      <section className="px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Product Image Placeholder */}
            <div className="glass-luxury rounded-lg p-6 sm:p-8 md:p-12 text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                <Heart className="w-24 h-24 text-white" />
              </div>
              <Badge variant="secondary" className="mb-4">Premium Collection</Badge>
              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                Vellvii Pulse
              </h1>
              <p className="text-white/80 text-lg">
                Rhythmic Clitoral Stimulator
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Rhythmic Excellence</Badge>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Sophisticated Pleasure Technology
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Pulse delivers powerful rhythmic air pulses using advanced pressure wave technology. 
                  Its refined contours and whisper-quiet motor offer a deeply personal, luxurious experience 
                  that enhances pleasure through rhythmic pulse stimulation.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="glass-dark p-4">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">10 Intensities</h3>
                  <p className="text-white/70 text-sm">Rhythmic patterns</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Droplets className="w-8 h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1">IPX7 Waterproof</h3>
                  <p className="text-white/70 text-sm">Fully submersible</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Volume2 className="w-8 h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1">Whisper Quiet</h3>
                  <p className="text-white/70 text-sm">Ultra-silent motor</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Heart className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Body Safe</h3>
                  <p className="text-white/70 text-sm">Premium silicone</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" variant="luxury" className="flex-1" onClick={handleAddToCart}>
                  <span className="hidden sm:inline">Add to Collection - $299.99</span>
                  <span className="sm:hidden">Add - $299.99</span>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Recommendation */}
      {concierge === "vivian" && recommendation && (
        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-luxury p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">V</span>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Vivian's Recommendation
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Product Specifications */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Technical Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-3 text-white/80">
                <li>• 10 rhythmic intensities</li>
                <li>• Body-safe silicone construction</li>
                <li>• Waterproof (IPX7 rating)</li>
                <li>• Whisper-quiet operation</li>
                <li>• USB-C charging</li>
                <li>• Designed to fit perfectly in DOX</li>
              </ul>
            </Card>
            
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-3 text-white/80">
                <li>• Vellvii Pulse device</li>
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
      <SimilarProducts currentProduct="pulse" />
      
      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Engineered with love and innovation by{" "}
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

export default Pulse;