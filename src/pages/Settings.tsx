import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Save,
  Languages,
  Trash2,
  AlertCircle,
  BrainCircuit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { useAI } from "@/contexts/AIContext";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
];

export default function Settings() {
  const { theme, setTheme, setUserData, userData, currency, setCurrency } = useAppContext();
  const { 
    language, 
    setLanguage, 
    availableLanguages,
    setApiKey,
    setEndpointUrl,
    setModelName,
    endpointUrl,
    modelName,
    availableModels
  } = useAI();
  
  const [tempApiKey, setTempApiKey] = useState<string>("");
  const [tempEndpointUrl, setTempEndpointUrl] = useState<string>(endpointUrl);
  const [tempModelName, setTempModelName] = useState<string>(modelName);
  const [exportFormat, setExportFormat] = useState<string>("json");
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === 'dark');
  const [localCurrency, setLocalCurrency] = useState<string>(currency);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    setLocalCurrency(currency);
  }, [currency]);

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
    toast.success(`${checked ? 'Dark' : 'Light'} mode activated`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    toast.success("Logged out successfully");
    navigate('/login');
  };
  
  const handleSaveAISettings = () => {
    if (tempApiKey) {
      setApiKey(tempApiKey);
    }
    
    if (tempEndpointUrl) {
      setEndpointUrl(tempEndpointUrl);
    }
    
    if (tempModelName) {
      setModelName(tempModelName);
    }
    
    toast.success("AI settings saved successfully");
  };

  const handleExportData = () => {
    toast.success(`Data export started in ${exportFormat.toUpperCase()} format`);
  };

  const handleImportData = () => {
    toast.success("Data import started");
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    setUserData(null);
    toast.success("Account deleted successfully");
    navigate('/login');
  };

  const handleCurrencyChange = (value: string) => {
    try {
      setLocalCurrency(value);
      // Delayed update to prevent UI issues
      setTimeout(() => {
        setCurrency(value);
        toast.success(`Currency changed to ${value}`);
      }, 50);
    } catch (error) {
      console.error("Error changing currency:", error);
      toast.error("Failed to change currency. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card className="card-gradient w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData ? (
                <>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 border rounded-md bg-secondary/50">
                      {userData.email}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="p-2 border rounded-md bg-secondary/50">
                      {userData.name}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                    
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Delete Account
                          </DialogTitle>
                          <DialogDescription>
                            This will delete all your data and cannot be undone. Are you sure?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            Deleting your account will remove all your transactions, budgets, 
                            savings goals, and settings from this device.
                          </p>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowDeleteDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={handleDeleteAccount}
                          >
                            Yes, Delete Everything
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              ) : (
                <div className="py-4 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground mb-4">
                    You're currently using the app as a guest.
                  </p>
                  <Button onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-gradient w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI Assistant Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-language">Assistant Language</Label>
                <Select 
                  value={language} 
                  onValueChange={setLanguage}
                >
                  <SelectTrigger id="ai-language" className="w-full">
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
              
              <div className="space-y-2">
                <Label htmlFor="endpoint-url">API Endpoint URL</Label>
                <Input
                  id="endpoint-url"
                  value={tempEndpointUrl}
                  onChange={(e) => setTempEndpointUrl(e.target.value)}
                  placeholder="https://api.example.com/chat/completions"
                />
                <p className="text-xs text-muted-foreground">
                  Default: https://api.groq.com/openai/v1/chat/completions
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model-name">AI Model</Label>
                <Select 
                  value={tempModelName} 
                  onValueChange={setTempModelName}
                >
                  <SelectTrigger id="model-name" className="w-full">
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
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally and never sent to our servers
                </p>
              </div>
              
              <Button 
                className="w-full mt-2" 
                onClick={handleSaveAISettings}
              >
                <Save className="h-4 w-4 mr-2" />
                Save AI Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={localCurrency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} - {curr.name} ({curr.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select your preferred currency for displaying amounts
                </p>
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger id="export-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleImportData}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
