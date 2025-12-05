import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import prelaunchLogo from "@/assets/prelaunch-logo.png";

const PRELAUNCH_URL = "https://prelaunch.com/projects/5ff3ce3f-6669-4243-918c-4d57d98b63f6/reservation?userEmail=stefan%40vellvii.com&reservationId=c3452574-55cf-49e6-aa12-79b4c18131ac";

export const ReserveButtons = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-4 justify-center items-center py-12">
        <a
          href={PRELAUNCH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group px-10 py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden flex items-center gap-3"
        >
          <span className="relative z-10">Reserve Your DOX on</span>
          <img src={prelaunchLogo} alt="Prelaunch.com" className="h-6 w-6 relative z-10" />
          <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </a>
        <a
          href="https://prelaunch.com/projects/vellvii-dox-vellvii-dox-pleasure-in-a-luxury-vault/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_100%] text-black rounded-2xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 hover:bg-right relative overflow-hidden text-center"
        >
          <span className="relative z-10 flex flex-col leading-tight">
            <span>Share Your Thoughts.</span>
            <span>Let's Start A Conversation.</span>
          </span>
          <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </a>
      </div>
    </ScrollReveal>
  );
};
