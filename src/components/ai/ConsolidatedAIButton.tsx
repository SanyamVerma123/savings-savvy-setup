
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  BrainCircuit, 
  Languages,
  Bot,
  MessageSquare,
  X,
  Loader2,
  Send,
  Settings,
  ArrowLeft
} from "lucide-react";
import { useAI } from "@/contexts/AIContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

export function ConsolidatedAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currency } = useAppContext();
  
  const { 
    askAI,
    isLoading, 
    hasApiKey, 
    setApiKey,
    language,
    setLanguage,
    availableLanguages,
    endpointUrl,
    setEndpointUrl,
    modelName,
    setModelName,
    availableModels
  } = useAI();

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showFullChat]);

  const handleAskAI = async (question: string) => {
    if (!hasApiKey) {
      toast.error("Please set your API key first");
      return;
    }
    
    setShowChat(true);
    
    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: question,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await askAI(question, systemPrompt);
      setAiResponse(response);
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        sender: "ai"
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error asking AI:", error);
      toast.error("Failed to get AI response");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const question = input.trim();
    setInput("");
    await handleAskAI(question);
  };

  const handleOpenFullChat = () => {
    setShowFullChat(true);
  };

  const handleCloseFullChat = () => {
    setShowFullChat(false);
  };

  const handleSaveSettings = () => {
    if (systemPrompt) {
      toast.success("System prompt saved");
    }
  };

  // Category blocks with icons
  const categoryBlocks = [
    { 
      icon: <Bot className="h-8 w-8 mb-2" />,
      title: "Spending Analysis",
      prompt: "Analyze my spending habits"
    },
    { 
      icon: <BrainCircuit className="h-8 w-8 mb-2" />,
      title: "Saving Tips",
      prompt: "Give me saving tips" 
    },
    { 
      icon: <MessageSquare className="h-8 w-8 mb-2" />,
      title: "Budget Plan",
      prompt: "Suggest a budget plan" 
    }
  ];

  if (showFullChat) {
    return (
      <Dialog open={true} onOpenChange={setShowFullChat}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col max-h-[80vh]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCloseFullChat}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                AI Financial Assistant
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4 my-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">
                  <BrainCircuit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Ask me anything about your finances!</p>
                  <p className="text-sm mt-2">I can analyze your spending, suggest budgets, and give financial advice.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg p-3 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full h-12 w-12 fixed bottom-4 right-4 shadow-lg hover:shadow-xl transition-all z-50 bg-primary text-primary-foreground"
        >
          <BrainCircuit className="h-6 w-6" />
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>AI Financial Assistant</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Assistant Language</label>
                <Select 
                  value={language} 
                  onValueChange={setLanguage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">System Prompt (Optional)</label>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Enter custom instructions for the AI..."
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  Customize how the AI responds to your questions
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveSettings}
                  className="self-end"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Save Settings
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {categoryBlocks.map((block, index) => (
                  <Button 
                    key={index}
                    onClick={() => handleAskAI(block.prompt)}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    variant="outline"
                  >
                    {block.icon}
                    <span className="text-xs text-center">{block.title}</span>
                  </Button>
                ))}
              </div>

              <Button 
                onClick={handleOpenFullChat}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with AI Assistant
              </Button>

              {showChat && (
                <div className="mt-4 border rounded-lg p-4 min-h-[200px] bg-muted/30">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : aiResponse ? (
                    <div className="text-sm">
                      {aiResponse}
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleOpenFullChat}
                        >
                          Continue Conversation
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                      <p>Ask me anything about your finances!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
