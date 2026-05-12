import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { EnvelopeMailingList, MailingListFormData } from "@/components/EnvelopeMailingList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { pixelLead, pixelSubscribe } from "@/lib/metaPixel";

const Landing = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [showMailingDialog, setShowMailingDialog] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLogos, setShowLogos] = useState(true);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mailingFormData, setMailingFormData] = useState<MailingListFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    gender: '',
    country: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Subtitle timing - adjust these based on actual video timing
  const subtitles = [
    { start: 0, end: 2, text: "Hello, I'm Vivien" },
    { start: 2, end: 5, text: "your personal concierge to the world of Vellvii." },
    { start: 5, end: 9, text: "Vellvii isn't just a brand; it's an experience," },
    { start: 9, end: 13, text: "it's a celebration of intimacy, design, and quiet confidence." },
    { start: 13, end: 15, text: "My purpose is to guide you." },
    { start: 15, end: 20, text: "Please confirm that you are older than 18 and I will see you on the other side" },
  ];

  useEffect(() => {
    if (document.getElementById('landing-lock')) {
      document.body.classList.add('landing-active');
    }
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  // Show logos for 1.5 seconds, then show play prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogos(false);
      setShowPlayPrompt(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Start video with audio when user taps
  const handleStartVideo = () => {
    setShowPlayPrompt(false);
    setShowVideo(true);
    // Small delay to ensure video element is mounted
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }, 100);
  };

  // Handle video time updates for subtitles
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const activeSubtitle = subtitles.find(
        sub => currentTime >= sub.start && currentTime < sub.end
      );
      setCurrentSubtitle(activeSubtitle?.text || "");
    }
  };

  // Handle video end
  const handleVideoEnded = () => {
    setVideoEnded(true);
    setShowButtons(true);
    setCurrentSubtitle("");
  };

  const handleYes = () => {
    navigate('/prelaunch');
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
  };

  const handleEmailStefan = () => {
    window.location.href = "mailto:stefan@vellvii.com";
  };

  const handleJoinMailingList = async () => {
    // Validate all required fields
    if (!mailingFormData.firstName.trim() || !mailingFormData.lastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your first and last name",
        variant: "destructive",
      });
      return;
    }

    if (!mailingFormData.email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mailingFormData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!mailingFormData.countryCode || !mailingFormData.phone.trim()) {
      toast({
        title: "Phone required",
        description: "Please enter your phone number with country code",
        variant: "destructive",
      });
      return;
    }

    if (!mailingFormData.gender) {
      toast({
        title: "Gender required",
        description: "Please select your gender",
        variant: "destructive",
      });
      return;
    }

    if (!mailingFormData.country) {
      toast({
        title: "Country required",
        description: "Please select your country",
        variant: "destructive",
      });
      return;
    }

    if (!mailingFormData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to receive emails from our mailing list",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("join-mailing-list", {
        body: mailingFormData,
      });

      if (error) throw error;

      pixelLead({ content_name: "landing_mailing_list" });
      pixelSubscribe();

      toast({
        title: "Success!",
        description: "You've been added to our mailing list. Check your email for confirmation.",
      });
      setShowMailingDialog(false);
      // Reset form
      setMailingFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '',
        gender: '',
        country: '',
        consent: false,
      });
    } catch (error: any) {
      console.error("Error joining mailing list:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to join mailing list. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="landing-lock" className="fixed inset-0 h-full bg-black flex flex-col items-center justify-center gap-8 overflow-hidden">
      {/* Logos - visible initially, fade out */}
      <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${showLogos ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
        <img
          src="/uploads/V-logo-transparent.png"
          alt="V Logo"
          className="w-32 sm:w-40 h-auto"
        />
        <img
          src="/uploads/Vellvii-full-logo-transparent.png"
          alt="Vellvii Logo"
          className="w-[90vw] sm:w-3/4 md:w-1/2 max-w-md max-h-[40vh] object-contain"
        />
      </div>

      {/* Play Prompt - appears after logos, before video */}
      {showPlayPrompt && !showLogos && (
        <div 
          onClick={handleStartVideo}
          className="flex flex-col items-center gap-6 cursor-pointer animate-fade-in"
        >
          <img
            src="/uploads/V-logo-transparent.png"
            alt="V Logo"
            className="w-24 sm:w-32 h-auto opacity-80"
          />
          <div className="text-center">
            <p className="text-secondary/90 font-playfair text-lg sm:text-xl mb-2">Tap to meet</p>
            <p className="text-secondary font-playfair text-2xl sm:text-3xl font-semibold">Vivien</p>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-secondary/50 flex items-center justify-center animate-pulse">
            <div className="w-0 h-0 border-l-[12px] border-l-secondary/80 border-y-[8px] border-y-transparent ml-1" />
          </div>
        </div>
      )}

      {/* Video Section - appears after user taps */}
      {showVideo && !showLogos && (
        <div className="bg-gradient-to-br from-card/95 to-muted/95 backdrop-blur-xl border border-secondary/20 rounded-2xl shadow-luxury transition-all duration-700 ease-out flex flex-col mx-2 animate-fade-in w-[90vw] max-w-md p-4 sm:p-6">
          {/* Message Display */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Video Introduction */}
            {!videoEnded && (
              <div className="relative">
                <video
                  ref={videoRef}
                  src="/uploads/vivien-intro-video.mp4"
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  className="w-full rounded-xl"
                />
                {/* Video controls overlay */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    )}
                  </button>
                  <button
                    onClick={handleVideoEnded}
                    className="bg-black/60 hover:bg-black/80 text-white px-3 py-2 rounded-full text-xs font-medium transition-colors"
                  >
                    Skip
                  </button>
                </div>
                {/* Subtitles overlay */}
                {currentSubtitle && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                    <div className="bg-black/80 px-4 py-2 rounded-lg">
                      <p className="text-white text-center font-playfair text-sm md:text-base">
                        {currentSubtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Age confirmation message after video */}
            {videoEnded && (
              <div className="mb-4">
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%]">
                    <p className="font-playfair text-sm md:text-base lg:text-lg leading-relaxed text-foreground">
                      Please confirm that you are older than 18 to continue.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Age Confirmation Buttons */}
          {showButtons && (
            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              <MagneticButton
                onClick={handleYes}
                className="bounce-fade-in w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium py-2 text-sm rounded-lg"
              >
                Yes, I am older than 18
              </MagneticButton>
              <MagneticButton
                onClick={handleNo}
                className="bounce-fade-in w-full border border-white/30 text-white hover:bg-white/10 py-2 text-sm rounded-lg bg-transparent"
              >
                No, I am not
              </MagneticButton>
            </div>
          )}
        </div>
      )}

      {/* Envelope Mailing List */}
      <EnvelopeMailingList
        isOpen={showMailingDialog}
        onClose={() => setShowMailingDialog(false)}
        formData={mailingFormData}
        onFormChange={setMailingFormData}
        onSubmit={handleJoinMailingList}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Landing;
