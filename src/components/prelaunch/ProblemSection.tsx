import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, BatteryWarning, Lock } from "lucide-react";

const problems = [
  {
    icon: Layers,
    title: "The Makeshift Era is Over",
    description: "Walls, tiles, toilet seats — places that never belonged in your story. Your pleasure deserves better than improvised spaces.",
  },
  {
    icon: BatteryWarning,
    title: "Stigma Disguised as Storage",
    description: "Hiding your wellness collection in drawers and bags, as if pleasure needs to apologize for existing.",
  },
  {
    icon: Lock,
    title: "Privacy Without Sophistication",
    description: "No dedicated, elegant space built for your pleasure. Sharing spaces shouldn't mean compromising on beauty or security.",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
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
          {problems.map((problem, index) => (
            <ScrollReveal key={problem.title} delay={0.1 * index} direction="up">
              <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full">
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <problem.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-playfair">
                    {problem.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Before/After Visual */}
        <ScrollReveal delay={0.4}>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-dark">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent" />
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
                  <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Before</span>
                </div>
                <p className="text-white/40 text-sm font-medium text-center">
                  IMAGE: Improvised Storage
                  <br />
                  <span className="text-xs">(The makeshift places that never honored pleasure)</span>
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-dark">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                  <span className="text-primary text-xs font-semibold uppercase tracking-wider">After</span>
                </div>
                <p className="text-white/40 text-sm font-medium text-center">
                  IMAGE: A Sanctuary Within
                  <br />
                  <span className="text-xs">(Soft velvet, golden accents, perfect order)</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
