import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Target, Lightbulb, Zap } from "lucide-react";

const ProductThree = () => {
  const [concierge, setConcierge] = useState<string | null>(null);

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

  const getConciergeRecommendation = () => {
    if (concierge === "luke") {
      return "The G-Vibe demonstrates precision engineering at its finest. The precisely angled tip is designed for optimal G-spot contact, while the flexible silicone neck allows for comfortable positioning. The LED intensity glow provides elegant feedback for your experience.";
    } else if (concierge === "vivian") {
      return "The G-Vibe is such a thoughtful design! The gentle curve feels so natural, and I love how the soft LED glow lets you know exactly what intensity you're enjoying. It's lightweight and flexible, making exploration comfortable and stress-free.";
    }
    return "The G-Vibe offers precise G-spot stimulation with elegant design and LED feedback.";
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
              <div className="w-48 h-48 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 relative">
                <Shield className="w-24 h-24 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 animate-pulse"></div>
              </div>
              <Badge variant="secondary" className="mb-4">Premium Collection</Badge>
              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                Vellvii G-Vibe
              </h1>
              <p className="text-white/80 text-lg">
                G-Spot Vibrator
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">Precision Design</Badge>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Targeted G-Spot Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A sleek, precisely angled tool designed to reach and stimulate the G-spot with 
                  subtle elegance. Lightweight and flexible with a smooth surface and LED feedback glow, 
                  the G-Vibe offers targeted stimulation for intimate exploration.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="glass-dark p-4">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">6 Patterns</h3>
                  <p className="text-white/70 text-sm">Vibration modes</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Target className="w-8 h-8 text-secondary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Angled Tip</h3>
                  <p className="text-white/70 text-sm">G-spot precision</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Lightbulb className="w-8 h-8 text-accent mb-2" />
                  <h3 className="font-semibold text-white mb-1">LED Glow</h3>
                  <p className="text-white/70 text-sm">Intensity feedback</p>
                </Card>
                
                <Card className="glass-dark p-4">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-white mb-1">Flexible Neck</h3>
                  <p className="text-white/70 text-sm">Comfortable positioning</p>
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
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">
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
                <li>• 6 vibration patterns</li>
                <li>• G-spot angled tip</li>
                <li>• Flexible silicone neck</li>
                <li>• LED intensity glow</li>
                <li>• Quiet and rechargeable</li>
                <li>• Fits snugly in the DOX</li>
              </ul>
            </Card>
            
            <Card className="glass-luxury p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-3 text-white/80">
                <li>• Vellvii G-Vibe device</li>
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

export default ProductThree;