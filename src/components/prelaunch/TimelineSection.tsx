import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const milestones = [
  {
    title: "Design & Prototyping",
    status: "complete",
    date: "Complete",
    description: "Perfecting the innovation that should have existed years ago",
  },
  {
    title: "Beta Testing",
    status: "complete",
    date: "Complete",
    description: "Real-world refinement with select partners",
  },
  {
    title: "Prelaunch Campaign",
    status: "current",
    date: "Now",
    description: "You are here — Join the revolution",
  },
  {
    title: "Manufacturing",
    status: "upcoming",
    date: "Mid 2025",
    description: "Bringing luxury to life",
  },
  {
    title: "Launch",
    status: "upcoming",
    date: "2026",
    description: "The most anticipated sexual wellness innovation arrives",
  },
];

export const TimelineSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-playfair">
            The Journey to Launch
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
            Transparency every step of the way
          </p>
        </ScrollReveal>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <ScrollReveal delay={0.3}>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" />
              <div className="absolute top-6 left-0 h-0.5 bg-gradient-secondary transition-all duration-1000" style={{ width: '40%' }} />

              <div className="grid grid-cols-5 gap-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        milestone.status === 'complete'
                          ? 'bg-primary border-primary shadow-glow'
                          : milestone.status === 'current'
                          ? 'bg-secondary border-secondary animate-pulse'
                          : 'bg-white/5 border-white/20'
                      }`}>
                        {milestone.status === 'complete' && <CheckCircle2 className="w-6 h-6 text-white" />}
                        {milestone.status === 'current' && <Loader2 className="w-6 h-6 text-white animate-spin" />}
                        {milestone.status === 'upcoming' && <Circle className="w-6 h-6 text-white/40" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h3 className={`text-sm font-semibold font-playfair ${
                        milestone.status === 'complete' || milestone.status === 'current'
                          ? 'text-white'
                          : 'text-white/40'
                      }`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-xs ${
                        milestone.status === 'current'
                          ? 'text-secondary font-medium'
                          : milestone.status === 'complete'
                          ? 'text-primary'
                          : 'text-white/40'
                      }`}>
                        {milestone.date}
                      </p>
                      <p className="text-xs text-white/50">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />
            <div className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent transition-all duration-1000" style={{ height: '40%' }} />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} delay={0.1 * index} direction="up">
                <div className="relative flex items-start gap-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-300 ${
                    milestone.status === 'complete'
                      ? 'bg-primary border-primary shadow-glow'
                      : milestone.status === 'current'
                      ? 'bg-secondary border-secondary animate-pulse'
                      : 'bg-white/5 border-white/20'
                  }`}>
                    {milestone.status === 'complete' && <CheckCircle2 className="w-6 h-6 text-white" />}
                    {milestone.status === 'current' && <Loader2 className="w-6 h-6 text-white animate-spin" />}
                    {milestone.status === 'upcoming' && <Circle className="w-6 h-6 text-white/40" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-lg font-semibold mb-1 font-playfair ${
                      milestone.status === 'complete' || milestone.status === 'current'
                        ? 'text-white'
                        : 'text-white/40'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      milestone.status === 'current'
                        ? 'text-secondary font-medium'
                        : milestone.status === 'complete'
                        ? 'text-primary'
                        : 'text-white/40'
                    }`}>
                      {milestone.date}
                    </p>
                    <p className="text-sm text-white/60">{milestone.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
