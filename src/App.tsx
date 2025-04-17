
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AIProvider } from "@/contexts/AIContext";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add animation classes to the body
    document.body.classList.add('animate-fadeIn');
  }, []);

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
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<Help />} />
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
