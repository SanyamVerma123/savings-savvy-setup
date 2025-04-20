
import { Routes, Route, Navigate } from "react-router-dom";
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
import { useAppContext } from "./contexts/AppContext";

import "./App.css";

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { checkLoginStatus } = useAppContext();
  const isLoggedIn = checkLoginStatus();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Routes component to use context
const AppRoutes = () => {
  const { checkLoginStatus } = useAppContext();
  
  // Force initial login check
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <OnboardingWrapper />
        </ProtectedRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/budget" element={
        <ProtectedRoute>
          <Budget />
        </ProtectedRoute>
      } />
      <Route path="/transactions" element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      } />
      <Route path="/savings" element={
        <ProtectedRoute>
          <Savings />
        </ProtectedRoute>
      } />
      <Route path="/help" element={
        <ProtectedRoute>
          <Help />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

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
            <AppRoutes />
            <Toaster />
          </div>
        </AIProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
