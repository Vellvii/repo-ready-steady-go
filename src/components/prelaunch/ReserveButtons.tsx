import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const ReserveButtons = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-4 justify-center items-center py-12">
        <MagneticButton
          onClick={scrollToEmailCapture}
          className="group px-10 py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden"
        >
          <span className="relative z-10">Reserve Your DOX</span>
          <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </MagneticButton>
        <MagneticButton
          onClick={scrollToEmailCapture}
          className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden"
        >
          <span className="relative z-10">Reserve Your DOX</span>
          <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </MagneticButton>
      </div>
    </ScrollReveal>
  );
};
