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
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxContainer } from "@/components/animations/ParallaxContainer";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
const Home = () => {
  const [concierge, setConcierge] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    items: cartItems
  } = useCart();
  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
  }, []);
  const getGreeting = () => {
    if (!concierge) return "Welcome to Vellvii";
    return concierge === "luke" ? "Good day. Luke here, ready to assist you with our luxury collection." : "Hello! Vivian here, excited to help you discover your perfect match.";
  };
  const getConciergeStyle = () => {
    return concierge === "luke" ? "text-primary font-semibold" : "text-secondary font-semibold";
  };
  const {
    scrollY
  } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  return <div className="min-h-screen relative overflow-hidden">
      {/* Animated background mesh */}
      <motion.div className="fixed inset-0 mesh-bg opacity-30" style={{
      y: backgroundY
    }} />
      <div className="absolute inset-0 bg-gradient-apple" />
      
      {/* Navigation */}
      <motion.nav className="relative z-50 flex justify-between items-center p-4 sm:p-6 backdrop-blur-md bg-black/20" initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}>
        <motion.div className="flex items-center gap-2" whileHover={{
        scale: 1.05
      }} transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}>
          <img src="/lovable-uploads/fd8fd5ce-f65c-4c0c-b093-af821cbd5a34.png" alt="Vellvii" className="h-8" />
        </motion.div>
        <div className="flex items-center gap-2 sm:gap-4">
          <MagneticButton onClick={() => setIsCartOpen(true)} className="text-white hover:bg-white/10 px-2 sm:px-3 py-2 rounded-md transition-all duration-300">
            <ShoppingCart className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Cart ({cartItems.length})</span>
            <span className="sm:hidden">({cartItems.length})</span>
          </MagneticButton>
          <UserMenu />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <ParallaxContainer offset={30} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        </ParallaxContainer>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <ScrollReveal delay={0.2}>
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm apple-hover">
              Luxury Intimacy Collection
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <motion.div className="mb-8" whileHover={{
            scale: 1.05,
            rotate: 1
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}>
              <img alt="Vellvii" className="h-45 md:h-36 mx-auto" src="/lovable-uploads/e59f6ada-c5b2-400f-96a1-affd0aa70f18.png" />
            </motion.div>
          </ScrollReveal>

          {concierge && <ScrollReveal delay={0.6}>
              <motion.div className="glass-luxury p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 max-w-2xl mx-auto apple-hover" whileHover={{
            scale: 1.02
          }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}>
                <AnimatedText text={getGreeting()} className={`text-base sm:text-lg font-inter ${getConciergeStyle()}`} delay={0.8} />
              </motion.div>
            </ScrollReveal>}

          <ScrollReveal delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link to="/products" className="w-full sm:w-auto">
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-md text-lg font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
                  Explore Collection
                </div>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <div className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-md text-lg font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
                  Learn More
                </div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <AnimatedText text="Our Luxury Collection" className="text-4xl font-playfair font-bold text-foreground mb-4" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each piece in our collection is meticulously crafted to deliver 
                unparalleled quality and sophisticated pleasure.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <ScrollReveal delay={0.2} direction="up">
              <Link to="/pulse">
                <motion.div whileHover={{
                scale: 1.05,
                y: -10
              }} transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}>
                  <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group">
                    <motion.div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4" whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.6
                  }}>
                      <Heart className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-playfair font-semibold text-white mb-2">Pulse</h3>
                    <p className="text-white/80 text-xs sm:text-sm">Rhythmic Excellence</p>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="up">
              <Link to="/vibe">
                <motion.div whileHover={{
                scale: 1.05,
                y: -10
              }} transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}>
                  <Card className="glass-luxury apple-hover p-6 text-center group">
                    <motion.div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4" whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.6
                  }}>
                      <Star className="w-8 h-8 text-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-playfair font-semibold text-white mb-2">Vibe</h3>
                    <p className="text-white/80 text-sm">Versatile Luxury</p>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.6} direction="up">
              <Link to="/g-vibe">
                <motion.div whileHover={{
                scale: 1.05,
                y: -10
              }} transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}>
                  <Card className="glass-luxury apple-hover p-6 text-center group">
                    <motion.div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4" whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.6
                  }}>
                      <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-playfair font-semibold text-white mb-2">G-Vibe</h3>
                    <p className="text-white/80 text-sm">Precision Design</p>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.8} direction="up">
              <Link to="/dox">
                <motion.div whileHover={{
                scale: 1.05,
                y: -10
              }} transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}>
                  <Card className="glass-luxury apple-hover p-6 text-center group">
                    <motion.div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4" whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.6
                  }}>
                      <Shield className="w-8 h-8 text-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-playfair font-semibold text-white mb-2">DOX</h3>
                    <p className="text-white/80 text-sm">Luxury Storage</p>
                  </Card>
                </motion.div>
              </Link>
            </ScrollReveal>
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
                <AnimatedText text="Redefining Intimate Luxury" className="text-4xl font-playfair font-bold text-foreground mb-6" />
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
                    <div className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
                      Discover Our Story
                    </div>
                  </Link>
                  <Link to="/products" className="w-full sm:w-auto">
                    <div className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold w-full sm:w-auto text-center cursor-pointer transition-all duration-300 hover:scale-105">
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
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Business Partnership</Badge>
              <AnimatedText text="Retail Partners Wanted" className="text-4xl font-playfair font-bold text-foreground mb-4" />
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
                <MagneticButton as="div" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-md text-lg font-semibold cursor-pointer transition-colors duration-300">
                  Become a Partner
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 border-t border-white/10">
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
                    <MagneticButton as="div" className="border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
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
                    <MagneticButton as="div" className="border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
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
                  <MagneticButton as="div" className="border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300">
                    View Details
                  </MagneticButton>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Creative Credit Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-white/60 font-inter">
            Designed with passion and brought to life with ✨ by{" "}
            <a href="https://www.lumarostudios.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300 font-medium hover:underline">
              Lumaro Studios
            </a>
            {" "}— where luxury meets technology
          </p>
        </div>
      </footer>
      
      {/* Cart Modal */}
      {isCartOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full max-h-[80vh] bg-black/80 rounded-lg">
            <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)} className="absolute top-4 right-4 text-white hover:bg-white/10 z-10">
              ✕
            </Button>
            <Cart />
          </div>
        </div>}

      {/* Concierge Chat */}
      <ConciergeChat />
    </div>;
};
export default Home;