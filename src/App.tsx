
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

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AIProvider>
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
        </AIProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
