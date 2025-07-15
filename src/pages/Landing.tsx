import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/animations/MagneticButton";
import vivienImage from "/uploads/976c0d6d-a066-409a-8ad6-6353840958ac.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [vivienEntered, setVivienEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const message =
    "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  useEffect(() => {
    const playTimer = setTimeout(() => {
      videoRef.current?.play();
    }, 2000);

    const handleEnded = () => {
      requestAnimationFrame(() => setVivienEntered(true));
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setShowButtons(true);
        }
      }, 80);
    };

    const video = videoRef.current;
    video?.addEventListener("ended", handleEnded);
    return () => {
      clearTimeout(playTimer);
      video?.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleYes = () => {
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
  };

  return (
    <div className="min-h-screen bg-[#0d0802] flex flex-col items-center pt-6 md:pt-8 pb-48 gap-6">
      <img
        src="/uploads/V-logo-Shimmer.jpeg"
        alt="V Logo"
        className="w-32 sm:w-40 h-auto"
      />
      <video
        ref={videoRef}
        src="/uploads/Vellvii-lgo-shimmer.mp4"
        className="w-11/12 sm:w-3/4 md:w-1/2 max-w-md"
        muted
        playsInline
      />

      {/* Vivien Section */}
      <div className={`vivien-container ${vivienEntered ? "vivien-entered" : ""}`}>
        <div className="w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
          <img src={vivienImage} alt="Vivien" className="w-full h-full object-cover" />
        </div>
        <div className="text-white max-w-sm">
          <div className="min-h-[96px] md:min-h-[112px]">
            <p className="font-playfair text-sm md:text-base lg:text-lg leading-relaxed">
              {displayedText}
              {isTyping && <span className="blinking-cursor">|</span>}
            </p>
          </div>
          {showButtons && (
            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              <MagneticButton
                onClick={handleYes}
                className="bounce-fade-in w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 text-sm rounded-lg"
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
    </div>
  );
};

export default Landing;
