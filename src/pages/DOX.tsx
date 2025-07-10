import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Lock, Zap, Shield } from "lucide-react";
import SimilarProducts from "@/components/SimilarProducts";
import ConciergeChat from "@/components/ConciergeChat";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const DOX = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: 'dox',
      name: 'Vellvii DOX',
      price: 99.99,
    });
    
    toast({
      title: "Added to Collection",
      description: "Vellvii DOX has been added to your collection.",
    });
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
      {/* Sticky Navigation */}
      <nav className="fixed top-6 left-6 z-40">
        <Link to="/home">
          <Button variant="ghost" className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Product Hero */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Placeholder */}
            <div className="glass-luxury rounded-lg p-12 text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-secondary rounded-lg flex items-center justify-center mb-6">
                <Package className="w-24 h-24 text-foreground" />
              </div>
              <Badge variant="secondary" className="mb-4">Luxury Storage</Badge>
              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                Vellvii DOX
              </h1>
              <p className="text-white/80 text-lg">
                Luxury Storage Box
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Handcrafted Excellence</Badge>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Museum-Quality Storage
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A beautifully handcrafted leather-wrapped storage box with a velvet interior, 
                  designed to discreetly hold Vellvii intimacy products. Built with native in-box 
                  charging compatibility and form-fitting saddles for each product.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="glass-dark p-4">
                  <Package className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Vegan Leather</h3>
                  <p className="text-white/70 text-sm">Premium exterior</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Zap className="w-8 h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1">USB-C Charging</h3>
                  <p className="text-white/70 text-sm">Embedded dock</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Lock className="w-8 h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1">Fingerprint Lock</h3>
                  <p className="text-white/70 text-sm">Biometric security</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Travel Lock</h3>
                  <p className="text-white/70 text-sm">Secure transport</p>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button size="lg" variant="luxury" className="flex-1" onClick={handleAddToCart}>
                  Add to Collection - $99.99
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
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
      <section className="px-6 py-16 border-t border-white/10">
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

export default DOX;