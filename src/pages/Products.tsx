import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, Shield, Package } from "lucide-react";
import UserMenu from "@/components/UserMenu";

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <UserMenu />
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Luxury Collection</Badge>
          <h1 className="text-5xl font-playfair font-bold gradient-text mb-6">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Each piece in our collection is meticulously crafted to deliver unparalleled quality and sophisticated pleasure
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pulse */}
            <Link to="/pulse">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-8 group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-white mb-2">Vellvii Pulse</h3>
                    <p className="text-white/80">Rhythmic Clitoral Stimulator</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Pulse delivers powerful rhythmic air pulses using pressure wave technology. 
                  Its refined contours and whisper-quiet motor offer a deeply personal, luxurious experience.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">10 Intensities</Badge>
                  <Badge variant="outline" className="text-xs">IPX7 Waterproof</Badge>
                  <Badge variant="outline" className="text-xs">Whisper Quiet</Badge>
                </div>
              </Card>
            </Link>

            {/* Vibe */}
            <Link to="/vibe">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-8 group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Star className="w-10 h-10 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-white mb-2">Vellvii Vibe</h3>
                    <p className="text-white/80">Internal & External Vibrator</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Crafted for elegance and power, the Vibe features dual-stimulation zones with 
                  customizable vibration patterns. Perfect for external massage or internal intimacy.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">8 Vibration Modes</Badge>
                  <Badge variant="outline" className="text-xs">Ergonomic Design</Badge>
                  <Badge variant="outline" className="text-xs">Smart Memory</Badge>
                </div>
              </Card>
            </Link>

            {/* G-Vibe */}
            <Link to="/gvibe">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-8 group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-white mb-2">Vellvii G-Vibe</h3>
                    <p className="text-white/80">G-Spot Vibrator</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  A sleek, precisely angled tool designed to reach and stimulate the G-spot with 
                  subtle elegance. Lightweight and flexible with LED feedback glow.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">6 Patterns</Badge>
                  <Badge variant="outline" className="text-xs">G-Spot Angled</Badge>
                  <Badge variant="outline" className="text-xs">LED Glow</Badge>
                </div>
              </Card>
            </Link>

            {/* DOX */}
            <Link to="/dox">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-8 group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold text-white mb-2">Vellvii DOX</h3>
                    <p className="text-white/80">Luxury Storage Box</p>
                  </div>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  A beautifully handcrafted leather-wrapped storage box with velvet interior, 
                  designed to discreetly hold Vellvii intimacy products with native charging.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Vegan Leather</Badge>
                  <Badge variant="outline" className="text-xs">Charging Dock</Badge>
                  <Badge variant="outline" className="text-xs">Fingerprint Lock</Badge>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
            Need Guidance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our AI concierges are here to help you find your perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" variant="luxury">
                Choose Concierge
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;