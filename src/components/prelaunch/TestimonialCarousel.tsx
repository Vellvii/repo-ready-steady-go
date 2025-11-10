import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Alexandra M.",
    role: "Beta Tester",
    quote: "Finally, a storage solution as beautiful as the products inside. The fingerprint lock gives me complete peace of mind.",
    avatar: 1,
  },
  {
    name: "Jordan K.",
    role: "Beta Tester",
    quote: "The wireless charging is a game-changer. No more hunting for cables or dead batteries. Everything's always ready when I am.",
    avatar: 2,
  },
  {
    name: "Taylor R.",
    role: "Beta Tester",
    quote: "The velvet interior is absolutely luxurious. This isn't just storage, it's a statement piece. I can't wait for the official launch!",
    avatar: 3,
  },
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto relative min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-dark border-white/10">
            <CardContent className="p-8 sm:p-12 text-center space-y-6">
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-secondary flex items-center justify-center text-white text-2xl font-bold">
                {testimonials[currentIndex].name.charAt(0)}
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-zinc-900 leading-relaxed font-light italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-zinc-900 font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-zinc-700 text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
