import { ScrollReveal } from "@/components/animations/ScrollReveal";
import prelaunchLogo from "@/assets/logos/prelaunch.svg";
import stimulateLogo from "@/assets/logos/stimulate.png";
import kickstarterLogo from "@/assets/logos/kickstarter.png";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox";
const SHOP_URL = "/shop";
const STIMULATE_URL =
  "https://stimulatetheshow.com/2026-emerging-brands-experience-mentorship-experience/";

interface Milestone {
  name: string;
  logo: string;
  caption: string;
  href: string;
  external?: boolean;
  /** width in px on desktop (preserves optical balance) */
  logoHeight: string;
}

const milestones: Milestone[] = [
  {
    name: "Kickstarter",
    logo: kickstarterLogo,
    caption: "Successfully funded · April 10, 2026",
    href: KICKSTARTER_URL,
    external: true,
    logoHeight: "h-7 md:h-8",
  },
  {
    name: "Prelaunch",
    logo: prelaunchLogo,
    caption: "Reservation campaign · Complete",
    href: SHOP_URL,
    logoHeight: "h-7 md:h-8",
  },
  {
    name: "Stimulate",
    logo: stimulateLogo,
    caption: "Emerging brands · USA 2026",
    href: STIMULATE_URL,
    external: true,
    logoHeight: "h-9 md:h-10",
  },
];

export const Milestones = () => {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-primary/10">
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
                target={m.external ? "_blank" : undefined}
                rel={m.external ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col items-center justify-center text-center px-8 py-12 md:py-16 h-full bg-background/80 hover:bg-background/40 transition-all duration-700"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, hsl(40 65% 72% / 0.12), transparent 65%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-20 px-7 flex items-center justify-center rounded-xl bg-[hsl(40_30%_94%)] ring-1 ring-primary/20 shadow-[0_1px_0_hsl(40_65%_72%/0.15)_inset] transition-all duration-700 group-hover:ring-primary/40">
                    <img
                      src={m.logo}
                      alt={`${m.name} logo`}
                      className={`${m.logoHeight} w-auto object-contain transition-transform duration-700 group-hover:-translate-y-0.5`}
                      loading="lazy"
                    />
                  </div>

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
