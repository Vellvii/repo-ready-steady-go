import { useState, useEffect } from "react";
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

  const message = "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  useEffect(() => {
    // Start typing animation after a brief delay
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
      }, 50); // Typing speed

      return () => clearInterval(typeInterval);
    }, 2000);

    return () => clearTimeout(startTyping);
  }, []);

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
      <div className="flex flex-col items-center pt-12 md:pt-20">
        {/* V Logo with shimmer */}
        <div className="mb-8 shimmer-container">
          <img 
            src="/lovable-uploads/c5420417-5d7d-43fb-83f7-096b095f26c6.png" 
            alt="V Logo" 
            className="h-24 md:h-32 w-auto shimmer-logo"
          />
        </div>

        {/* Vellvii Logo with shimmer */}
        <div className="shimmer-container">
          <img 
            src="/lovable-uploads/12536082-5a87-4e12-82c9-d705ecb8d3e5.png" 
            alt="Vellvii - The art of O" 
            className="h-16 md:h-20 w-auto shimmer-logo"
          />
        </div>
      </div>

      {/* Vivien Section - Desktop */}
      <div className="hidden md:flex absolute right-8 lg:right-16 top-1/3 lg:top-1/4 items-start max-w-2xl">
        {/* Vivien's Image - Circular */}
        <div className="mr-8 flex-shrink-0">
          <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src={vivienImage} 
              alt="Vivien" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vivien's Message - No Box */}
        <div className="text-white max-w-md mt-8">
          <p className="font-playfair text-lg lg:text-xl leading-relaxed">
            {displayedText}
            {isTyping && <span className="blinking-cursor">|</span>}
          </p>
          
          {showButtons && (
            <div className="mt-8 space-y-4 fade-in">
              <Button
                onClick={handleYes}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Yes, I am older than 18
              </Button>
              <Button
                onClick={handleNo}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 py-3 rounded-lg transition-all duration-300"
              >
                No, I am not
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden fixed bottom-8 left-4 right-4 z-10">
        <div className="flex items-start space-x-6">
          {/* Circular Vivien Image for Mobile */}
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
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
                <Button
                  onClick={handleYes}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-2 text-sm rounded-lg transition-all duration-300"
                >
                  Yes, I am older than 18
                </Button>
                <Button
                  onClick={handleNo}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-2 text-sm rounded-lg transition-all duration-300"
                >
                  No, I am not
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;