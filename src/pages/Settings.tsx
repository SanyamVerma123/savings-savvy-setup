
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  LogOut, 
  Languages, 
  Sun, 
  Moon, 
  Key, 
  Save,
  AlertTriangle
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useAI } from "@/contexts/AIContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Settings() {
  const { theme, setTheme, setUserData } = useAppContext();
  const { 
    setApiKey, 
    language, 
    setLanguage, 
    availableLanguages 
  } = useAI();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // API keys
  const [groqApiKey, setGroqApiKey] = useState("");
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [openRouterApiKey, setOpenRouterApiKey] = useState("");
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  
  // Settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/login');
    toast.success("Logged out successfully");
  };
  
  const handleSaveApiKeys = () => {
    // Save Groq API key
    if (groqApiKey.trim()) {
      setApiKey(groqApiKey.trim());
    }
    
    // We would handle other API keys here similarly
    
    toast.success("API keys saved successfully");
  };
  
  const handleThemeToggle = (isChecked: boolean) => {
    setDarkMode(isChecked);
    setTheme(isChecked ? 'dark' : 'light');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        className="flex flex-col gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Customize your app preferences and manage your account
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
              <TabsTrigger value="api-keys" className="flex-1">API Keys</TabsTrigger>
              <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your app preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-muted-foreground" />
                      <Switch 
                        checked={darkMode}
                        onCheckedChange={handleThemeToggle}
                      />
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable app notifications
                      </p>
                    </div>
                    <Switch 
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">AI Assistant Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Set the language for the AI assistant
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-muted-foreground" />
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px]">
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api-keys" className="space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    Manage your API keys for AI services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="groq-api-key">Groq API Key</Label>
                    <Input
                      id="groq-api-key"
                      type="password"
                      placeholder="Enter your Groq API key"
                      value={groqApiKey}
                      onChange={(e) => setGroqApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for the AI financial assistant
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="google-api-key">Google API Key</Label>
                    <Input
                      id="google-api-key"
                      type="password"
                      placeholder="Enter your Google API key"
                      value={googleApiKey}
                      onChange={(e) => setGoogleApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for Google services integration
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="open-router-api-key">OpenRouter API Key</Label>
                    <Input
                      id="open-router-api-key"
                      type="password"
                      placeholder="Enter your OpenRouter API key"
                      value={openRouterApiKey}
                      onChange={(e) => setOpenRouterApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for accessing multiple AI models
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="open-ai-api-key">OpenAI API Key</Label>
                    <Input
                      id="open-ai-api-key"
                      type="password"
                      placeholder="Enter your OpenAI API key"
                      value={openAIApiKey}
                      onChange={(e) => setOpenAIApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for GPT models
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={handleSaveApiKeys}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save API Keys
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account and session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-500">Demo Application</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a demo application. Changes to account settings will not be permanently saved.
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
