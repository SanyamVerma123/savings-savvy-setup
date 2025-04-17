
import { useState, useRef, useEffect } from "react";
import { useAI } from "@/contexts/AIContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, Send, X, Loader2, BrainCircuit, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

export function AIAssistant() {
  const { askAI, isLoading, hasApiKey, setApiKey } = useAI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Check if API key is set and prompt user if not
  useEffect(() => {
    if (!hasApiKey) {
      setTimeout(() => {
        setShowApiKeyDialog(true);
      }, 1000);
    }
  }, [hasApiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (!hasApiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
      const aiResponse = await askAI(input);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: "ai"
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to get AI response. Please try again.");
      console.error("AI response error:", error);
    }
  };

  const handleApiKeySave = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      setShowApiKeyDialog(false);
      toast.success("API key saved successfully!");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg hover:scale-105 transition-transform bg-finance-primary text-white"
        aria-label="Open AI Assistant"
      >
        <BrainCircuit className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <>
      <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md shadow-lg border rounded-lg overflow-hidden">
        <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-finance-primary" />
            <CardTitle className="text-lg">Financial AI Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="h-8 w-8"
            aria-label="Close AI Assistant"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <BrainCircuit className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">Your Financial AI Assistant</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Ask me anything about your finances, budgeting advice, or saving recommendations.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-finance-primary text-white"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg p-3 bg-secondary">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="p-3 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-finance-primary" />
              API Key Required
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-sm">
              To use the AI assistant, please enter your Groq API key. Your key is stored locally on your device and is never sent to our servers.
            </p>
            <Input
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your Groq API key"
              type="password"
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleApiKeySave}>
              Save Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
