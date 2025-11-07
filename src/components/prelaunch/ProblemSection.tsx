import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import makeshiftIcon from "@/assets/icon-makeshift-era.png";
import stigmaIcon from "@/assets/icon-stigma-storage.png";
import privacyIcon from "@/assets/icon-privacy-sophistication.png";
import doxClosedImage from "@/assets/dox-closed.png";
import sanctuaryWithinImage from "@/assets/dox-sanctuary-within.jpg";

const problems = [{
  icon: makeshiftIcon,
  title: "The Makeshift Era is Over",
  description: "Walls, tiles, toilet seats — places that never belonged in your story. Your pleasure deserves better than improvised spaces."
}, {
  icon: stigmaIcon,
  title: "Stigma Disguised as Storage",
  description: "Hiding your wellness collection in drawers and bags, as if pleasure needs to apologize for existing."
}, {
  icon: privacyIcon,
  title: "Privacy Without Sophistication",
  description: "No dedicated, elegant space built for your pleasure. Sharing spaces shouldn't mean compromising on beauty or security."
}];
export const ProblemSection = () => {
  return <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-playfair">
            A Design That Demands to Be Touched
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
            The innovation that should have existed years ago — now perfected
          </p>
        </ScrollReveal>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {problems.map((problem, index) => <ScrollReveal key={problem.title} delay={0.1 * index} direction="up">
              <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full">
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img src={problem.icon} alt={problem.title} className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold font-playfair text-slate-950">
                    {problem.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-600">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>)}
        </div>

        {/* Before/After Visual */}
        <ScrollReveal delay={0.4}>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-dark">
              <img 
                src={doxClosedImage} 
                alt="Dox Closed" 
                className="w-full h-full object-cover scale-120"
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
      </div>
    </section>;
};