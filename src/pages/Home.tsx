import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Shield, Phone, Mail, MapPin, Store, ShoppingCart, MessageSquare } from "lucide-react";
import ConciergeChat from "@/components/ConciergeChat";
import Cart from "@/components/Cart";
import UserMenu from "@/components/UserMenu";
import { useCart } from "@/hooks/useCart";

const Home = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items: cartItems } = useCart();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);

  const getGreeting = () => {
    if (!concierge) return "Welcome to Vellvii";
    return concierge === "luke" 
      ? "Good day. Luke here, ready to assist you with our luxury collection."
      : "Hello! Vivian here, excited to help you discover your perfect match.";
  };

  const getConciergeStyle = () => {
    return concierge === "luke" 
      ? "text-primary font-semibold" 
      : "text-secondary font-semibold";
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii" className="h-8" />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:bg-white/10"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart ({cartItems.length})
          </Button>
          <UserMenu />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-luxury opacity-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm">
            Luxury Intimacy Collection
          </Badge>
          
          <div className="mb-8">
            <img src="/lovable-uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii" className="h-28 md:h-36 mx-auto" />
          </div>

          {concierge && (
            <div className="glass-luxury p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className={`text-lg font-inter ${getConciergeStyle()}`}>
                {getGreeting()}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button size="lg" variant="luxury">
                Explore Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
              Our Luxury Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each piece in our collection is meticulously crafted to deliver 
              unparalleled quality and sophisticated pleasure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/pulse">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Pulse</h3>
                <p className="text-white/80 text-sm">Rhythmic Excellence</p>
              </Card>
            </Link>

            <Link to="/vibe">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Vibe</h3>
                <p className="text-white/80 text-sm">Versatile Luxury</p>
              </Card>
            </Link>

            <Link to="/gvibe">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">G-Vibe</h3>
                <p className="text-white/80 text-sm">Precision Design</p>
              </Card>
            </Link>

            <Link to="/dox">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">DOX</h3>
                <p className="text-white/80 text-sm">Luxury Storage</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">About Vellvii</Badge>
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-6">
                Redefining Intimate Luxury
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Vellvii, we believe that intimacy deserves the finest craftsmanship. 
                Our collection represents the perfect fusion of sophisticated design, 
                cutting-edge technology, and uncompromising quality.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every product is thoughtfully designed to enhance your most personal moments, 
                bringing elegance and innovation to the art of intimate connection.
              </p>
              <div className="flex gap-4">
                <Link to="/about">
                  <Button variant="luxury">Discover Our Story</Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline">View Collection</Button>
                </Link>
              </div>
            </div>
            
            <div className="glass-luxury p-8 rounded-lg">
              <h3 className="text-2xl font-playfair font-semibold text-white mb-6">
                Our Commitment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white/90">Premium, body-safe materials</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <p className="text-white/90">Innovative technology integration</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <p className="text-white/90">Discreet, elegant packaging</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white/90">Exceptional customer care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Marketing Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Business Partnership</Badge>
            <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
              Retail Partners Wanted
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Own a sex shop or intimate wellness store? Join our exclusive retail network and offer 
              your customers the finest in luxury intimacy products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-luxury p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Products</h3>
              <p className="text-white/80 text-sm">Be among the first to stock Vellvii's luxury collection</p>
            </Card>

            <Card className="glass-luxury p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Support</h3>
              <p className="text-white/80 text-sm">Marketing materials, training, and dedicated support</p>
            </Card>

            <Card className="glass-luxury p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Attractive Margins</h3>
              <p className="text-white/80 text-sm">Competitive wholesale pricing for luxury products</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact#partners">
              <Button size="lg" variant="secondary">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our collection? Our team is here to provide 
              personalized assistance and expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-luxury p-8 text-center hover-glow">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Phone
              </h3>
              <p className="text-white/80 mb-4">Speak with our luxury specialists</p>
              <a href="tel:+15551234567">
                <Button variant="outline" size="sm">
                  +1 (555) 123-4567
                </Button>
              </a>
            </Card>

            <Card className="glass-luxury p-8 text-center hover-glow">
              <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Email
              </h3>
              <p className="text-white/80 mb-4">Get personalized recommendations</p>
              <a href="mailto:info@vellvii.com">
                <Button variant="outline" size="sm">
                  info@vellvii.com
                </Button>
              </a>
            </Card>

            <Card className="glass-luxury p-8 text-center hover-glow">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Location
              </h3>
              <p className="text-white/80 mb-4">Delaware, USA</p>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Designed with passion and brought to life with ✨ by{" "}
            <a 
              href="https://www.lumarostudios.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-300 font-medium hover:underline"
            >
              Lumaro Studios
            </a>
            {" "}— where luxury meets technology
          </p>
        </div>
      </footer>
      
      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full max-h-[80vh] bg-black/80 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            >
              ✕
            </Button>
            <Cart />
          </div>
        </div>
      )}

      {/* Concierge Chat */}
      <ConciergeChat />
    </div>
  );
};

export default Home;