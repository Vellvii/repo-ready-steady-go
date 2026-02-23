import { useEffect, useState } from "react";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/vellvii/vellvii-dox"; // TODO: Replace with actual URL

export const KSPStickyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 py-3 px-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "hsl(15, 12%, 10% / 0.95)",
        borderTop: "1px solid hsl(0 0% 100% / 0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 max-w-4xl">
        <div className="hidden sm:block">
          <p className="text-white font-baskerville font-bold text-sm">Vellvii DOX</p>
          <p className="text-white/50 text-xs">Super Early Bird from <span className="text-primary font-bold">$99</span></p>
        </div>
        <div className="sm:hidden">
          <p className="text-white/50 text-xs">From <span className="text-primary font-bold text-sm">$99</span></p>
        </div>
        <a
          href={KICKSTARTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-black rounded-lg font-bold text-sm shadow-elegant hover:shadow-glow transition-all duration-300 whitespace-nowrap"
        >
          Notify Me on Launch
        </a>
      </div>
    </div>
  );
};
