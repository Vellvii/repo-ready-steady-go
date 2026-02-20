import { Link } from "react-router-dom";
import { Heart, Shield, Star, Award, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
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
      <div className="min-h-screen bg-surface-dark-rich">
        <ScrollHeader />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-montserrat text-xs tracking-widest uppercase mb-8">
                Our Story
              </span>
              
              <div className="mb-8">
                <img 
                  src="/uploads/Vellvii-full-logo-transparent.png" 
                  alt="Vellvii luxury sexual wellness brand logo" 
                  className="h-20 sm:h-28 md:h-36 mx-auto"
                />
              </div>
              
              <h1 className="sr-only">Luxury Sexual Wellness Brand - Vellvii</h1>
              
              <p className="text-xl sm:text-2xl font-baskerville italic gradient-text mb-6">
                The art of "O"
              </p>
              
              <p className="text-light-secondary font-montserrat text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Where sophistication meets intimacy. We craft experiences that elevate 
                your most personal moments with uncompromising luxury.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl sm:text-4xl font-baskerville font-bold text-light-primary">
                  Premium Pleasure Design Philosophy
                </h2>
                <p className="text-light-secondary font-montserrat leading-relaxed">
                  At Vellvii, we believe that intimacy deserves the finest craftsmanship. 
                  Our collection represents the perfect fusion of sophisticated design, 
                  cutting-edge technology, and uncompromising quality.
                </p>
                <p className="text-light-secondary font-montserrat leading-relaxed">
                  Every product is thoughtfully designed to enhance your most personal moments, 
                  bringing elegance and innovation to the art of intimate connection.
                </p>
                
                <div className="pt-4">
                  <Link 
                    to="/shop"
                    className="inline-flex items-center gap-2 btn-premium px-6 py-3 rounded-full text-sm font-montserrat tracking-wide"
                  >
                    <Sparkles className="w-4 h-4" />
                    Explore Collection
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card-dark p-8 rounded-2xl"
              >
                <h3 className="text-xl sm:text-2xl font-baskerville font-semibold text-light-primary mb-8">
                  Our Values
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-light-primary mb-1">Premium Materials</h4>
                      <p className="text-light-muted text-sm font-montserrat">Body-safe, medical-grade materials crafted for lasting pleasure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Star className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-light-primary mb-1">Innovative Technology</h4>
                      <p className="text-light-muted text-sm font-montserrat">Cutting-edge features that redefine intimate experiences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-light-primary mb-1">Discreet & Elegant</h4>
                      <p className="text-light-muted text-sm font-montserrat">Sophisticated packaging and private delivery worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-light-primary mb-1">Exceptional Care</h4>
                      <p className="text-light-muted text-sm font-montserrat">Dedicated concierge support for a personalized experience</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Concierges Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-montserrat text-xs tracking-widest uppercase text-light-muted">
                  Personal Guidance
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-baskerville font-bold text-light-primary mb-4">
                Meet Our Concierges
              </h2>
              <p className="text-light-secondary font-montserrat max-w-2xl mx-auto">
                Our AI concierges provide personalized guidance and recommendations tailored to your preferences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="card-dark p-8 rounded-2xl text-center"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-baskerville font-bold text-white">L</span>
                </div>
                <h3 className="text-2xl font-baskerville font-semibold text-light-primary mb-4">Luke</h3>
                <p className="text-light-secondary font-montserrat text-sm leading-relaxed">
                  Luke offers sophisticated, technical guidance with expert knowledge of our products. 
                  He provides detailed specifications and professional recommendations for discerning customers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="card-dark p-8 rounded-2xl text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6">
                  <img 
                    src="/uploads/0f6e82dd-0d32-4119-a2a1-e5a0386ffec4.png" 
                    alt="Vivian" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-baskerville font-semibold text-light-primary mb-4">Vivian</h3>
                <p className="text-light-secondary font-montserrat text-sm leading-relaxed">
                  Vivian provides warm, intuitive guidance focused on comfort and personal experience. 
                  She helps customers feel confident and supported in their intimate journey.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-4">
              Ready to Explore?
            </h2>
            <p className="text-light-secondary font-montserrat mb-8">
              Discover our luxury collection and find your perfect match
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop"
                className="btn-premium px-8 py-3 rounded-full text-sm font-montserrat tracking-wide text-center"
              >
                View Collection
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-3 rounded-full border border-white/20 text-light-secondary hover:text-light-primary hover:border-white/40 transition-all duration-300 text-sm font-montserrat tracking-wide text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default About;