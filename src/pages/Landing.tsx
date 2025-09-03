import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendVivianMessage } from "@/services/vivianChatService";
import vivienImage from "/uploads/976c0d6d-a066-409a-8ad6-6353840958ac.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant', displayedContent?: string, isTyping?: boolean}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVivienTyping, setIsVivienTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.getElementById('landing-lock')) {
      document.body.classList.add('landing-active');
    }
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  const message = isAgeConfirmed 
    ? ""  // Will be handled by the 3-message sequence
    : "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  const welcomeMessages = [
    "Welcome to Vellvii. You've arrived just in time for something extraordinary.",
    "On October 1st, 2025, we'll unveil our first creation — a luxurious experience we call the Art of 'O.' Until then, consider this your private preview lounge.",
    "You're free to ask me questions — about pleasure, wellness, intimacy, or the little secrets science has to share about feeling good. I can't reveal all of Vellvii's products just yet… but I can keep you intrigued, entertained, and maybe even a little inspired. Shall we begin?"
  ];

  // Typing effect for assistant messages
  const startTypingEffect = (messageId: string, fullText: string) => {
    setTypingMessageId(messageId);
    let index = 0;
    
    const typeChar = () => {
      setChatMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, displayedContent: fullText.slice(0, index + 1), isTyping: true }
            : msg
        )
      );
      
      index++;
      
      if (index < fullText.length) {
        setTimeout(typeChar, 20);
      } else {
        setChatMessages(prev => 
          prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, isTyping: false }
              : msg
          )
        );
        setTypingMessageId(null);
      }
    };
    
    setTimeout(typeChar, 300);
  };

  useEffect(() => {
    if (isAgeConfirmed) {
      // Reset for chat mode
      setDisplayedText("");
      setIsTyping(false);
      setShowButtons(false);
      
      // Auto-send the 3 welcome messages in sequence
      const sendWelcomeMessages = async () => {
        for (let i = 0; i < welcomeMessages.length; i++) {
          const messageId = `welcome-${Date.now()}-${i}`;
          const messageContent = welcomeMessages[i];
          
          // Add message to chat
          const welcomeMessage = {
            id: messageId,
            content: messageContent,
            role: 'assistant' as const,
            displayedContent: '',
            isTyping: true
          };
          
          setChatMessages(prev => [...prev, welcomeMessage]);
          
          // Start typing effect for this message
          startTypingEffect(messageId, messageContent);
          
          // Wait for typing to finish plus a small delay before next message
          const typingDuration = messageContent.length * 20 + 300; // 20ms per char + 300ms initial delay
          const delayBetweenMessages = 1000; // 1 second between messages
          
          if (i < welcomeMessages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, typingDuration + delayBetweenMessages));
          }
        }
      };
      
      // Start the welcome sequence after a brief delay
      setTimeout(sendWelcomeMessages, 500);
      return;
    }

    const video = videoRef.current;
    let interval: NodeJS.Timeout;
    const handleReady = () => {
      setTimeout(() => {
        video?.play();
      }, 2000);

      setTimeout(() => {
        if (!video) return;
        const videoDuration = video.duration || 5;
        const halfwayPoint = (videoDuration * 1000) / 2;
        
        setTimeout(() => {
          const speed = (halfwayPoint) / message.length;
          setIsTyping(true);
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
        }, halfwayPoint);
      }, 500);
    };

    if (video?.readyState >= 1) {
      handleReady();
    } else {
      video?.addEventListener("loadedmetadata", handleReady);
    }

    return () => {
      video?.removeEventListener("loadedmetadata", handleReady);
      clearInterval(interval);
    };
  }, [isAgeConfirmed, message]);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isVivienTyping]);

  const handleYes = () => {
    setIsAgeConfirmed(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsSending(true);

    // Add user message to chat
    const newUserMessage = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user' as const
    };
    setChatMessages(prev => [...prev, newUserMessage]);

    try {
      setIsVivienTyping(true);
      
      // Get response from Vivian chat service
      const reply = await sendVivianMessage(userMessage);
      
      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: reply,
        role: 'assistant' as const,
        displayedContent: '',
        isTyping: true
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      
      // Start typing effect
      startTypingEffect(assistantMessage.id, reply);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again.",
        role: 'assistant' as const
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsVivienTyping(false);
      setIsSending(false);
    }
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
  };

  return (
    <div id="landing-lock" className="fixed inset-0 h-full bg-black flex flex-col items-center pt-4 md:pt-6 pb-40 gap-3 overflow-hidden">
      <img
        src="/uploads/V-logo-Shimmer.jpeg"
        alt="V Logo"
        className="w-32 sm:w-40 h-auto"
      />
      <video
        ref={videoRef}
        src="/uploads/Vellvii-lgo-shimmer.mp4"
        className={`w-[90vw] sm:w-3/4 md:w-1/2 max-w-md max-h-[40vh] h-auto transition-all duration-1000 ${
          isAgeConfirmed ? 'animate-fade-out translate-y-8 opacity-0 pointer-events-none' : ''
        }`}
        muted
        playsInline
      />

      {/* Vivien Section */}
      <div className="vivien-container px-4 sm:px-0">
        <div className="w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
          <img src={vivienImage} alt="Vivien" className="w-full h-full object-cover" />
        </div>
        <div className={`
          bg-gradient-to-br from-card/95 to-muted/95 backdrop-blur-xl border border-secondary/20 rounded-2xl p-3 sm:p-4 md:p-6 shadow-luxury
          transition-all duration-700 ease-out flex flex-col
          ${isAgeConfirmed 
            ? 'w-[95vw] sm:w-[85vw] md:w-[80vw] min-h-[60vh] sm:min-h-[65vh] max-h-[75vh] sm:max-h-[70vh]' 
            : 'w-[90vw] max-w-sm sm:max-w-md'
          }
        `}>
          {/* Chat Messages Container */}
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

            {isAgeConfirmed && chatMessages.length > 0 && (
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto scrollbar-luxury space-y-3 mb-4 pr-2"
                style={{ height: '0', minHeight: '200px' }}
              >
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`
                      max-w-[85%] px-4 py-2.5 rounded-2xl text-sm md:text-base leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground rounded-br-md' 
                        : 'bg-gradient-to-r from-accent/20 to-accent/10 text-foreground border border-accent/30 rounded-bl-md'
                      }
                     `}>
                       {msg.role === 'assistant' 
                         ? (msg.displayedContent || '')
                         : msg.content
                       }
                       {msg.role === 'assistant' && msg.isTyping && <span className="blinking-cursor ml-1 text-secondary">|</span>}
                     </div>
                  </div>
                ))}
                
                {/* Vivien Typing Indicator */}
                {isVivienTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl rounded-bl-md px-4 py-3 max-w-[50%]">
                      <div className="flex items-center space-x-1 text-foreground">
                        <span className="text-sm">Vivien is typing</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
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
          
          {/* Chat Input */}
          {isAgeConfirmed && !isTyping && (
            <form onSubmit={handleSendMessage} className="mt-4 md:mt-6 flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about our collection..."
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                disabled={isSending}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium px-4 text-sm"
              >
                {isSending ? '...' : 'Send'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
