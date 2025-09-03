import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { postSSE } from "@/lib/sseClient";
import vivienImage from "/uploads/976c0d6d-a066-409a-8ad6-6353840958ac.png";

const Landing = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant'}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (document.getElementById('landing-lock')) {
      document.body.classList.add('landing-active');
    }
    return () => {
      document.body.classList.remove('landing-active');
    };
  }, []);

  const message = isAgeConfirmed 
    ? "Perfect! I'm here to help you explore our luxury collection. What would you like to know?"
    : "Hi, I'm Vivien. I can guide you through our website and you may ask me any questions at any time. To start, please confirm that you are older than 18.";

  useEffect(() => {
    if (isAgeConfirmed) {
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

  const handleYes = () => {
    setIsAgeConfirmed(true);
    // Add the welcome message to chat history
    const welcomeMessage = {
      id: Date.now().toString(),
      content: "Welcome to Vellvii. You've arrived just in time for something extraordinary. On October 1st, 2025, we'll unveil our first creation — a luxurious experience we call the Art of 'O.'  Until then, consider this your private preview lounge. You're free to ask me questions — about pleasure, wellness, intimacy, or the little secrets science has to share about feeling good.  I can't reveal all of Vellvii's products just yet… but I can keep you intrigued, entertained, and maybe even a little inspired. Shall we begin?",
      role: 'assistant' as const
    };
    setChatMessages([welcomeMessage]);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    // Debouncing: prevent rapid requests (min 1 second between messages)
    const now = Date.now();
    if (now - lastSentTime < 1000) {
      return;
    }
    setLastSentTime(now);

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsSending(true);

    // Keep focus on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // Add user message to chat
    const newUserMessage = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user' as const
    };
    setChatMessages(prev => [...prev, newUserMessage]);

    // Auto-scroll to bottom
    setTimeout(scrollToBottom, 100);

    // Will create assistant message only when content starts arriving
    let assistantMessageId: string | null = null;
    let hasStartedContent = false;

    try {
      // Store session ID for conversation continuity
      const sessionId = sessionStorage.getItem('vivian-session-id') || crypto.randomUUID();
      if (!sessionStorage.getItem('vivian-session-id')) {
        sessionStorage.setItem('vivian-session-id', sessionId);
      }

      const { data: { session } } = await supabase.auth.getSession();
      const url = `https://mawaqjqifmvijolucrlp.supabase.co/functions/v1/vivian-chat`;
      
      // Add timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 30000);
      });

      const ssePromise = postSSE(
        url,
        {
          messages: [...chatMessages, newUserMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          stream: true,
          sessionId: sessionId
        },
        (token) => {
          // Create assistant message on first token
          if (!hasStartedContent) {
            hasStartedContent = true;
            assistantMessageId = (Date.now() + 1).toString();
            const assistantMessage = {
              id: assistantMessageId,
              content: token,
              role: 'assistant' as const
            };
            setChatMessages(prev => [...prev, assistantMessage]);
          } else if (assistantMessageId) {
            // Update existing assistant message with new token
            setChatMessages(prev => 
              prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, content: msg.content + token }
                  : msg
              )
            );
          }
          setTimeout(scrollToBottom, 10);
        },
        () => {
          // Stream is done
          setIsSending(false);
          setTimeout(() => {
            scrollToBottom();
            inputRef.current?.focus();
          }, 100);
        }
      );

      await Promise.race([ssePromise, timeoutPromise]);

    } catch (error) {
      console.error('❌ Error sending message:', error);
      setIsSending(false);
      
      // Remove any incomplete assistant message if it exists
      if (assistantMessageId) {
        setChatMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
      }
      
      // Add appropriate error message based on error type
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      let userFriendlyMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
      
      if (errorMessage.includes('Rate limit')) {
        userFriendlyMessage = "I'm receiving a lot of messages right now. Please wait a moment before trying again.";
      } else if (errorMessage.includes('timeout')) {
        userFriendlyMessage = "The request took too long to process. Please try again.";
      }
      
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: userFriendlyMessage,
        role: 'assistant' as const
      }]);
      
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleNo = () => {
    alert("You must be 18 or older to access this website.");
  };

  return (
    <div id="landing-lock" className="fixed inset-0 h-full bg-black flex flex-col items-center pt-4 md:pt-6 pb-4 gap-3 overflow-hidden">
      <img
        src="/uploads/V-logo-Shimmer.jpeg"
        alt="V Logo"
        className="w-32 sm:w-40 h-auto flex-shrink-0"
      />
      
      {!isAgeConfirmed && (
        <video
          ref={videoRef}
          src="/uploads/Vellvii-lgo-shimmer.mp4"
          className="w-[90vw] sm:w-3/4 md:w-1/2 max-w-md max-h-[40vh] h-auto"
          muted
          playsInline
        />
      )}

      {isAgeConfirmed ? (
        /* Chat Mode */
        <div className="flex-1 flex flex-col w-full max-w-2xl px-4 min-h-0">
          {/* Chat Messages Container */}
          <div className="flex-1 overflow-hidden mb-4">
            <div 
              ref={chatContainerRef}
              className="h-full overflow-y-auto scrollbar-hide px-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="space-y-4 pt-8 pb-4">
                {chatMessages.map((msg, index) => (
                  <div key={msg.id} className={`flex gap-3 animate-fade-in ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white/10 flex-shrink-0">
                        <img src={vivienImage} alt="Vivien" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[70%] ${msg.role === 'user' ? 'mr-2' : 'ml-0'}`}>
                      <div className={`text-xs mb-1 ${
                        msg.role === 'user' ? 'text-right text-yellow-300/80' : 'text-left text-white/60'
                      }`}>
                        {msg.role === 'user' ? 'You' : 'Vivien'}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm md:text-base leading-relaxed font-playfair ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-br-md' 
                          : 'bg-white/10 text-white border border-white/20 rounded-bl-md'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white/10 flex-shrink-0">
                      <img src={vivienImage} alt="Vivien" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-[70%]">
                      <div className="text-xs text-white/60 mb-1">Vivien</div>
                      <div className="p-3 rounded-2xl rounded-bl-md bg-white/10 border border-white/20 flex items-center justify-center min-h-[48px]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Chat Input - Always visible at bottom */}
          <div className="flex-shrink-0 pb-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about our collection..."
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                disabled={isSending}
                autoFocus
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium px-4 text-sm"
              >
                {isSending ? '...' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* Age Verification Mode */
        <div className="vivien-container">
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
      )}
    </div>
  );
};

export default Landing;
