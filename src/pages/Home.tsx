import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
  Store,
  Package,
  Dock,
  Armchair,
} from "lucide-react";
import ConciergeChat from "@/components/ConciergeChat";
import UserMenu from "@/components/UserMenu";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxContainer } from "@/components/animations/ParallaxContainer";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ImageSlider } from "@/components/ImageSlider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductCard } from "@/components/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { N8nService } from "@/services/n8nService";
const Home = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("Welcome to Vellvii");
  const [doxOpen, setDoxOpen] = useState(false);

  useEffect(() => {
    let selectedConcierge = localStorage.getItem("selectedConcierge");
    
    // Set Vivian as default if no concierge selected
    if (!selectedConcierge) {
      selectedConcierge = "vivian";
      localStorage.setItem("selectedConcierge", "vivian");
    }
    
    setConcierge(selectedConcierge);
    
    if (selectedConcierge === "vivian") {
      N8nService.getGreeting(window.location.pathname).then(response => {
        setGreeting(response);
      }).catch(() => {
        setGreeting("Hello! Vivian here, excited to help you discover your perfect match.");
      });
    }
  }, []);

  useEffect(() => {
    if (doxOpen) {
      window.history.pushState(null, "");
      const handlePop = () => setDoxOpen(false);
      window.addEventListener("popstate", handlePop);
      return () => {
        window.removeEventListener("popstate", handlePop);
      };
    }
  }, [doxOpen]);
  
  const getConciergeStyle = () => {
    return "text-secondary font-semibold";
  };
  const {
    scrollY
  } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  return <div className="min-h-screen relative overflow-hidden">
      {/* Animated background mesh */}
      <motion.div className="fixed inset-0 mesh-bg opacity-30 pointer-events-none" style={{
      y: backgroundY
    }} />
      


      {/* Products Preview */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <AnimatedText
                text="Vellvii Dox"
                className="section-title justify-center text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4"
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our Flagship Solution
              </p>
            </div>
          </ScrollReveal>

          {/* Old grid layout replaced by new featured section */}
          {/**
           * <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"> ... </div>
           */}

          <div className="flex flex-col gap-10 items-center">
            <ScrollReveal delay={0.2} direction="up">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-luxury apple-hover p-5 sm:p-8 md:p-10 rounded-lg text-center w-full max-w-3xl"
              >
                <ImageSlider
                  images={["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg", "/uploads/Dox4.jpg", "/uploads/Dox5.jpg"]}
                  name="DOX"
                  className="w-full h-48 sm:h-56 rounded-lg mb-6"
                />
                <Dialog open={doxOpen} onOpenChange={(open) => {
                  setDoxOpen(open);
                  if (!open) {
                  window.history.back();
                  }
                }}>
                  <DialogTrigger asChild>
                    <MagneticButton
                      as="div"
                      className={cn(buttonVariants({ variant: "luxury" }), "cursor-pointer")}
                    >
                      About the Dox
                    </MagneticButton>
                  </DialogTrigger>
                  <DialogContent className="text-left max-h-[90vh] h-[90vh] flex flex-col justify-center">
                    <DialogHeader className="text-center">
                      <DialogTitle className="text-lg sm:text-xl md:text-2xl font-playfair font-bold leading-snug">
                        <span>One Form.</span>
                        <br />
                        <span>Three Functions.</span>
                        <br />
                        <span>Infinite Satisfaction.</span>
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Learn more about the Vellvii Dox luxury storage solution - one form, three functions, infinite satisfaction.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed px-2">
                      <p>
                        The Vellvii Dox isn’t just an innovation—it’s a revolution in intimacy and elegance.
                      </p>
                      <p>
                        With an award-winning design that fuses luxury aesthetics with genius engineering, the Dox doesn’t merely store, secure, or support—it transforms. There is nothing like it on the market because nothing has ever dared to be this bold, this beautiful, or this versatile.
                      </p>
                      <p>
                        It is the solution people never knew they needed—until now. Once experienced, it becomes essential, irreplaceable… a must-have.
                      </p>
                      <p>
                        The Dox doesn’t just meet expectations—it sets the benchmark for what intimate lifestyle design should be. Today it’s rare. Tomorrow, everyone will own one.
                      </p>
                      <p>
                        The Vellvii Dox. Not just a product.<br />It's a statement.<br />An experience.<br />A revolution.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-playfair font-bold mt-6 mb-4 px-4">
                One Form, Three Functions, All Pleasure
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
              <ScrollReveal delay={0.35} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group">
                    <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
                      <Package className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-white">Luxury Storage</h3>
                    <p className="text-sm text-white/80 mb-2">Where elegance meets erotic intelligence</p>
                    <Link to="/luxury-storage">
                      <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
                    </Link>
                  </Card>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.45} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group">
                    <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
                      <Dock className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-white">The Docking Station</h3>
                    <p className="text-sm text-white/80 mb-2">Mount. Rise. Release.</p>
                    <Link to="/docking-station">
                      <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
                    </Link>
                  </Card>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.55} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group">
                    <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
                      <Armchair className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold text-white">The Sex Saddle</h3>
                    <p className="text-sm text-white/80 mb-2">Sculptured for the art of the "O"</p>
                    <Link to="/sex-saddle">
                      <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
                    </Link>
                  </Card>
                </motion.div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.6}>
              <div className="text-center mt-10 mb-4 px-4">
                <AnimatedText text="Our Pleasure Collection" className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-foreground" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
              <ScrollReveal delay={0.7} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <ProductCard
                    name="Pulse"
                    link="/pulse"
                    images={["/uploads/Pulse1.jpg", "/uploads/Pulse2.jpg"]}
                  />
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.8} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <ProductCard
                    name="Vibe"
                    link="/vibe"
                    images={["/uploads/Vibe1.jpg", "/uploads/Vibe2.jpg"]}
                  />
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.9} direction="up">
                <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <ProductCard
                    name="G-Vibe"
                    link="/g-vibe"
                    images={["/uploads/G-Vibe1.jpg", "/uploads/G-Vibe2.jpg", "/uploads/G-Vibe3.jpg"]}
                  />
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <ScrollReveal delay={0.2} direction="left">
              <div>
                <Badge variant="outline" className="mb-4">About Vellvii</Badge>
                <AnimatedText text="Redefining Intimate Luxury" className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6" />
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  At Vellvii, we believe that intimacy deserves the finest craftsmanship. 
                  Our collection represents the perfect fusion of sophisticated design, 
                  cutting-edge technology, and uncompromising quality.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Every product is thoughtfully designed to enhance your most personal moments, 
                  bringing elegance and innovation to the art of intimate connection.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/about" className="w-full sm:w-auto">
                    <div className="relative z-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
                      Discover Our Story
                    </div>
                  </Link>
                  <Link to="/products" className="w-full sm:w-auto">
                    <div className="relative z-10 border border-white/20 bg-card/90 text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
                      View Collection
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4} direction="right">
              <motion.div className="glass-luxury apple-hover p-4 sm:p-6 md:p-8 rounded-lg" whileHover={{
              scale: 1.02
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <h3 className="text-2xl font-playfair font-semibold text-white mb-6">
                  Our Commitment
                </h3>
                <div className="space-y-4">
                  <motion.div className="flex items-center gap-3" whileHover={{
                  x: 10
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-white/90">Premium, body-safe materials</p>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{
                  x: 10
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <p className="text-white/90">Innovative technology integration</p>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{
                  x: 10
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-white/90">Discreet, elegant packaging</p>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{
                  x: 10
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-white/90">Exceptional customer care</p>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partner Marketing Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Business Partnership</Badge>
              <AnimatedText text="Retail Partners Wanted" className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Own a sex shop or intimate wellness store? Join our exclusive retail network and offer 
                your customers the finest in luxury intimacy products.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <ScrollReveal delay={0.3} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center">
                  <motion.div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4" whileHover={{
                  rotate: 360
                }} transition={{
                  duration: 0.6
                }}>
                    <Store className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Exclusive Products</h3>
                  <p className="text-white/80 text-sm">Be among the first to stock Vellvii's luxury collection</p>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.5} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-6 text-center">
                  <motion.div className="w-12 h-12 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4" whileHover={{
                  rotate: 360
                }} transition={{
                  duration: 0.6
                }}>
                    <Star className="w-6 h-6 text-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Premium Support</h3>
                  <p className="text-white/80 text-sm">Marketing materials, training, and dedicated support</p>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.7} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-6 text-center">
                  <motion.div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4" whileHover={{
                  rotate: 360
                }} transition={{
                  duration: 0.6
                }}>
                    <Heart className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Attractive Margins</h3>
                  <p className="text-white/80 text-sm">Competitive wholesale pricing for luxury products</p>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.9}>
            <div className="text-center mt-8">
              <Link to="/contact#partners">
                <MagneticButton as="div" className="relative z-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-md text-lg font-semibold cursor-pointer transition-colors duration-300">
                  Become a Partner
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <AnimatedText text="Connect With Us" className="text-4xl font-playfair font-bold text-foreground mb-4" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions about our collection? Our team is here to provide 
                personalized assistance and expert guidance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <ScrollReveal delay={0.3} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-4 sm:p-6 md:p-8 text-center">
                  <motion.div whileHover={{
                  scale: 1.1,
                  rotate: 5
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Phone
                  </h3>
                  <p className="text-white/80 mb-4">Speak with our luxury specialists</p>
                  <a href="tel:+15551234567">
                    <MagneticButton as="div" className="relative z-10 border border-white/20 bg-card/90 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
                      +1 (555) 123-4567
                    </MagneticButton>
                  </a>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.5} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-8 text-center">
                  <motion.div whileHover={{
                  scale: 1.1,
                  rotate: -5
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <Mail className="w-12 h-12 text-secondary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Email
                  </h3>
                  <p className="text-white/80 mb-4">Get personalized recommendations</p>
                  <a href="mailto:info@vellvii.com">
                    <MagneticButton as="div" className="relative z-10 border border-white/20 bg-card/90 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
                      info@vellvii.com
                    </MagneticButton>
                  </a>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.7} direction="up">
              <motion.div whileHover={{
              scale: 1.05,
              y: -10
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>
                <Card className="glass-luxury apple-hover p-8 text-center">
                  <motion.div whileHover={{
                  scale: 1.1,
                  rotate: 5
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}>
                    <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Location
                  </h3>
                  <p className="text-white/80 mb-4">Delaware, USA</p>
                  <MagneticButton as="div" className="relative z-10 border border-white/20 bg-card/90 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
                    View Details
                  </MagneticButton>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Milestones strip */}
      <Milestones />

      {/* FAQ */}
      <HomeFAQ />

      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Designed with passion and brought to life with ✨ by{" "}
            <a href="https://lumarostudios.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300 font-medium hover:underline">
              Lumaro Studios
            </a>
            {" "}— where luxury meets technology
          </p>
        </div>
      </footer>
      
      {/* Concierge Chat */}
      <ConciergeChat />
    </div>;
};
export default Home;