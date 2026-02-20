import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Store, Users, MessageCircle, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Vellvii | Luxury Brand Support"
        description="Contact Vellvii luxury brand for product inquiries, premium customer service, and partnership opportunities. Speak to our dedicated support team."
        canonical="/contact"
      />
      <div className="min-h-screen surface-dark-rich">
        {/* Navigation Header */}
        <ScrollHeader />

        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-montserrat text-xs uppercase tracking-[0.3em] mb-4"
            >
              Get in Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-baskerville font-bold text-light-primary mb-6"
            >
              Contact <span className="gradient-text">Vellvii</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-light-secondary font-montserrat text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Premium customer service for luxury wellness inquiries and partnership opportunities
            </motion.p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Customer Support */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-5">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-3">
                    Customer Support
                  </h2>
                  <p className="text-light-secondary font-montserrat text-sm sm:text-base">
                    For product questions, orders, and general inquiries
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-baskerville font-semibold text-light-primary">Email Support</h3>
                        <p className="text-light-muted font-montserrat text-sm">Response within 24 hours</p>
                      </div>
                    </div>
                    <p className="text-light-secondary font-montserrat text-sm mb-4">
                      Get personalized assistance with your Vellvii experience
                    </p>
                    <a href="mailto:hello@vellvii.com" className="block">
                      <Button className="w-full btn-premium h-11">
                        hello@vellvii.com
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>

                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-baskerville font-semibold text-light-primary">Phone Support</h3>
                        <p className="text-light-muted font-montserrat text-sm">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </div>
                    <p className="text-light-secondary font-montserrat text-sm mb-4">
                      Speak directly with our luxury specialists
                    </p>
                    <a href="tel:+15551234567" className="block">
                      <Button variant="outline" className="w-full h-11 border-white/20 text-light-primary hover:bg-white/10 hover:border-primary/50 font-montserrat">
                        +1 (555) 123-4567
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>

                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-baskerville font-semibold text-light-primary">Live Chat</h3>
                        <p className="text-light-muted font-montserrat text-sm">Available 24/7</p>
                      </div>
                    </div>
                    <p className="text-light-secondary font-montserrat text-sm mb-4">
                      Chat with our AI concierge for instant assistance
                    </p>
                    <Button variant="outline" className="w-full h-11 border-white/20 text-light-primary hover:bg-white/10 hover:border-primary/50 font-montserrat">
                      Start Chat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Business Partners */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-5">
                    <Store className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-3">
                    Business Partners
                  </h2>
                  <p className="text-light-secondary font-montserrat text-sm sm:text-base">
                    For retailers, distributors, and wholesale inquiries
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-baskerville font-semibold text-light-primary">Retail Partnership</h3>
                        <p className="text-light-muted font-montserrat text-sm">Join our network</p>
                      </div>
                    </div>
                    <p className="text-light-secondary font-montserrat text-sm mb-4">
                      Stock Vellvii products in your store and join our luxury retail network
                    </p>
                    <a href="mailto:partners@vellvii.com" className="block">
                      <Button className="w-full btn-premium h-11">
                        partners@vellvii.com
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>

                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-baskerville font-semibold text-light-primary mb-4">Partnership Benefits</h4>
                    <ul className="space-y-3 text-light-secondary font-montserrat text-sm">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Exclusive wholesale pricing
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Marketing support materials
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Staff training programs
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Priority product access
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Dedicated partner support
                      </li>
                    </ul>
                  </div>

                  <div className="card-dark p-5 sm:p-6 rounded-xl border border-white/10">
                    <h4 className="text-lg font-baskerville font-semibold text-light-primary mb-4">Requirements</h4>
                    <ul className="space-y-3 text-light-secondary font-montserrat text-sm">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Established retail presence
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Premium product focus
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Professional presentation
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        Commitment to brand values
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-4">
                Our Location
              </h2>
              <div className="space-y-2 mb-4">
                <p className="text-lg font-baskerville text-primary">
                  1309 Coffeen Avenue
                </p>
                <p className="text-light-secondary font-montserrat text-sm sm:text-base">
                  Sheridan, Wyoming 82801
                </p>
              </div>
              <p className="text-light-secondary font-montserrat text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                We currently operate online to serve customers worldwide with discretion and privacy. Brick and mortar store coming soon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-light-secondary font-montserrat text-sm sm:text-base mb-8 max-w-lg mx-auto">
              Explore our collection or reach out for personalized assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="btn-premium px-8 h-12 text-base font-montserrat">
                  Shop Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 h-12 text-base font-montserrat border-white/20 text-light-primary hover:bg-white/10 hover:border-primary/50"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default Contact;
