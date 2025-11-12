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
  const [displayedCurrent, setDisplayedCurrent] = useState(items[0]);
  const [displayedNext, setDisplayedNext] = useState(items[1] || items[0]);
  
  const loadedSet = useRef<Set<string>>(new Set());
  const transitionTimerRef = useRef<number | null>(null);
  const pendingNextRef = useRef<string | null>(null);

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

  const startTransition = async (targetIndex?: number) => {
    if (isTransitioning) return;

    const next = typeof targetIndex === "number" ? targetIndex : (currentIndex + 1) % items.length;
    
    // Preload next media if not already loaded
    if (!loadedSet.current.has(items[next])) {
      await preloadMedia(items[next]);
    }

    // Prepare next image/video for crossfade (don't touch current - it's already displaying)
    setDisplayedNext(items[next]);
    setIsTransitioning(true);

    // Clear any existing timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // After transition completes, update current index and displayed content
    transitionTimerRef.current = window.setTimeout(() => {
      setCurrentIndex(next);
      setDisplayedCurrent(items[next]);
      // Defer swapping the hidden "next" media until after we hide it to prevent any flash
      pendingNextRef.current = items[(next + 1) % items.length];
      setIsTransitioning(false);
    }, transitionDuration);
  };

  useEffect(() => {
    if (items.length <= 1) return;

    const currentUrl = items[currentIndex];
    const displayTime = isVideo(currentUrl) ? videoDisplayTime : imageDisplayTime;

    const timer = window.setTimeout(() => {
      startTransition();
    }, displayTime);

    return () => clearTimeout(timer);
  }, [currentIndex, items.length]);

  useEffect(() => {
    const next = (currentIndex + 1) % items.length;
    preloadMedia(items[next]);
  }, [currentIndex, items.length]);

  // After a crossfade ends, update the hidden next media source while it's invisible
  useEffect(() => {
    if (!isTransitioning && pendingNextRef.current) {
      setDisplayedNext(pendingNextRef.current);
      pendingNextRef.current = null;
    }
  }, [isTransitioning]);

  const goToIndex = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      startTransition(index);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % items.length;
    startTransition(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + items.length) % items.length;
    startTransition(prev);
  };

  const handleImageClick = (src: string) => {
    if (enableLightbox && !isVideo(src)) {
      setLightboxImage(src);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className={cn("relative rounded-2xl overflow-hidden glass-dark shadow-luxury", aspectRatio, className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />

        {/* Current Layer - Fading Out */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity ease-in-out",
            isTransitioning ? "opacity-0 z-0 invisible" : "opacity-100 z-10 visible"
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isVideo(displayedCurrent) ? (
            <video
              key={displayedCurrent}
              src={displayedCurrent}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={displayedCurrent}
              src={displayedCurrent}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleImageClick(displayedCurrent)}
            />
          )}
        </div>

        {/* Next Layer - Fading In */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity ease-in-out",
            isTransitioning ? "opacity-100 z-10 visible" : "opacity-0 z-0 invisible"
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isVideo(displayedNext) ? (
            <video
              key={displayedNext}
              src={displayedNext}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={displayedNext}
              src={displayedNext}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleImageClick(displayedNext)}
            />
          )}
        </div>

        {/* Navigation Controls */}
        {showControls && items.length > 1 && (
          <>
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
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
