import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AITutorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AITutorSidebar({ isOpen, onClose }: AITutorSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour! Je suis votre AI Tutor. Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur n'importe quel sujet académique.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "C'est une excellente question! Laissez-moi vous expliquer cela en détail. Pour bien comprendre ce concept, il est important de considérer plusieurs aspects...",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Blur Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xl z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed top-0 right-0 z-50 w-96 h-screen bg-white dark:bg-gray-950 border-l-2 border-primary/20 shadow-2xl transition-all animate-in slide-in-from-right duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-primary/20 bg-gradient-to-r from-primary via-primary to-secondary text-white shadow-lg shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <div>
                <span className="font-bold text-lg">AI Tutor</span>
                <p className="text-xs text-white/90">Assistant intelligent</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/20 rounded-lg transition-all"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <span className={cn(
                    "text-[10px] mt-2 block",
                    message.sender === "user" ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 shadow-md">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t-2 border-primary/20 bg-white dark:bg-gray-950 shadow-lg shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 text-sm bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2.5 text-center font-medium">
              Appuyez sur <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 font-mono">Entrée</kbd> pour envoyer
            </p>
          </div>
        </div>
      )}
    </>
  );
}
