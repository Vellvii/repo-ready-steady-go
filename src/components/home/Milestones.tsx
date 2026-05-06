import { ScrollReveal } from "@/components/animations/ScrollReveal";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox";
const PRELAUNCH_URL =
  "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac";
const STIMULATE_URL =
  "https://stimulatetheshow.com/2026-emerging-brands-experience-mentorship-experience/";

interface Milestone {
  name: string;
  caption: string;
  href: string;
  /** Sub-line under wordmark, optional */
  subline?: string;
}

const milestones: Milestone[] = [
  { name: "Kickstarter", caption: "Live campaign · 2026", href: KICKSTARTER_URL },
  { name: "Prelaunch", caption: "VIP early access · 1,500 units", href: PRELAUNCH_URL },
  {
    name: "Stimulate",
    subline: "Sexual Wellness",
    caption: "Emerging brands · USA 2026",
    href: STIMULATE_URL,
  },
];

export const Milestones = () => {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-primary/10">
      {/* hairline gold gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(40 65% 72% / 0.35), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-primary/60 text-[0.7rem] uppercase tracking-[0.45em] font-semibold text-center mb-5">
            The Journey
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-baskerville text-white text-center mb-3 leading-tight">
            Where we are.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/50 font-light text-center max-w-xl mx-auto mb-16 tracking-wide">
            A new house, on the move.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 rounded-2xl overflow-hidden ring-1 ring-primary/15">
          {milestones.map((m, i) => (
            <ScrollReveal key={m.name} delay={0.25 + i * 0.1}>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center text-center px-8 py-12 md:py-16 h-full bg-background/80 hover:bg-background/40 transition-all duration-700"
              >
                {/* gold radial glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, hsl(40 65% 72% / 0.12), transparent 65%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-14 flex flex-col items-center justify-center">
                    <span
                      className="font-baskerville text-2xl md:text-[1.75rem] tracking-wide leading-none transition-transform duration-700 group-hover:-translate-y-0.5"
                      style={{ color: "hsl(40 65% 72%)" }}
                    >
                      {m.name}
                    </span>
                    {m.subline && (
                      <span
                        className="mt-1 text-[0.68rem] uppercase tracking-[0.35em] font-light"
                        style={{ color: "hsl(40 65% 72% / 0.7)" }}
                      >
                        {m.subline}
                      </span>
                    )}
                  </div>

                  {/* hairline divider */}
                  <div className="w-10 h-px my-5 bg-primary/30 group-hover:bg-primary/60 transition-colors duration-700" />

                  <p className="text-white/55 text-xs uppercase tracking-[0.25em] font-light">
                    {m.caption}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* hairline gold gradient bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(40 65% 72% / 0.35), transparent)",
        }}
      />
    </section>
  );
};

export default Milestones;
