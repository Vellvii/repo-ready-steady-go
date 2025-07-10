import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Shield, Phone, Mail, MapPin } from "lucide-react";

const Home = () => {
  const [concierge, setConcierge] = useState<string | null>(null);

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
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-luxury opacity-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm">
            Luxury Intimacy Collection
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-playfair font-bold gradient-text mb-6">
            Vellvii
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Where sophistication meets innovation in the art of intimate luxury
          </p>

          {concierge && (
            <div className="glass-luxury p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className={`text-lg font-inter ${getConciergeStyle()}`}>
                {getGreeting()}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="luxury">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
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
            <Link to="/product-one">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Pulse</h3>
                <p className="text-white/80 text-sm">Rhythmic Excellence</p>
              </Card>
            </Link>

            <Link to="/product-two">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">Vibe</h3>
                <p className="text-white/80 text-sm">Versatile Luxury</p>
              </Card>
            </Link>

            <Link to="/product-three">
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">G-Vibe</h3>
                <p className="text-white/80 text-sm">Precision Design</p>
              </Card>
            </Link>

            <Link to="/storage">
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
                <Button variant="luxury">Discover Our Story</Button>
                <Button variant="outline">View Collection</Button>
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
              <Button variant="outline" size="sm">
                +1 (555) 123-4567
              </Button>
            </Card>

            <Card className="glass-luxury p-8 text-center hover-glow">
              <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Email
              </h3>
              <p className="text-white/80 mb-4">Get personalized recommendations</p>
              <Button variant="outline" size="sm">
                hello@vellvii.com
              </Button>
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
    </div>
  );
};

export default Home;