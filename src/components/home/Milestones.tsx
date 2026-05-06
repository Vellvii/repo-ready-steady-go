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
  logoHeight: string;
  /** Optional per-logo CSS filter override */
  filter?: string;
}

const GOLD_MONO =
  "brightness(0) invert(1) sepia(0.35) saturate(1.6) hue-rotate(355deg) brightness(0.95) opacity(0.85)";

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
    // Desaturate to a soft champagne grayscale while preserving the white P inside the tile
    filter: "grayscale(1) sepia(0.25) brightness(1.15) contrast(0.95) opacity(0.85)",
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

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-primary/10">
          {milestones.map((m, i) => (
            <ScrollReveal key={m.name} delay={0.25 + i * 0.1}>
              <a
                href={m.href}
                target={m.external ? "_blank" : undefined}
                rel={m.external ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col items-center justify-center text-center px-8 py-14 md:py-20 h-full transition-all duration-700"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, hsl(40 65% 72% / 0.08), transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-12 flex items-center justify-center">
                    <img
                      src={m.logo}
                      alt={`${m.name} logo`}
                      className={`${m.logoHeight} w-auto object-contain transition-all duration-700 group-hover:-translate-y-0.5`}
                      style={{
                        filter: m.filter ?? GOLD_MONO,
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div className="w-8 h-px my-6 bg-primary/25 group-hover:bg-primary/55 group-hover:w-12 transition-all duration-700" />

                  <p className="text-white/45 text-[0.7rem] uppercase tracking-[0.32em] font-light leading-relaxed">
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
