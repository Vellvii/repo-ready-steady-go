import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CrossfadeCarouselProps {
  items: string[];
  className?: string;
  aspectRatio?: string;
  showControls?: boolean;
  showDots?: boolean;
  enableLightbox?: boolean;
  videoDisplayTime?: number;
  imageDisplayTime?: number;
  transitionDuration?: number;
  altPrefix?: string;
}

export const CrossfadeCarousel = ({
  items,
  className,
  aspectRatio = "aspect-[4/3]",
  showControls = true,
  showDots = true,
  enableLightbox = false,
  videoDisplayTime = 10000,
  imageDisplayTime = 6000,
  transitionDuration = 2000,
  altPrefix = "Slide",
}: CrossfadeCarouselProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Layer toggle system: A and B alternate as active/inactive
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');
  const [layerA, setLayerA] = useState(items[0]);
  const [layerB, setLayerB] = useState(items[1] || items[0]);
  
  const loadedSet = useRef<Set<string>>(new Set());
  const transitionTimerRef = useRef<number | null>(null);
  const autoAdvanceTimerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const isVideo = (url: string) => {
    if (!url) return false;
    return url.endsWith(".mp4") || url.endsWith(".webm");
  };

  const preloadMedia = (url: string): Promise<void> => {
    if (!url || loadedSet.current.has(url)) return Promise.resolve();

    return new Promise((resolve) => {
      if (isVideo(url)) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.src = url;
        const onReady = () => {
          loadedSet.current.add(url);
          video.removeEventListener("canplaythrough", onReady);
          resolve();
        };
        video.addEventListener("canplaythrough", onReady);
        video.load();
      } else {
        const img = new Image();
        img.src = url;
        img.decode()
          .then(() => {
            loadedSet.current.add(url);
            resolve();
          })
          .catch(() => {
            img.onload = () => {
              loadedSet.current.add(url);
              resolve();
            };
          });
      }
    });
  };

  const startTransition = async (targetIndex?: number, isManual = false) => {
    if (isTransitioning) return;

    const next = typeof targetIndex === "number" ? targetIndex : (currentIndex + 1) % items.length;
    
    // Clear auto-advance timer when manually navigating
    if (isManual && autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    
    // Preload next media if not already loaded
    if (!loadedSet.current.has(items[next])) {
      await preloadMedia(items[next]);
    }

    // Update the HIDDEN layer with the next media (no remount, no flash)
    if (activeLayer === 'A') {
      setLayerB(items[next]);
    } else {
      setLayerA(items[next]);
    }

    setIsTransitioning(true);

    // Clear any existing timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // After crossfade completes, toggle active layer and update index
    transitionTimerRef.current = window.setTimeout(() => {
      setCurrentIndex(next);
      setActiveLayer(activeLayer === 'A' ? 'B' : 'A');
      setIsTransitioning(false);
    }, transitionDuration);
  };

  useEffect(() => {
    if (items.length <= 1) return;

    const currentUrl = items[currentIndex];
    const displayTime = isVideo(currentUrl) ? videoDisplayTime : imageDisplayTime;

    autoAdvanceTimerRef.current = window.setTimeout(() => {
      startTransition();
    }, displayTime);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
    };
  }, [currentIndex, items.length]);

  useEffect(() => {
    const next = (currentIndex + 1) % items.length;
    preloadMedia(items[next]);
  }, [currentIndex, items.length]);

  const goToIndex = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      startTransition(index, true);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    const next = (currentIndex + 1) % items.length;
    startTransition(next, true);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    const prev = (currentIndex - 1 + items.length) % items.length;
    startTransition(prev, true);
  };

  const handleImageClick = (src: string) => {
    if (enableLightbox && !isVideo(src)) {
      setLightboxImage(src);
      setLightboxOpen(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const difference = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    
    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swiped left - go to next
        nextSlide();
      } else {
        // Swiped right - go to previous
        prevSlide();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Determine which layer shows which media
  const visibleLayer = activeLayer === 'A' ? layerA : layerB;
  const hiddenLayer = activeLayer === 'A' ? layerB : layerA;

  return (
    <>
      <div 
        className={cn("relative rounded-2xl overflow-hidden glass-dark shadow-luxury", aspectRatio, className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />

        {/* Layer A */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity ease-in-out",
            activeLayer === 'A' 
              ? (isTransitioning ? "opacity-100 z-10" : "opacity-100 z-10")
              : (isTransitioning ? "opacity-0 z-0" : "opacity-0 z-0")
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isVideo(layerA) ? (
            <video
              key={`layer-a-${layerA}`}
              src={layerA}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={`layer-a-${layerA}`}
              src={layerA}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleImageClick(layerA)}
            />
          )}
        </div>

        {/* Layer B */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity ease-in-out",
            activeLayer === 'B' 
              ? (isTransitioning ? "opacity-100 z-10" : "opacity-100 z-10")
              : (isTransitioning ? "opacity-0 z-0" : "opacity-0 z-0")
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isVideo(layerB) ? (
            <video
              key={`layer-b-${layerB}`}
              src={layerB}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={`layer-b-${layerB}`}
              src={layerB}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleImageClick(layerB)}
            />
          )}
        </div>

        {/* Navigation Controls */}
        {showControls && items.length > 1 && (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </>
        )}

        {/* Dot Navigation */}
        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      {enableLightbox && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl bg-black/90 border-white/20">
            {isVideo(lightboxImage) ? (
              <video src={lightboxImage} autoPlay loop muted playsInline className="w-full h-auto rounded-lg" />
            ) : (
              <img src={lightboxImage} alt="Lightbox view" className="w-full h-auto rounded-lg" />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
