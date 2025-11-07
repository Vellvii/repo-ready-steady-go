import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import doxClosedExterior from "@/assets/dox-closed-exterior.png";
type MediaItem = {
  image?: string;
  video?: string;
  label: string;
  description: string;
};
type Subcategory = {
  title: string;
  description: string;
  thumbnails: string[];
};
const showcaseFeatures = [{
  number: 1,
  title: "Luxury Storage",
  subtitle: "Stores Beautifully",
  images: [{
    image: doxClosedExterior,
    label: "DOX CLOSED - Faux Leather Exterior",
    description: "High-quality waterproof faux leather with rose-gold trims"
  }, {
    video: "/uploads/dox-open-animation.mp4",
    label: "DOX OPEN - A Sanctuary Within",
    description: "Soft velvet interior with removable compartment tray"
  }],
  subcategories: [{
    title: "Biometric Fingerprint Lock",
    description: "One touch. One owner. Total control of your intimate collection.",
    thumbnails: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }, {
    title: "Intelligent Charging System",
    description: "Seamlessly charges your devices while keeping them beautifully organized.",
    thumbnails: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }, {
    title: "Interchangeable Compartment",
    description: "Customizable storage that adapts to your unique collection.",
    thumbnails: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }]
}, {
  number: 2,
  title: "Intelligent Charging",
  subtitle: "Charges Intelligently",
  images: [{
    label: "DDS - Dildo Docking Station",
    description: "Poured acrylic glass surface, engineered elegance"
  }, {
    label: "WIRELESS CHARGING - Effortless Power",
    description: "Simply place and charge"
  }]
}, {
  number: 3,
  title: "Enhanced Experience",
  subtitle: "Enhances Intimately",
  images: [{
    label: "FINGERPRINT LOCK - Biometric Security",
    description: "One touch. One owner. Total control."
  }, {
    label: "LIFESTYLE - Pleasure, Elevated",
    description: "Designed to look, feel, and function like luxury"
  }]
}];
const FeatureCarousel = ({
  feature,
  index
}: {
  feature: typeof showcaseFeatures[0] & {
    subcategories?: Subcategory[];
  };
  index: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % feature.images.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + feature.images.length) % feature.images.length);
  };
  return <ScrollReveal delay={0.2 * index}>
      <div className="mb-24">
        {/* Number Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/40 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary font-playfair">#{feature.number}</span>
          </div>
        </div>

        {/* Feature Title */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-playfair mb-2">
            {feature.title}
          </h3>
          <p className="text-lg text-white/60">
            {feature.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark shadow-luxury">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
            
            {/* Image/Video Display */}
            <div className="relative w-full h-full transition-opacity duration-500">
              {'image' in feature.images[currentIndex] && feature.images[currentIndex].image ? <img src={feature.images[currentIndex].image!} alt={feature.images[currentIndex].label} className="w-full h-full object-cover scale-120" /> : 'video' in feature.images[currentIndex] && feature.images[currentIndex].video ? <video src={feature.images[currentIndex].video!} autoPlay loop muted playsInline className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center h-full p-8">
                  <p className="text-white/60 text-base font-medium text-center mb-2">
                    {feature.images[currentIndex].label}
                  </p>
                  <p className="text-white/40 text-sm text-center">
                    {feature.images[currentIndex].description}
                    <br />
                    <span className="text-xs">(4:3 aspect ratio)</span>
                  </p>
                </div>}
            </div>

            {/* Navigation Buttons */}
            {feature.images.length > 1 && <>
                <Button onClick={prevSlide} variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
                <Button onClick={nextSlide} variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>

                {/* Dot Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {feature.images.map((_, imgIndex) => <button key={imgIndex} onClick={() => setCurrentIndex(imgIndex)} className={`w-2 h-2 rounded-full transition-all duration-300 ${imgIndex === currentIndex ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"}`} aria-label={`Go to slide ${imgIndex + 1}`} />)}
                </div>
              </>}
          </div>
        </div>

        {/* Subcategories */}
        {feature.subcategories && feature.subcategories.length > 0 && <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {feature.subcategories.map((sub, subIndex) => <ScrollReveal key={sub.title} delay={0.1 * subIndex} direction="up">
                <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <h4 className="text-lg font-semibold font-playfair text-zinc-900">
                      {sub.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {sub.description}
                    </p>
                    
                    {/* Thumbnails */}
                    <div className="flex gap-2 justify-center mt-4">
                      {sub.thumbnails.map((thumb, thumbIndex) => (
                        <button
                          key={thumbIndex}
                          onClick={() => {
                            setLightboxImage(thumb);
                            setLightboxOpen(true);
                          }}
                          className="w-20 h-20 rounded-lg overflow-hidden border border-white/20 hover:border-primary/50 transition-all hover:scale-105"
                        >
                          <img
                            src={thumb}
                            alt={`${sub.title} thumbnail ${thumbIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>)}
          </div>}

        {/* Lightbox Dialog */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl bg-black/90 border-white/20">
            <img
              src={lightboxImage}
              alt="Lightbox view"
              className="w-full h-auto rounded-lg"
            />
          </DialogContent>
        </Dialog>
      </div>
    </ScrollReveal>;
};
export const ProductShowcase = () => {
  return <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-playfair">
            3-in-1 Innovation
          </h2>
          <p className="text-lg text-white/60 text-center max-w-3xl mx-auto mb-16">
            A discreet innovation that stores beautifully, charges intelligently, and enhances intimately
          </p>
        </ScrollReveal>

        {/* Three Feature Carousels */}
        {showcaseFeatures.map((feature, index) => <FeatureCarousel key={feature.number} feature={feature} index={index} />)}
      </div>
    </section>;
};