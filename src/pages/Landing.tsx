import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { EnvelopeMailingList } from "@/components/EnvelopeMailingList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import vivienImage from "/uploads/976c0d6d-a066-409a-8ad6-6353840958ac.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [constructionMessage, setConstructionMessage] = useState("");
  const [showEmailButton, setShowEmailButton] = useState(false);
  const [showMailingDialog, setShowMailingDialog] = useState(false);
  const [mailingEmail, setMailingEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (document.getElementById('landing-lock')) {
      document.body.classList.add('landing-active');
    }
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  const message = isAgeConfirmed 
    ? ""  // Will be handled by the construction message
    : "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  const constructionText = "Thank you so much for confirming, Vellvii and Vivien are currently under construction. If you have any questions, please email Stefan below or join our mailing list to get notified about updates and releases.";

  // Typing effect for construction message
  const startConstructionTyping = (fullText: string) => {
    let index = 0;
    
    const typeChar = () => {
      setConstructionMessage(fullText.slice(0, index + 1));
      index++;
      
      if (index < fullText.length) {
        setTimeout(typeChar, 30);
      } else {
        // Show email button after typing is complete
        setTimeout(() => setShowEmailButton(true), 500);
      }
    };
    
    setTimeout(typeChar, 300);
  };

  useEffect(() => {
    if (isAgeConfirmed) {
      // Reset for construction message mode
      setDisplayedText("");
      setIsTyping(false);
      setShowButtons(false);
      
      // Start construction message typing
      setTimeout(() => {
        startConstructionTyping(constructionText);
      }, 500);
      return;
    }

    let interval: NodeJS.Timeout;
    
    // Start typing after 2 seconds
    setTimeout(() => {
      setIsTyping(true);
      const speed = 50; // Speed of typing in milliseconds
      let index = 0;
      interval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setShowButtons(true);
        }
      }, speed);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isAgeConfirmed, message]);

  const handleYes = () => {
    setIsAgeConfirmed(true);
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
  };

  const handleEmailStefan = () => {
    window.location.href = "mailto:stefan@vellvii.com";
  };

  const handleJoinMailingList = async () => {
    if (!mailingEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mailingEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("join-mailing-list", {
        body: { email: mailingEmail },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been added to our mailing list. Check your email for confirmation.",
      });
      setShowMailingDialog(false);
      setMailingEmail("");
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
    <div id="landing-lock" className="fixed inset-0 h-full bg-black flex flex-col items-center pt-4 md:pt-6 pb-40 gap-8 overflow-hidden">
      <img
        src="/uploads/V-logo-transparent.png"
        alt="V Logo"
        className="w-32 sm:w-40 h-auto"
      />
      <img
        src="/uploads/Vellvii-full-logo-transparent.png"
        alt="Vellvii Logo"
        className={`w-[90vw] sm:w-3/4 md:w-1/2 max-w-md max-h-[40vh] object-contain transition-all duration-1000 ${
          isAgeConfirmed ? 'animate-fade-out translate-y-8 opacity-0 pointer-events-none' : ''
        }`}
      />

      {/* Vivien Section */}
      <div className="vivien-container px-2 sm:px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
          <img src={vivienImage} alt="Vivien" className="w-full h-full object-cover" />
        </div>
        <div className={`
          bg-gradient-to-br from-card/95 to-muted/95 backdrop-blur-xl border border-secondary/20 rounded-2xl shadow-luxury
          transition-all duration-700 ease-out flex flex-col mx-2
          ${isAgeConfirmed 
            ? 'w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-2xl min-h-[40vh] sm:min-h-[45vh] max-h-[55vh] sm:max-h-[50vh] p-3 sm:p-4' 
            : 'w-[90vw] max-w-sm p-4 sm:p-6'
          }
        `}>
          {/* Message Display */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Initial Message Display */}
            {!isAgeConfirmed && (
              <div className="mb-4">
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%]">
                    <p className="font-playfair text-sm md:text-base lg:text-lg leading-relaxed text-foreground">
                      {displayedText}
                      {isTyping && <span className="blinking-cursor ml-1 text-secondary">|</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Construction Message Display */}
            {isAgeConfirmed && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-start mb-6">
                  <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%]">
                    <p className="font-playfair text-sm md:text-base lg:text-lg leading-relaxed text-foreground">
                      {constructionMessage}
                      {constructionMessage && constructionMessage.length < constructionText.length && <span className="blinking-cursor ml-1 text-secondary">|</span>}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {showEmailButton && (
                  <div className="flex flex-col gap-3 animate-fade-in">
                    <MagneticButton
                      onClick={handleEmailStefan}
                      className="bounce-fade-in bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium py-2 px-6 text-sm rounded-lg"
                    >
                      Email Stefan
                    </MagneticButton>
                    <MagneticButton
                      onClick={() => setShowMailingDialog(true)}
                      className="bounce-fade-in border border-white/30 text-white hover:bg-white/10 py-2 px-6 text-sm rounded-lg bg-transparent"
                    >
                      Join Mailing List
                    </MagneticButton>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Age Confirmation Buttons */}
          {showButtons && !isAgeConfirmed && (
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
      </div>

      {/* Envelope Mailing List */}
      <EnvelopeMailingList
        isOpen={showMailingDialog}
        onClose={() => setShowMailingDialog(false)}
        email={mailingEmail}
        onEmailChange={setMailingEmail}
        onSubmit={handleJoinMailingList}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Landing;
