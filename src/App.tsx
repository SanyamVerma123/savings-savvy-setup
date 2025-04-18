
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { AppProvider } from "./contexts/AppContext";
import { AIProvider } from "./contexts/AIContext";
import { OnboardingWrapper } from "./components/onboarding/OnboardingWrapper";
import { useEffect } from "react";

import "./App.css";

function App() {
  // Make the app display in fullscreen
  useEffect(() => {
    // Add fullscreen styles
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    
    // If there's a root element, make sure it takes full height
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
      root.style.overflow = "auto";
    }
    
    // Clean up on unmount
    return () => {
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
      if (root) {
        root.style.height = "";
        root.style.overflow = "";
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <AIProvider>
          <div className="h-full w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<OnboardingWrapper />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AIProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
