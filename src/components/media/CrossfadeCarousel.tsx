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
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tFrom, setTFrom] = useState<string | null>(null);
  const [tTo, setTTo] = useState<string | null>(null);
  
  const loadedSet = useRef<Set<string>>(new Set());
  const animatingRef = useRef(false);

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
    if (animatingRef.current) return;

    const next = typeof targetIndex === "number" ? targetIndex : (currentIndex + 1) % items.length;
    const fromUrl = items[currentIndex];
    const toUrl = items[next];

    if (!loadedSet.current.has(toUrl)) {
      await preloadMedia(toUrl);
    }

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
        }, transitionDuration);
      });
    });
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
    setNextIndex(next);
    preloadMedia(items[next]);
  }, [currentIndex, items.length]);

  const goToIndex = (index: number) => {
    if (index !== currentIndex && !animatingRef.current) {
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

  const displayCurrent = isTransitioning && tFrom ? tFrom : items[currentIndex];
  const displayNext = isTransitioning && tTo ? tTo : items[nextIndex];

  const handleImageClick = (src: string) => {
    if (enableLightbox && !isVideo(src)) {
      setLightboxImage(src);
      setLightboxOpen(true);
    }
  };

  const isCurrentVideo = isVideo(displayCurrent);
  const isNextVideo = isVideo(displayNext);

  return (
    <>
      <div className={cn("relative rounded-2xl overflow-hidden glass-dark shadow-luxury", aspectRatio, className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />

        {/* Crossfade Layer - Current (fading out) */}
        <div
          className={cn(
            "absolute z-0 inset-0 w-full h-full transition-opacity ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backface-visibility:hidden]",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isCurrentVideo ? (
            <video
              key={displayCurrent}
              src={displayCurrent}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={displayCurrent}
              src={displayCurrent}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover scale-120 cursor-pointer"
              onClick={() => handleImageClick(displayCurrent)}
            />
          )}
        </div>

        {/* Crossfade Layer - Next (fading in) */}
        <div
          className={cn(
            "absolute z-10 inset-0 w-full h-full transition-opacity ease-in-out pointer-events-none will-change-[opacity] transform-gpu [backface-visibility:hidden]",
            isTransitioning ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {isNextVideo ? (
            <video
              key={displayNext}
              src={displayNext}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              key={displayNext}
              src={displayNext}
              alt={`${altPrefix} ${currentIndex + 1}`}
              className="w-full h-full object-cover scale-120 cursor-pointer"
              onClick={() => handleImageClick(displayNext)}
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
