import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
        image: "/uploads/dds-suction-cup-purpose.png",
        label: "DDS - The Purpose",
        description: "Where design meets desire",
      },
      {
        image: "/uploads/Red-Dildo.png",
        label: "DDS - Wireless Charging",
        description: "Simply place and charge",
      },
      {
        image: "/uploads/dds-brand-message.png",
        label: "DDS - Brand Philosophy",
        description: "For those who believe pleasure deserves prestige",
      },
      {
        image: "/uploads/DDS_Autocad_sketch_w_descriptions.png",
        label: "DDS - Engineering Details",
        description: "Precision layers with Vellvii signature rose gold finish",
      },
    ],
  },
  {
    number: 3,
    title: "A Position of Power",
    subtitle: "\"Designed to Hold More than Your Collection...Designed to Hold You\"",
    images: [
      {
        image: "/uploads/PulsePoBCloseBL.png",
        label: "POSITION OF POWER - Wireless Charging",
        description: "Elegant charging on black luxury surface",
      },
      {
        image: "/uploads/RedDoxEvolveFrontRight.png",
        label: "EVOLVE SYSTEM - Complete Collection",
        description: "DOX with integrated charging and storage",
      },
      {
        image: "/uploads/position-of-power-intro.png",
        label: "PHILOSOPHY - Gallery Presence",
        description: "What was once taboo now belongs in a gallery",
      },
      {
        image: "/uploads/RedDoxEvolveFrontRightClose.png",
        label: "CHARGING DETAIL - Rose Gold Precision",
        description: "Close-up of the intelligent charging system",
      },
      {
        image: "/uploads/art-of-o-refinement.png",
        label: "THE ART OF 'O' - Refined Form",
        description: "From fantasy to furniture — welcome to refinement",
      },
    ],
  },
];
const SubcategoryCarousel = ({
  subcategory,
  index,
}: {
  subcategory: Subcategory;
  index: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (subcategory.thumbnails.length > 1 && !isPaused) {
      const currentThumb = subcategory.thumbnails[currentIndex];
      const isVideo = currentThumb.endsWith(".mp4") || currentThumb.endsWith(".webm");
      const delay = isVideo ? 10000 : 6000; // Videos: 10s, Images: 6s
      
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % subcategory.thumbnails.length);
          setIsTransitioning(false);
        }, 300);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [subcategory.thumbnails.length, currentIndex, isPaused]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % subcategory.thumbnails.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + subcategory.thumbnails.length) % subcategory.thumbnails.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentThumb = subcategory.thumbnails[currentIndex];
  const isVideo = currentThumb.endsWith(".mp4") || currentThumb.endsWith(".webm");

  return (
    <ScrollReveal delay={0.1 * index}>
      <div className="mb-16">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-playfair mb-2">{subcategory.title}</h3>
          <p className="text-lg text-white/60">{subcategory.description}</p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark shadow-luxury">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />

            {/* Image/Video Display */}
            <div
              className={`relative w-full h-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              {isVideo ? (
                <video
                  src={currentThumb}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentThumb}
                  alt={`${subcategory.title} ${currentIndex + 1}`}
                  className="w-full h-full object-cover scale-120"
                  onClick={() => {
                    setLightboxImage(currentThumb);
                    setLightboxOpen(true);
                  }}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            {subcategory.thumbnails.length > 1 && (
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

                {/* Play/Pause Button */}
                <Button
                  onClick={() => setIsPaused(!isPaused)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  {isPaused ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <Pause className="w-5 h-5 text-white" />
                  )}
                </Button>

                {/* Dot Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {subcategory.thumbnails.map((_, imgIndex) => (
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
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel - videos: 10s, images: 6s
  useEffect(() => {
    if (feature.images.length > 1 && !isPaused) {
      const scheduleNext = (index: number) => {
        const currentItem = feature.images[index];
        const isVideo = "video" in currentItem && currentItem.video;
        // Videos show for 10 seconds, images for 6 seconds
        const delay = isVideo ? 10000 : 6000;
        
        return setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentIndex((prev) => {
              const next = (prev + 1) % feature.images.length;
              return next;
            });
            setIsTransitioning(false);
          }, 300);
        }, delay);
      };

      const timer = scheduleNext(currentIndex);
      return () => clearTimeout(timer);
    }
  }, [feature.images.length, currentIndex, isPaused]);

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

                {/* Play/Pause Button */}
                <Button
                  onClick={() => setIsPaused(!isPaused)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  {isPaused ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <Pause className="w-5 h-5 text-white" />
                  )}
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

        {/* Subcategories as Vertical Carousels */}
        {feature.subcategories && feature.subcategories.length > 0 && (
          <div className="mt-12 space-y-16">
            {feature.subcategories.map((sub, subIndex) => (
              <SubcategoryCarousel key={sub.title} subcategory={sub} index={subIndex} />
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
