import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import makeshiftIcon from "@/assets/icon-makeshift-era.png";
import stigmaIcon from "@/assets/icon-v-logo.png";
import privacyIcon from "@/assets/icon-not-only-in-movies.png";
import doxCloseUpImage from "@/assets/dox-close-up.webp";
import sanctuaryWithinImage from "@/assets/dox-sanctuary-within.jpg";

const problems = [{
  icon: stigmaIcon,
  title: "Storage - Unapologetic",
  description: "No More Shoeboxes, No more Hidden Draws. The Vellvii Dox is not storage. It's a statement - of confidence, of beauty, of pleasure without apology. Because sexy can be sophisticated. And elegance should never be hidden."
}, {
  icon: makeshiftIcon,
  title: "Shower Walls and Toilet Seats?",
  description: "For decades, pleasure was stuck to walls and hidden behind doors. Why do that when elegant, intelligent, and breathtakingly refined solutions exist? The Vellvii Dox - where design meets desire."
}, {
  icon: privacyIcon,
  title: "Not Only In Movies",
  description: "It's not about imitation - it's about liberation. Inspired by elegance and crafted with precision, The Dox transforms an object once associated with performance into a symbol of empowerment. Pleasure no longer hides in shame — it sits beautifully in your space, waiting for you to own it."
}];
export const ProblemSection = () => {
  return <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-baskerville">
            A Design That Demands to Be Touched
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
            The innovation that should have existed years ago — now perfected
          </p>
        </ScrollReveal>

        {/* Before/After Visual */}
        <ScrollReveal delay={0.3}>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-dark">
              <img 
                src={doxCloseUpImage} 
                alt="Dox Close Up" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-dark">
              <img 
                src={sanctuaryWithinImage} 
                alt="A Sanctuary Within" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {problems.map((problem, index) => <ScrollReveal key={problem.title} delay={0.1 * index} direction="up">
              <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full">
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center overflow-visible">
                    <img 
                      src={problem.icon} 
                      alt={problem.title} 
                      className="w-10 h-10 object-contain brightness-[1.8]" 
                      style={{ 
                        filter: 'brightness(1.8) drop-shadow(0 0 12px hsl(var(--primary) / 0.8)) drop-shadow(0 0 24px hsl(var(--primary) / 0.5))' 
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold font-baskerville text-slate-950">
                    {problem.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-600">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>)}
        </div>
      </div>
    </section>;
};