import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, Shield, Package } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import { ProductCard } from "@/components/ProductCard";
import { ImageSlider } from "@/components/ImageSlider";

const Products = () => {
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
        <UserMenu />
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
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
      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Pulse */}
            <Link to="/pulse">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-4 sm:p-6 md:p-8 group">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex-shrink-0">
                    <ImageSlider
                      images={["/uploads/Pulse1.jpg", "/uploads/Pulse2.jpg"]}
                      name="Pulse"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-playfair font-semibold text-white mb-1 sm:mb-2">Vellvii Pulse</h3>
                    <p className="text-sm sm:text-base text-white/80">Rhythmic Clitoral Stimulator</p>
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
                  <div className="w-20 h-20 relative">
                    <ImageSlider
                      images={["/uploads/Vibe1.jpg", "/uploads/Vibe2.jpg"]}
                      name="Vibe"
                      className="w-full h-full"
                    />
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
            <Link to="/g-vibe">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-8 group">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 relative">
                    <ImageSlider
                      images={["/uploads/G-Vibe1.jpg", "/uploads/G-Vibe2.jpg", "/uploads/G-Vibe3.jpg"]}
                      name="G-Vibe"
                      className="w-full h-full"
                    />
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
                  <div className="w-20 h-20 relative">
                    <ImageSlider
                      images={["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg", "/uploads/Dox4.jpg", "/uploads/Dox5.jpg"]}
                      name="DOX"
                      className="w-full h-full"
                    />
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
      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
            Need Guidance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our AI concierges are here to help you find your perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/" className="w-full sm:w-auto">
              <Button size="lg" variant="luxury" className="w-full sm:w-auto">
                Choose Concierge
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
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