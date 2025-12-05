import { useState } from "react";
import { X, MessageCircle, Minus } from "lucide-react";
import { VivienChatInterface } from "./VivienChatInterface";

export const FloatingVivienChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`
            absolute bottom-16 right-0 
            bg-gradient-to-br from-card to-muted backdrop-blur-xl 
            border border-secondary/20 rounded-2xl shadow-luxury
            transition-all duration-300 ease-out
            ${isMinimized ? 'h-14' : 'w-[340px] sm:w-[380px] h-[500px]'}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-secondary/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-semibold">V</span>
              </div>
              <div>
                <p className="font-playfair text-sm font-medium text-foreground">Vivien</p>
                <p className="text-xs text-muted-foreground">Your Concierge</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-secondary/10 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-secondary/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-[calc(100%-56px)] overflow-hidden">
              <VivienChatInterface />
            </div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`
          w-14 h-14 rounded-full 
          bg-gradient-to-br from-primary to-secondary 
          shadow-lg hover:shadow-xl 
          flex items-center justify-center
          transition-all duration-300 hover:scale-105
          ${isOpen ? 'rotate-0' : 'rotate-0'}
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>
    </div>
  );
};
