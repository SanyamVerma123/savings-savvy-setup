
import { useState, useRef, useEffect } from "react";
import { useAI } from "@/contexts/AIContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Bot, 
  Send, 
  X, 
  Loader2, 
  BrainCircuit, 
  AlertCircle, 
  Info,
  Languages
} from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
}

export function AIAssistant() {
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [tempEndpointUrl, setTempEndpointUrl] = useState(endpointUrl);
  const [tempModelName, setTempModelName] = useState(modelName);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Set up automatic financial insights on first load
  useEffect(() => {
    if (hasApiKey && messages.length === 0) {
      const scheduleInsight = () => {
        setTimeout(() => {
          if (!isExpanded) {
            toast(
              <div className="flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-finance-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">AI Financial Insight</h3>
                  <p className="text-sm">Open the AI assistant for personalized financial advice</p>
                </div>
              </div>,
              {
                action: {
                  label: "Open",
                  onClick: () => setIsExpanded(true)
                },
                duration: 8000
              }
            );
          }
        }, 15000); // Show after 15 seconds
      };
      
      scheduleInsight();
    }
  }, [hasApiKey, messages.length, isExpanded]);

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

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${availableLanguages.find(lang => lang.code === value)?.name}`);
    setShowLanguageDialog(false);
  };

  const handleSettingsSave = () => {
    if (tempEndpointUrl.trim()) {
      setEndpointUrl(tempEndpointUrl.trim());
    }
    
    if (tempModelName.trim()) {
      setModelName(tempModelName.trim());
    }
    
    setShowSettingsDialog(false);
    toast.success("AI settings saved successfully!");
  };

  // Get proactive financial advice
  const getFinancialAdvice = async () => {
    if (!hasApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsExpanded(true);
    
    const questions = [
      "Give me a quick financial tip based on my spending.",
      "Any budget issues I should know about right now?",
      "How am I doing with my savings goals?",
      "What's one thing I could improve about my finances?"
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    try {
      const aiResponse = await askAI(randomQuestion);
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: "ai"
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to get AI advice. Please try again.");
      console.error("AI advice error:", error);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        <Button
          onClick={() => setShowSettingsDialog(true)}
          className="rounded-full p-3 shadow-lg hover:scale-105 transition-transform bg-blue-500 text-white"
          aria-label="AI Settings"
          title="AI Settings"
        >
          <Bot className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => setShowLanguageDialog(true)}
          className="rounded-full p-3 shadow-lg hover:scale-105 transition-transform bg-teal-500 text-white"
          aria-label="Change Language"
          title="Change Language"
        >
          <Languages className="h-5 w-5" />
        </Button>
        <Button
          onClick={getFinancialAdvice}
          className="rounded-full p-3 shadow-lg hover:scale-105 transition-transform bg-amber-500 text-white"
          aria-label="Get Financial Advice"
          title="Get Financial Advice"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full p-3 shadow-lg hover:scale-105 transition-transform bg-finance-primary text-white"
          aria-label="Open AI Assistant"
          title="Open AI Assistant"
        >
          <BrainCircuit className="h-5 w-5" />
        </Button>

        <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-finance-primary" />
                Select Language
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="mb-4 text-sm">
                Select the language you want the AI assistant to respond in:
              </p>
              <Select value={language} onValueChange={handleLanguageChange}>
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
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-finance-primary" />
                AI Assistant Settings
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Endpoint URL</label>
                <Input
                  value={tempEndpointUrl}
                  onChange={(e) => setTempEndpointUrl(e.target.value)}
                  placeholder="Enter API endpoint URL"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Default: https://api.groq.com/openai/v1/chat/completions
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Model Name</label>
                <Select value={tempModelName} onValueChange={setTempModelName}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">API Key</label>
                <Input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder={hasApiKey ? "••••••••••••••••••••••" : "Enter your API key"}
                  className="w-full"
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSettingsSave}>
                Save Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowSettingsDialog(true)}
              title="AI Settings"
            >
              <Bot className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowLanguageDialog(true)}
              title="Change Language"
            >
              <Languages className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8"
              aria-label="Close AI Assistant"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[280px] sm:h-[320px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <BrainCircuit className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">Your Financial AI Assistant</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Ask me anything about your finances. I'll keep it short and helpful.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setInput("Any budget issues?")}
                    className="text-xs"
                  >
                    Any budget issues?
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setInput("Quick saving tip?")}
                    className="text-xs"
                  >
                    Quick saving tip?
                  </Button>
                </div>
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
                    className={`rounded-lg p-3 max-w-[85%] ${
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
              To use the AI assistant, please enter your API key. Your key is stored locally on your device and is never sent to our servers.
            </p>
            <Input
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your API key"
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

      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-finance-primary" />
              Select Language
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-sm">
              Select the language you want the AI assistant to respond in:
            </p>
            <Select value={language} onValueChange={handleLanguageChange}>
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
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-finance-primary" />
              AI Assistant Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Endpoint URL</label>
              <Input
                value={tempEndpointUrl}
                onChange={(e) => setTempEndpointUrl(e.target.value)}
                placeholder="Enter API endpoint URL"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Default: https://api.groq.com/openai/v1/chat/completions
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Model Name</label>
              <Select value={tempModelName} onValueChange={setTempModelName}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder={hasApiKey ? "••••••••••••••••••••••" : "Enter your API key"}
                className="w-full"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSettingsSave}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
