import { useState, useEffect, useRef } from "react";
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
        image: "/uploads/dds-suction-cup-purpose.png",
        label: "DDS - The Purpose",
        description: "Where design meets desire",
      },
      {
        image: "/uploads/Black-Dildo-Close-2.png",
        label: "DDS - Close Detail",
        description: "Precision design and elegant finish",
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
        image: "/uploads/BeigeDoxGVibeFrontRightClose.png",
        label: "EVOLVE COLLECTION - Beige Elegance",
        description: "Premium beige finish with rose-gold accents",
      },
      {
        image: "/uploads/RedPinkGVibe2.png",
        label: "EVOLVE COLLECTION - Red Luxury",
        description: "Bold red DOX with integrated charging",
      },
      {
        image: "/uploads/BlackPinkEvolve1.png",
        label: "EVOLVE COLLECTION - Black Sophistication",
        description: "Sleek black design with elegant contrast",
      },
      {
        image: "/uploads/BeigeRedPulseBackSide.png",
        label: "POSITION OF POWER - Pulse Detail",
        description: "Ergonomic design meets wireless charging",
      },
      {
        image: "/uploads/BlackPinkGVibe1.png",
        label: "EVOLVE COLLECTION - Complete System",
        description: "The ultimate luxury storage and charging solution",
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
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const loadedSet = useRef<Set<string>>(new Set());
  const waitRef = useRef<number | null>(null);
  // Lock sources during the 2s crossfade to avoid flicker
  const [tFrom, setTFrom] = useState<string | null>(null);
  const [tTo, setTTo] = useState<string | null>(null);
  const animatingRef = useRef(false);

  const preloadMedia = (url: string) => {
    if (!url || loadedSet.current.has(url)) return;
    const isVid = url.endsWith(".mp4") || url.endsWith(".webm");
    if (isVid) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.src = url;
      const onReady = () => {
        loadedSet.current.add(url);
        video.removeEventListener("canplaythrough", onReady);
      };
      video.addEventListener("canplaythrough", onReady);
      video.load();
    } else {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedSet.current.add(url);
      };
    }
  };
  function startTransition(targetIndex?: number) {
    if (animatingRef.current) return;

    const next = typeof targetIndex === "number"
      ? targetIndex
      : (currentIndex + 1) % subcategory.thumbnails.length;

    const fromUrl = subcategory.thumbnails[currentIndex];
    const toUrl = subcategory.thumbnails[next];
    setTFrom(fromUrl);
    setTTo(toUrl);
    setNextIndex(next);

    animatingRef.current = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
        window.setTimeout(() => {
          setCurrentIndex(next);
          setIsTransitioning(false);
          setTFrom(null);
          setTTo(null);
          animatingRef.current = false;
        }, 2000);
      });
    });
  }
  // Auto-play carousel
  useEffect(() => {
    if (subcategory.thumbnails.length <= 1) return;

    const currentThumb = subcategory.thumbnails[currentIndex];
    const isVideo = currentThumb.endsWith(".mp4") || currentThumb.endsWith(".webm");
    const displayTime = isVideo ? 10000 : 6000;

    const timer = window.setTimeout(() => {
      const next = (currentIndex + 1) % subcategory.thumbnails.length;
      setNextIndex(next);
      const nextThumb = subcategory.thumbnails[next];
      const isNextVideo = nextThumb.endsWith(".mp4") || nextThumb.endsWith(".webm");

      if (nextThumb && !loadedSet.current.has(nextThumb)) {
        preloadMedia(nextThumb);
        const check = () => {
          if (loadedSet.current.has(nextThumb)) {
            startTransition();
          } else {
            waitRef.current = window.setTimeout(check, 100);
          }
        };
        check();
      } else {
        startTransition();
      }
    }, displayTime);

    return () => {
      clearTimeout(timer);
      if (waitRef.current) {
        clearTimeout(waitRef.current);
        waitRef.current = null;
      }
    };
  }, [subcategory.thumbnails.length, currentIndex]);

  const nextSlide = () => {
    const next = (currentIndex + 1) % subcategory.thumbnails.length;
    setNextIndex(next);
    const nextSrc = subcategory.thumbnails[next];
    if (nextSrc && !loadedSet.current.has(nextSrc)) {
      preloadMedia(nextSrc);
      const check = () => {
        if (loadedSet.current.has(nextSrc)) {
          startTransition(next);
        } else {
          waitRef.current = window.setTimeout(check, 100);
        }
      };
      check();
    } else {
      startTransition(next);
    }
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + subcategory.thumbnails.length) % subcategory.thumbnails.length;
    setNextIndex(prev);
    const prevSrc = subcategory.thumbnails[prev];
    if (prevSrc && !loadedSet.current.has(prevSrc)) {
      preloadMedia(prevSrc);
      const check = () => {
        if (loadedSet.current.has(prevSrc)) {
          startTransition(prev);
        } else {
          waitRef.current = window.setTimeout(check, 100);
        }
      };
      check();
    } else {
      startTransition(prev);
    }
  };
  const currentThumb = subcategory.thumbnails[currentIndex];
  const nextThumb = subcategory.thumbnails[nextIndex];
  // During transition, lock the displayed sources to avoid any mid-transition re-renders
  const displayCurrent = isTransitioning && tFrom ? tFrom : currentThumb;
  const displayNext = isTransitioning && tTo ? tTo : nextThumb;
  const isCurrentVideo = displayCurrent.endsWith(".mp4") || displayCurrent.endsWith(".webm");
  const isNextVideo = displayNext.endsWith(".mp4") || displayNext.endsWith(".webm");

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

            {/* Crossfade Layers */}
            <div
              className={`absolute z-0 inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backface-visibility:hidden] ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              {isCurrentVideo ? (
                <video key={displayCurrent}
                  src={displayCurrent}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img key={displayCurrent}
                  src={displayCurrent}
                  alt={`${subcategory.title} ${currentIndex + 1}`}
                  className="w-full h-full object-cover scale-120"
                  onClick={() => {
                    setLightboxImage(displayCurrent);
                    setLightboxOpen(true);
                  }}
                />
              )}
            </div>

            <div
              className={`absolute z-10 inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backface-visibility:hidden] ${isTransitioning ? "opacity-100" : "opacity-0"}`}
            >
              {isNextVideo ? (
                <video key={displayNext}
                  src={displayNext}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img key={displayNext}
                  src={displayNext}
                  alt={`${subcategory.title} ${nextIndex + 1}`}
                  className="w-full h-full object-cover scale-120"
                  onClick={() => {
                    setLightboxImage(displayNext);
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

                {/* Dot Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {subcategory.thumbnails.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={() => {
                        if (imgIndex !== currentIndex) {
                          setNextIndex(imgIndex);
                          const targetSrc = subcategory.thumbnails[imgIndex];
                          if (targetSrc && !loadedSet.current.has(targetSrc)) {
                            preloadMedia(targetSrc);
                            const check = () => {
                              if (loadedSet.current.has(targetSrc)) {
                                startTransition(imgIndex);
                              } else {
                                waitRef.current = window.setTimeout(check, 100);
                              }
                            };
                            check();
                          } else {
                            startTransition(imgIndex);
                          }
                        }
                      }}
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
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const loadedSet = useRef<Set<string>>(new Set());
  const waitRef = useRef<number | null>(null);
  const [tFrom, setTFrom] = useState<string | null>(null);
  const [tTo, setTTo] = useState<string | null>(null);
  const animatingRef = useRef(false);

  const preloadMedia = (url: string) => {
    if (!url || loadedSet.current.has(url)) return;
    const isVid = url.endsWith(".mp4") || url.endsWith(".webm");
    if (isVid) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.src = url;
      const onReady = () => {
        loadedSet.current.add(url);
        video.removeEventListener("canplaythrough", onReady);
      };
      video.addEventListener("canplaythrough", onReady);
      video.load();
    } else {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedSet.current.add(url);
      };
    }
  };
  // Keep nextIndex in sync and preload it
  useEffect(() => {
    const next = (currentIndex + 1) % feature.images.length;
    setNextIndex(next);
    const nextItem = feature.images[next];
    if ("image" in nextItem && nextItem.image) {
      preloadMedia(String(nextItem.image));
    }
  }, [currentIndex, feature.images.length]);

  const startTransition = (targetIndex?: number) => {
    if (animatingRef.current) return;

    const next = typeof targetIndex === 'number' ? targetIndex : (currentIndex + 1) % feature.images.length;

    const fromItem = feature.images[currentIndex];
    const toItem = feature.images[next];
    const fromSrc = ("image" in fromItem && fromItem.image)
      ? String(fromItem.image)
      : (("video" in fromItem && fromItem.video) ? String(fromItem.video) : "");
    const toSrc = ("image" in toItem && toItem.image)
      ? String(toItem.image)
      : (("video" in toItem && toItem.video) ? String(toItem.video) : "");

    setTFrom(fromSrc);
    setTTo(toSrc);
    setNextIndex(next);

    animatingRef.current = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
        window.setTimeout(() => {
          setCurrentIndex(next);
          setIsTransitioning(false);
          setTFrom(null);
          setTTo(null);
          animatingRef.current = false;
        }, 2000);
      });
    });
  };
  // Auto-play with preloading guard (Images: 5s + 2s fade, Videos: 10s + 2s fade)
  useEffect(() => {
    if (feature.images.length <= 1) return;

    const currentItem = feature.images[currentIndex];
    const isVideo = "video" in currentItem && currentItem.video;
    const displayTime = isVideo ? 10000 : 5000;

    const timer = window.setTimeout(() => {
      const next = (currentIndex + 1) % feature.images.length;
      setNextIndex(next);
      const nextItem = feature.images[next];
      const src = ("image" in nextItem && nextItem.image)
        ? String(nextItem.image)
        : ("video" in nextItem && nextItem.video ? String(nextItem.video) : "");
      if (src && !loadedSet.current.has(src)) {
        preloadMedia(src);
        const check = () => {
          if (loadedSet.current.has(src)) {
            startTransition();
          } else {
            waitRef.current = window.setTimeout(check, 100);
          }
        };
        check();
      } else {
        startTransition();
      }
    }, displayTime);

    return () => {
      clearTimeout(timer);
      if (waitRef.current) {
        clearTimeout(waitRef.current);
        waitRef.current = null;
      }
    };
  }, [feature.images.length, currentIndex]);

  const nextSlide = () => {
    const next = (currentIndex + 1) % feature.images.length;
    setNextIndex(next);
    const nextItem = feature.images[next];
    const src = ("image" in nextItem && nextItem.image)
      ? String(nextItem.image)
      : ("video" in nextItem && nextItem.video ? String(nextItem.video) : "");
    if (src && !loadedSet.current.has(src)) {
      preloadMedia(src);
      const check = () => {
        if (loadedSet.current.has(src)) {
          startTransition(next);
        } else {
          waitRef.current = window.setTimeout(check, 100);
        }
      };
      check();
    } else {
      startTransition(next);
    }
  };
  const prevSlide = () => {
    const prev = (currentIndex - 1 + feature.images.length) % feature.images.length;
    setNextIndex(prev);
    const item = feature.images[prev];
    const src = ("image" in item && item.image)
      ? String(item.image)
      : (("video" in item && item.video) ? String(item.video) : "");

    if (src && !loadedSet.current.has(src)) {
      preloadMedia(src);
      const check = () => {
        if (loadedSet.current.has(src)) {
          startTransition(prev);
        } else {
          waitRef.current = window.setTimeout(check, 100);
        }
      };
      check();
    } else {
      startTransition(prev);
    }
  };
  // Derive display sources for crossfade
  const currentItem = feature.images[currentIndex];
  const nextItem = feature.images[nextIndex];
  const currentSrc = ("image" in currentItem && currentItem.image)
    ? String(currentItem.image)
    : (("video" in currentItem && currentItem.video) ? String(currentItem.video) : "");
  const nextSrc = ("image" in nextItem && nextItem.image)
    ? String(nextItem.image)
    : (("video" in nextItem && nextItem.video) ? String(nextItem.video) : "");
  const displayCurrent = isTransitioning && tFrom ? tFrom : currentSrc;
  const displayNext = isTransitioning && tTo ? tTo : nextSrc;
  const isCurrentVid = displayCurrent.endsWith(".mp4") || displayCurrent.endsWith(".webm");
  const isNextVid = displayNext.endsWith(".mp4") || displayNext.endsWith(".webm");

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

            {/* Current Layer (fades out) */}
            <div
              className={`absolute z-0 inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backface-visibility:hidden] ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              {isCurrentVid ? (
                <video key={displayCurrent}
                  src={displayCurrent}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img key={displayCurrent}
                  src={displayCurrent}
                  alt={currentItem.label}
                  className="w-full h-full object-cover scale-120"
                />
              )}
            </div>

            {/* Next Layer (fades in) */}
            <div
              className={`absolute z-10 inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backcase-visibility:hidden] ${isTransitioning ? "opacity-100" : "opacity-0"}`}
            >
              {isNextVid ? (
                <video key={displayNext}
                  src={displayNext}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img key={displayNext}
                  src={displayNext}
                  alt={nextItem.label}
                  className="w-full h-full object-cover scale-120"
                />
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
                        onClick={() => {
                          if (imgIndex !== currentIndex) {
                            setNextIndex(imgIndex);
                            const item = feature.images[imgIndex];
                            const src = ("image" in item && item.image)
                              ? String(item.image)
                              : ("video" in item && item.video ? String(item.video) : "");
                            if (src && !loadedSet.current.has(src)) {
                              preloadMedia(src);
                              const check = () => {
                                if (loadedSet.current.has(src)) {
                                  startTransition(imgIndex);
                                } else {
                                  waitRef.current = window.setTimeout(check, 100);
                                }
                              };
                              check();
                            } else {
                              startTransition(imgIndex);
                            }
                          }
                        }}
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
