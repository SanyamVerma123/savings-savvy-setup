
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  BrainCircuit, 
  Languages,
  Bot,
  MessageSquare,
  X
} from "lucide-react";
import { useAI } from "@/contexts/AIContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ConsolidatedAIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { 
    language, 
    setLanguage, 
    availableLanguages,
    askAI,
    isLoading,
    response
  } = useAI();

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

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  onClick={() => {
                    askAI("Analyze my spending habits");
                    setShowChat(true);
                  }}
                  className="flex flex-col items-center justify-center h-24 p-2"
                  variant="outline"
                >
                  <Bot className="h-8 w-8 mb-2" />
                  <span className="text-xs text-center">Spending Analysis</span>
                </Button>
                
                <Button 
                  onClick={() => {
                    askAI("Give me saving tips");
                    setShowChat(true);
                  }}
                  className="flex flex-col items-center justify-center h-24 p-2"
                  variant="outline"
                >
                  <BrainCircuit className="h-8 w-8 mb-2" />
                  <span className="text-xs text-center">Saving Tips</span>
                </Button>
                
                <Button 
                  onClick={() => {
                    askAI("Suggest a budget plan");
                    setShowChat(true);
                  }}
                  className="flex flex-col items-center justify-center h-24 p-2"
                  variant="outline"
                >
                  <Languages className="h-8 w-8 mb-2" />
                  <span className="text-xs text-center">Budget Plan</span>
                </Button>
              </div>

              <Button 
                onClick={() => setShowChat(true)}
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
                  ) : response ? (
                    <div className="text-sm">
                      {response}
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
