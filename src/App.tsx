
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AIProvider } from "@/contexts/AIContext";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Add animation classes to the body
    document.body.classList.add('animate-fadeIn');
    
    // Check login status
    const checkLoginStatus = () => {
      const savedUser = localStorage.getItem('user');
      setIsLoggedIn(!!savedUser);
    };
    
    checkLoginStatus();
  }, []);

  // Show loading state while checking auth status
  if (isLoggedIn === null) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AIProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </AIProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
