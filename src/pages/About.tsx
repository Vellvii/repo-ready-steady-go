import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Star, Award } from "lucide-react";
import ConciergeChat from "@/components/ConciergeChat";
import UserMenu from "@/components/UserMenu";
import { SEO } from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="Luxury Sexual Wellness Brand | Vellvii Story"
        description="Discover Vellvii - a luxury brand redefining sexual wellness with premium pleasure design, high-end adult innovation, and elegant intimacy products."
        canonical="/about"
        organizationData
      />
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6 min-h-[80px]">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <UserMenu />
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">Our Story</Badge>
          <div className="mb-8">
            <img src="/uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii luxury sexual wellness brand logo" className="h-24 sm:h-28 md:h-36 mx-auto" />
          </div>
          <h1 className="sr-only">Luxury Sexual Wellness Brand - Vellvii</h1>
          <p className="text-lg sm:text-xl text-secondary italic mb-8 max-w-3xl mx-auto px-4">
            The art of "O"
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-6">
                Premium Pleasure Design Philosophy
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                At Vellvii, we believe that intimacy deserves the finest craftsmanship. 
                Our collection represents the perfect fusion of sophisticated design, 
                cutting-edge technology, and uncompromising quality.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Every product is thoughtfully designed to enhance your most personal moments, 
                bringing elegance and innovation to the art of intimate connection.
              </p>
            </div>
            
            <div className="glass-luxury p-6 sm:p-8 rounded-lg mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-6">
                Our Values
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  <p className="text-white/90 text-sm sm:text-base">Premium, body-safe materials</p>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-secondary flex-shrink-0" />
                  <p className="text-white/90 text-sm sm:text-base">Innovative technology integration</p>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                  <p className="text-white/90 text-sm sm:text-base">Discreet, elegant packaging</p>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  <p className="text-white/90 text-sm sm:text-base">Exceptional customer care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              Meet Our Concierges
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Our AI concierges are designed to provide personalized guidance and recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="glass-luxury p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                <span className="text-xl sm:text-2xl font-bold text-white">L</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-4">Luke</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                Luke offers sophisticated, technical guidance with expert knowledge of our products. 
                He provides detailed specifications and professional recommendations for discerning customers.
              </p>
            </Card>

            <Card className="glass-luxury p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-6">
                <img src="/uploads/0f6e82dd-0d32-4119-a2a1-e5a0386ffec4.png" alt="Vivian" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-4">Vivian</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                Vivian provides warm, intuitive guidance focused on comfort and personal experience. 
                She helps customers feel confident and supported in their intimate journey.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-6">
            Ready to Explore?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 px-4">
            Discover our luxury collection and find your perfect match
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/products" className="w-full sm:w-auto">
              <Button size="lg" variant="luxury" className="w-full sm:w-auto">
                View Collection
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
              href="https://lumarostudios.com"
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
    </>
  );
};

export default About;