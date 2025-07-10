import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Star, Award } from "lucide-react";
import ConciergeChat from "@/components/ConciergeChat";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="p-6">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <div className="mb-8">
            <img src="/lovable-uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii" className="h-28 md:h-36 mx-auto" />
          </div>
          <p className="text-xl text-secondary italic mb-8 max-w-3xl mx-auto">
            The art of "O"
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-6">
                Our Mission
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
            </div>
            
            <div className="glass-luxury p-8 rounded-lg">
              <h3 className="text-2xl font-playfair font-semibold text-white mb-6">
                Our Values
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-primary" />
                  <p className="text-white/90">Premium, body-safe materials</p>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-secondary" />
                  <p className="text-white/90">Innovative technology integration</p>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-accent" />
                  <p className="text-white/90">Discreet, elegant packaging</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  <p className="text-white/90">Exceptional customer care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
              Meet Our Concierges
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI concierges are designed to provide personalized guidance and recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-luxury p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-white mb-4">Luke</h3>
              <p className="text-white/80 leading-relaxed">
                Luke offers sophisticated, technical guidance with expert knowledge of our products. 
                He provides detailed specifications and professional recommendations for discerning customers.
              </p>
            </Card>

            <Card className="glass-luxury p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6">
                <img src="/lovable-uploads/0f6e82dd-0d32-4119-a2a1-e5a0386ffec4.png" alt="Vivian" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-white mb-4">Vivian</h3>
              <p className="text-white/80 leading-relaxed">
                Vivian provides warm, intuitive guidance focused on comfort and personal experience. 
                She helps customers feel confident and supported in their intimate journey.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our luxury collection and find your perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="luxury">
                View Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Thoughtfully created with 💎 and expertise by{" "}
            <a 
              href="https://www.lumarostudios.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors duration-300 font-medium hover:underline"
            >
              Lumaro Studios
            </a>
            {" "}— crafting digital experiences that inspire
          </p>
        </div>
      </footer>
      
      <ConciergeChat />
    </div>
  );
};

export default About;