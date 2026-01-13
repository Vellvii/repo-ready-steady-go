import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Store, Users, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "@/components/UserMenu";
import ConciergeChat from "@/components/ConciergeChat";
import { SEO } from "@/components/SEO";

const Contact = () => {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Contact Vellvii | Luxury Brand Support"
        description="Contact Vellvii luxury brand for product inquiries, premium customer service, and partnership opportunities. Speak to our dedicated support team."
        canonical="/contact"
      />
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="p-4 sm:p-6 flex justify-between items-center min-h-[80px]">
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
          <Badge variant="secondary" className="mb-6">Get in Touch</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-6">
            Contact Vellvii Luxury Brand
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
            Premium customer service for luxury adult wellness inquiries and partnership opportunities
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Customer Support */}
            <div>
              <div className="text-center mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4">
                  Customer Support
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground px-4">
                  For product questions, orders, and general inquiries
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <Card className="glass-luxury p-4 sm:p-6 hover-glow">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Email Support</h3>
                  </div>
                  <p className="text-white/80 mb-4 text-sm sm:text-base">
                    Get personalized assistance with your Vellvii experience
                  </p>
                  <a href="mailto:info@vellvii.com">
                    <Button variant="outline" className="w-full">
                      info@vellvii.com
                    </Button>
                  </a>
                </Card>

                <Card className="glass-luxury p-4 sm:p-6 hover-glow">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Phone Support</h3>
                  </div>
                  <p className="text-white/80 mb-4 text-sm sm:text-base">
                    Speak directly with our luxury specialists
                  </p>
                  <a href="tel:+15551234567">
                    <Button variant="outline" className="w-full">
                      +1 (555) 123-4567
                    </Button>
                  </a>
                </Card>

                <Card className="glass-luxury p-4 sm:p-6 hover-glow">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Live Chat</h3>
                  </div>
                  <p className="text-white/80 mb-4 text-sm sm:text-base">
                    Chat with our AI concierges for instant assistance
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </Card>
              </div>
            </div>

            {/* Business Partners */}
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Store className="w-8 h-8 text-foreground" />
                </div>
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                  Business Partners
                </h2>
                <p className="text-lg text-muted-foreground">
                  For retailers, distributors, and wholesale inquiries
                </p>
              </div>

              <div className="space-y-6">
                <Card className="glass-luxury p-6 hover-glow border-secondary/30">
                  <div className="flex items-center gap-4 mb-4">
                    <Store className="w-8 h-8 text-secondary" />
                    <h3 className="text-xl font-semibold text-white">Retail Partnership</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    Stock Vellvii products in your store and join our luxury retail network
                  </p>
                  <a href="mailto:partners@vellvii.com">
                    <Button variant="secondary" className="w-full">
                      partners@vellvii.com
                    </Button>
                  </a>
                </Card>

                <Card className="glass-dark p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Partnership Benefits</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Exclusive wholesale pricing</li>
                    <li>• Marketing support materials</li>
                    <li>• Staff training programs</li>
                    <li>• Priority product access</li>
                    <li>• Dedicated partner support</li>
                  </ul>
                </Card>

                <Card className="glass-dark p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Established retail presence</li>
                    <li>• Premium product focus</li>
                    <li>• Professional presentation</li>
                    <li>• Commitment to brand values</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
              Our Location
            </h2>
          </div>

          <Card className="glass-luxury p-8 text-center">
            <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-semibold text-white mb-4">
              Headquarters
            </h3>
            <p className="text-white/80 text-lg mb-6">
              Delaware, USA
            </p>
            <p className="text-white/70">
              We operate primarily online to serve customers worldwide with discretion and privacy.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our collection or reach out for personalized assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="luxury">
                View Products
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

      {/* Concierge Chat */}
      <ConciergeChat />
    </div>
    </>
  );
};

export default Contact;