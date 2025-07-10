import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Zap, Droplets, RotateCcw } from "lucide-react";

const ProductTwo = () => {
  const [concierge, setConcierge] = useState<string | null>(null);

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

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
      <nav className="p-6">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </Link>
      </nav>

      {/* Product Hero */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image Placeholder */}
            <div className="glass-luxury rounded-lg p-12 text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-6">
                <Star className="w-24 h-24 text-foreground" />
              </div>
              <Badge variant="secondary" className="mb-4">Premium Collection</Badge>
              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                Vellvii Vibe
              </h1>
              <p className="text-white/80 text-lg">
                Internal & External Vibrator
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Versatile Luxury</Badge>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Dual-Zone Pleasure Design
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Crafted for elegance and power, the Vibe features dual-stimulation zones with 
                  customizable vibration patterns. Perfect for external massage or internal intimacy, 
                  this versatile piece adapts to your desires with sophisticated precision.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="glass-dark p-4">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">8 Vibration Modes</h3>
                  <p className="text-white/70 text-sm">Customizable patterns</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Star className="w-8 h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Ergonomic Design</h3>
                  <p className="text-white/70 text-sm">Curved for comfort</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Droplets className="w-8 h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1">Submersible</h3>
                  <p className="text-white/70 text-sm">Fully waterproof</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <RotateCcw className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Smart Memory</h3>
                  <p className="text-white/70 text-sm">Remembers preferences</p>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button size="lg" variant="luxury" className="flex-1">
                  Add to Collection
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
    </div>
  );
};

export default ProductTwo;