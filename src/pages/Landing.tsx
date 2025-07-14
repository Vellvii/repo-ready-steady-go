import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import vLogo from "@/assets/v-logo.png";
import vellviiLogo from "@/assets/vellvii-logo.png";
import vivienImage from "/lovable-uploads/976c0d6d-a066-409a-8ad6-6353840958ac.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const vLogoRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const message = "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  useEffect(() => {
    // Start typing animation after a 2-second delay
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setShowButtons(true);
        }
      }, 80); // Slower typing speed (was 50ms, now 80ms)

      return () => clearInterval(typeInterval);
    }, 2000); // 2-second delay before typing starts

    return () => clearTimeout(startTyping);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (vLogoRef.current) {
      const rect = vLogoRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update CSS custom property for shimmer position
      vLogoRef.current.style.setProperty('--shimmer-x', `${(x / rect.width) * 100}%`);
      vLogoRef.current.style.setProperty('--shimmer-y', `${(y / rect.height) * 100}%`);
    }
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>, buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      buttonRef.current.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      buttonRef.current.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    }
  };

  const handleYes = () => {
    setAgeVerified(true);
    // Navigate to home or next page
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
    // Could redirect to age restriction page or close tab
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Logo Section */}
      <div className="flex flex-col items-center pt-8 md:pt-12">
        {/* V Logo with interactive shimmer */}
        <div 
          ref={vLogoRef}
          className="mb-6 shimmer-container-interactive"
          onMouseMove={handleMouseMove}
        >
          <img 
            src="/lovable-uploads/c5420417-5d7d-43fb-83f7-096b095f26c6.png" 
            alt="V Logo" 
            className="h-32 md:h-48 lg:h-56 w-auto shimmer-logo-interactive"
          />
        </div>

        {/* Vellvii Logo with shimmer - Made Much Bigger */}
        <div className="shimmer-container">
          <img 
            src="/lovable-uploads/12536082-5a87-4e12-82c9-d705ecb8d3e5.png" 
            alt="Vellvii - The art of O" 
            className="h-54 md:h-64 lg:h-98 w-auto shimmer-logo"
          />
        </div>
      </div>

      {/* Vivien Section - Desktop - Static positioning */}
      <div className="hidden md:flex absolute right-8 lg:right-16 top-2/3 lg:top-1/2 items-start max-w-2xl">
        {/* Vivien's Image - Static and Circular */}
        <div className="mr-6 flex-shrink-0">
          <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-2xl border-2 border-white/10">
            <img 
              src={vivienImage} 
              alt="Vivien" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vivien's Message - No Box */}
        <div className="text-white max-w-sm mt-4">
          <p className="font-playfair text-base lg:text-lg leading-relaxed">{displayedText}
            {isTyping && <span className="blinking-cursor">|</span>}
          </p>
          
          {showButtons && (
            <div className="mt-6 space-y-3">
              <button
                ref={yesButtonRef}
                onClick={handleYes}
                onMouseMove={(e) => handleButtonMouseMove(e, yesButtonRef)}
                className="magnetic-button w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 text-sm rounded-lg transition-all duration-300 hover:scale-105"
              >
                Yes, I am older than 18
              </button>
              <button
                ref={noButtonRef}
                onClick={handleNo}
                onMouseMove={(e) => handleButtonMouseMove(e, noButtonRef)}
                className="magnetic-button w-full border border-white/30 text-white hover:bg-white/10 py-2 text-sm rounded-lg transition-all duration-300 bg-transparent"
              >
                No, I am not
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden fixed bottom-8 left-4 right-4 z-10">
        <div className="flex items-start space-x-4">
          {/* Smaller Circular Vivien Image for Mobile */}
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
            <img 
              src={vivienImage} 
              alt="Vivien" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Message without box */}
          <div className="flex-1 text-white">
            <p className="font-playfair text-sm leading-relaxed">
              {displayedText}
              {isTyping && <span className="blinking-cursor">|</span>}
            </p>
            
            {showButtons && (
              <div className="mt-4 space-y-2 fade-in">
                <button
                  onClick={handleYes}
                  className="magnetic-button w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 text-sm rounded-lg transition-all duration-300"
                >
                  Yes, I am older than 18
                </button>
                <button
                  onClick={handleNo}
                  className="magnetic-button w-full border border-white/30 text-white hover:bg-white/10 py-2 text-sm rounded-lg transition-all duration-300 bg-transparent"
                >
                  No, I am not
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;