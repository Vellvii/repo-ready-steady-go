import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sendVivianMessage } from "@/services/vivianChatService";

const ConciergeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, content: string, role: 'user' | 'assistant'}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [concierge, setConcierge] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const selectedConcierge = localStorage.getItem("selectedConcierge");
    setConcierge(selectedConcierge);
    
    // Add welcome message when component mounts
    if (selectedConcierge === "vivian" && messages.length === 0) {
      setMessages([{
        id: '1',
        content: "Hello! I'm Vivian, your personal luxury wellness concierge. How may I assist you today?",
        role: 'assistant'
      }]);
    }
  }, [location.pathname]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // Get response from Abacus AI via Vivian chat service
    try {
      const response = await sendVivianMessage(currentInput);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant' as const
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help you with any questions about our luxury collection. Please feel free to ask anything!",
        role: 'assistant' as const
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const getConciergeInfo = () => {
    return { name: "Vivian", color: "text-secondary", bg: "bg-secondary/10" };
  };

  // Always show chat for Vivian (default)
  if (!concierge) {
    // Set Vivian as default if no concierge selected
    localStorage.setItem("selectedConcierge", "vivian");
    setConcierge("vivian");
  }

  const conciergeInfo = getConciergeInfo();

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-luxury hover-glow"
          variant="luxury"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 glass-luxury shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-72 sm:w-80 h-14 sm:h-16' : 'w-72 sm:w-80 h-80 sm:h-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${conciergeInfo.bg}`}></div>
              <span className={`font-semibold ${conciergeInfo.color}`}>
                {conciergeInfo.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-white/60 hover:text-white"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 space-y-3 max-h-60 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-white/90'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    variant="luxury"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ConciergeChat;