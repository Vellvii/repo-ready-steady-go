import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
type MediaItem = {
  image?: string;
  video?: string;
  label: string;
  description: string;
};

type FeatureItem = {
  number: number;
  title: string;
  subtitle: string;
  tagline?: string;
  images: MediaItem[];
  subcategories?: Subcategory[];
};
type Subcategory = {
  title: string;
  description: string;
  thumbnails: string[];
};
const showcaseFeatures = [
  {
    number: 1,
    title: "Luxury Storage",
    subtitle: "Stores Beautifully",
    images: [
      {
        image: "/uploads/Dox_white_open_plugged_in_content2.png",
        label: "DOX IN USE - Organized Storage",
        description: "Customizable compartments for your collection",
      },
      {
        image: "/uploads/dox_with_toys_2.jpg",
        label: "DOX LIFESTYLE - Elegant Display",
        description: "Fits seamlessly into any room",
      },
      {
        image: "/uploads/dox_with_toys_1.jpg",
        label: "DOX BLACK - Premium Finish",
        description: "Sleek design with rose-gold accents",
      },
    ],
    subcategories: [
      {
        title: "Biometric Fingerprint Lock",
        description: "One touch. One owner. Total control of your intimate collection.",
        thumbnails: [
          "/uploads/fingerprint-video.webm",
          "/uploads/RedLockClose.png",
          "/uploads/Dox_fp_lock_video2.webm",
        ],
      },
      {
        title: "Intelligent Charging System",
        description: "Seamlessly charges your devices while keeping them beautifully organized.",
        thumbnails: [
          "/uploads/Red_Dox_charge_inside.png",
          "/uploads/Vellvii_description_sketches_open_ls.png",
          "/uploads/White_charge_outside.png",
        ],
      },
      {
        title: "Interchangeable Compartment",
        description: "Customizable storage that adapts to your unique collection.",
        thumbnails: [
          "/uploads/RedOpen1.png",
          "/uploads/BlackOpen2.png",
          "/uploads/Vellvii_description_sketches_open_ls-2.png",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Flagship Introduction - Conscious Innovation",
    subtitle: "The most innovative solution of the century.",
    tagline: "DDS - Dildo Docking Station",
    images: [
      {
        image: "/uploads/BeigeDDSPieces.png",
        label: "DDS - Modular Design",
        description: "Poured acrylic glass surface, engineered elegance",
      },
      {
        image: "/uploads/Black-Dildo-Close.png",
        label: "DDS - Premium Finish",
        description: "Rose-gold accents with textured surface",
      },
      {
        image: "/uploads/Red-Dildo.png",
        label: "DDS - Wireless Charging",
        description: "Simply place and charge",
      },
    ],
  },
  {
    number: 3,
    title: "Enhanced Experience",
    subtitle: "Enhances Intimately",
    images: [
      {
        label: "FINGERPRINT LOCK - Biometric Security",
        description: "One touch. One owner. Total control.",
      },
      {
        label: "LIFESTYLE - Pleasure, Elevated",
        description: "Designed to look, feel, and function like luxury",
      },
    ],
  },
];
const FeatureCarousel = ({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  // Auto-play carousel every 3 seconds
  useEffect(() => {
    if (feature.images.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % feature.images.length);
          setIsTransitioning(false);
        }, 300);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [feature.images.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % feature.images.length);
      setIsTransitioning(false);
    }, 300);
  };
  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + feature.images.length) % feature.images.length);
      setIsTransitioning(false);
    }, 300);
  };
  return (
    <ScrollReveal delay={0.2 * index}>
      <div className="mb-24">
        {/* Number Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/40 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary font-playfair">#{feature.number}</span>
          </div>
        </div>

        {/* Feature Title */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-playfair mb-2">{feature.title}</h3>
          <p className="text-lg text-white/60">{feature.subtitle}</p>
          {feature.tagline && (
            <p className="text-xl text-white/80 font-semibold mt-2">{feature.tagline}</p>
          )}
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark shadow-luxury">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />

            {/* Image/Video Display */}
            <div
              className={`relative w-full h-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              {"image" in feature.images[currentIndex] && feature.images[currentIndex].image ? (
                <img
                  src={String(feature.images[currentIndex].image)}
                  alt={feature.images[currentIndex].label}
                  className="w-full h-full object-cover scale-120"
                />
              ) : "video" in feature.images[currentIndex] && feature.images[currentIndex].video ? (
                <video
                  src={String(feature.images[currentIndex].video)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <p className="text-white/60 text-base font-medium text-center mb-2">
                    {feature.images[currentIndex].label}
                  </p>
                  <p className="text-white/40 text-sm text-center">
                    {feature.images[currentIndex].description}
                    <br />
                    <span className="text-xs">(4:3 aspect ratio)</span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {feature.images.length > 1 && (
              <>
                <Button
                  onClick={prevSlide}
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
                <Button
                  onClick={nextSlide}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>

                {/* Dot Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {feature.images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => setCurrentIndex(imgIndex)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${imgIndex === currentIndex ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"}`}
                      aria-label={`Go to slide ${imgIndex + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {feature.subcategories && feature.subcategories.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {feature.subcategories.map((sub, subIndex) => (
              <ScrollReveal key={sub.title} delay={0.1 * subIndex} direction="up">
                <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full">
                  <CardContent className="p-6 text-center space-y-3">
                    <h4 className="text-lg font-semibold font-playfair text-zinc-900">{sub.title}</h4>
                    <p className="text-sm leading-relaxed text-neutral-600">{sub.description}</p>

                    {/* Thumbnails */}
                    <div className="flex gap-2 justify-center mt-4">
                      {sub.thumbnails.map((thumb, thumbIndex) => {
                        const isVideo = thumb.endsWith(".mp4") || thumb.endsWith(".webm");
                        return (
                          <button
                            key={thumbIndex}
                            onClick={() => {
                              setLightboxImage(thumb);
                              setLightboxOpen(true);
                            }}
                            className="w-20 h-20 rounded-lg overflow-hidden border border-white/20 hover:border-primary/50 transition-all hover:scale-105"
                          >
                            {isVideo ? (
                              <video src={thumb} muted loop playsInline className="w-full h-full object-cover" />
                            ) : (
                              <img
                                src={thumb}
                                alt={`${sub.title} thumbnail ${thumbIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl bg-black/90 border-white/20">
            {lightboxImage.endsWith(".mp4") || lightboxImage.endsWith(".webm") ? (
              <video src={lightboxImage} autoPlay loop muted playsInline className="w-full h-auto rounded-lg" />
            ) : (
              <img src={lightboxImage} alt="Lightbox view" className="w-full h-auto rounded-lg" />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ScrollReveal>
  );
};
export const ProductShowcase = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
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
        {showcaseFeatures.map((feature, index) => (
          <FeatureCarousel key={feature.number} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};
